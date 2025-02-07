"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { setPriority } from "os";
import { useEffect } from "react";
import Filters from "./components/Filters/Filters";
import TaskItem from "./components/TaskItem/TaskItem";

export default function Home() {
  useRedirect("/login");

  const { tasks, setPriority } = useTasks();

  useEffect(() => {
    setPriority("all");
  }, [])

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks:</h1>
        <Filters />
      </div>

      <div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
      >
        {tasks.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
      </div>
    </main>
  );
}