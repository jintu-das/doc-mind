import { createFileRoute } from "@tanstack/react-router";
import { SemanticSearchPage } from "@/features/semantic-search/semantic-search-page";

export const Route = createFileRoute("/semantic-search")({
  component: SemanticSearchPage,
});
