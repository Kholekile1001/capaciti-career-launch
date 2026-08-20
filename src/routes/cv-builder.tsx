import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cv-builder")({
  head: () => ({
    meta: [
      { title: "CV Builder — CAPACITI WorkSmart AI" },
      {
        name: "description",
        content:
          "Create a professional, ATS-friendly CV with a live preview built for South African employers.",
      },
      { property: "og:title", content: "CV Builder — CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Editable CV form with instant live preview.",
      },
    ],
  }),
  component: CvBuilder,
});

function CvBuilder() {
  const [cv, setCv] = useState({
    name: "Thandi Mokoena",
    title: "Junior Data Analyst",
    email: "thandi.mokoena@email.co.za",
    phone: "071 234 5678",
    location: "Johannesburg, Gauteng",
    summary:
      "Motivated CAPACITI graduate with hands-on training in data analytics, Excel and SQL. Eager to support data-driven decision making in a fast-paced team.",
    skills: "Excel, SQL, Power BI, Python basics, Communication, Teamwork",
    experience:
      "Data Intern — CAPACITI (2025–2026)\nCleaned and analysed learner datasets, built weekly Power BI dashboards for 3 programme managers.",
    education:
      "National Certificate: IT Systems Development — CAPACITI, 2025\nMatric (Bachelor pass) — Parktown High, 2022",
  });

  const set = (k: keyof typeof cv) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCv((c) => ({ ...c, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">CV Builder</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in your details on the left — your CV updates instantly on the right.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="surface-panel space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={cv.name} onChange={set("name")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" value={cv.title} onChange={set("title")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={cv.email} onChange={set("email")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={cv.phone} onChange={set("phone")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={cv.location} onChange={set("location")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="summary">Professional summary</Label>
            <Textarea id="summary" rows={4} value={cv.summary} onChange={set("summary")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Textarea id="skills" rows={2} value={cv.skills} onChange={set("skills")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="experience">Experience</Label>
            <Textarea id="experience" rows={5} value={cv.experience} onChange={set("experience")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="education">Education</Label>
            <Textarea id="education" rows={4} value={cv.education} onChange={set("education")} />
          </div>

          <Button
            className="w-full"
            onClick={() => {
              if (typeof window !== "undefined") window.print();
              toast.success("Use your browser's print dialog to save as PDF.");
            }}
          >
            <Download className="mr-2 size-4" /> Export / print CV
          </Button>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="navy-gradient px-6 py-6">
            <h2 className="font-display text-2xl font-bold text-navy-foreground">
              {cv.name || "Your name"}
            </h2>
            <p className="mt-1 text-sm font-medium text-gold">{cv.title || "Your job title"}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-navy-foreground/75">
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> {cv.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" /> {cv.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {cv.location}
              </span>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <PreviewSection title="Professional summary">
              <p className="text-sm leading-relaxed text-muted-foreground">{cv.summary}</p>
            </PreviewSection>

            <PreviewSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {cv.skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                    >
                      {s}
                    </span>
                  ))}
              </div>
            </PreviewSection>

            <PreviewSection title="Experience">
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {cv.experience}
              </p>
            </PreviewSection>

            <PreviewSection title="Education">
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {cv.education}
              </p>
            </PreviewSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 border-b border-border pb-1.5 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
