import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  CalendarCheck,
  GraduationCap,
  UserCheck,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CAPACITI WorkSmart AI" },
      {
        name: "description",
        content:
          "Track jobs applied, interviews, skills progress and your profile score in one career dashboard.",
      },
      { property: "og:title", content: "Dashboard — CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Your career progress at a glance for South African youth.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    label: "Jobs Applied",
    value: "24",
    delta: "+6 this week",
    icon: Briefcase,
  },
  {
    label: "Interviews",
    value: "5",
    delta: "2 upcoming",
    icon: CalendarCheck,
  },
  {
    label: "Skills",
    value: "12",
    delta: "3 verified",
    icon: GraduationCap,
  },
  {
    label: "Profile Score",
    value: "78%",
    delta: "Strong profile",
    icon: UserCheck,
  },
];

const activity = [
  { title: "Applied: Junior Data Analyst", org: "Nedbank · Sandton", when: "Today" },
  { title: "Interview scheduled", org: "Capaciti Partner · Cape Town", when: "Tomorrow 10:00" },
  { title: "Completed: Excel Essentials", org: "Skills Assessment", when: "2 days ago" },
  { title: "CV updated", org: "CV Builder", when: "3 days ago" },
];

const tasks = [
  { label: "Complete your profile", pct: 78 },
  { label: "Skills assessment progress", pct: 60 },
  { label: "Interview readiness", pct: 45 },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="navy-gradient overflow-hidden rounded-2xl px-6 py-8 lg:px-10 lg:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Welcome back
        </p>
        <h1 className="mt-2 max-w-2xl text-2xl font-bold text-navy-foreground lg:text-3xl">
          Thandi, you're 3 steps away from a stronger profile.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-navy-foreground/70">
          Build a professional CV, find verified opportunities and prepare for interviews — all in
          one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/cv-builder"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            Build my CV <ArrowUpRight className="size-4" />
          </Link>
          <Link
            to="/job-search"
            className="inline-flex items-center gap-2 rounded-lg border border-navy-foreground/25 px-4 py-2.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
          >
            Browse jobs
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="surface-panel p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">{value}</p>
              </div>
              <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <TrendingUp className="size-3.5" /> {delta}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="surface-panel p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
          <ul className="mt-4 divide-y divide-border">
            {activity.map((a) => (
              <li key={a.title} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.org}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel p-6">
          <h2 className="text-lg font-semibold text-foreground">Your progress</h2>
          <div className="mt-5 space-y-5">
            {tasks.map((t) => (
              <div key={t.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{t.label}</span>
                  <span className="text-muted-foreground">{t.pct}%</span>
                </div>
                <Progress value={t.pct} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
