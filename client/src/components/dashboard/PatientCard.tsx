import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { Patient } from "@shared/schema";

interface PatientCardProps {
  patient: Patient;
  type: "pending" | "post-transplant";
}

export default function PatientCard({ patient, type }: PatientCardProps) {
  const getStatusBadge = () => {
    if (type === "pending") {
      if ((patient.compatibilityScore ?? 0) < 60) {
        return (
          <Badge variant="destructive" className="text-xs">
            High Risk
          </Badge>
        );
      } else if ((patient.compatibilityScore ?? 0) < 80) {
        return (
          <Badge variant="secondary" className="text-xs">
            Pending
          </Badge>
        );
      } else {
        return (
          <Badge variant="default" className="text-xs">
            Pending
          </Badge>
        );
      }
    } else {
      if ((patient.rejectionRisk ?? 0) > 60) {
        return (
          <Badge variant="destructive" className="text-xs">
            Critical
          </Badge>
        );
      } else if ((patient.rejectionRisk ?? 0) > 30) {
        return (
          <Badge variant="secondary" className="text-xs">
            Monitoring
          </Badge>
        );
      } else {
        return (
          <Badge variant="default" className="text-xs">
            Stable
          </Badge>
        );
      }
    }
  };

  const getScoreIcon = () => {
    if (type === "pending") {
      if ((patient.compatibilityScore ?? 0) >= 80) {
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      } else if ((patient.compatibilityScore ?? 0) >= 60) {
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      } else {
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      }
    } else {
      if ((patient.rejectionRisk ?? 0) <= 20) {
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      } else if ((patient.rejectionRisk ?? 0) <= 50) {
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      } else {
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      }
    }
  };

  const getScoreColor = () => {
    if (type === "pending") {
      if ((patient.compatibilityScore ?? 0) >= 80) {
        return "bg-emerald-500";
      } else if ((patient.compatibilityScore ?? 0) >= 60) {
        return "bg-amber-500";
      } else {
        return "bg-red-500";
      }
    } else {
      if ((patient.rejectionRisk ?? 0) <= 20) {
        return "bg-emerald-500";
      } else if ((patient.rejectionRisk ?? 0) <= 50) {
        return "bg-amber-500";
      } else {
        return "bg-red-500";
      }
    }
  };

  const getScoreText = () => {
    if (type === "pending") {
      return (
        <span className={`text-sm font-semibold ${(patient.compatibilityScore ?? 0) >= 80 ? "text-emerald-600" : (patient.compatibilityScore ?? 0) >= 60 ? "text-amber-600" : "text-red-600"}`}>
          {patient.compatibilityScore}%
        </span>
      );
    } else {
      const severity = (patient.rejectionRisk ?? 0) <= 20 ? "Low" : (patient.rejectionRisk ?? 0) <= 50 ? "Medium" : "High";
      return (
        <span className={`text-sm font-semibold ${(patient.rejectionRisk ?? 0) <= 20 ? "text-emerald-600" : (patient.rejectionRisk ?? 0) <= 50 ? "text-amber-600" : "text-red-600"}`}>
          {severity} {patient.rejectionRisk}%
        </span>
      );
    }
  };

  return (
    <Link href={`/patients/${patient.id}`}>
      <a className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {patient.name}
            </h3>
            {getStatusBadge()}
          </div>
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Patient ID:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-gray-200">{patient.patientId}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Age:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-gray-200">{patient.age}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Blood Type:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-gray-200">{patient.bloodType}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Organ:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-gray-200">{patient.organType}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {type === "pending" ? "Compatibility Score" : "Rejection Risk"}
              </h4>
              <div className="ml-auto flex items-center">
                {getScoreText()}
                <span className="ml-1">{getScoreIcon()}</span>
              </div>
            </div>
            <Progress 
              value={type === "pending" ? patient.compatibilityScore : patient.rejectionRisk}
              className={`mt-1 ${type === "post-transplant" ? "bg-opacity-20" : ""} ${getScoreColor()}`}
            />
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="text-gray-500 dark:text-gray-400">
              <CalendarIcon className="inline h-4 w-4 mr-1" />
              {type === "pending" ? "Scheduled: " : "Transplanted: "}
              <span className="font-medium">{type === "pending" ? patient.scheduledDate : patient.transplantDate}</span>
            </div>
            <span className="text-primary-600 hover:text-primary-800 font-medium">
              View Details
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
