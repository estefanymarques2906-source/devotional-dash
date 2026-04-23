import { Link } from "@tanstack/react-router";
import { Sun, Moon } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";

interface Props {
  title?: string;
  subtitle?: string;
  back?: string;
  right?: React.ReactNode;
}

export function TopBar({ title, subtitle, back, right }: Props) {
  const { state, toggleTheme } = useAppState();
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        {back && (
          <Link
            to={back}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
            aria-label="Voltar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
        )}
        <div className="min-w-0 flex-1">
          {title && <h1 className="truncate font-display text-lg font-semibold">{title}</h1>}
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
          aria-label="Alternar tema"
        >
          {state.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
