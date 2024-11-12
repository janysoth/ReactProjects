import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import { db } from '../firebase';

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false);

  const deleteTodo = (todo) => {
    deleteDoc(doc(db, 'todos', todo.id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error in deleting todo: ", error);
      });
  };

  return (
    <div className='Todo'>
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo">
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

        <div className="text">
          <p style={{ color: todo.checked ? '#bebebe' : '#00000' }}>
            {todo.text}
          </p>

          <span>{todo.time} - {todo.date} - {todo.projectName}</span>

          <div className={`line ${todo.checked ? 'line-through' : ''}`} />
        </div>

        <div className="add-to-next-day">
          {
            todo.checked &&
            <span>
              <ArrowClockwise />
            </span>
          }
        </div>

        <div
          className="delete-todo"
          onClick={() => deleteTodo(todo)}
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