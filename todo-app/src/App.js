import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(); // Removed unnecessary parameter

    if (input === '') {
      alert('Please enter a valid todo.');
      return;
    }

    try {
      await addDoc(collection(db, 'todos'), {
        text: input,
        completed: false,
      });
      setInput('');
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  // Read todo from Firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosList = [];
      querySnapshot.forEach((doc) => {
        todosList.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTodos(todosList);
    });

    return () => unsubscribe(); // Correct cleanup
  }, []);

  // Update todo in Firebase
  const toggleComplete = async (todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed,
      });
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id} // Use the unique Firestore document ID
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos.`}</p>
        )}
      </div>
    </div>
  );
}

export default App;