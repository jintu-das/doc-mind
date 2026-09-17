import { ArrowUpRight, Brain, MessagesSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const knowledgeGraphRefs = [
  { label: "JWT Ingress Gateway", source: "AWS Arch · p.14" },
  { label: "RSA-256 Session Cache", source: "Microservices · p.8" },
  { label: "FastAPI Depends(RBAC)", source: "FastAPI Guide · p.22" },
];

const scoreDistribution = [
  {
    label: "AWS Arch",
    score: 94,
    tone: "bg-primary",
    text: "text-primary-foreground",
  },
  {
    label: "Microservices",
    score: 91,
    tone: "bg-primary/80",
    text: "text-primary-foreground",
  },
  {
    label: "FastAPI",
    score: 87,
    tone: "bg-primary/60",
    text: "text-primary-foreground",
  },
  {
    label: "Security Ref",
    score: 84,
    tone: "bg-primary/40",
    text: "text-foreground",
  },
  {
    label: "Policy",
    score: 79,
    tone: "bg-muted-foreground/60",
    text: "text-foreground",
  },
  {
    label: "Runbook",
    score: 72,
    tone: "bg-muted-foreground/40",
    text: "text-foreground",
  },
  {
    label: "Overview",
    score: 65,
    tone: "bg-muted-foreground/30",
    text: "text-foreground",
  },
];

const corpusCoverage = [
  {
    doc: "AWS Architecture Reference Guide.pdf",
    chunks: 8,
    percent: 44,
    tone: "bg-primary",
  },
  {
    doc: "Microservices Design & Domain Boundaries.pdf",
    chunks: 5,
    percent: 28,
    tone: "bg-chart-2",
  },
  {
    doc: "FastAPI Production Deployment.pdf",
    chunks: 3,
    percent: 17,
    tone: "bg-chart-3",
  },
  {
    doc: "Security & HIPAA Compliance Checklist 2026.pdf",
    chunks: 2,
    percent: 11,
    tone: "bg-muted-foreground",
  },
];

export function SearchInsightsSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center bg-primary/10 text-primary">
                <Brain className="size-3.5" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Synthesized Answer
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-primary">
              Claude Sonnet 5
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Your architecture relies on a{" "}
            <strong className="font-semibold text-foreground">
              layered token verification strategy
            </strong>
            . Cognito/Auth0 mints stateless JWTs, first validated against cached
            JWKS at the API Gateway ingress (
            <em className="not-italic font-medium text-foreground">
              AWS Architecture p.14
            </em>
            ), then re-validated with RSA-256 public key checks cached in Redis
            (
            <em className="not-italic font-medium text-foreground">
              Microservices p.8
            </em>
            ). Endpoints enforce RBAC via FastAPI scopes (
            <em className="not-italic font-medium text-foreground">
              FastAPI Guide p.22
            </em>
            ).
          </p>
          <div className="flex flex-col gap-1 bg-muted/40 p-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Knowledge Graph References
            </span>
            <div className="flex flex-col">
              {knowledgeGraphRefs.map((ref) => (
                <div
                  key={ref.label}
                  className="flex items-center justify-between gap-2 py-1 text-xs text-foreground"
                >
                  <span className="truncate">{ref.label}</span>
                  <span className="shrink-0 font-mono text-muted-foreground">
                    {ref.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <MessagesSquare data-icon="inline-start" aria-hidden="true" />
            Open in AI Workspace
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Score Distribution
            </span>
            <span className="text-xs text-muted-foreground">Top 18 chunks</span>
          </div>
          <div className="flex h-20 items-end gap-1.5 px-1 pt-2">
            {scoreDistribution.map((bar) => (
              <div
                key={bar.label}
                title={`${bar.label}: ${bar.score}%`}
                className={cn(
                  "flex flex-1 flex-col items-center justify-end",
                  bar.tone,
                )}
                style={{ height: `${bar.score}%` }}
              >
                <span
                  className={cn(
                    "mb-1 font-mono text-[9px] font-bold",
                    bar.text,
                  )}
                >
                  {bar.score}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t pt-2 font-mono text-xs text-muted-foreground">
            <span>High (&gt;85%)</span>
            <span>Cutoff (&gt;60%)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-foreground">
            Matched in Corpus
          </span>
          <div className="flex flex-col gap-3">
            {corpusCoverage.map((item) => (
              <div key={item.doc} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2 text-xs text-foreground">
                  <span className="truncate">{item.doc}</span>
                  <span className="shrink-0 font-mono font-semibold">
                    {item.chunks} chunks
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-muted">
                  <div
                    className={cn("h-full", item.tone)}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="w-fit px-0">
            View full coverage breakdown
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
