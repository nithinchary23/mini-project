import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/ui/Layout";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientTabs, { Tab } from "@/components/patient/PatientTabs";
import OverviewTab from "@/components/patient/tabs/OverviewTab";
import CompatibilityTab from "@/components/patient/tabs/CompatibilityTab";
import MedicalHistoryTab from "@/components/patient/tabs/MedicalHistoryTab";
import MonitoringTab from "@/components/patient/tabs/MonitoringTab";
import ReportsTab from "@/components/patient/tabs/ReportsTab";
import { Patient } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();

  const { data: patient, isLoading, isError } = useQuery<Patient>({
    queryKey: [`/api/patients/${id}`],
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="mb-5">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>
        </div>
        <Skeleton className="h-48 w-full mb-6" />
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-[400px] w-full" />
      </Layout>
    );
  }

  if (isError || !patient) {
    return (
      <Layout>
        <div className="mb-5">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>
        </div>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Error loading patient data
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            There was a problem loading this patient's information.
          </p>
          <Button className="mt-4" onClick={() => setLocation("/")}>
            Return to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { name: "Dashboard", href: "/", current: false },
    { name: "Patients", href: "/", current: false },
    { name: patient.name, href: `/patients/${id}`, current: true },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs} showSearch={false}>
      <div className="mb-5">
        <Button variant="ghost" onClick={() => setLocation("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
      </div>

      <PatientHeader patient={patient} />

      <PatientTabs>
        <Tab id="overview" label="Overview">
          <OverviewTab patient={patient} />
        </Tab>
        <Tab id="compatibility" label="Compatibility Analysis">
          <CompatibilityTab patient={patient} />
        </Tab>
        <Tab id="medical-history" label="Medical History">
          <MedicalHistoryTab patient={patient} />
        </Tab>
        <Tab id="monitoring" label="Monitoring">
          <MonitoringTab patient={patient} />
        </Tab>
        <Tab id="reports" label="Reports & Documents">
          <ReportsTab patient={patient} />
        </Tab>
      </PatientTabs>
    </Layout>
  );
}
