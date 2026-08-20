import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Clock, Banknote, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/job-search")({
  head: () => ({
    meta: [
      { title: "Job Search — CAPACITI WorkSmart AI" },
      {
        name: "description",
        content:
          "Search entry-level jobs, internships and learnerships across South Africa with smart filters.",
      },
      { property: "og:title", content: "Job Search — CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Filter verified opportunities by province, type and field.",
      },
    ],
  }),
  component: JobSearch,
});

const JOBS = [
  {
    title: "Junior Data Analyst",
    company: "Nedbank",
    province: "Gauteng",
    city: "Sandton",
    type: "Full-time",
    field: "IT & Data",
    salary: "R14 000 – R18 000 pm",
    posted: "2 days ago",
    tags: ["Excel", "SQL", "Power BI"],
  },
  {
    title: "IT Support Learnership",
    company: "Dimension Data",
    province: "Western Cape",
    city: "Cape Town",
    type: "Learnership",
    field: "IT & Data",
    salary: "R6 500 stipend",
    posted: "Today",
    tags: ["Hardware", "Ticketing", "Matric"],
  },
  {
    title: "Customer Service Agent",
    company: "Capita SA",
    province: "KwaZulu-Natal",
    city: "Durban",
    type: "Full-time",
    field: "Customer Service",
    salary: "R9 000 – R11 500 pm",
    posted: "4 days ago",
    tags: ["Communication", "CRM"],
  },
  {
    title: "Digital Marketing Intern",
    company: "Yellowwood",
    province: "Gauteng",
    city: "Rosebank",
    type: "Internship",
    field: "Marketing",
    salary: "R7 000 stipend",
    posted: "1 week ago",
    tags: ["Social media", "Canva"],
  },
  {
    title: "Junior Software Developer",
    company: "Entelect",
    province: "Western Cape",
    city: "Stellenbosch",
    type: "Full-time",
    field: "IT & Data",
    salary: "R20 000 – R28 000 pm",
    posted: "3 days ago",
    tags: ["JavaScript", "Git", "React"],
  },
  {
    title: "Finance Graduate Programme",
    company: "Old Mutual",
    province: "Eastern Cape",
    city: "Port Elizabeth",
    type: "Graduate",
    field: "Finance",
    salary: "R15 000 pm",
    posted: "5 days ago",
    tags: ["Accounting", "Degree"],
  },
];

const provinces = ["All provinces", "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"];
const types = ["All types", "Full-time", "Internship", "Learnership", "Graduate"];
const fields = ["All fields", "IT & Data", "Customer Service", "Marketing", "Finance"];

function JobSearch() {
  const [q, setQ] = useState("");
  const [province, setProvince] = useState(provinces[0]);
  const [type, setType] = useState(types[0]);
  const [field, setField] = useState(fields[0]);

  const results = useMemo(
    () =>
      JOBS.filter((j) => {
        const text = `${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase();
        return (
          text.includes(q.toLowerCase()) &&
          (province === provinces[0] || j.province === province) &&
          (type === types[0] || j.type === type) &&
          (field === fields[0] || j.field === field)
        );
      }),
    [q, province, type, field],
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Job Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Entry-level roles, internships and learnerships across South Africa.
        </p>
      </header>

      <div className="surface-panel grid gap-4 p-5 lg:grid-cols-4">
        <div className="space-y-1.5 lg:col-span-1">
          <Label htmlFor="q">Keyword</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="q"
              className="pl-9"
              placeholder="Role, company, skill"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <FilterSelect label="Province" value={province} onChange={setProvince} options={provinces} />
        <FilterSelect label="Job type" value={type} onChange={setType} options={types} />
        <FilterSelect label="Field" value={field} onChange={setField} options={fields} />
      </div>

      <p className="text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "opportunity" : "opportunities"} found
      </p>

      <div className="grid gap-4 xl:grid-cols-2">
        {results.map((j) => (
          <article key={j.title} className="surface-panel flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">{j.title}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="size-4" /> {j.company}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {j.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {j.city}, {j.province}
              </span>
              <span className="flex items-center gap-1.5">
                <Banknote className="size-3.5" /> {j.salary}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {j.posted}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {j.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-2">
              <Button
                className="flex-1"
                onClick={() => toast.success(`Application started for ${j.title}`)}
              >
                Apply now
              </Button>
              <Button
                variant="outline"
                onClick={() => toast(`${j.title} saved to your list`)}
              >
                Save
              </Button>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="surface-panel p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No matches. Try clearing a filter or a broader keyword.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
