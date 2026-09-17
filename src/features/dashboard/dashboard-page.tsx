import {
  ArrowRight,
  Cloud,
  FileText,
  Filter,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  SquareCheckBig,
} from "lucide-react";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CorpusCoverageChart,
  IngestionChart,
} from "@/features/dashboard/components/lazy-charts";
import RecentDocumentsTable from "@/features/dashboard/components/recent-documents-table";
import { UploadDocumentDialog } from "../documents/components/upload-document-dialog";

const stats = [
  {
    label: "Documents",
    value: 24,
    caption: "Total index",
    badge: "+3 this week",
    icon: FileText,
  },
  {
    label: "Processing",
    value: 3,
    caption: "Vectorizing",
    badge: "Active queue",
    icon: RefreshCw,
  },
  {
    label: "Processed",
    value: 21,
    caption: "Semantic ready",
    badge: "100% indexed",
    icon: ShieldCheck,
  },
  {
    label: "Failed",
    value: 0,
    caption: "Zero issues",
    badge: "Healthy",
    icon: SquareCheckBig,
  },
];

const suggestions = [
  { label: "Summarize my documents", icon: FileText },
  { label: "What databases are mentioned?", icon: Search },
  { label: "Explain the authentication architecture", icon: ShieldCheck },
  { label: "Find documents about AWS", icon: Cloud },
];

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            WORKSPACE / OVERVIEW
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask questions, search your documents, or upload something new.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter data-icon="inline-start" aria-hidden="true" />
            Filter
          </Button>
          <UploadDocumentDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <stat.icon
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <CardAction>
                <Badge variant="secondary">{stat.badge}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Sparkles className="size-5 text-primary" aria-hidden="true" />
          <CardTitle>Ask your documents</CardTitle>
          <CardDescription>
            Semantic vector retrieval with cited multi-document reasoning
          </CardDescription>
          <CardAction>
            <Badge variant="outline">DocMind Engine v4.2</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <Sparkles aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Ask anything about your documents…"
              aria-label="Ask your documents"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="sm" variant="default">
                Query
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">SUGGESTED:</span>
            {suggestions.map((suggestion) => (
              <Button key={suggestion.label} variant="outline" size="sm">
                <suggestion.icon data-icon="inline-start" aria-hidden="true" />
                {suggestion.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-96 w-full lg:col-span-2" />}>
          <IngestionChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <CorpusCoverageChart />
        </Suspense>
      </div>

      <RecentDocumentsTable />
    </div>
  );
}
