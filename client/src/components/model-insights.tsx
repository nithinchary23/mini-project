import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function ModelInsights() {
  const { toast } = useToast();
  
  const { data: modelData, isLoading, error } = useQuery({
    queryKey: ['/api/ml/insights'],
  });
  
  const handleExplainabilityView = () => {
    // In a real app, this would navigate to a detailed SHAP/LIME visualization
    toast({
      title: 'Full Analysis',
      description: 'Opening detailed SHAP/LIME visualization...',
    });
  };
  
  const handleModelManagement = () => {
    // In a real app, this would open the model management screen
    toast({
      title: 'Model Management',
      description: 'Opening model management screen...',
    });
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-neutral-200 px-6 py-4">
          <Skeleton className="h-7 w-36" />
        </div>
        <div className="p-6">
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-10">
          <p className="text-alert-600 mb-2">Failed to load model insights</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  const performanceMetrics = modelData?.performanceMetrics || {
    accuracy: '0%',
    precision: '0%',
    recall: '0%',
    f1Score: '0%'
  };
  
  const predictionFactors = modelData?.predictionFactors || [];
  
  const models = modelData?.models || [];
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-neutral-200 px-6 py-4">
        <h3 className="font-serif font-medium text-lg text-neutral-800">ML Model Insights</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-neutral-700">Model Performance</h4>
            <div className="tooltip">
              <span className="material-icons text-neutral-400 text-sm cursor-help">help_outline</span>
              <div className="tooltip-text bg-neutral-800 text-white text-xs p-2 rounded">
                Overall performance metrics for the active prediction model
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Accuracy</p>
              <p className="text-xl font-bold text-primary-900">{performanceMetrics.accuracy}</p>
            </div>
            <div className="bg-neutral-50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Precision</p>
              <p className="text-xl font-bold text-primary-900">{performanceMetrics.precision}</p>
            </div>
            <div className="bg-neutral-50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Recall</p>
              <p className="text-xl font-bold text-primary-900">{performanceMetrics.recall}</p>
            </div>
            <div className="bg-neutral-50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">F1 Score</p>
              <p className="text-xl font-bold text-primary-900">{performanceMetrics.f1Score}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-neutral-700">Key Prediction Factors</h4>
            <span 
              className="text-xs text-primary-700 font-medium cursor-pointer"
              onClick={handleExplainabilityView}
            >
              Full Analysis
            </span>
          </div>
          <div className="space-y-3">
            {predictionFactors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-700">{factor.name}</span>
                  <span className="text-xs font-medium text-neutral-800">{factor.importance}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full" 
                    style={{ width: `${factor.importance}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            {predictionFactors.length === 0 && (
              <div className="py-4 text-center text-neutral-500 text-sm">
                No prediction factors available
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-neutral-700">Model Versions</h4>
            <button 
              className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded font-medium"
              onClick={handleModelManagement}
            >
              Manage
            </button>
          </div>
          
          {models.map((model, index) => (
            <div key={index} className="bg-neutral-50 rounded p-3 mb-3 last:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${model.active ? 'bg-green-500' : 'bg-neutral-300'} mr-2`}></span>
                    <p className="text-sm font-medium text-neutral-800">
                      {model.version} {model.active ? '(Active)' : '(Testing)'}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {model.active ? 'Deployed: ' : 'Updated: '}{model.date}
                  </p>
                </div>
                <button className="text-primary-700 hover:text-primary-900">
                  <span className="material-icons text-sm">more_vert</span>
                </button>
              </div>
            </div>
          ))}
          
          {models.length === 0 && (
            <div className="py-4 text-center text-neutral-500 text-sm">
              No model versions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
