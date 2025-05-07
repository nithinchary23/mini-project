import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/auth-context';

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      
      if (
        sidebar &&
        isOpen &&
        sidebar === sidebar && // Ensure it's the right sidebar
        !sidebar.contains(event.target as Node) &&
        sidebarToggle &&
        !sidebarToggle.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);
  
  // Toggle sidebar state for mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <aside 
      id="sidebar" 
      className={`sidebar w-64 bg-white border-r border-neutral-200 h-screen fixed z-10 shadow-sm ${isOpen ? 'open' : ''}`}
    >
      <div className="flex justify-center items-center h-16 border-b border-neutral-200">
        <h1 className="font-serif font-bold text-lg text-primary-900">Xenotransplant MS</h1>
      </div>
      
      <div className="p-4">
        {user && (
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="material-icons text-primary-700">person</span>
            </div>
            <div>
              <p className="font-medium text-neutral-800">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.title}</p>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          <Link href="/">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/' ? 'text-primary-900' : 'text-neutral-500'}`}>dashboard</span>
              Dashboard
            </a>
          </Link>
          <Link href="/patients">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/patients' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/patients' ? 'text-primary-900' : 'text-neutral-500'}`}>people</span>
              Patients
            </a>
          </Link>
          <Link href="/monitoring">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/monitoring' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/monitoring' ? 'text-primary-900' : 'text-neutral-500'}`}>monitor_heart</span>
              Monitoring
            </a>
          </Link>
          <Link href="/ml-models">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/ml-models' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/ml-models' ? 'text-primary-900' : 'text-neutral-500'}`}>science</span>
              ML Models
            </a>
          </Link>
          <Link href="/reports">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/reports' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/reports' ? 'text-primary-900' : 'text-neutral-500'}`}>assessment</span>
              Reports
            </a>
          </Link>
          <Link href="/settings">
            <a className={`sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-md ${location === '/settings' ? 'active text-primary-900' : 'text-neutral-600'}`}>
              <span className={`material-icons mr-3 ${location === '/settings' ? 'text-primary-900' : 'text-neutral-500'}`}>settings</span>
              Settings
            </a>
          </Link>
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full border-t border-neutral-200 p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center text-neutral-600 text-sm"
        >
          <span className="material-icons mr-3">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
