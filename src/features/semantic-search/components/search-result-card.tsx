import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  matchStyles,
  type SearchResult,
} from "@/features/semantic-search/components/search-result-types";
import { cn } from "@/lib/utils";

export function SearchResultCard({
  result,
  compact,
}: {
  result: SearchResult;
  compact: boolean;
}) {
  const style = matchStyles[result.matchType];

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center bg-primary/10 text-primary">
              <result.icon className="size-4" aria-hidden="true" />
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {result.doc}
              </span>
              <span
                className="text-xs text-muted-foreground"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {result.page}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-muted px-2 py-0.5 text-xs">
            <span
              className={cn("size-2 rounded-full", style.dot)}
              aria-hidden="true"
            />
            <span className={cn("font-mono font-semibold", style.label)}>
              {result.match}% match
            </span>
            <span className="text-muted-foreground">{result.matchType}</span>
          </div>
        </div>

        <p
          className={cn(
            "bg-muted/40 p-3 leading-relaxed text-foreground",
            compact && "line-clamp-2",
          )}
        >
          {result.snippet.map((segment, index) =>
            segment.highlight ? (
              <mark
                key={index}
                className={cn("px-1 font-medium", style.highlight)}
              >
                {segment.text}
              </mark>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {!compact && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-muted-foreground uppercase">
                Concepts:
              </span>
              {result.concepts.map((concept) => (
                <Badge key={concept} variant="secondary">
                  {concept}
                </Badge>
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Sparkles data-icon="inline-start" aria-hidden="true" />
              Ask AI about this excerpt
            </Button>
            <Button size="sm">
              Open document at {result.page}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
