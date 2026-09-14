import { Cell, Pie, PieChart } from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const coverageData = [
  { format: "PDF Files", value: 75, fill: "var(--chart-1)" },
  { format: "Markdown / TXT", value: 20, fill: "var(--chart-2)" },
  { format: "Spreadsheets", value: 5, fill: "var(--chart-3)" },
];

const coverageConfig = {
  value: { label: "Share" },
  "PDF Files": { label: "PDF Files", color: "var(--chart-1)" },
  "Markdown / TXT": { label: "Markdown / TXT", color: "var(--chart-2)" },
  Spreadsheets: { label: "Spreadsheets", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function CorpusCoverageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Corpus Coverage</CardTitle>
        <CardDescription>Distribution across formats</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <ChartContainer
          config={coverageConfig}
          className="aspect-square h-40 w-40 shrink-0"
          role="img"
          aria-label="Donut chart of corpus coverage by format: PDF Files 75%, Markdown or TXT 20%, Spreadsheets 5%."
        >
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={coverageData}
              dataKey="value"
              nameKey="format"
              innerRadius={45}
              outerRadius={65}
              strokeWidth={2}
            >
              {coverageData.map((entry) => (
                <Cell key={entry.format} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">
            24{" "}
            <span className="text-xs font-normal text-muted-foreground">
              Files
            </span>
          </p>
          {coverageData.map((entry) => (
            <div
              key={entry.format}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className="size-2 shrink-0 rounded-xs"
                style={{ backgroundColor: entry.fill }}
                aria-hidden="true"
              />
              {entry.format} ({entry.value}%)
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">
          Automatic OCR Parsing
        </span>
        <Badge variant="secondary">Enabled</Badge>
      </CardFooter>
    </Card>
  );
}
