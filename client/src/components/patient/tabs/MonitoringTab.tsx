import { Patient } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Heart, 
  PillBottle,
  Activity
} from "lucide-react";

interface MonitoringTabProps {
  patient: Patient;
}

export default function MonitoringTab({ patient }: MonitoringTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Vital Signs Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Vital Signs Monitoring</CardTitle>
          <Tabs defaultValue="week">
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="day" className="text-xs">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
            <div className="w-full h-full p-4">
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <BarChart3 className="mr-2 h-10 w-10" />
                <span>Vital signs chart visualization would be displayed here</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary-500 mr-2"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Heart Rate</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Blood Pressure</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Temperature</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Respiratory Rate</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kidney Function Markers */}
      <Card>
        <CardHeader>
          <CardTitle>Kidney Function Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Creatinine Levels
              </span>
              <span className="text-sm font-medium text-destructive">
                1.8 mg/dL (Elevated)
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-destructive bg-red-100 dark:bg-red-900">
                    Needs Improvement
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-500 dark:text-gray-400">
                    Target: &lt; 1.2 mg/dL
                  </span>
                </div>
              </div>
              <Progress value={65} indicatorClassName="bg-destructive" className="h-2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Blood Urea Nitrogen (BUN)
              </span>
              <span className="text-sm font-medium text-destructive">
                28 mg/dL (Elevated)
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-destructive bg-red-100 dark:bg-red-900">
                    Needs Improvement
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-500 dark:text-gray-400">
                    Target: 7-20 mg/dL
                  </span>
                </div>
              </div>
              <Progress value={70} indicatorClassName="bg-destructive" className="h-2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Glomerular Filtration Rate (GFR)
              </span>
              <span className="text-sm font-medium text-destructive">
                38 mL/min (Reduced)
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-destructive bg-red-100 dark:bg-red-900">
                    Stage 3B CKD
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-500 dark:text-gray-400">
                    Target: &gt; 60 mL/min
                  </span>
                </div>
              </div>
              <Progress value={40} indicatorClassName="bg-destructive" className="h-2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Urine Protein
              </span>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                30 mg/dL (Moderate)
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900">
                    Monitoring
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-500 dark:text-gray-400">
                    Target: &lt; 20 mg/dL
                  </span>
                </div>
              </div>
              <Progress value={55} indicatorClassName="bg-amber-500" className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Adherence */}
      <Card>
        <CardHeader>
          <CardTitle>Current Treatments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <PillBottle className="h-5 w-5" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Tacrolimus (Anti-rejection)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2mg twice daily
                </p>
              </div>
              <div className="ml-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                  Post-op
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <PillBottle className="h-5 w-5" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Mycophenolate Mofetil
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1000mg twice daily
                </p>
              </div>
              <div className="ml-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                  Post-op
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <PillBottle className="h-5 w-5" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Prednisone
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  20mg daily, tapering
                </p>
              </div>
              <div className="ml-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                  Post-op
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <Activity className="h-5 w-5" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Hemodialysis
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3 sessions weekly (4 hours each)
                </p>
              </div>
              <div className="ml-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
                  Current
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
