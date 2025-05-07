import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default:
          "bg-primary-100 text-primary-800 ring-primary-200",
        secondary:
          "bg-secondary-100 text-secondary-800 ring-secondary-200",
        destructive:
          "bg-alert-100 text-alert-800 ring-alert-200",
        outline:
          "text-foreground bg-transparent ring-border",
        success:
          "bg-green-100 text-green-800 ring-green-200",
        warning:
          "bg-yellow-100 text-yellow-800 ring-yellow-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
