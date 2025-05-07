import { DashboardStats } from '@/components/dashboard-stats';
import { PendingTransplantList } from '@/components/pending-transplants';
import { ModelInsights } from '@/components/model-insights';
import { PatientMonitoring } from '@/components/patient-monitoring';

export default function Dashboard() {
  return (
    <>
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PendingTransplantList />
        <ModelInsights />
      </div>
      
      <PatientMonitoring />
    </>
  );
}
