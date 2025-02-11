"use client"
import { useTasks } from '@/context/taskContext';
import useRedirect from '@/hooks/useUserRedirect';
import { Task } from '@/utils/types';
import { filteredTasks } from '@/utils/utilities';
import React, { useEffect } from 'react';
import Filters from '../components/Filters/Filters';
import TaskItem from '../components/TaskItem/TaskItem';

const CompletedTasksPage = () => {
  useRedirect("/login");

  const { openModalForAdd, priority, completedTasks, setPriority } = useTasks();

  const tasksFiltered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, [])

  return (
    <main className="m-2 h-screen flex flex-col rounded-[1rem]">
      {/* Sticky Header */}
      <div className='sticky top-3 z-10 p-2  rounded-md'>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Completed Tasks</h1>
        <div className="rounded-md shadow-md">
          <Filters />
        </div>
      </div>

      {/* To Display Filtered Tasks */}
      <div className="flex-1 overflow-y-auto mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[18rem]">
        {tasksFiltered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}

        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </button>
      </div>
    </main>
  )
}

export default CompletedTasksPage