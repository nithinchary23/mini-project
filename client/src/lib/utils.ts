import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to display in a readable format
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime())
      ? new Intl.DateTimeFormat('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }).format(dateObj)
      : '';
  } catch {
    return '';
  }
}

// Calculate compatibility color based on score
export function getCompatibilityColor(score: number): string {
  if (score >= 90) return 'bg-green-600';
  if (score >= 80) return 'bg-primary-600';
  if (score >= 70) return 'bg-secondary-600';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-alert-500';
}

// Get status badge color based on status
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    'Pending Review': 'bg-yellow-100 text-yellow-800',
    'Ready for Surgery': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Stable': 'bg-green-100 text-green-800',
    'Mild Response': 'bg-yellow-100 text-yellow-800',
    'Elevated Response': 'bg-alert-100 text-alert-800',
    'Excellent': 'bg-green-100 text-green-800',
    'Good': 'bg-yellow-100 text-yellow-800',
    'Concerning': 'bg-alert-100 text-alert-800'
  };
  
  return statusMap[status] || 'bg-gray-100 text-gray-800';
}

// Get icon name based on organ type
export function getOrganIcon(type: string): string {
  const iconMap: Record<string, string> = {
    'Heart': 'favorite',
    'Kidney': 'monitor_heart',
    'Liver': 'monitor_heart',
    'Lung': 'monitor_heart'
  };
  
  return iconMap[type] || 'favorite_border';
}

// Format percentage for display
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Create patient initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}
