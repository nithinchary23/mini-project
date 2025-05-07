import { useState } from 'react';
import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';

export function Topbar() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get the page title based on the current path
  const getPageTitle = () => {
    switch (location) {
      case '/':
        return 'Dashboard';
      case '/patients':
        return 'Patients';
      case '/monitoring':
        return 'Monitoring';
      case '/ml-models':
        return 'ML Models';
      case '/reports':
        return 'Reports';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  
  // Fetch notifications
  const { data: notifications } = useQuery({
    queryKey: ['/api/notifications'],
    queryFn: async () => {
      // Will use the default queryFn from queryClient.ts
      // which uses GET request to /api/notifications
      return { count: 0, items: [] };
    }
  });
  
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };
  
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-5">
      <div className="flex items-center">
        <button id="sidebar-toggle" className="mr-4 md:hidden" onClick={toggleSidebar}>
          <span className="material-icons">menu</span>
        </button>
        <h2 className="font-serif text-lg font-medium text-neutral-800">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="py-2 pl-9 pr-4 bg-neutral-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="material-icons absolute left-2 top-2 text-neutral-500 text-sm">search</span>
        </div>
        
        <div className="relative">
          <button className="relative rounded-full flex items-center justify-center h-8 w-8 hover:bg-neutral-100">
            <span className="material-icons text-neutral-600">notifications</span>
            {notifications && notifications.count > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0">
                {notifications.count}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
