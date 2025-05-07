import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@shared/schema";
import {
  BarChart3,
  Brain,
  Heart,
  LogOut,
  FileText,
  Settings,
  Users,
  X,
  Dna,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function Sidebar({ open, setOpen, user }: SidebarProps) {
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3, current: true },
    { name: "Patients", href: "/patients", icon: Users, current: false },
    { name: "Transplants", href: "/transplants", icon: Heart, current: false },
    { name: "Reports", href: "/reports", icon: FileText, current: false },
    { name: "ML Models", href: "/ml-models", icon: Brain, current: false },
    { name: "Settings", href: "/settings", icon: Settings, current: false },
  ];

  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 z-40 flex md:static md:translate-x-0 md:z-30`}
    >
      {/* Overlay */}
      <div
        className={`${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity md:hidden`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl">
        <div className="absolute top-0 right-0 -mr-12 pt-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex-1 h-0 pt-5 pb-4 flex flex-col overflow-y-auto">
          <div className="px-4 flex-shrink-0 flex items-center">
            <Dna className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              XenoTransplant
            </h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-300"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current
                        ? "text-primary-500 dark:text-primary-300"
                        : "text-gray-400 group-hover:text-primary-500 dark:text-gray-400 dark:group-hover:text-primary-300"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>

        {user && (
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <Avatar className="inline-block h-9 w-9 rounded-full">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.username}
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Doctor
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="ml-auto"
                >
                  <LogOut className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
