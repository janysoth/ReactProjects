import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Pencil, XCircle } from 'react-bootstrap-icons';
import { animated, useSpring, useTransition } from 'react-spring';

import { TodoContext } from '../context';
import { db } from "../firebase";
import { useBtnTransition, useFadeInAnimation } from '../hooks';
import Modal from './Modal';
import RenameProject from './RenameProject';

const Project = ({ project, edit }) => {
  // Context
  const { defaultProject, selectedProject, setSelectedProject } = useContext(TodoContext);

  // State
  const [showModal, setShowModal] = useState(false);

  const deleteProject = async (project) => {
    try {
      // Delete the project document
      await deleteDoc(doc(db, "projects", project.id));

      // Query todos with the same project name
      const todosQuery = query(
        collection(db, 'todos'),
        where('projectName', "==", project.name)
      );

      const querySnapshot = await getDocs(todosQuery);

      // Delete each matching todo document
      querySnapshot.forEach(async (todoDoc) => {
        await deleteDoc(todoDoc.ref);
      });

      // Update selected project if necessary
      if (selectedProject === project.name)
        setSelectedProject(defaultProject);

      console.log("Project and associated todos successfully deleted. ");
    } catch (error) {
      console.error("Error in deleting project or todos: ", error);
    }
  };

  // Animation
  const fadeIn = useFadeInAnimation();
  const btnTransitions = useBtnTransition(edit);

  return (
    <animated.div style={fadeIn} className='Project'>
      <div
        className="name"
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>

      <div className="btns">
        {
          btnTransitions((props, editProject) =>
            editProject ?
              <animated.div style={props} className="edit-delete">
                <span className="edit" onClick={() => setShowModal(true)}>
                  <Pencil size="13" />
                </span>

                <span
                  className="delete"
                  onClick={() => deleteProject(project)}
                >
                  <XCircle size="13" />
                </span>
              </animated.div>
              :
              project.numOfTodos === 0 ?
                ""
                :
                <animated.div style={props} className="total-todos">
                  {project.numOfTodos}
                </animated.div>
          )
        }
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </animated.div>
  );
};

export default Project;