import {
  ChevronDown,
  Loader2,
  Mic,
  Paperclip,
  Send,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  forwardRef,
  useState,
  type KeyboardEvent,
} from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

const models = ["RAG Hybrid Search v2", "RAG Hybrid Search v1", "Vector-Only Search"];

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(
  function ChatComposer({ value, onChange }, ref) {
    const [model, setModel] = useState(models[0]);
    const [sending, setSending] = useState(false);

    const handleSend = () => {
      if (!value.trim() || sending) return;
      setSending(true);
      setTimeout(() => {
        setSending(false);
        onChange("");
      }, 500);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    };

    return (
      <div className="flex flex-col gap-2 bg-card p-4 shadow-md ring-1 ring-foreground/10">
        <div className="flex items-start gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Attach document or context"
          >
            <Paperclip aria-hidden="true" />
          </Button>
          <Textarea
            ref={ref}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question across all documents… (Markdown & citations enabled)"
            rows={2}
            disabled={sending}
            className="min-h-16 flex-1 resize-none border-0 shadow-none focus-visible:ring-0"
          />
          <Button
            size="icon"
            aria-label="Send message"
            disabled={!value.trim() || sending}
            onClick={handleSend}
          >
            {sending ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Send aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-2">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="xs"
                    className="gap-1.5 bg-muted text-muted-foreground hover:text-foreground"
                  />
                }
              >
                <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground">{model}</span>
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                  {models.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="hidden items-center gap-1.5 bg-muted px-2 py-1 text-xs text-muted-foreground sm:flex">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Strict Citation Grounding:{" "}
              <span className="font-semibold text-foreground">1.00</span>
            </span>

            <Button variant="ghost" size="icon-xs" aria-label="Speech to text">
              <Mic aria-hidden="true" />
            </Button>
          </div>

          <div className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground md:flex">
            <span>Return to send</span>
            <span aria-hidden="true">·</span>
            <span>Shift + Return for newline</span>
          </div>
        </div>
      </div>
    );
  },
);
