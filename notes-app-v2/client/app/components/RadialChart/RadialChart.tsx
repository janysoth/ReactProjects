"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
} satisfies ChartConfig;

function RadialChart() {
  // Import items from the global context file called useTasks
  const { tasks, completedTasks, activeTasks } = useTasks();

  const totalTasks = tasks.length;

  const chartData = [
    {
      Pending: activeTasks.length,
      Completed: completedTasks.length,
    },
  ];

  return (
    <Card className="flex flex-col mt-2 border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center">
        <CardTitle>Completed</CardTitle>
        <CardTitle>vs</CardTitle>
        <CardTitle>Pending Tasks</CardTitle>
        <CardDescription>Task completion status:</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalTasks}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col mt-[-2rem] text-lg">
        <CardTitle className="text-lg">You have : {activeTasks.length} {activeTasks.length > 1 ? "Tasks" : "Task"} left to do</CardTitle>
      </CardFooter>
    </Card>
  );
}

export default RadialChart;
