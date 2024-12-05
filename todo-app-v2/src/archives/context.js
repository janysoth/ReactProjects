import React, { createContext, useMemo, useState } from 'react';
import { useFilterTodos, useProjects, useProjectsWithStats, useTodos } from '../hooks';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);

  const todos = useTodos();
  const projects = useProjects(todos);
  const projectsWithStats = useProjectsWithStats(projects, todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  const contextValue = useMemo(() => ({
    defaultProject,
    selectedProject,
    setSelectedProject,
    todos: filteredTodos,
    projects: projectsWithStats,
    selectedTodo,
    setSelectedTodo
  }), [selectedProject, filteredTodos, projectsWithStats, selectedTodo]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
