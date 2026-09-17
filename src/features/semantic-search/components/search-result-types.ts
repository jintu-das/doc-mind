import type { LucideIcon } from "lucide-react";

export type MatchType = "dense" | "hybrid" | "semantic" | "lexical";

export const matchStyles: Record<
  MatchType,
  { dot: string; label: string; highlight: string }
> = {
  dense: {
    dot: "bg-primary",
    label: "text-primary",
    highlight: "bg-primary/15 text-primary",
  },
  hybrid: {
    dot: "bg-chart-2",
    label: "text-chart-2",
    highlight: "bg-chart-2/15 text-chart-2",
  },
  semantic: {
    dot: "bg-chart-3",
    label: "text-chart-3",
    highlight: "bg-chart-3/15 text-chart-3",
  },
  lexical: {
    dot: "bg-muted-foreground",
    label: "text-muted-foreground",
    highlight: "bg-muted text-foreground",
  },
};

export interface SnippetSegment {
  text: string;
  highlight?: boolean;
}

export interface SearchResult {
  id: string;
  doc: string;
  page: string;
  match: number;
  matchType: MatchType;
  icon: LucideIcon;
  snippet: SnippetSegment[];
  concepts: string[];
}
