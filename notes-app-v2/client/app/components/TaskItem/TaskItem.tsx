import React from 'react';

import { useTasks } from '@/context/taskContext';
import { edit, star, trash } from "@/utils/Icons";
import { Task } from '@/utils/types';
import { formatTime } from '@/utils/utilities';

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
  const { getTask, deleteTask } = useTasks();

  return (
    <div className={`h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 hover:bg-gray-200 ${border} ${text}`}>
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>

      <div className='mt-auto flex justify-between items-center'>
        <p className={`text-sm text-gray-400 ${text}`}>
          {formatTime(task.createdAt)}
        </p>

        <p className={`text-sm font-bold ${text}`}>
          {task.priority}
        </p>

        <div>
          <div className='flex items-center gap-3 text-gray-400 text-[1.2rem]'>
            {/* Complete Task */}
            <button
              className={
                `${task.completed ? "text-yellow-400" : "text-gray-400"}`
              }
            >
              {star}
            </button>

            {/* Edit Task */}
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
              }}
            >
              {edit}
            </button>

            {/* Delete Task */}
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem;