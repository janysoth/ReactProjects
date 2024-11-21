import { doc, updateDoc } from "firebase/firestore";
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

import { TodoContext } from '../context';
import { db } from '../firebase';
import TodoForm from './TodoForm';

const EditTodo = () => {
  // STATE
  const [text, setText] = useState();
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState();

  // CONTEXT
  const { selectedTodo, projects } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, 'MM/DD/YYYY'));
      setTime(moment(selectedTodo.time, 'hh:mm A'));
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  useEffect(() => {
    const updateTodo = async () => {
      if (selectedTodo) {
        try {
          // Reference the specific document in the "todos" collection
          const todoRef = doc(db, "todos", selectedTodo.id);

          // Update the todo document with the new values
          await updateDoc(todoRef, {
            text,
            date: moment(day).format("MM/DD/YYYY"),
            day: moment(day).format("d"),
            time: moment(time).format("hh:mm A"),
            projectName: todoProject,
          });

          console.log("Todo successfully updated.");
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      }
    };

    updateTodo(); // Call the async function inside useEffect
  }, [selectedTodo, text, day, time, todoProject]);

  const handleSubmit = () => {

  };

  return (
    <div>
      {
        selectedTodo &&
        <div className='EditTodo'>
          <div className="header">
            Edit Todo
          </div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default EditTodo;