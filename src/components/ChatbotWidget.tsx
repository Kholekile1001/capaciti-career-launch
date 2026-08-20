import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "bot"; text: string };

const GREETING =
  "Hi! I'm WorkSmart AI. Ask me about CVs, interviews, learnerships or where to find jobs in South Africa.";

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/cv|resume/.test(q))
    return "Keep your CV to 2 pages: contact details, a 3-line profile, skills, education and any experience (including volunteering). Use the CV Builder tab and mirror keywords from the job advert.";
  if (/interview/.test(q))
    return "Practice the STAR method: Situation, Task, Action, Result. Head to Interview Prep for common South African interview questions and model answers.";
  if (/job|vacanc|learnership|internship/.test(q))
    return "Try Job Search here first, then check SAYouth.mobi (data-free), Indeed SA and company career pages. Apply within 48 hours of a posting going live.";
  if (/skill|course|study|learn/.test(q))
    return "Digital skills pay off fast: Excel, data literacy, customer service and basic coding. Take the Skills Assessment to see your gaps and suggested free courses.";
  if (/salary|pay|money/.test(q))
    return "Research market rates before you negotiate. Entry-level IT support in SA typically ranges R8 000–R15 000 per month depending on province and certification.";
  return "I can help with CV writing, interview prep, job searching, skills and learnerships. What would you like to work on?";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    setValue("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(
      () => setMessages((m) => [...m, { role: "bot", text: reply(text) }]),
      450,
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-float">
          <div className="navy-gradient flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-gold" />
              <div>
                <p className="text-sm font-semibold text-navy-foreground">WorkSmart AI</p>
                <p className="text-[11px] text-navy-foreground/65">Career guidance assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-border bg-card p-2.5">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about CVs, jobs, interviews…"
              aria-label="Message"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide AI assistant" : "Open AI assistant"}
        className="navy-gradient flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-navy-foreground shadow-float ring-1 ring-navy-foreground/15 transition-transform hover:scale-105"
      >
        <Bot className="size-5 text-gold" />
        {open ? "Close" : "Ask AI"}
      </button>
    </div>
  );
}
