import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/semantic-search")({
  component: SemanticSearch,
});

function SemanticSearch() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-medium">Semantic Search</h1>
      <p>Search across your documents by meaning, not just keywords.</p>
    </div>
  );
}
