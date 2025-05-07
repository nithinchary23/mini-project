import { Patient } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CompatibilityTabProps {
  patient: Patient;
}

export default function CompatibilityTab({ patient }: CompatibilityTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Compatibility Score */}
      <Card>
        <CardHeader>
          <CardTitle>Compatibility Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-emerald-500"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * patient.compatibilityScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {patient.compatibilityScore}%
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Match
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Calculated Risk Level
              </span>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Low
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              The compatibility algorithm predicts a low risk of rejection based on
              tissue typing, immunological markers, and historical data analysis.
            </p>
          </div>

          <div className="mt-6 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ML Prediction Accuracy
            </h4>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Confidence
                  </span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    92%
                  </span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility Factors */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Compatibility Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Blood Type Match
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  Perfect Match
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                Recipient: {patient.bloodType}
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                Donor: {patient.bloodType}
              </span>
            </div>
            <Progress value={100} className="h-2 mt-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                HLA Matching
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  Good (5/6 antigens)
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <Progress value={83} className="h-2 mt-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Cross-Matching
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  Negative (Compatible)
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <Progress value={100} className="h-2 mt-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Antibody Screening
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 mr-1">
                  Some Reactivity
                </span>
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <Progress value={65} indicatorClassName="bg-amber-500" className="h-2 mt-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Organ Size Compatibility
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  Excellent
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <Progress value={95} className="h-2 mt-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Age Compatibility
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                  Good
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                Recipient: {patient.age}
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                Donor: 42
              </span>
            </div>
            <Progress value={85} className="h-2 mt-1" />
          </div>

          {/* Explainability Section */}
          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg border border-primary-100 dark:border-primary-800">
            <h4 className="text-sm font-medium text-primary-800 dark:text-primary-300 mb-2">
              ML Model Explanation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The compatibility prediction is based on SHAP analysis of key factors.
              Dominant positive factors include perfect blood type match, negative
              cross-match, and good HLA compatibility. The minor antibody reactivity
              decreases overall compatibility by approximately 12%.
            </p>
            <Button variant="link" className="mt-3 p-0">
              View Detailed Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
