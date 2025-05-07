import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: 'Page Under Construction',
      description: 'The Settings page is currently being developed.',
    });
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-serif text-xl font-medium text-neutral-800 mb-4">System Settings</h2>
      <p className="text-neutral-600">This page will contain system configuration and user preference settings.</p>
      
      <div className="mt-6 p-8 border border-dashed border-neutral-300 rounded-md flex flex-col items-center justify-center">
        <span className="material-icons text-neutral-400 text-4xl mb-2">settings</span>
        <p className="text-neutral-500 text-center mb-2">Settings interface is currently under development.</p>
        <p className="text-neutral-400 text-sm text-center">
          This feature will allow you to configure notifications, user profiles, and system preferences.
        </p>
      </div>
    </div>
  );
}
