import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    return todos.filter(todo => todo.projectName === projectName).length;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const projectName = doc.data().name;
        return {
          id: doc.id,
          name: projectName,
          numOfTodos: calculateNumOfTodos(projectName, todos)
        };
      });
      setProjects(data);
    });

    return () => unsubscribe();
  }, [todos]);

  return projects;
}