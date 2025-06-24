"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the shape of a single waitlist entry
interface WaitlistEntry {
  createdAt: string; // assuming it's a date string
  // Add any other relevant fields that might exist in each entry
}

type Props = {
  waitlist: WaitlistEntry[]; // Use the WaitlistEntry type for the waitlist array
};

export default function WaitlistTimeChart({ waitlist }: Props) {
  // Group by date
  const countsByDate: Record<string, number> = {};

  waitlist.forEach((entry) => {
    const date = format(new Date(entry.createdAt), "yyyy-MM-dd");
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  // Convert to array sorted by date
  const chartData = Object.entries(countsByDate)
    .map(([date, count]) => ({
      date,
      users: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartConfig = {
    users: {
      label: "Users Joined",
      color: "#8E8E8E", 
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full md:w-6/12 my-4 py-4 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-500 border border-neutral-500 rounded-lg shadow-none">
      <CardHeader>
        <CardTitle className="text-neutral-800 dark:text-neutral-200">Waitlist Growth</CardTitle>
        <CardDescription className="text-sm text-neutral-600 dark:text-neutral-300">
          New users joining per day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 0, bottom: 8 }}
          >
            <CartesianGrid vertical={false} stroke="#E6E6E6" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => format(new Date(value), "MMM d")}
              tick={{ fill: "#8E8E8E" }}
            />
            <ChartTooltip
             
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel className="bg-neutral-100 dark:bg-neutral-800" />}
            />
            <Area
              dataKey="users"
              type="monotone"
              fill="#DF5D23"
              fillOpacity={0.3}
              stroke="#DF5D23"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-200 leading-none">
              Trend over time <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              {chartData.length > 0
                ? `${format(new Date(chartData[0].date), "MMM d, yyyy")} - ${format(
                    new Date(chartData[chartData.length - 1].date),
                    "MMM d, yyyy"
                  )}`
                : "No data yet"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
