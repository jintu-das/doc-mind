import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ingestionData = [
  { day: "M", tokens: 32400 },
  { day: "T", tokens: 38900 },
  { day: "W", tokens: 27100 },
  { day: "T", tokens: 48210 },
  { day: "F", tokens: 35600 },
  { day: "S", tokens: 18200 },
  { day: "S", tokens: 41700 },
];

const ingestionConfig = {
  tokens: {
    label: "Tokens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function IngestionChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Knowledge Ingestion Activity</CardTitle>
        <CardDescription>
          Tokens extracted and parsed per daily window
        </CardDescription>
        <CardAction>
          <Tabs defaultValue="7d">
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={ingestionConfig}
          className="h-64 w-full"
          role="img"
          aria-label="Bar chart of tokens ingested per day this week. Thursday is the peak at 48,210 tokens; Saturday is the lowest at 18,200 tokens."
        >
          <BarChart data={ingestionData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="tokens" fill="var(--color-tokens)" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Vector density: 48,210 tokens
        </span>
        <span>Avg 98.4ms latency</span>
      </CardFooter>
    </Card>
  );
}
