import React, { createContext, useMemo, useState } from 'react';
import { useProjects, useTodos } from '../hooks';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);

  const todos = useTodos();
  const projects = useProjects(todos);

  const contextValue = useMemo(() => ({
    selectedProject,
    setSelectedProject,
    todos,
    projects
  }), [selectedProject, todos, projects]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
