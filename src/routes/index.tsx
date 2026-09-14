import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cloud,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  RotateCw,
  Search,
  ShieldCheck,
  Sparkles,
  SquareCheckBig,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/")({
  component: Index,
});

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

const ingestionData = [
  { day: "M", tokens: 32400 },
  { day: "T", tokens: 38900 },
  { day: "W", tokens: 27100 },
  { day: "T", tokens: 48210 },
  { day: "F", tokens: 35600 },
  { day: "S", tokens: 18200 },
  { day: "S", tokens: 41700 },
];

const ingestionConfig = {
  tokens: {
    label: "Tokens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const coverageData = [
  { format: "PDF Files", value: 75, fill: "var(--chart-1)" },
  { format: "Markdown / TXT", value: 20, fill: "var(--chart-2)" },
  { format: "Spreadsheets", value: 5, fill: "var(--chart-3)" },
];

const coverageConfig = {
  value: { label: "Share" },
  "PDF Files": { label: "PDF Files", color: "var(--chart-1)" },
  "Markdown / TXT": { label: "Markdown / TXT", color: "var(--chart-2)" },
  Spreadsheets: { label: "Spreadsheets", color: "var(--chart-3)" },
} satisfies ChartConfig;

const documents = [
  {
    id: "doc_7a82f",
    name: "AWS Architecture.pdf",
    type: "PDF",
    size: "2.4 MB",
    status: "Processed",
    uploaded: "Sep 12",
    action: "Ask AI",
  },
  {
    id: "doc_11e4d",
    name: "FastAPI Guide.pdf",
    type: "PDF",
    size: "1.8 MB",
    status: "Processed",
    uploaded: "Sep 11",
    action: "Ask AI",
  },
  {
    id: "doc_993bc",
    name: "Company Policy.pdf",
    type: "PDF",
    size: "4.2 MB",
    status: "Processing",
    uploaded: "Sep 11",
    action: "View Progress",
  },
  {
    id: "doc_024ea",
    name: "Research Paper.pdf",
    type: "PDF",
    size: "8.1 MB",
    status: "Failed",
    uploaded: "Sep 10",
    action: "Retry",
  },
];

const statusVariant: Record<string, "secondary" | "outline" | "destructive"> =
  {
    Processed: "secondary",
    Processing: "outline",
    Failed: "destructive",
  };

function Index() {
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
            <Filter data-icon="inline-start" />
            Filter
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <stat.icon className="size-5 text-muted-foreground" />
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
          <Sparkles className="size-5 text-primary" />
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
              <Sparkles />
            </InputGroupAddon>
            <InputGroupInput placeholder="Ask anything about your documents..." />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="sm" variant="default">
                Query
                <ArrowRight data-icon="inline-end" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">SUGGESTED:</span>
            {suggestions.map((suggestion) => (
              <Button key={suggestion.label} variant="outline" size="sm">
                <suggestion.icon data-icon="inline-start" />
                {suggestion.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Knowledge Ingestion Activity</CardTitle>
            <CardDescription>
              Tokens extracted and parsed per daily window
            </CardDescription>
            <CardAction>
              <Tabs defaultValue="7d">
                <TabsList>
                  <TabsTrigger value="7d">7D</TabsTrigger>
                  <TabsTrigger value="30d">30D</TabsTrigger>
                  <TabsTrigger value="90d">90D</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ingestionConfig} className="h-64 w-full">
              <BarChart data={ingestionData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tokens" fill="var(--color-tokens)" radius={2} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              Vector density: 48,210 tokens
            </span>
            <span>Avg 98.4ms latency</span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Corpus Coverage</CardTitle>
            <CardDescription>Distribution across formats</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <ChartContainer
              config={coverageConfig}
              className="aspect-square h-40 w-40 shrink-0"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={coverageData}
                  dataKey="value"
                  nameKey="format"
                  innerRadius={45}
                  outerRadius={65}
                  strokeWidth={2}
                >
                  {coverageData.map((entry) => (
                    <Cell key={entry.format} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                24 <span className="text-xs font-normal text-muted-foreground">Files</span>
              </p>
              {coverageData.map((entry) => (
                <div
                  key={entry.format}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className="size-2 shrink-0 rounded-xs"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.format} ({entry.value}%)
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">
              Automatic OCR Parsing
            </span>
            <Badge variant="secondary">Enabled</Badge>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            Real-time status of document indexes and knowledge vectors
          </CardDescription>
          <CardAction>
            <Button variant="link" size="sm">
              View all documents
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-medium">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ID: {doc.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[doc.status]}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.uploaded}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="outline" size="sm">
                        {doc.action === "Retry" && (
                          <RotateCw data-icon="inline-start" />
                        )}
                        {doc.action}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Open menu"
                            />
                          }
                        >
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {documents.length} of 24 indexed documents
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon-sm" aria-label="Previous page">
              <ChevronLeft />
            </Button>
            <span className="px-2 text-xs text-muted-foreground">
              Page 1 / 6
            </span>
            <Button variant="outline" size="icon-sm" aria-label="Next page">
              <ChevronRight />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
