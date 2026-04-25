import * as React from "react";

import { cn } from "@/lib/utils";

type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div
      data-slot="calendar"
      className={cn("rounded-md border border-border bg-card p-4 text-sm text-muted-foreground", className)}
      {...props}
    >
      Calendário indisponível nesta versão.
    </div>
  );
}

const CalendarDayButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => {
    return <button ref={ref} type={type} className={cn(className)} {...props} />;
  },
);

CalendarDayButton.displayName = "CalendarDayButton";

export { Calendar, CalendarDayButton };
