// User related types
export interface User {
    id: string;
    username: string;
    name: string;
    title: string;
    role: string;
    email?: string;
  }
  
  // Transplant case related types
  export interface TransplantCase {
    id: string;
    patientId: string;
    name: string;
    organType: string;
    compatibilityScore: number;
    status: string;
    createdAt: string;
  }
  
  // Monitoring related types
  export interface OrganFunction {
    value: number;
    status: string;
  }
  
  export interface MonitoringPatient {
    id: string;
    patientId: string;
    name: string;
    transplantDate: string;
    organType: string;
    organFunction: OrganFunction;
    immuneStatus: string;
    urgent: boolean;
  }
  
  export interface ChartData {
    data: number[];
    labels: string[];
    average: string;
    threshold: string;
  }
  
  export interface MonitoringData {
    organFunction?: ChartData;
    immuneResponse?: ChartData;
    recoveryIndex?: ChartData;
  }
  
  // ML Model related types
  export interface PredictionFactor {
    name: string;
    importance: number;
  }
  
  export interface ModelVersion {
    version: string;
    active: boolean;
    date: string;
  }
  
  export interface PerformanceMetrics {
    accuracy: string;
    precision: string;
    recall: string;
    f1Score: string;
  }
  
  export interface ModelInsightsData {
    performanceMetrics: PerformanceMetrics;
    predictionFactors: PredictionFactor[];
    models: ModelVersion[];
  }
  
  // Dashboard related types
  export interface StatChange {
    value: string | number;
    period: string;
    direction: 'up' | 'down';
  }
  
  export interface DashboardStats {
    pendingAssessments: number;
    pendingChange: StatChange;
    activeMonitoring: number;
    monitoringChange: StatChange;
    successRate: string;
    successChange: StatChange;
  }
  
  // Notification related types
  export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }
  