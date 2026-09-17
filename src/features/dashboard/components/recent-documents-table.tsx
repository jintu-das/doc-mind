import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  MoreHorizontal,
  RotateCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";

const documents = [
  {
    id: "doc_7a82f",
    name: "AWS Architecture.pdf",
    type: "PDF",
    size: "2.4 MB",
    status: "Processed",
    uploaded: "Sep 12",
    action: "Ask AI",
  },
  {
    id: "doc_11e4d",
    name: "FastAPI Guide.pdf",
    type: "PDF",
    size: "1.8 MB",
    status: "Processed",
    uploaded: "Sep 11",
    action: "Ask AI",
  },
  {
    id: "doc_993bc",
    name: "Company Policy.pdf",
    type: "PDF",
    size: "4.2 MB",
    status: "Processing",
    uploaded: "Sep 11",
    action: "View Progress",
  },
  {
    id: "doc_024ea",
    name: "Research Paper.pdf",
    type: "PDF",
    size: "8.1 MB",
    status: "Failed",
    uploaded: "Sep 10",
    action: "Retry",
  },
];

const statusVariant: Record<string, "secondary" | "outline" | "destructive"> = {
  Processed: "secondary",
  Processing: "outline",
  Failed: "destructive",
};

export default function RecentDocumentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
        <CardDescription>
          Real-time status of document indexes and knowledge vectors
        </CardDescription>
        <CardAction>
          <Link
            to="/documents"
            className={buttonVariants({ variant: "link", size: "sm" })}
          >
            View all documents
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{doc.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {doc.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[doc.status]}>
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>{doc.uploaded}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" size="sm">
                      {doc.action === "Retry" && (
                        <RotateCw data-icon="inline-start" aria-hidden="true" />
                      )}
                      {doc.action}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Open menu"
                          />
                        }
                      >
                        <MoreHorizontal aria-hidden="true" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">
          Showing {documents.length} of 24 indexed documents
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" aria-label="Previous page">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <span className="px-2 text-xs text-muted-foreground">Page 1 / 6</span>
          <Button variant="outline" size="icon-sm" aria-label="Next page">
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
