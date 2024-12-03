import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import randomcolor from 'randomcolor';
import React, { useContext, useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { calendarItems } from '../constants';
import { TodoContext } from '../context';
import { db } from "../firebase";
import Modal from './Modal';
import TodoForm from './TodoForm';

function AddNewTodo() {
  // Context
  const { selectedProject, projects } = useContext(TodoContext);

  // State
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  // User Authentication
  const auth = getAuth();
  const user = auth.currentUser;

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      console.error("User not authenticated. Please log in.");
      return;
    }

    if (text && !calendarItems.includes(todoProject)) {
      addDoc(collection(db, 'todos'), {
        text: text,
        date: moment(day).format('MM/DD/YYYY'),
        day: moment(day).format('d'),
        time: moment(time).format('hh:mm A'),
        checked: false,
        color: randomcolor(),
        projectName: todoProject,
        userId: user.uid,
      })
        .then(() => {
          setShowModal(false);
          setText('');
          setDay(new Date());
          setTime(new Date());
        })
        .catch((error) => {
          console.error("Error adding a new todo: ", error);
        });
    }
  }

  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className='AddNewTodo'>
      <div className="btn">
        <button onClick={() => setShowModal(true)}>
          + New Todo
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading='Add New Todo'
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddNewTodo;