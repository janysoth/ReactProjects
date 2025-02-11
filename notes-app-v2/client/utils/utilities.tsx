import moment from "moment";
import { Task } from "./types";

export const formatTime = (createdAt: string) => {
  const now = moment().utc().startOf("day"); // Use UTC and reset time
  const created = moment.utc(createdAt).startOf("day"); // Ensure created date is also in UTC

  // if the task was created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the task was created yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // check if created with the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  // if item was created within the last 4 weeks (up to 1 month ago)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("MM/DD/YYYY");
};

export const formatDueDate = (dueDate: string) => {
  const now = moment().utc().startOf("day"); // Use UTC and reset time
  const formattedDueDate = moment.utc(dueDate).startOf("day"); // Ensure created date is also in UTC

  // If the Task is due tomorrow
  if (formattedDueDate.isSame(now.add(1, "days"), "day")) {
    return "Tomorrow";
  }

  // If the Task is due today
  if (formattedDueDate.isSame(now, "day")) {
    return "Today";
  }

  // If the Task is due yesterday
  if (formattedDueDate.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // Check to see if the Task is due within the last 7 days
  if (formattedDueDate.isAfter(moment().subtract(6, "days"))) {
    return formattedDueDate.fromNow();
  }

  // If the Task was due within the last 4 weeks (up to 1 month ago)
  if (formattedDueDate.isAfter(moment().subtract(3, "weeks"), "week")) {
    return formattedDueDate.fromNow();
  }

  return formattedDueDate.format("MM/DD/YYYY");
};

export const filteredTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = () => {
    switch (priority) {
      case "low":
        return tasks.filter((task) => task.priority === "low");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "high":
        return tasks.filter((task) => task.priority === "high");
      default:
        return tasks;
    }
  };

  return filteredTasks();
};

export const overdueTasks = (tasks: Task[]) => {
  const todayDate = moment();

  // filter tasks that are not completed and the due date is before today
  return tasks.filter((task) => {
    return !task.completed && moment(task.dueDate).isBefore(todayDate);
  });
};
