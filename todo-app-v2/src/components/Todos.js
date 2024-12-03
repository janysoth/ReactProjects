import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Trash } from 'react-bootstrap-icons';

import { getAuth } from "firebase/auth";
import { TodoContext } from '../context';
import { db } from '../firebase';
import Next7Days from './Next7Days';
import Todo from './Todo';

const Todos = () => {
  const { selectedProject, todos } = useContext(TodoContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleDeleteAll = async () => {
    if (!user) {
      alert("You need to be signed in to delete todos.");
      return;
    }

    if (window.confirm("Are you sure you want to delete all todos?")) {
      try {
        const todosCollection = collection(db, 'todos');
        const userTodosQuery = query(todosCollection, where("userId", "==", user.uid));
        const todosSnapshot = await getDocs(userTodosQuery);

        const deletePromises = todosSnapshot.docs.map((todoDoc) =>
          deleteDoc(doc(db, 'todos', todoDoc.id))
        );
        await Promise.all(deletePromises);

        alert("All your todos have been deleted!");
      } catch (error) {
        console.error("Error in deleting todos: ", error);
        alert("Failed to delete todos. Please try again.");
      }
    }
  };

  return (
    <div className='Todos'>
      <div className="selected-project">
        <span>{selectedProject}</span>
        {user && todos.length > 0 &&
          <button onClick={handleDeleteAll} className='delete-all-button'>
            <Trash size={20} />
          </button>
        }
      </div>

      <div className='todos'>
        {todos.length === 0 ? (
          <div className='empty-todos'>
            No Todo Available
          </div>
        ) : selectedProject === 'next 7 days' ? (
          <Next7Days todos={todos.filter(todo => todo.userId === user?.uid)} />
        ) : (
          todos
            .filter(todo => todo.userId === user?.uid) // Ensure only user's todos are displayed
            .map(todo => <Todo todo={todo} key={todo.id} />)
        )}
      </div>
    </div>
  );
};

export default Todos;