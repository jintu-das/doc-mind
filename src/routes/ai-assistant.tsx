import { createFileRoute } from "@tanstack/react-router";
import { AiAssistantPage } from "@/features/ai-assistant/ai-assistant-page";

export const Route = createFileRoute("/ai-assistant")({
  component: AiAssistantPage,
});
