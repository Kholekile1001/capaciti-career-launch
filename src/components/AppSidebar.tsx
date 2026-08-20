import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Search,
  MessagesSquare,
  GraduationCap,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cv-builder", label: "CV Builder", icon: FileText },
  { to: "/job-search", label: "Job Search", icon: Search },
  { to: "/interview-prep", label: "Interview Prep", icon: MessagesSquare },
  { to: "/skills-assessment", label: "Skills Assessment", icon: GraduationCap },
] as const;

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Main navigation">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className:
              "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--gold)]",
          }}
        >
          <Icon className="size-4.5 shrink-0" />
          {label}
        </Link>
      ))}
      <div className="mt-4 rounded-xl bg-sidebar-accent/60 p-4">
        <p className="font-display text-sm font-semibold text-sidebar-accent-foreground">
          Youth Employment Hub
        </p>
        <p className="mt-1 text-xs text-sidebar-foreground/70">
          Free career tools for South African youth aged 18–35.
        </p>
      </div>
    </nav>
  );
}
