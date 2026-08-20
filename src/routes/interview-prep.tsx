import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/interview-prep")({
  head: () => ({
    meta: [
      { title: "Interview Prep — CAPACITI WorkSmart AI" },
      {
        name: "description",
        content:
          "Practice common South African interview questions with STAR-method model answers and prep checklists.",
      },
      { property: "og:title", content: "Interview Prep — CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Model answers and a readiness checklist before your next interview.",
      },
    ],
  }),
  component: InterviewPrep,
});

const questions = [
  {
    q: "Tell me about yourself.",
    a: "Give a 60-second story: who you are, your training (e.g. CAPACITI programme), one concrete achievement, and why this role fits. Avoid personal history — keep it professional.",
  },
  {
    q: "Why should we hire you with no work experience?",
    a: "Reframe: point to project work, learnerships, volunteering and fast learning. Example: 'During my CAPACITI training I built a Power BI dashboard used by three managers.'",
  },
  {
    q: "Describe a time you solved a problem under pressure.",
    a: "Use STAR — Situation, Task, Action, Result. Always finish with a measurable result ('cut reporting time from 3 hours to 30 minutes').",
  },
  {
    q: "What are your salary expectations?",
    a: "Give a researched range, not a single number, and mention flexibility: 'Based on market rates for entry-level roles in Gauteng, I'm looking at R12 000 – R15 000, and I'm open to discussion.'",
  },
  {
    q: "Where do you see yourself in five years?",
    a: "Show ambition tied to the employer: growing into a senior/specialist role, adding certifications, and mentoring newer team members.",
  },
];

const checklist = [
  "Research the company: products, values, recent news",
  "Re-read the job advert and match 3 of your skills to it",
  "Prepare 2 STAR stories and 2 questions to ask them",
  "Test your data, device and quiet space for online interviews",
  "Have certified copies of ID, matric and certificates ready",
];

function InterviewPrep() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Interview Prep</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Common questions, model answers and a checklist to walk in confident.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-panel p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Practice questions</h2>
          <Accordion type="single" collapsible className="mt-3">
            {questions.map((item, i) => (
              <AccordionItem key={item.q} value={`q-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-6">
          <div className="surface-panel p-6">
            <h2 className="text-lg font-semibold text-foreground">Readiness checklist</h2>
            <ul className="mt-4 space-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="navy-gradient rounded-2xl p-6">
            <Lightbulb className="size-5 text-gold" />
            <h3 className="mt-3 font-display text-base font-semibold text-navy-foreground">
              STAR in one line
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-foreground/75">
              "The team was behind (S), I had to fix reporting (T), so I automated it in Excel (A),
              which saved 10 hours a month (R)."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
