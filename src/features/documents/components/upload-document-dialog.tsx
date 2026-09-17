import {
  CheckCircle2,
  Circle,
  CloudUpload,
  FileText,
  Info,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState, type DragEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const pipelineStages = [
  "Uploading document",
  "Extracting text & OCR",
  "Creating semantic chunks",
  "Generating embeddings (pgvector)",
  "Indexing into knowledge graph",
];

const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export function UploadDocumentDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setFile(null);
      setSubmitting(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const handleUpload = () => {
    if (!file) return;
    setSubmitting(true);
    setTimeout(() => {
      handleOpenChange(false);
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>
        <Plus data-icon="inline-start" aria-hidden="true" />
        Upload Document
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="flex-row items-start gap-3 border-b p-4">
          <div className="flex size-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
            <CloudUpload className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle>Upload document</DialogTitle>
            <DialogDescription>
              Upload a PDF to add it to your knowledge base.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          {file ? (
            <div className="flex items-center justify-between gap-3 bg-muted/40 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <FileText className="size-4" aria-hidden="true" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium text-foreground">
                    {file.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span>{formatSize(file.size)}</span>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center gap-1 text-primary">
                      <CheckCircle2 className="size-3" aria-hidden="true" />
                      Ready for pipeline
                    </span>
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setFile(null)}
                disabled={submitting}
              >
                <Trash2 data-icon="inline-start" aria-hidden="true" />
                Remove
              </Button>
            </div>
          ) : (
            <label
              className="flex cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-input bg-muted/20 p-6 text-center transition-colors hover:bg-muted/40"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="mb-1 flex size-10 items-center justify-center bg-background text-primary shadow-xs">
                <CloudUpload className="size-5" aria-hidden="true" />
              </div>
              <p className="font-medium text-foreground">
                Drag &amp; drop your PDF here or{" "}
                <span className="text-primary underline underline-offset-2">
                  Browse files
                </span>
              </p>
              <span className="text-xs text-muted-foreground">
                PDF files up to 50 MB · High-res OCR supported
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="sr-only"
                onChange={(event) => {
                  const selected = event.target.files?.[0];
                  if (selected) setFile(selected);
                }}
              />
            </label>
          )}

          <div className="flex flex-col gap-2.5 bg-muted/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Knowledge Pipeline Stages
              </span>
              <span className="text-xs font-medium text-primary">
                Auto-Execute
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {pipelineStages.map((stage, index) => (
                <div key={stage} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {index === 0 ? (
                      <CheckCircle2
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        index === 0 ? "text-foreground" : "text-muted-foreground"
                      }
                    >
                      {stage}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? "100%" : "Queued"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-primary/5 p-3 text-xs text-muted-foreground">
            <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              Text embeddings use{" "}
              <span className="font-medium text-foreground">
                text-embedding-3-large
              </span>{" "}
              with 1536 dimensions.
            </span>
          </div>
        </div>

        <DialogFooter className="border-t p-4">
          <DialogClose render={<Button variant="ghost" />} disabled={submitting}>
            Cancel
          </DialogClose>
          <Button onClick={handleUpload} disabled={!file || submitting}>
            {submitting ? (
              <Loader2
                data-icon="inline-start"
                aria-hidden="true"
                className="animate-spin"
              />
            ) : (
              <Sparkles data-icon="inline-start" aria-hidden="true" />
            )}
            {submitting ? "Starting Pipeline…" : "Upload & Process"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
