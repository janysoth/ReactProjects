import { useTasks } from '@/context/taskContext';
import { edit, repeat, star, trash } from "@/utils/Icons"; // Import the copy/duplicate icon
import { Task } from '@/utils/types';
import { formatDueDate, formatTime } from '@/utils/utilities';
import React from 'react';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case 'low':
        return { text: "text-green-500", border: "border-green-500" };
      case "medium":
        return { text: "text-yellow-500", border: "border-yellow-500" };
      case "high":
        return { text: "text-red-500", border: "border-red-500" };
      default:
        return { text: "text-red-500", border: "border-red-500" };
    }
  };

  const { text, border } = getPriorityClasses(task.priority);
  const { getTask, deleteTask, openModalForEdit, modalMode, toggleComplete, createTask } = useTasks();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(task.dueDate);
  dueDate.setUTCHours(0, 0, 0, 0);

  const timeDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dueDateStyle = timeDiff <= 2 ? "text-red-500 font-bold" : "text-gray-400";
  const completedDueDateStyle = "line-through text-green-500";

  // Function to duplicate task for the next day
  const duplicateTask = () => {
    const nextDay = new Date(task.dueDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const duplicatedTask = {
      ...task,
      // _id: crypto.randomUUID(), // Generate a new unique ID
      dueDate: nextDay.toISOString(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    createTask(duplicatedTask);
  };

  return (
    <div className={`h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 hover:bg-gray-200 ${border} ${text}`}>
      {/* Header with Due Date */}
      <div className="flex justify-between">
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p className={`text-sm ${task.completed ? completedDueDateStyle : dueDateStyle}`}>
          Due: {formatDueDate(task.dueDate)}
        </p>
      </div>

      <p>{task.description}</p>

      <div className='mt-auto flex justify-between items-center'>
        <p className={`text-sm text-gray-400 ${text}`}>
          {formatTime(task.createdAt)}
        </p>

        <p className={`text-sm font-bold ${text}`}>
          {task.priority.toUpperCase()}
        </p>

        <div className='flex items-center gap-3 text-gray-400 text-[1.2rem]'>
          {/* Complete Task */}
          <button
            className={`${task.completed ? "text-yellow-400" : "text-gray-400"}`}
            onClick={() => toggleComplete(task)}
          >
            {star}
          </button>

          {/* Duplicate Task */}
          <button
            className="text-[#32CD32]" // Green color for duplication
            onClick={duplicateTask}
          >
            {repeat} {/* Assuming copy is an icon for duplication */}
          </button>

          {/* Edit Task */}
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            {edit}
          </button>

          {/* Delete Task */}
          <button
            className="text-[#F65314]"
            onClick={() => deleteTask(task._id)}
          >
            {trash}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;