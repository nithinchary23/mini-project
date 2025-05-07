import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getCompatibilityColor, getStatusColor, getOrganIcon, getInitials } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { CompatibilityChart } from '@/components/compatibility-chart';
import { TransplantCase } from '@/types';

export function PendingTransplantList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('All Types');
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/transplants/pending?page=${currentPage}&type=${typeFilter !== 'All Types' ? typeFilter : ''}`],
    keepPreviousData: true
  });

  const handleViewPatient = async (patientId: string) => {
    try {
      // This would navigate to a patient detail view in a real app
      console.log(`View patient: ${patientId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not load patient details',
        variant: 'destructive',
      });
    }
  };

  const handleAssessPatient = async (patientId: string) => {
    try {
      // In a real app, this would open an assessment workflow
      console.log(`Assess patient: ${patientId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not start assessment workflow',
        variant: 'destructive',
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="lg:col-span-2 bg-white rounded-lg shadow">
        <div className="border-b border-neutral-200 px-6 py-4">
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="p-6">
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <div className="text-center py-10">
          <p className="text-alert-600 mb-2">Failed to load transplant cases</p>
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

  const transplantCases = data?.cases || [];
  const totalCases = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow">
      <div className="border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
        <h3 className="font-serif font-medium text-lg text-neutral-800">Pending Transplant Cases</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select 
              className="appearance-none bg-neutral-100 border-0 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>Heart</option>
              <option>Kidney</option>
              <option>Liver</option>
              <option>Lung</option>
            </select>
            <span className="material-icons absolute right-2 top-1.5 text-neutral-500 pointer-events-none text-sm">arrow_drop_down</span>
          </div>
          <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Organ Type</th>
              <th className="px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Compatibility</th>
              <th className="px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {transplantCases.map((patient: TransplantCase) => (
              <tr key={patient.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium">
                      {getInitials(patient.name)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-800">{patient.name}</p>
                      <p className="text-xs text-neutral-500">ID: {patient.patientId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center text-sm text-neutral-800">
                    <span className="material-icons text-primary-600 mr-1 text-sm">{getOrganIcon(patient.organType)}</span>
                    {patient.organType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-36">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-neutral-800">{patient.compatibilityScore}%</span>
                      <div className="tooltip">
                        <span className="material-icons text-primary-600 text-sm cursor-help">info</span>
                        <div className="tooltip-text bg-neutral-800 text-white text-xs p-2 rounded">
                          Based on genetic markers, immune profile, and organ health metrics
                        </div>
                      </div>
                    </div>
                    <CompatibilityChart score={patient.compatibilityScore} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm space-x-2 whitespace-nowrap">
                  <button 
                    className="text-primary-700 hover:text-primary-900 font-medium"
                    onClick={() => handleViewPatient(patient.id)}
                  >
                    View
                  </button>
                  <button 
                    className="text-primary-700 hover:text-primary-900 font-medium"
                    onClick={() => handleAssessPatient(patient.id)}
                  >
                    Assess
                  </button>
                </td>
              </tr>
            ))}
            {transplantCases.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                  No pending transplant cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 flex items-center justify-between border-t border-neutral-200">
        <div className="text-sm text-neutral-500">
          Showing {transplantCases.length} of {totalCases} cases
        </div>
        <div className="flex space-x-1">
          <button 
            className="px-3 py-1 rounded border border-neutral-300 text-neutral-500 text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page}
              className={`px-3 py-1 rounded border border-neutral-300 text-sm ${
                currentPage === page 
                  ? 'bg-primary-50 text-primary-700 font-medium' 
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="px-3 py-1 rounded border border-neutral-300 text-neutral-700 text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
