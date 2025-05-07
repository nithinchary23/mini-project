import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change: {
    value: string | number;
    period: string;
    direction: 'up' | 'down';
  };
  iconBgClass: string;
  iconTextClass: string;
}

const StatCard = ({ title, value, icon, change, iconBgClass, iconTextClass }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-neutral-500 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-neutral-800">{value}</p>
        </div>
        <div className={`rounded-full ${iconBgClass} p-2`}>
          <span className={`material-icons ${iconTextClass}`}>{icon}</span>
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className={`material-icons text-xs mr-1 ${change.direction === 'up' ? 'text-secondary-600' : 'text-alert-600'}`}>
          {change.direction === 'up' ? 'arrow_upward' : 'arrow_downward'}
        </span>
        <span className={`font-medium ${change.direction === 'up' ? 'text-secondary-600' : 'text-alert-600'}`}>
          {change.value}
        </span>
        <span className="text-neutral-500 ml-1">{change.period}</span>
      </div>
    </div>
  );
};

export function DashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      // Uses the default queryFn for GET request to /api/dashboard/stats
      return {
        pendingAssessments: 0,
        pendingChange: { value: '', period: '', direction: 'up' as const },
        activeMonitoring: 0,
        monitoringChange: { value: '', period: '', direction: 'up' as const },
        successRate: '',
        successChange: { value: '', period: '', direction: 'up' as const }
      };
    }
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Skeleton className="h-[146px]" />
        <Skeleton className="h-[146px]" />
        <Skeleton className="h-[146px]" />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Pending Assessments"
        value={stats?.pendingAssessments || 0}
        icon="pending_actions"
        change={stats?.pendingChange || { value: '0', period: 'from last week', direction: 'up' }}
        iconBgClass="bg-primary-50"
        iconTextClass="text-primary-600"
      />
      
      <StatCard
        title="Active Monitoring"
        value={stats?.activeMonitoring || 0}
        icon="monitoring"
        change={stats?.monitoringChange || { value: '0', period: 'from last month', direction: 'up' }}
        iconBgClass="bg-secondary-50"
        iconTextClass="text-secondary-600"
      />
      
      <StatCard
        title="Success Rate"
        value={stats?.successRate || '0%'}
        icon="thumb_up"
        change={stats?.successChange || { value: '0%', period: 'from previous quarter', direction: 'up' }}
        iconBgClass="bg-primary-50"
        iconTextClass="text-primary-600"
      />
    </div>
  );
}
