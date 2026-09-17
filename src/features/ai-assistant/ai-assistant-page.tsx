import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Copy,
  Filter,
  Lightbulb,
  Link2,
  MessageSquarePlus,
  Share2,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useRef, useState } from "react";

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
import { Separator } from "@/components/ui/separator";
import { ChatComposer } from "@/features/ai-assistant/components/chat-composer";
import { ConversationHistory } from "@/features/ai-assistant/components/conversation-history";

const scopeOptions = [
  "All Documents (24)",
  "AWS Architecture Reference Guide.pdf",
  "Microservices Design & Domain Boundaries.pdf",
  "Security & HIPAA Compliance Checklist 2026.pdf",
];

const databaseFindings = [
  {
    name: "PostgreSQL",
    description:
      "Configured with pgvector as the primary relational and vector storage for document embeddings and relational metadata schema.",
  },
  {
    name: "MongoDB",
    description:
      "Document store referenced for semi-structured telemetry logs, microservice event streams, and long-term asynchronous audit logging.",
  },
  {
    name: "Redis",
    description:
      "High-throughput in-memory caching layer provisioned for active user session management, token validation, and query rate limiting.",
  },
];

const citations = [
  {
    doc: "AWS Architecture Reference Guide.pdf",
    page: "Page 12",
    match: "98% match",
    quote:
      "...The architecture uses PostgreSQL with pgvector for vector embeddings and hybrid search retrieval...",
    border: "border-chart-1",
    linkColor: "text-chart-1",
  },
  {
    doc: "Infrastructure Runbook.pdf",
    page: "Page 7",
    match: "91% match",
    quote:
      "...Redis cache instances are provisioned within private subnets to handle real-time session tokens...",
    border: "border-chart-2",
    linkColor: "text-chart-2",
  },
  {
    doc: "Database Design Notes.pdf",
    page: "Page 4",
    match: "88% match",
    quote:
      "...MongoDB cluster utilized for unconstrained event logs and asynchronous telemetry...",
    border: "border-chart-3",
    linkColor: "text-chart-3",
  },
];

const suggestions = [
  "Compare auth approaches",
  "Find security policies",
  "Summarize AWS costs",
];

export function AiAssistantPage() {
  const [scope, setScope] = useState(scopeOptions[0]);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");
  const [isNewChat, setIsNewChat] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const handleNewChat = () => {
    setIsNewChat(true);
    setDraft("");
    setFeedback(null);
    composerRef.current?.focus();
  };

  const handleSelectChat = (title: string) => {
    if (title === "Database comparison") {
      setIsNewChat(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(
        "I found three primary databases mentioned across your document library: PostgreSQL, MongoDB, and Redis.",
      )
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // Clipboard access denied; nothing more to do in this demo.
      });
  };

  const handleSuggestion = (suggestion: string) => {
    setDraft(suggestion);
    composerRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <span
              className="size-1.5 rounded-full bg-current"
              aria-hidden="true"
            />
            Neural Engine: Pinecone v2.4 + pgvector hybrid
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            Index Hash: #d9f2a7-live
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            Zero-Hallucination Mode: ON
          </span>
          <Separator orientation="vertical" className="h-3" />
          <span>
            Latency: <span className="font-medium text-foreground">142ms</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <ConversationHistory
          className="w-full lg:w-60 lg:shrink-0"
          activeTitle={isNewChat ? null : "Database comparison"}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Bot className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-semibold">AI Assistant</h1>
                    <Badge variant="outline">v2.1-RAG</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ask questions across your entire document library (24
                    documents indexed)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    <Filter data-icon="inline-start" aria-hidden="true" />
                    <span className="text-muted-foreground">Scope:</span>
                    <span className="font-semibold">{scope}</span>
                    <ChevronDown data-icon="inline-end" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={scope}
                      onValueChange={setScope}
                    >
                      {scopeOptions.map((option) => (
                        <DropdownMenuRadioItem key={option} value={option}>
                          {option}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Export conversation"
                >
                  <Share2 aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {isNewChat ? (
            <div className="flex flex-col items-center justify-center gap-3 bg-card py-16 text-center ring-1 ring-foreground/10">
              <div className="flex size-12 items-center justify-center bg-primary/10 text-primary">
                <MessageSquarePlus className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Start a new conversation
                </p>
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                  Ask a question about your indexed documents, or try one of the
                  suggestions below.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex justify-end pl-8">
                <div className="flex max-w-2xl flex-col gap-1 bg-muted p-4">
                  <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>You</span>
                    <span className="font-mono">10:41 AM</span>
                  </div>
                  <p className="text-sm text-foreground">
                    What databases are mentioned across my documents?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pr-2 sm:pr-8">
                <div className="flex size-9 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Bot className="size-4" aria-hidden="true" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <Card>
                    <CardContent className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            Synthesized Response
                          </span>
                          <Badge variant="secondary">
                            3 Documents Synthesized
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                          <span>Confidence: 96.8%</span>
                          <span aria-hidden="true">·</span>
                          <span>Tokens: 382</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 text-sm text-foreground">
                        <p>
                          I found three primary databases mentioned across your
                          document library with distinct architectural
                          responsibilities:
                        </p>
                        <div className="flex flex-col gap-2">
                          {databaseFindings.map((item, index) => (
                            <div
                              key={item.name}
                              className="flex items-start gap-3 bg-muted/40 p-3"
                            >
                              <div className="flex size-6 shrink-0 items-center justify-center bg-primary/10 font-mono text-xs font-semibold text-primary">
                                {index + 1}
                              </div>
                              <p className="text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                  {item.name}
                                </span>{" "}
                                — {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="xs"
                            className={
                              feedback === "up" ? "text-primary" : undefined
                            }
                            onClick={() =>
                              setFeedback((prev) =>
                                prev === "up" ? null : "up",
                              )
                            }
                          >
                            <ThumbsUp
                              data-icon="inline-start"
                              aria-hidden="true"
                            />
                            Helpful
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Not helpful"
                            className={
                              feedback === "down"
                                ? "text-destructive"
                                : undefined
                            }
                            onClick={() =>
                              setFeedback((prev) =>
                                prev === "down" ? null : "down",
                              )
                            }
                          >
                            <ThumbsDown aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={handleCopy}
                          >
                            <Copy data-icon="inline-start" aria-hidden="true" />
                            {copied ? "Copied" : "Copy"}
                          </Button>
                        </div>
                        <span>Model: Claude Sonnet 5 + Custom Embedding</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                      <div className="flex items-center gap-2">
                        <Link2
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                        <h2 className="text-sm font-semibold">
                          Sources & Citations
                        </h2>
                        <Badge variant="outline">3 verified references</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Click card to jump to PDF coordinate
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {citations.map((citation) => (
                        <Card
                          key={citation.doc}
                          className="cursor-pointer transition-shadow hover:shadow-md"
                        >
                          <CardContent
                            className={`flex h-full flex-col justify-between gap-2 border-l-2 ${citation.border}`}
                          >
                            <div className="flex flex-col gap-2">
                              <span className="truncate text-xs font-semibold text-foreground">
                                {citation.doc}
                              </span>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {citation.page}
                                </Badge>
                                <span className="font-mono text-xs font-semibold text-foreground">
                                  {citation.match}
                                </span>
                              </div>
                              <p className="line-clamp-3 bg-muted/40 p-2 text-xs text-muted-foreground italic">
                                "{citation.quote}"
                              </p>
                            </div>
                            <div
                              className={`flex items-center justify-between pt-1 text-xs font-medium ${citation.linkColor}`}
                            >
                              <span>Open source page</span>
                              <ArrowUpRight
                                className="size-3.5"
                                aria-hidden="true"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              Suggested:
            </span>
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => handleSuggestion(suggestion)}
              >
                {suggestion}
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            ))}
          </div>

          <ChatComposer ref={composerRef} value={draft} onChange={setDraft} />
        </div>
      </div>
    </div>
  );
}
