import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-medium">Hello Doc Mind</h1>
      <p>Ask questions, search your documents, or upload something new.</p>
    </div>
  );
}
