import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "./userContext";

const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({ children }) => {
  const { user } = useUserContext();
  const userId = user._id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});

  // get tasks
  const getTasks = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${serverUrl}/tasks`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }

    setLoading(false);
  };

  // get task
  const getTask = async (taskId) => {
    setLoading(true);

    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);

      setTask(response.data);
    } catch (error) {
      console.log("Error getting task", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, [userId]);

  console.log(tasks);

  return (
    <TasksContext.Provider value={{
      tasks,
      loading,
      task,
      getTask,
      getTasks
    }}>
      {children}
    </TasksContext.Provider>
  );
};