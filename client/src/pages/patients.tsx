import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Patients() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: 'Page Under Construction',
      description: 'The Patients page is currently being developed.',
    });
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-serif text-xl font-medium text-neutral-800 mb-4">Patients</h2>
      <p className="text-neutral-600">This page will contain a comprehensive patient management interface.</p>
      
      <div className="mt-6 p-8 border border-dashed border-neutral-300 rounded-md flex flex-col items-center justify-center">
        <span className="material-icons text-neutral-400 text-4xl mb-2">people</span>
        <p className="text-neutral-500 text-center mb-2">Patient management interface is currently under development.</p>
        <p className="text-neutral-400 text-sm text-center">
          This feature will allow you to manage patient records, view histories, and track outcomes.
        </p>
      </div>
    </div>
  );
}
