import { collection, onSnapshot } from "firebase/firestore";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useSpring, useTransition } from 'react-spring';

import { db } from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  return todos;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const projectName = doc.data().name;
        return {
          id: doc.id,
          name: projectName,
        };
      });
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  return projects;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = moment().format('MM/DD/YYYY');

    if (selectedProject === 'today')
      data = todos.filter(todo => todo.date === todayDateFormated);
    else if (selectedProject === 'next 7 days') {
      data = todos.filter(todo => {
        const todoDate = moment(todo.date, 'MM/DD/YYYY');
        const todayDate = moment(todayDateFormated, 'MM/DD/YYYY');

        const diffDays = todoDate.diff(todayDate, 'days');

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === 'all days')
      data = todos;
    else
      data = todos.filter(todo => todo.projectName === selectedProject);

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(todo => todo.projectName === project.name && !todo.checked).length,
        ...project
      };
    });

    setProjectsWithStats(data);
  }, [projects, todos]);

  return projectsWithStats;
}

export const useSpinAnimation = (showMenu) => {
  return useSpring({
    transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
    config: { duration: 150, friction: 10 }
  });
};


// Animation Hooks
export const useMenuAnimation = (showMenu) => {
  return useSpring({
    display: showMenu ? 'block' : 'none',
    lineHeight: showMenu ? 1.2 : 0,
  });
};

export const useModalAnimation = (showModal) => {
  return useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? '25%' : '0%',
    config: { friction: 10 }
  });
};

export const useFadeInAnimation = () => {
  return useSpring({
    from: { marginTop: '-12px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 }
  });
};

export const useBtnTransition = (edit) => {
  return useTransition(edit, {
    from: { opacity: 0, right: '-20px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-20px' },
  });
};