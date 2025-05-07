import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mlPredict, mlEvaluate } from "./ml/prediction";
import { getModelExplanation } from "./ml/explainability";
import { getModelVersions, getModelPerformance } from "./ml/models";
import express from "express";
import session from "express-session";
import { randomUUID } from "crypto";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { eq } from "drizzle-orm";
import { users } from "@shared/schema";
import { db } from "@db";

// Configure passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      // In a real app, we would use a proper password comparison with hashing
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      
      // Remove password from user object before sending to client
      const { password: _, ...userWithoutPassword } = user;
      return done(null, userWithoutPassword);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUserById(id);
    if (!user) {
      return done(null, false);
    }
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    done(null, userWithoutPassword);
  } catch (error) {
    done(error);
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure sessions
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "xenotransplant-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  
  // Initialize passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Authentication middleware
  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({ user: req.user });
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/me", requireAuth, (req, res) => {
    res.json({ user: req.user });
  });
  
  // Dashboard stats
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard stats" });
    }
  });
  
  // Pending transplant cases
  app.get("/api/transplants/pending", requireAuth, async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const type = req.query.type as string;
      
      const result = await storage.getPendingTransplantCases(page, limit, type);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pending transplant cases" });
    }
  });
  
  // ML model insights
  app.get("/api/ml/insights", requireAuth, async (req, res) => {
    try {
      const performanceMetrics = await getModelPerformance();
      const models = await getModelVersions();
      const predictionFactors = await storage.getPredictionFactors();
      
      res.json({
        performanceMetrics,
        predictionFactors,
        models
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching ML model insights" });
    }
  });
  
  // ML model explanation
  app.get("/api/ml/explanation/:patientId", requireAuth, async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const explanation = await getModelExplanation(patientId);
      res.json(explanation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching model explanation" });
    }
  });
  
  // Post-transplant monitoring
  app.get("/api/monitoring", requireAuth, async (req, res) => {
    try {
      const type = req.query.type as string;
      const timeRange = req.query.time as string;
      
      const monitoringData = await storage.getMonitoringData(timeRange, type);
      const patients = await storage.getMonitoringPatients(type);
      
      res.json({
        monitoringData,
        patients
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching monitoring data" });
    }
  });
  
  // Notifications
  app.get("/api/notifications", requireAuth, async (req, res) => {
    try {
      const notifications = await storage.getNotifications(req.user as any);
      res.json({
        count: notifications.filter(n => !n.read).length,
        items: notifications
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications" });
    }
  });
  
  // ML model prediction
  app.post("/api/ml/predict", requireAuth, async (req, res) => {
    try {
      const { patientId, organData } = req.body;
      
      if (!patientId || !organData) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const prediction = await mlPredict(patientId, organData);
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ message: "Error making prediction" });
    }
  });
  
  // ML model evaluation
  app.post("/api/ml/evaluate", requireAuth, async (req, res) => {
    try {
      const { modelId, testData } = req.body;
      
      if (!modelId || !testData) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const evaluation = await mlEvaluate(modelId, testData);
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ message: "Error evaluating model" });
    }
  });
  
  const httpServer = createServer(app);
  
  return httpServer;
}
