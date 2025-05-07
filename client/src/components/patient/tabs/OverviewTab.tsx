import { Patient } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CheckCircle, 
  Clipboard, 
  FlaskRound, 
  Heart, 
  HeartPulse, 
  Stethoscope, 
  Thermometer 
} from "lucide-react";

interface OverviewTabProps {
  patient: Patient;
}

export default function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Patient Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Transplant Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Compatibility Score
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {patient.compatibilityScore}%
              </span>
            </div>
            <Progress value={patient.compatibilityScore} className="h-2.5" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pre-op Preparation
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                92%
              </span>
            </div>
            <Progress value={92} className="h-2.5" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Documentation Completion
              </span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                78%
              </span>
            </div>
            <Progress value={78} indicatorClassName="bg-amber-500" className="h-2.5" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Readiness
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                85%
              </span>
            </div>
            <Progress value={85} className="h-2.5" />
          </div>

          {/* Pending Tasks */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Pending Tasks
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-amber-500">
                  <Calendar className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Complete final blood type cross-matching
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-amber-500">
                  <Clipboard className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Sign consent for immunosuppression protocol
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-emerald-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300 line-through">
                  Complete pre-anesthesia evaluation
                </p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs Card */}
      <Card>
        <CardHeader>
          <CardTitle>Baseline Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Heart Rate</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    78 <span className="text-sm text-gray-500 dark:text-gray-400">bpm</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Blood Pressure</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    128/85 <span className="text-sm text-gray-500 dark:text-gray-400">mmHg</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Respiratory Rate</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    16 <span className="text-sm text-gray-500 dark:text-gray-400">bpm</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <Thermometer className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Temperature</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    36.7 <span className="text-sm text-gray-500 dark:text-gray-400">°C</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kidney Function Stats */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Kidney Function Markers
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Creatinine</p>
                <p className="text-base font-medium">
                  1.8 mg/dL <span className="text-xs text-destructive">Elevated</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">BUN</p>
                <p className="text-base font-medium">
                  28 mg/dL <span className="text-xs text-destructive">Elevated</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">GFR</p>
                <p className="text-base font-medium">
                  38 mL/min <span className="text-xs text-destructive">Reduced</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Urine Protein</p>
                <p className="text-base font-medium">
                  30 mg/dL <span className="text-xs text-amber-500 dark:text-amber-400">Moderate</span>
                </p>
              </div>
            </div>
          </div>

          {/* Recent Lab Results Button */}
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <FlaskRound className="mr-2 h-4 w-4" />
              View Complete Lab Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center p-3 bg-primary-50 dark:bg-primary-900/50 rounded-lg border border-primary-100 dark:border-primary-800">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Pre-Transplant Assessment</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">September 10, 2023 - 10:30 AM</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-4">
              Details
            </Button>
          </div>

          <div className="flex items-center p-3 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg border border-emerald-100 dark:border-emerald-800">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Kidney Transplant Surgery</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">September 18, 2023 - 8:00 AM</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-4">
              Details
            </Button>
          </div>

          <div className="flex items-center p-3 bg-muted rounded-lg border border-border">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Post-Op Follow-up</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">September 25, 2023 - 2:00 PM</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-4">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Clinical Notes</CardTitle>
          <Button variant="ghost" size="sm">
            Add Note
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary-500 pl-4 py-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Patient has consistent blood work results and is responding well to dialysis treatment. Transplant candidate assessment shows high priority status.
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Added by Dr. Sarah Reynolds - Sep 5, 2023
              </span>
              <Button variant="ghost" size="sm" className="h-auto py-0">
                Edit
              </Button>
            </div>
          </div>

          <div className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Final compatibility assessment scheduled for next week. Need to confirm donor organ preservation protocol with transplant coordinator.
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Added by Dr. Michael Wong - Aug 28, 2023
              </span>
              <Button variant="ghost" size="sm" className="h-auto py-0">
                Edit
              </Button>
            </div>
          </div>

          <div className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Patient education session completed. Informed about post-op care and immunosuppression regimen. Patient verbalized understanding.
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Added by Nurse J. Martinez - Aug 15, 2023
              </span>
              <Button variant="ghost" size="sm" className="h-auto py-0">
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
