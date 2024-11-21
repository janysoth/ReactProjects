import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';

import { TodoContext } from '../context';
import { db } from '../firebase';

const Todo = ({ todo }) => {
  // STATE
  const [hover, setHover] = useState(false);

  // Context
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const handleDelete = todo => {
    deleteTodo(todo);

    if (selectedTodo === todo) setSelectedTodo(undefined);
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

  // Longer version of checkTodo 
  // const checkTodo = async (todo) => {
  //   // Early return if the `todo` object is invalid
  //   if (!todo || !todo.id) {
  //     console.error("Invalid todo object provided.");
  //     return;
  //   }

  //   try {
  //     // Reference to the specific todo document
  //     const todoRef = doc(db, "todos", todo.id);

  //     // Update the checked status of the todo
  //     await updateDoc(todoRef, { checked: !todo.checked });
  //     console.log(`Todo "${todo.id}" successfully updated.`);

  //     // Additional functionality: Fetch todos for optional processing (similar to your reference code)
  //     const todosQuery = query(
  //       collection(db, "todos"),
  //       where("checked", "==", !todo.checked)
  //     );
  //     const todosSnapshot = await getDocs(todosQuery);

  //     if (!todosSnapshot.empty) {
  //       console.log(`Found ${todosSnapshot.docs.length} todos with the new checked status.`);
  //     }
  //   } catch (error) {
  //     console.error("Error updating todo:", error);
  //   }
  // };

  const checkTodo = async (todo) => {
    try {
      // Create a reference to the document in Firebase
      const todoRef = doc(db, "todos", todo.id);

      // Update checked property of Todo
      await updateDoc(todoRef, { checked: !todo.checked });

      console.log("Todo has been successfully checked.");
    } catch (error) {
      console.error("Error in checking Todo: ", error);
    }
  };


  const repeatNextDay = async (todo) => {
    try {
      // Calculate the next day's date
      const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

      // Create the new todo object with updated fields
      const repeatedTodo = {
        ...todo,
        checked: false,
        date: nextDayDate.format("MM/DD/YYYY"),
        day: nextDayDate.format("d"),
      };

      // Remove the ID field to avoid conflicts with Firestore's auto-generated IDs
      delete repeatedTodo.id;

      // Add the repeated todo to the "todos" collection
      const todosRef = collection(db, "todos");
      await addDoc(todosRef, repeatedTodo);

      console.log("Repeated todo added successfully:", repeatedTodo);
    } catch (error) {
      console.error("Error adding repeated todo:", error);
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