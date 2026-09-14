import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-assistant")({
  component: AiAssistant,
});

function AiAssistant() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-medium">AI Assistant</h1>
      <p>Ask questions about your documents and get answers.</p>
      <Button>Chat Now</Button>
    </div>
  );
}
