import React from "react";
import { useToast, ToasterToast } from "@/hooks/use-toast";

type ExtendedToasterToast = ToasterToast & {
  status?: 'error' | 'success' | 'warning' | 'info';
};
function ToasterDisplay() {
  const { toasts, dismiss } = useToast();
  return(
    <div className="fixed top-0 right-0 z-50 p-4 flex flex-col gap-2 w-full max-w-md">
      {toasts.map((toast) => {
        const extendedToast = toast as ExtendedToasterToast;
        return (
          <div
            key={extendedToast.id}
            className={`rounded-md shadow-md p-4 ${
              extendedToast.status === 'error' ? 'bg-red-100 text-red-800' :
              extendedToast.status === 'success' ? 'bg-green-100 text-green-800' :
              extendedToast.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            } flex justify-between`}
          >
            <div>
              {toast.title && <div className="font-semibold">{toast.title}</div>}
              {toast.description && <div>{toast.description}</div>}
            </div>
            <button 
              onClick={() => dismiss(toast.id)}
              className="ml-4 self-start"
            >
              ×
            </button>
          </div>
        );
      })}
          </div>
  );
} // Add the missing closing brace for the ToasterDisplay function

// Export with the name "Toaster" for backward compatibility with existing imports
export { ToasterDisplay as Toaster }