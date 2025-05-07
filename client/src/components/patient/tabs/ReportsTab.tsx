import { Patient } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Upload,
  FileText,
  FileCheck,
  FileX,
  ListFilter,
} from "lucide-react";

interface ReportsTabProps {
  patient: Patient;
}

interface Document {
  name: string;
  type: string;
  date: string;
  author: string;
  status: "Completed" | "Pending Signature" | "In Progress";
  icon: React.ReactNode;
}

export default function ReportsTab({ patient }: ReportsTabProps) {
  const documents: Document[] = [
    {
      name: "Initial Transplant Evaluation",
      type: "Clinical Assessment",
      date: "April 15, 2023",
      author: "Dr. Michael Wong",
      status: "Completed",
      icon: <FileText className="h-5 w-5 text-primary-500" />,
    },
    {
      name: "Complete Blood Work Panel",
      type: "Laboratory Results",
      date: "August 30, 2023",
      author: "City Hospital Lab",
      status: "Completed",
      icon: <FileText className="h-5 w-5 text-primary-500" />,
    },
    {
      name: "Abdominal CT Scan",
      type: "Imaging",
      date: "August 25, 2023",
      author: "Dr. Amanda Patel",
      status: "Completed",
      icon: <FileText className="h-5 w-5 text-primary-500" />,
    },
    {
      name: "Transplant Consent Forms",
      type: "Legal Documentation",
      date: "September 05, 2023",
      author: "Transplant Coordinator",
      status: "Pending Signature",
      icon: <FileText className="h-5 w-5 text-amber-500" />,
    },
    {
      name: "Cardiac Clearance",
      type: "Specialist Evaluation",
      date: "August 18, 2023",
      author: "Dr. James Wilson",
      status: "Completed",
      icon: <FileText className="h-5 w-5 text-primary-500" />,
    },
    {
      name: "Pre-op Checklist",
      type: "Procedure Preparation",
      date: "September 08, 2023",
      author: "Nurse Martinez",
      status: "Completed",
      icon: <FileCheck className="h-5 w-5 text-emerald-500" />,
    },
  ];

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
            Completed
          </span>
        );
      case "Pending Signature":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
            Pending Signature
          </span>
        );
      case "In Progress":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Documents & Reports</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Medical records and transplant documentation
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search documents..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-muted">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Document
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="relative px-6 py-3"
                >
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        {doc.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{doc.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{doc.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {doc.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" className="mr-3 px-0 py-0 h-auto">View</Button>
                    <Button variant="link" className="text-gray-600 dark:text-gray-400 px-0 py-0 h-auto">Download</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
