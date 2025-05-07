import { pgTable, text, serial, integer, boolean, timestamp, json, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  role: text("role").notNull(),
  email: text("email"),
});

export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Patient schema
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id").notNull().unique(),
  name: text("name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  bloodType: text("blood_type").notNull(),
  medicalHistory: json("medical_history").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPatientSchema = createInsertSchema(patients);
export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = typeof patients.$inferSelect;

// Transplant case schema
export const transplantCases = pgTable("transplant_cases", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  organType: text("organ_type").notNull(),
  compatibilityScore: real("compatibility_score").notNull(),
  status: text("status").notNull(),
  successful: boolean("successful").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertTransplantCaseSchema = createInsertSchema(transplantCases);
export type InsertTransplantCase = z.infer<typeof insertTransplantCaseSchema>;
export type TransplantCase = typeof transplantCases.$inferSelect;

export const transplantCasesRelations = relations(transplantCases, ({ one }) => ({
  patient: one(patients, {
    fields: [transplantCases.patientId],
    references: [patients.id],
  }),
}));

// Monitoring schema
export const monitoringPatients = pgTable("monitoring_patients", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id).notNull(),
  transplantDate: date("transplant_date").notNull(),
  organType: text("organ_type").notNull(),
  organFunctionValue: real("organ_function_value").notNull(),
  immuneStatus: text("immune_status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMonitoringPatientSchema = createInsertSchema(monitoringPatients);
export type InsertMonitoringPatient = z.infer<typeof insertMonitoringPatientSchema>;
export type MonitoringPatient = typeof monitoringPatients.$inferSelect;

export const monitoringPatientsRelations = relations(monitoringPatients, ({ one }) => ({
  patient: one(patients, {
    fields: [monitoringPatients.patientId],
    references: [patients.id],
  }),
}));

// Monitoring data schema
export const monitoringData = pgTable("monitoring_data", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => monitoringPatients.id).notNull(),
  date: date("date").notNull(),
  organFunctionValue: real("organ_function_value").notNull(),
  immuneResponseValue: real("immune_response_value").notNull(),
  recoveryIndexValue: real("recovery_index_value").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMonitoringDataSchema = createInsertSchema(monitoringData);
export type InsertMonitoringData = z.infer<typeof insertMonitoringDataSchema>;
export type MonitoringData = typeof monitoringData.$inferSelect;

export const monitoringDataRelations = relations(monitoringData, ({ one }) => ({
  patient: one(monitoringPatients, {
    fields: [monitoringData.patientId],
    references: [monitoringPatients.id],
  }),
}));

// ML model schema
export const predictionFactors = pgTable("prediction_factors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  importance: real("importance").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPredictionFactorSchema = createInsertSchema(predictionFactors);
export type InsertPredictionFactor = z.infer<typeof insertPredictionFactorSchema>;
export type PredictionFactor = typeof predictionFactors.$inferSelect;

// Notifications schema
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications);
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
