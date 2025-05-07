import { Patient } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  AlertTriangle, 
  FileText, 
  User, 
  Stethoscope, 
  Search
} from "lucide-react";

interface MedicalHistoryTabProps {
  patient: Patient;
}

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function MedicalHistoryTab({ patient }: MedicalHistoryTabProps) {
  const timelineItems: TimelineItem[] = [
    {
      date: "Feb 12, 2023",
      title: "Kidney failure diagnosis",
      description: "End-Stage Renal Disease - Creatinine 5.2 mg/dL, BUN 82 mg/dL, GFR 12 mL/min",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      iconBg: "bg-red-100 dark:bg-red-900",
    },
    {
      date: "Mar 1, 2023",
      title: "Started Hemodialysis treatment",
      description: "3 times weekly, 4-hour sessions",
      icon: <FileText className="h-5 w-5 text-primary-600" />,
      iconBg: "bg-primary-100 dark:bg-primary-900",
    },
    {
      date: "Apr 15, 2023",
      title: "Initial Transplant Evaluation",
      description: "Determined eligible for kidney transplant waiting list",
      icon: <User className="h-5 w-5 text-primary-600" />,
      iconBg: "bg-primary-100 dark:bg-primary-900",
    },
    {
      date: "Jun 2, 2023",
      title: "Hospitalization for Peritonitis",
      description: "Successfully treated with antibiotics",
      icon: <Stethoscope className="h-5 w-5 text-amber-600" />,
      iconBg: "bg-amber-100 dark:bg-amber-900",
    },
    {
      date: "Aug 20, 2023",
      title: "Compatible donor identified",
      description: `Xenograft kidney match found with ${patient.compatibilityScore}% compatibility`,
      icon: <Search className="h-5 w-5 text-emerald-600" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      date: "Aug 30, 2023",
      title: "Transplant surgery scheduled",
      description: "Final pre-op testing and preparation in progress",
      icon: <Calendar className="h-5 w-5 text-primary-600" />,
      iconBg: "bg-primary-100 dark:bg-primary-900",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Medical History</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Patient history and relevant transplant information
        </p>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-mb-8">
            {timelineItems.map((item, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index < timelineItems.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    ></span>
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full ${item.iconBg} flex items-center justify-center ring-8 ring-white dark:ring-gray-800`}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{item.title}</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <time dateTime={item.date}>{item.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
