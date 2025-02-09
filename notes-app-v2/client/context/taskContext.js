import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
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

  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState(("all"));
  const [activeTask, setActiveTask] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  // Open Modal to Add task
  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  // Open Modal to Edit task
  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  // Open Profile Modal
  const openProfileModal = () => {
    setProfileModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

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

  // Create a task
  const createTask = async (task) => {
    setLoading(true);

    try {
      const response = await axios.post(`${serverUrl}/task/create`, task);

      console.log("Task created: ", response.data);

      setTasks([...tasks, response.data]);
      toast.success("Task created successfully.");
    } catch (error) {
      console.log("Error in creating a task.", error);
    }

    setLoading(false);
  };

  // Update a task
  const updateTask = async (task) => {
    setLoading(true);

    try {
      const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);

      // Update the task in the tasks array
      const newTasks = tasks.map(oldTask => {
        return oldTask._id === response.data._id ? response.data : oldTask;
      });

      toast.success("Task updated successfully.");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error in updating a task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);

    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      // Remove the task from the tasks away
      const updatedTasks = tasks.filter(currentTask => currentTask._id !== taskId);

      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error in deleting a task: ", error);
    }

    setLoading(false);
  };

  // Handle input
  const handleInput = (name) => (e) => {
    if (name === "setTask")
      setTask(e);
    else
      setTask({ ...task, [name]: e.target.value });
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
      tasks,
      getTask,
      createTask,
      updateTask,
      deleteTask,
      priority,
      setPriority,
      handleInput,
      isEditing,
      setIsEditing,
      openModalForAdd,
      openModalForEdit,
      activeTask,
      closeModal,
      modalMode,
      openProfileModal,
      profileModal,
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};