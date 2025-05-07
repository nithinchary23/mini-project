import { Patient } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  const getStatusBadge = () => {
    if (patient.status === "pending") {
      return (
        <Badge variant="warning" className="mr-4">
          Pending Transplant
        </Badge>
      );
    } else if (patient.status === "post-transplant") {
      if (patient.rejectionRisk > 60) {
        return (
          <Badge variant="destructive" className="mr-4">
            Critical
          </Badge>
        );
      } else if (patient.rejectionRisk > 30) {
        return (
          <Badge variant="warning" className="mr-4">
            Monitoring
          </Badge>
        );
      } else {
        return (
          <Badge variant="success" className="mr-4">
            Stable
          </Badge>
        );
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {patient.name}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Patient ID: {patient.patientId} | Transplant Type: {patient.organType}
          </p>
        </div>
        <div className="flex items-center">
          {getStatusBadge()}
          <Button>
            <EditIcon className="mr-2 h-4 w-4" />
            Edit Patient
          </Button>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.age} years
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Type</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.bloodType}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.weight} kg
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Registered</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.registrationDate}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Physician</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.primaryPhysician}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {patient.status === "pending" ? "Scheduled Transplant" : "Transplanted Date"}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.status === "pending" ? patient.scheduledDate : patient.transplantDate}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
