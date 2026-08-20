import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Award, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/skills-assessment")({
  head: () => ({
    meta: [
      { title: "Skills Assessment — CAPACITI WorkSmart AI" },
      {
        name: "description",
        content:
          "Rate your workplace and digital skills to see your strengths, gaps and recommended free courses.",
      },
      { property: "og:title", content: "Skills Assessment — CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Self-assess your skills and get a personalised learning path.",
      },
    ],
  }),
  component: SkillsAssessment,
});

const SKILLS = [
  { key: "digital", label: "Digital literacy", course: "Google Digital Skills for Africa" },
  { key: "excel", label: "Excel & spreadsheets", course: "Microsoft Excel Essentials" },
  { key: "comms", label: "Communication", course: "Business Writing Basics" },
  { key: "problem", label: "Problem solving", course: "Critical Thinking 101" },
  { key: "teamwork", label: "Teamwork", course: "Collaboration in the Workplace" },
  { key: "coding", label: "Coding fundamentals", course: "freeCodeCamp: JavaScript Basics" },
];

const initial = Object.fromEntries(SKILLS.map((s) => [s.key, 5])) as Record<string, number>;

function SkillsAssessment() {
  const [scores, setScores] = useState(initial);

  const overall = Math.round(
    (Object.values(scores).reduce((a, b) => a + b, 0) / (SKILLS.length * 10)) * 100,
  );
  const gaps = SKILLS.filter((s) => (scores[s.key] ?? 0) <= 5);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Skills Assessment</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Rate each skill from 1 to 10. Your learning path updates as you go.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-panel space-y-6 p-6 lg:col-span-2">
          {SKILLS.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{s.label}</span>
                <span className="font-display font-semibold text-foreground">
                  {scores[s.key] ?? 0}/10
                </span>
              </div>
              <Slider
                className="mt-3"
                value={[scores[s.key] ?? 0]}
                min={1}
                max={10}
                step={1}
                aria-label={s.label}
                onValueChange={(v) => setScores((p) => ({ ...p, [s.key]: v[0] ?? 0 }))}
              />
            </div>
          ))}
          <Button variant="outline" onClick={() => setScores(initial)}>
            <RotateCcw className="mr-2 size-4" /> Reset ratings
          </Button>
        </div>

        <div className="space-y-6">
          <div className="navy-gradient rounded-2xl p-6 text-center">
            <Award className="mx-auto size-6 text-gold" />
            <p className="mt-3 font-display text-4xl font-bold text-navy-foreground">{overall}%</p>
            <p className="mt-1 text-sm text-navy-foreground/70">Overall skills readiness</p>
            <Progress value={overall} className="mt-4 h-2" />
          </div>

          <div className="surface-panel p-6">
            <h2 className="text-lg font-semibold text-foreground">Recommended next</h2>
            {gaps.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Strong across the board — focus on certifications and portfolio projects.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {gaps.map((g) => (
                  <li key={g.key} className="rounded-lg bg-muted p-3">
                    <p className="text-sm font-medium text-foreground">{g.course}</p>
                    <p className="text-xs text-muted-foreground">Improves: {g.label}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
