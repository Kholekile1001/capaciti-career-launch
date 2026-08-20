import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CapacitiLogo } from "../components/CapacitiLogo";
import { SidebarNav } from "../components/AppSidebar";
import { ChatbotWidget } from "../components/ChatbotWidget";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CAPACITI WorkSmart AI — Unlock your potential" },
      {
        name: "description",
        content:
          "AI career assistance for South African youth: CV builder, job search, interview prep and skills assessment.",
      },
      { name: "author", content: "CAPACITI" },
      { property: "og:title", content: "CAPACITI WorkSmart AI" },
      {
        property: "og:description",
        content: "Career guidance tools for South African youth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="navy-gradient sticky top-0 z-40 border-b border-navy-foreground/10">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle navigation"
                className="rounded-lg p-2 text-navy-foreground/80 transition-colors hover:bg-navy-foreground/10 lg:hidden"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <CapacitiLogo />
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="rounded-full bg-navy-foreground/10 px-3 py-1.5 text-xs font-medium text-navy-foreground/80">
                South Africa · Youth Programme
              </span>
              <div className="grid size-9 place-items-center rounded-full bg-gold font-display text-sm font-bold text-gold-foreground">
                TM
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
          <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
            <div className="sticky top-[73px]">
              <SidebarNav />
            </div>
          </aside>

          {mobileOpen && (
            <aside className="border-b border-sidebar-border bg-sidebar lg:hidden">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </aside>
          )}

          <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>

        <footer className="navy-gradient mt-auto border-t border-navy-foreground/10">
          <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <CapacitiLogo />
              <p className="max-w-xl text-xs leading-relaxed text-navy-foreground/70">
                <strong className="font-semibold text-navy-foreground">Disclaimer:</strong> This
                AI provides guidance only and does not guarantee employment. CAPACITI is not
                liable for outcomes.
              </p>
            </div>
            <p className="mt-6 border-t border-navy-foreground/10 pt-4 text-xs text-navy-foreground/50">
              © {new Date().getFullYear()} CAPACITI WorkSmart AI. Built for South African youth.
            </p>
          </div>
        </footer>

        <ChatbotWidget />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
