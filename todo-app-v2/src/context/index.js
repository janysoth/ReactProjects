import React, { createContext, useMemo, useState } from 'react';
import { useFilterTodos, useProjects, useTodos } from '../hooks';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);

  const todos = useTodos();
  const projects = useProjects(todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  const contextValue = useMemo(() => ({
    defaultProject,
    selectedProject,
    setSelectedProject,
    todos: filteredTodos,
    projects
  }), [selectedProject, filteredTodos, projects]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
