import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/documents")({
  component: Documents,
});

function Documents() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-medium">Documents</h1>
      <p>Your uploaded documents will appear here.</p>
    </div>
  );
}
