"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import Filters from "./components/Filters/Filters";
import TaskItem from "./components/TaskItem/TaskItem";

export default function Home() {
  useRedirect("/login");

  const { tasks, setPriority, priority } = useTasks();

  const tasksFiltered = filteredTasks(tasks, priority);

  useEffect(() => {
    setPriority("all");
  }, [])

  return (
    <main className="m-6 h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="flex justify-between sticky top-3 z-10 p-4 shadow-md bg-gray-100 rounded-[1rem]">
        <h1 className="text-2xl font-bold">All Tasks:</h1>
        <Filters />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[6rem]">
        {tasksFiltered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
      </div>
    </main>
  );
}