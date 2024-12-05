import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase'; // Import Firebase auth instance
import { useFilterTodos, useProjects, useProjectsWithStats, useTodos } from '../hooks';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch the currently logged-in user's ID dynamically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid); // Set the user's UID
      } else {
        setCurrentUserId(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch data using hooks with the currentUserId
  const todos = useTodos(currentUserId); // Pass user ID to fetch user-specific todos
  const projects = useProjects(currentUserId); // Pass user ID to fetch user-specific projects
  const projectsWithStats = useProjectsWithStats(projects, todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  // Memoize context value to avoid unnecessary renders
  const contextValue = useMemo(
    () => ({
      defaultProject,
      selectedProject,
      setSelectedProject,
      todos: filteredTodos,
      projects: projectsWithStats,
      selectedTodo,
      setSelectedTodo,
      currentUserId,
    }),
    [defaultProject, selectedProject, filteredTodos, projectsWithStats, selectedTodo, currentUserId] // Include all dependencies
  );

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
