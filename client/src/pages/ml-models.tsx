import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function MLModels() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: 'Page Under Construction',
      description: 'The ML Models page is currently being developed.',
    });
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-serif text-xl font-medium text-neutral-800 mb-4">ML Models Management</h2>
      <p className="text-neutral-600">This page will contain ML model management and explainability tools.</p>
      
      <div className="mt-6 p-8 border border-dashed border-neutral-300 rounded-md flex flex-col items-center justify-center">
        <span className="material-icons text-neutral-400 text-4xl mb-2">science</span>
        <p className="text-neutral-500 text-center mb-2">ML model management interface is currently under development.</p>
        <p className="text-neutral-400 text-sm text-center">
          This feature will provide detailed model metrics, allow model retraining, and provide advanced SHAP/LIME explanations.
        </p>
      </div>
    </div>
  );
}
