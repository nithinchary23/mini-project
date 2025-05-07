import { useState, ReactNode } from "react";

export function Tab({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return <div id={id} aria-label={label}>{children}</div>;
}

interface PatientTabsProps {
  children: ReactNode;
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export default function PatientTabs({ children }: PatientTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs: TabItem[] = Array.isArray(children) ? children : [children];

  return (
    <div>
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 hover:text-primary-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-primary-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {tabs.map((tab) => (
        <div key={tab.id} className={activeTab === tab.id ? "" : "hidden"}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
