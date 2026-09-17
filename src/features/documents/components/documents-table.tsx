import {
  Cable,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  FileText,
  FlaskConical,
  ListFilter,
  Loader2,
  MoreHorizontal,
  Network,
  Scale,
  Search,
  ShieldCheck,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DocumentStatus = "processed" | "processing";
type StatusFilter = "all" | DocumentStatus;
type SortOption = "recent" | "oldest" | "name" | "size";

interface DocumentRecord {
  id: string;
  docId: string;
  name: string;
  meta: string;
  tags: string[];
  pages: number;
  sizeMB: number;
  status: DocumentStatus;
  vectorProgress?: number;
  uploadedAt: string;
  icon: LucideIcon;
}

const documents: DocumentRecord[] = [
  {
    id: "doc-8821",
    docId: "DOC-8821",
    name: "AWS Architecture Reference Guide.pdf",
    meta: "SHA-256: 4f8b9e",
    tags: ["Technical", "Architecture"],
    pages: 38,
    sizeMB: 4.2,
    status: "processed",
    uploadedAt: "2026-09-12",
    icon: FileText,
  },
  {
    id: "doc-8820",
    docId: "DOC-8820",
    name: "FastAPI Production Deployment.pdf",
    meta: "Async / ASGI",
    tags: ["Technical", "Backend"],
    pages: 24,
    sizeMB: 1.8,
    status: "processed",
    uploadedAt: "2026-09-12",
    icon: Code2,
  },
  {
    id: "doc-8819",
    docId: "DOC-8819",
    name: "Company Employee Handbook & Policy 2026.pdf",
    meta: "HR / Compliance",
    tags: ["Policy", "Legal"],
    pages: 112,
    sizeMB: 15.4,
    status: "processing",
    vectorProgress: 82,
    uploadedAt: "2026-09-11",
    icon: Scale,
  },
  {
    id: "doc-8818",
    docId: "DOC-8818",
    name: "Multi-Agent RAG with ReAct Foundations.pdf",
    meta: "arXiv:2409.1120",
    tags: ["Research", "AI & ML"],
    pages: 18,
    sizeMB: 2.1,
    status: "processed",
    uploadedAt: "2026-09-11",
    icon: FlaskConical,
  },
  {
    id: "doc-8817",
    docId: "DOC-8817",
    name: "Microservices Design & Domain Boundaries.pdf",
    meta: "Distributed Systems",
    tags: ["Architecture"],
    pages: 46,
    sizeMB: 5.6,
    status: "processed",
    uploadedAt: "2026-09-10",
    icon: Network,
  },
  {
    id: "doc-8816",
    docId: "DOC-8816",
    name: "Security & HIPAA Compliance Checklist 2026.pdf",
    meta: "Audit / Sec-Ops",
    tags: ["Policy", "Audit"],
    pages: 64,
    sizeMB: 8.1,
    status: "processed",
    uploadedAt: "2026-09-09",
    icon: Shield,
  },
  {
    id: "doc-8815",
    docId: "DOC-8815",
    name: "PostgreSQL Internals & WAL Optimization.pdf",
    meta: "Engine / DB",
    tags: ["Technical"],
    pages: 92,
    sizeMB: 11.2,
    status: "processed",
    uploadedAt: "2026-09-08",
    icon: Database,
  },
  {
    id: "doc-8814",
    docId: "DOC-8814",
    name: "Kubernetes Pod Networking Specification.pdf",
    meta: "CNI / eBPF",
    tags: ["Technical", "DevOps"],
    pages: 34,
    sizeMB: 3.7,
    status: "processing",
    vectorProgress: 45,
    uploadedAt: "2026-09-08",
    icon: Cable,
  },
];

const statusCounts = { all: 24, processed: 21, processing: 3, failed: 0 };

const sortLabels: Record<SortOption, string> = {
  recent: "Recently Uploaded",
  oldest: "Oldest First",
  name: "Name (A–Z)",
  size: "Largest File",
};

const formatSize = (mb: number) => `${mb.toFixed(1)} MB`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

function StatusBadge({ doc }: { doc: DocumentRecord }) {
  if (doc.status === "processing") {
    return (
      <Badge variant="outline" className="gap-1.5">
        <span
          className="size-1.5 rounded-full bg-primary animate-pulse"
          aria-hidden="true"
        />
        Vectorizing ({doc.vectorProgress}%)
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1.5">
      <span className="size-1.5 rounded-full bg-green-600" aria-hidden="true" />
      Processed
    </Badge>
  );
}

export default function DocumentsTable() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allTags = useMemo(
    () => Array.from(new Set(documents.flatMap((doc) => doc.tags))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return documents
      .filter((doc) => statusFilter === "all" || doc.status === statusFilter)
      .filter((doc) => typeFilter === "all" || doc.tags.includes(typeFilter))
      .filter((doc) =>
        doc.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
      .sort((a, b) => {
        switch (sortOption) {
          case "oldest":
            return a.uploadedAt.localeCompare(b.uploadedAt);
          case "name":
            return a.name.localeCompare(b.name);
          case "size":
            return b.sizeMB - a.sizeMB;
          default:
            return b.uploadedAt.localeCompare(a.uploadedAt);
        }
      });
  }, [statusFilter, typeFilter, sortOption, query]);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;

  const toggleSelectAll = () => {
    setSelected(allSelected ? new Set() : new Set(filtered.map((d) => d.id)));
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Library</CardTitle>
        <CardDescription>
          Manage, inspect, and query knowledge indexed across neural semantic
          layers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <TabsList>
              <TabsTrigger value="all">
                All{" "}
                <span className="ml-1 text-muted-foreground">
                  {statusCounts.all}
                </span>
              </TabsTrigger>
              <TabsTrigger value="processed">
                Processed{" "}
                <span className="ml-1 text-muted-foreground">
                  {statusCounts.processed}
                </span>
              </TabsTrigger>
              <TabsTrigger value="processing">
                Processing{" "}
                <span className="ml-1 text-muted-foreground">
                  {statusCounts.processing}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-2">
            <InputGroup className="w-full max-w-xs">
              <InputGroupAddon>
                <Search aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search documents, entities, or tags…"
                aria-label="Search documents"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroup>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <span className="text-muted-foreground">Type:</span>
                {typeFilter === "all" ? "All Types" : typeFilter}
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <DropdownMenuRadioItem value="all">
                    All Types
                  </DropdownMenuRadioItem>
                  {allTags.map((tag) => (
                    <DropdownMenuRadioItem key={tag} value={tag}>
                      {tag}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <span className="text-muted-foreground">Sort:</span>
                {sortLabels[sortOption]}
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value as SortOption)}
                >
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <DropdownMenuRadioItem key={value} value={value}>
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {selected.size > 0 ? (
          <div className="flex items-center justify-between border border-border bg-muted/40 px-3 py-2 text-xs">
            <span className="font-medium">{selected.size} selected</span>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSelected(new Set())}
              >
                Clear
              </Button>
              <Button variant="outline" size="xs">
                <Download data-icon="inline-start" aria-hidden="true" />
                Export
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck
                className="size-3.5 text-primary"
                aria-hidden="true"
              />
              Index health:{" "}
              <span className="font-medium text-foreground">Optimal</span>
              <span aria-hidden="true">·</span>
              Active corpus:{" "}
              <span className="font-medium text-foreground">
                3.4 GB / 5.0 GB
              </span>{" "}
              allocated
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="xs">
                <ListFilter data-icon="inline-start" aria-hidden="true" />
                Quick filters
              </Button>
              <Button variant="ghost" size="xs">
                <Download data-icon="inline-start" aria-hidden="true" />
                Export metadata
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all documents"
                />
              </TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Vector Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground"
                >
                  No documents match these filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(doc.id)}
                      onCheckedChange={() => toggleRow(doc.id)}
                      aria-label={`Select ${doc.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <doc.icon
                        className="size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {doc.name}
                        </span>
                        <span className="text-muted-foreground">
                          {doc.docId} • {doc.meta}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {doc.tags.map((tag, index) => (
                        <Badge
                          key={tag}
                          variant={index === 0 ? "outline" : "secondary"}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.pages} pages
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatSize(doc.sizeMB)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge doc={doc} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(doc.uploadedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1.5">
                      {doc.status === "processing" ? (
                        <Button variant="outline" size="sm" disabled>
                          <Loader2
                            data-icon="inline-start"
                            aria-hidden="true"
                            className="animate-spin"
                          />
                          Syncing
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Sparkles
                            data-icon="inline-start"
                            aria-hidden="true"
                          />
                          Ask AI
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Open document actions"
                            />
                          }
                        >
                          <MoreHorizontal aria-hidden="true" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={doc.status !== "processed"}
                          >
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <span>
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {documents.length}
          </span>{" "}
          loaded · {statusCounts.all} indexed sources total
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous page"
            disabled
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            variant="default"
            size="icon-sm"
            aria-label="Page 1, current page"
          >
            1
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Page 2">
            2
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Page 3">
            3
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Next page">
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
