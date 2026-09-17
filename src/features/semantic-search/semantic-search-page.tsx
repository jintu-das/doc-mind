import {
  ArrowUpDown,
  Bookmark,
  ChevronDown,
  Code2,
  Database,
  FileText,
  LayoutList,
  Rows3,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Tags,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchInsightsSidebar } from "@/features/semantic-search/components/search-insights-sidebar";
import { SearchResultCard } from "@/features/semantic-search/components/search-result-card";
import type { SearchResult } from "@/features/semantic-search/components/search-result-types";

const scopeOptions = ["All Documents (24)", "Technical only", "Policy only"];
const docTypeOptions = [
  "Technical / Architecture",
  "Policy / Compliance",
  "Research",
];
const similarityOptions = [">85%", ">75%", ">60%"];
const sortOptions = ["Highest Relevance", "Most Recent", "Most Cited"];

const results: SearchResult[] = [
  {
    id: "aws-arch",
    doc: "AWS Architecture Reference Guide.pdf",
    page: "Page 14",
    match: 94,
    matchType: "dense",
    icon: FileText,
    concepts: ["JWT", "Cognito", "API Gateway", "Authentication"],
    snippet: [
      { text: "Authentication", highlight: true },
      { text: " is handled using " },
      { text: "JWT tokens", highlight: true },
      { text: " issued by " },
      { text: "Cognito/Auth0", highlight: true },
      { text: ", with token validation at the " },
      { text: "API Gateway", highlight: true },
      {
        text: " layer before hitting microservices. Ingress claims are validated against cached JWKS endpoints every 15 minutes to preserve sub-millisecond route latency.",
      },
    ],
  },
  {
    id: "microservices",
    doc: "Microservices Design & Domain Boundaries.pdf",
    page: "Page 8",
    match: 91,
    matchType: "hybrid",
    icon: Code2,
    concepts: ["Stateless Session", "RSA-256", "Redis Auth Cache"],
    snippet: [
      { text: "…" },
      { text: "Stateless session verification", highlight: true },
      { text: " using " },
      { text: "RSA-256", highlight: true },
      { text: " signed public key sets, caching public keys in " },
      { text: "Redis", highlight: true },
      { text: " for high throughput " },
      { text: "auth", highlight: true },
      {
        text: " pipelines. When token revocation occurs, active tokens are cross-referenced with a Bloom filter in the Redis memory cluster before accepting requests.",
      },
    ],
  },
  {
    id: "fastapi",
    doc: "FastAPI Production Deployment.pdf",
    page: "Page 22",
    match: 87,
    matchType: "semantic",
    icon: Database,
    concepts: ["FastAPI Dependency", "Bearer Token", "RBAC"],
    snippet: [
      { text: "…Dependency injection pattern " },
      { text: "Depends(get_current_user)", highlight: true },
      { text: " checks " },
      { text: "bearer token headers", highlight: true },
      { text: " and enforces " },
      { text: "RBAC permissions", highlight: true },
      {
        text: " across endpoints. Scopes are unpacked automatically into the SecurityScopes request context.",
      },
    ],
  },
  {
    id: "hipaa",
    doc: "Security & HIPAA Compliance Checklist 2026.pdf",
    page: "Page 5",
    match: 79,
    matchType: "lexical",
    icon: Shield,
    concepts: ["MFA Policy", "Credential Rotation"],
    snippet: [
      { text: "…Password rotation and " },
      { text: "multi-factor authentication (MFA)", highlight: true },
      {
        text: " requirements for administrative access. Service credentials must be rotated at least every 90 days or immediately following detected anomalous invocation patterns.",
      },
    ],
  },
];

export function SemanticSearchPage() {
  const [query, setQuery] = useState("authentication architecture");
  const [scope, setScope] = useState(scopeOptions[0]);
  const [docType, setDocType] = useState(docTypeOptions[0]);
  const [minSimilarity, setMinSimilarity] = useState(similarityOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [compact, setCompact] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              WORKSPACE / SEMANTIC SEARCH
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Semantic Search</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Find exact and conceptual information across all 24 indexed
              documents using high-dimensional vector embeddings and hybrid
              reranking.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-muted p-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Embedding Engine
              </span>
              <span className="font-mono text-xs font-semibold text-foreground">
                text-embedding-3-large (3072-d)
              </span>
            </div>
            <svg
              className="h-7 w-24 text-primary"
              fill="none"
              viewBox="0 0 96 28"
              aria-hidden="true"
            >
              <path
                d="M2 18L14 12L26 20L38 6L50 14L62 4L74 16L86 8L94 13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">Vector Index v4.2</Badge>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
            24/24 Synced
          </span>
        </div>

        <InputGroup className="h-11">
          <InputGroupAddon>
            <Search className="text-primary" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask a technical question or search conceptual patterns…"
            aria-label="Semantic search query"
            className="text-sm"
          />
          <InputGroupAddon align="inline-end" className="gap-1">
            {query && (
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear query"
                onClick={handleClear}
              >
                <X aria-hidden="true" />
              </InputGroupButton>
            )}
            <kbd className="hidden items-center bg-muted px-2 py-1 font-mono text-xs text-muted-foreground sm:inline-flex">
              ⌘K
            </kbd>
            <InputGroupButton size="sm" variant="default">
              <Search data-icon="inline-start" aria-hidden="true" />
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <Bookmark data-icon="inline-start" aria-hidden="true" />
                {scope}
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup value={scope} onValueChange={setScope}>
                  {scopeOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <Tags data-icon="inline-start" aria-hidden="true" />
                <span className="text-muted-foreground">Doc Type:</span>
                <span className="font-semibold text-primary">{docType}</span>
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={docType}
                  onValueChange={setDocType}
                >
                  {docTypeOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <SlidersHorizontal
                  data-icon="inline-start"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">Min Similarity:</span>
                <span className="font-mono font-semibold">{minSimilarity}</span>
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={minSimilarity}
                  onValueChange={setMinSimilarity}
                >
                  {similarityOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <ArrowUpDown data-icon="inline-start" aria-hidden="true" />
                Sort: {sort}
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-0.5 bg-muted p-0.5">
            <Button
              variant={compact ? "ghost" : "default"}
              size="xs"
              onClick={() => setCompact(false)}
            >
              <LayoutList data-icon="inline-start" aria-hidden="true" />
              Snippets
            </Button>
            <Button
              variant={compact ? "default" : "ghost"}
              size="xs"
              onClick={() => setCompact(true)}
            >
              <Rows3 data-icon="inline-start" aria-hidden="true" />
              Compact
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span
                className="size-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium text-foreground">
                Found 18 relevant passages across 4 documents
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                (in 142ms)
              </span>
            </div>
            <div className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
              <span className="flex items-center gap-1">
                <Sparkles
                  className="size-3.5 text-primary"
                  aria-hidden="true"
                />
                Cosine distance + BM25 reranked
              </span>
              <span>Query Expansion: ON</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          {results.map((result) => (
            <SearchResultCard
              key={result.id}
              result={result}
              compact={compact}
            />
          ))}
        </div>
        <div className="lg:col-span-4">
          <SearchInsightsSidebar />
        </div>
      </div>
    </div>
  );
}
