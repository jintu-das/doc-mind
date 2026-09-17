import { MessageSquare, MoreHorizontal, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HistoryItem {
  title: string;
  selectable?: boolean;
  hasMenu?: boolean;
}

interface HistoryGroup {
  label: string;
  count?: string;
  items: HistoryItem[];
}

const historyGroups: HistoryGroup[] = [
  {
    label: "Today",
    count: "3 chats",
    items: [
      { title: "Database comparison", selectable: true, hasMenu: true },
      { title: "Authentication architecture", hasMenu: true },
      { title: "AWS deployment options", hasMenu: true },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { title: "FastAPI architecture", hasMenu: true },
      { title: "API security & tokens", hasMenu: true },
    ],
  },
  {
    label: "Older",
    items: [
      { title: "Q3 Technical Roadmap" },
      { title: "Compliance & HIPAA guidelines" },
    ],
  },
];

interface ConversationHistoryProps {
  className?: string;
  activeTitle: string | null;
  onNewChat: () => void;
  onSelectChat: (title: string) => void;
}

export function ConversationHistory({
  className,
  activeTitle,
  onNewChat,
  onSelectChat,
}: ConversationHistoryProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Button className="w-full justify-between" onClick={onNewChat}>
        <span className="flex items-center gap-2">
          <Plus data-icon="inline-start" aria-hidden="true" />
          New Chat
        </span>
        <kbd className="bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs">
          ⌘N
        </kbd>
      </Button>

      <div className="flex flex-col gap-4 bg-card p-2 ring-1 ring-foreground/10">
        {historyGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {group.label}
              </span>
              {group.count && (
                <span className="font-mono text-xs text-muted-foreground">
                  {group.count}
                </span>
              )}
            </div>
            {group.items.map((item) => {
              const isActive = item.title === activeTitle;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "group/history-item flex items-center justify-between gap-1 px-2 py-2 text-xs",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {item.selectable ? (
                    <button
                      type="button"
                      onClick={() => onSelectChat(item.title)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <MessageSquare
                        className={cn(
                          "size-4 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.title}</span>
                    </button>
                  ) : (
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <MessageSquare
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.title}</span>
                    </div>
                  )}
                  {item.hasMenu && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Open options for ${item.title}`}
                            className="opacity-0 group-hover/history-item:opacity-100"
                          />
                        }
                      >
                        <MoreHorizontal aria-hidden="true" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className="mt-1 flex items-center gap-2 bg-muted p-2">
          <div className="flex size-7 shrink-0 items-center justify-center bg-background text-primary shadow-xs">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-medium text-foreground">
              RAG Accuracy Index
            </span>
            <span className="font-mono text-xs font-semibold text-primary">
              99.4% Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
