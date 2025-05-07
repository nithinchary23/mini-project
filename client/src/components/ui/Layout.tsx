import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/ui/AppSidebar";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showSearch?: boolean;
  breadcrumbs?: {
    name: string;
    href: string;
    current?: boolean;
  }[];
}

export default function Layout({
  children,
  title,
  showSearch = true,
  breadcrumbs = [],
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={user} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Top Navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              {/* Breadcrumb */}
              {breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumb" className="hidden md:flex">
                  <ol className="flex items-center space-x-2">
                    {breadcrumbs.map((breadcrumb, i) => (
                      <li key={breadcrumb.name}>
                        <div className="flex items-center">
                          {i > 0 && (
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                          )}
                          <a
                            href={breadcrumb.href}
                            className={`ml-2 text-sm font-medium ${
                              breadcrumb.current
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                          >
                            {breadcrumb.name}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              {/* Search */}
              {showSearch && (
                <div className="relative mr-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    className="w-full md:w-64 pl-10 pr-3 py-2"
                  />
                </div>
              )}

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="ml-3 relative text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
              </Button>

              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="ml-3 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">Toggle dark mode</span>
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {title && (
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {title}
              </h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
