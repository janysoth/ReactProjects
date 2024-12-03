import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';

import { getAuth } from "firebase/auth";
import { TodoContext } from '../context';
import { db } from '../firebase';

const Todo = ({ todo }) => {
  // STATE
  const [hover, setHover] = useState(false);

  // Context
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleDelete = (todo) => {
    if (user && todo.userId === user.uid) {
      deleteTodo(todo);

      if (selectedTodo === todo) setSelectedTodo(undefined);
    } else {
      console.error("Unauthorized action. Cannot delete this todo.");
    }
  };

  const deleteTodo = (todo) => {
    deleteDoc(doc(db, 'todos', todo.id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error in deleting todo: ", error);
      });
  };

  const checkTodo = async (todo) => {
    if (user && todo.userId === user.uid) {
      try {
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, { checked: !todo.checked });
        console.log("Todo has been successfully checked.");
      } catch (error) {
        console.error("Error in checking Todo: ", error);
      }
    } else {
      console.error("Unauthorized action. Cannot check this todo.");
    }
  };

  const repeatNextDay = async (todo) => {
    if (user && todo.userId === user.uid) {
      try {
        const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

        const repeatedTodo = {
          ...todo,
          checked: false,
          date: nextDayDate.format("MM/DD/YYYY"),
          day: nextDayDate.format("d"),
          userId: user.uid, // Ensure repeated todo is also associated with the user
        };

        delete repeatedTodo.id;

        const todosRef = collection(db, "todos");
        await addDoc(todosRef, repeatedTodo);

        console.log("Repeated todo added successfully:", repeatedTodo);
      } catch (error) {
        console.error("Error adding repeated todo:", error);
      }
    } else {
      console.error("Unauthorized action. Cannot repeat this todo.");
    }
  };

  return (
    <div className='Todo'>
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="check-todo"
          onClick={() => checkTodo(todo)}
        >
          {
            todo.checked ?
              <span className="checked">
                <CheckCircleFill color='#bebebe' />
              </span>
              :
              <span className="uncheck">
                <Circle color={todo.color} />
              </span>
          }
        </div>

        <div
          className="text"
          onClick={() => setSelectedTodo(todo)}
        >
          <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>
            {todo.text}
          </p>

          <span>{todo.time} - {todo.date} - {todo.projectName}</span>

          <div className={`line ${todo.checked ? 'line-through' : ''}`} />
        </div>

        <div
          className="add-to-next-day"
          onClick={() => repeatNextDay(todo)}
        >
          {
            todo.checked &&
            <span>
              <ArrowClockwise />
            </span>
          }
        </div>

        <div
          className="delete-todo"
          onClick={() => handleDelete(todo)}
        >
          {
            (hover || todo.checked) &&
            <span>
              <Trash />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Todo;