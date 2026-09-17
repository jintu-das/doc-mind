import {
  BadgeCheck,
  Cpu,
  Database,
  HardDrive,
  Network,
  Quote,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import DocumentsTable from "@/features/documents/components/documents-table";
import { UploadDocumentDialog } from "@/features/documents/components/upload-document-dialog";

const stats = [
  {
    label: "Active Knowledge Base",
    value: "24 Docs",
    caption: "Documents indexed",
    badge: "100% vector",
    icon: Database,
  },
  {
    label: "Storage Utilized",
    value: "3.4 GB",
    caption: "of 5.0 GB allocated",
    badge: "68% used",
    icon: HardDrive,
  },
  {
    label: "Extracted Embeddings",
    value: "4,892",
    caption: "Chunks · 1536-dim vectors",
    badge: "1536-dim",
    icon: Network,
  },
  {
    label: "OCR & Synthesis Pass",
    value: "99.4%",
    caption: "Validity across corpus",
    badge: "Live",
    icon: ShieldCheck,
  },
];

export function DocumentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            WORKSPACE / DOCUMENTS
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, inspect, and query knowledge indexed across neural
            semantic layers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw data-icon="inline-start" aria-hidden="true" />
            Rescan Vector Index
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

      <DocumentsTable />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Cpu className="size-5 text-primary" aria-hidden="true" />
            <CardTitle>Embeddings Model</CardTitle>
            <CardDescription>text-embedding-3-large (1536d)</CardDescription>
            <CardAction>
              <Badge variant="outline">Active</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            All 24 document embeddings are synchronized with the multi-tenant
            vector cluster. Semantic search latency averages 42ms.
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Vector Cache Hit Ratio</span>
            <span className="font-semibold text-foreground">96.8%</span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Cpu className="size-5 text-secondary" aria-hidden="true" />
            <CardTitle>Background Workers</CardTitle>
            <CardDescription>2 workers active · 3 items queued</CardDescription>
            <CardAction>
              <span
                className="block size-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <Progress value={82}>
              <div className="flex w-full items-center justify-between">
                <ProgressLabel>Worker 01: Chunking &amp; Tokenization</ProgressLabel>
                <ProgressValue />
              </div>
            </Progress>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Estimated finish: ~45 sec</span>
            <Button variant="link" size="sm">
              Inspect Log
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Quote className="size-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>Grounding Accuracy</CardTitle>
            <CardDescription>Zero hallucinations reported</CardDescription>
            <CardAction>
              <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 bg-muted/40 p-3 text-xs">
              <span className="font-medium text-primary">
                Top Cited Source This Week
              </span>
              <span className="truncate font-medium text-foreground">
                "AWS Architecture Reference Guide.pdf"
              </span>
              <span className="text-muted-foreground">
                142 grounding queries answered
              </span>
            </div>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Confidence threshold: ≥0.85</span>
            <Button variant="link" size="sm">
              Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
