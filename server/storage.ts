import { db } from "@db";
import * as schema from "@shared/schema";
import { eq, like, and, desc, asc, sql } from "drizzle-orm";
import { 
  MonitoringData, 
  DashboardStats, 
  StatChange, 
  PredictionFactor,
  OrganFunction 
} from "@/types";

// User related functions
export const storage = {
  // User functions
  async getUserByUsername(username: string) {
    const users = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return users[0];
  },
  
  async getUserById(id: number) {
    const users = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return users[0];
  },
  
  // Dashboard functions
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // In a real app, this would fetch actual data from the database
      // This is mocked for demonstration purposes
      const pendingCases = await db.select({ count: sql`count(*)` })
        .from(schema.transplantCases)
        .where(eq(schema.transplantCases.status, 'Pending Review'));
      
      const monitoringCount = await db.select({ count: sql`count(*)` })
        .from(schema.monitoringPatients);
      
      const successfulCases = await db.select({ count: sql`count(*)` })
        .from(schema.transplantCases)
        .where(eq(schema.transplantCases.successful, true));
      
      const totalCases = await db.select({ count: sql`count(*)` })
        .from(schema.transplantCases)
        .where(and(
          eq(schema.transplantCases.status, 'Completed'),
          sql`created_at > current_date - interval '1 year'`
        ));
      
      const successRateValue = totalCases[0].count > 0 
        ? (successfulCases[0].count / totalCases[0].count * 100).toFixed(1) 
        : '0.0';
      
      return {
        pendingAssessments: pendingCases[0].count || 0,
        pendingChange: { value: '+3', period: 'from last week', direction: 'up' },
        activeMonitoring: monitoringCount[0].count || 0,
        monitoringChange: { value: '+5', period: 'from last month', direction: 'up' },
        successRate: `${successRateValue}%`,
        successChange: { value: '+2.3%', period: 'from previous quarter', direction: 'up' }
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
  
  // Transplant cases functions
  async getPendingTransplantCases(page: number, limit: number, type?: string) {
    try {
      const offset = (page - 1) * limit;
      
      let query = db.select()
        .from(schema.transplantCases)
        .innerJoin(schema.patients, eq(schema.transplantCases.patientId, schema.patients.id))
        .orderBy(desc(schema.transplantCases.createdAt));
      
      if (type) {
        query = query.where(eq(schema.transplantCases.organType, type));
      }
      
      const cases = await query
        .limit(limit)
        .offset(offset);
      
      // Count total cases for pagination
      let countQuery = db.select({ count: sql`count(*)` })
        .from(schema.transplantCases);
      
      if (type) {
        countQuery = countQuery.where(eq(schema.transplantCases.organType, type));
      }
      
      const countResult = await countQuery;
      const total = countResult[0].count || 0;
      
      // Map the results to the expected format
      const mappedCases = cases.map(({ transplantCases, patients }) => ({
        id: transplantCases.id.toString(),
        patientId: patients.patientId,
        name: patients.name,
        organType: transplantCases.organType,
        compatibilityScore: transplantCases.compatibilityScore,
        status: transplantCases.status,
        createdAt: transplantCases.createdAt.toISOString()
      }));
      
      return {
        cases: mappedCases,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching pending transplant cases:', error);
      throw error;
    }
  },
  
  // Model insights functions
  async getPredictionFactors(): Promise<PredictionFactor[]> {
    try {
      const factors = await db.select()
        .from(schema.predictionFactors)
        .orderBy(desc(schema.predictionFactors.importance));
      
      return factors.map(factor => ({
        name: factor.name,
        importance: factor.importance
      }));
    } catch (error) {
      console.error('Error fetching prediction factors:', error);
      throw error;
    }
  },
  
  // Monitoring functions
  async getMonitoringData(timeRange: string, type?: string): Promise<MonitoringData> {
    try {
      // In a real app, this would fetch actual data from the database
      // This is mocked for demonstration purposes
      let days = 30;
      
      switch (timeRange) {
        case 'Last 90 Days':
          days = 90;
          break;
        case 'Last 6 Months':
          days = 180;
          break;
        case 'Last Year':
          days = 365;
          break;
        default:
          days = 30;
      }
      
      // Get average organ function data
      let query = db.select({
        date: schema.monitoringData.date,
        value: sql`avg(organ_function_value)`.as('average_value')
      })
        .from(schema.monitoringData)
        .innerJoin(schema.monitoringPatients, eq(schema.monitoringData.patientId, schema.monitoringPatients.id))
        .where(sql`date > current_date - interval '${days} days'`)
        .groupBy(schema.monitoringData.date)
        .orderBy(asc(schema.monitoringData.date));
      
      if (type && type !== 'All Organ Types') {
        query = query.where(eq(schema.monitoringPatients.organType, type));
      }
      
      const organFunctionData = await query;
      
      // Get average immune response data
      let immuneQuery = db.select({
        date: schema.monitoringData.date,
        value: sql`avg(immune_response_value)`.as('average_value')
      })
        .from(schema.monitoringData)
        .innerJoin(schema.monitoringPatients, eq(schema.monitoringData.patientId, schema.monitoringPatients.id))
        .where(sql`date > current_date - interval '${days} days'`)
        .groupBy(schema.monitoringData.date)
        .orderBy(asc(schema.monitoringData.date));
      
      if (type && type !== 'All Organ Types') {
        immuneQuery = immuneQuery.where(eq(schema.monitoringPatients.organType, type));
      }
      
      const immuneResponseData = await immuneQuery;
      
      // Get average recovery index data
      let recoveryQuery = db.select({
        date: schema.monitoringData.date,
        value: sql`avg(recovery_index_value)`.as('average_value')
      })
        .from(schema.monitoringData)
        .innerJoin(schema.monitoringPatients, eq(schema.monitoringData.patientId, schema.monitoringPatients.id))
        .where(sql`date > current_date - interval '${days} days'`)
        .groupBy(schema.monitoringData.date)
        .orderBy(asc(schema.monitoringData.date));
      
      if (type && type !== 'All Organ Types') {
        recoveryQuery = recoveryQuery.where(eq(schema.monitoringPatients.organType, type));
      }
      
      const recoveryIndexData = await recoveryQuery;
      
      // Calculate averages
      const organAverage = organFunctionData.reduce((sum, item) => sum + Number(item.value), 0) / 
        (organFunctionData.length || 1);
      
      const immuneAverage = immuneResponseData.reduce((sum, item) => sum + Number(item.value), 0) / 
        (immuneResponseData.length || 1);
      
      const recoveryAverage = recoveryIndexData.reduce((sum, item) => sum + Number(item.value), 0) / 
        (recoveryIndexData.length || 1);
      
      return {
        organFunction: {
          data: organFunctionData.map(d => Number(d.value)),
          labels: organFunctionData.map(d => {
            const date = new Date(d.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          average: `${organAverage.toFixed(1)}%`,
          threshold: '75%'
        },
        immuneResponse: {
          data: immuneResponseData.map(d => Number(d.value)),
          labels: immuneResponseData.map(d => {
            const date = new Date(d.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          average: immuneAverage.toFixed(1),
          threshold: '5.0'
        },
        recoveryIndex: {
          data: recoveryIndexData.map(d => Number(d.value)),
          labels: recoveryIndexData.map(d => {
            const date = new Date(d.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          average: `${recoveryAverage.toFixed(1)}%`,
          threshold: '70%'
        }
      };
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      throw error;
    }
  },
  
  async getMonitoringPatients(type?: string) {
    try {
      let query = db.select()
        .from(schema.monitoringPatients)
        .innerJoin(schema.patients, eq(schema.monitoringPatients.patientId, schema.patients.id))
        .orderBy(desc(schema.monitoringPatients.transplantDate));
      
      if (type && type !== 'All Organ Types') {
        query = query.where(eq(schema.monitoringPatients.organType, type));
      }
      
      const patients = await query;
      
      return patients.map(({ monitoringPatients, patients }) => {
        const organFunction: OrganFunction = {
          value: monitoringPatients.organFunctionValue,
          status: this.getOrganFunctionStatus(monitoringPatients.organFunctionValue)
        };
        
        return {
          id: monitoringPatients.id.toString(),
          patientId: patients.patientId,
          name: patients.name,
          transplantDate: new Date(monitoringPatients.transplantDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          organType: monitoringPatients.organType,
          organFunction,
          immuneStatus: monitoringPatients.immuneStatus,
          urgent: monitoringPatients.organFunctionValue < 70 || monitoringPatients.immuneStatus === 'Elevated Response'
        };
      });
    } catch (error) {
      console.error('Error fetching monitoring patients:', error);
      throw error;
    }
  },
  
  // Helper function to determine organ function status
  getOrganFunctionStatus(value: number): string {
    if (value >= 90) return 'Excellent';
    if (value >= 75) return 'Good';
    return 'Concerning';
  },
  
  // Notifications
  async getNotifications(user: any) {
    try {
      const notifications = await db.select()
        .from(schema.notifications)
        .where(eq(schema.notifications.userId, user.id))
        .orderBy(desc(schema.notifications.timestamp));
      
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
};
