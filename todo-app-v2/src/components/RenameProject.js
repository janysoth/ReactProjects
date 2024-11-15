import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useContext, useState } from 'react';

import { TodoContext } from '../context';
import { db } from '../firebase';
import ProjectForm from './ProjectForm';

const RenameProject = ({ project, setShowModal }) => {
  const { selectedProject, setSelectedProject } = useContext(TodoContext);
  const [newProjectName, setNewProjectName] = useState(project.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProjectName === project.name) {
      setShowModal(false);
      return; // Skip if the name hasn't changed
    }

    try {
      const projectsRef = collection(db, 'projects');
      const projectExistsQuery = query(projectsRef, where('name', '==', newProjectName));
      const projectExistsSnapshot = await getDocs(projectExistsQuery);

      if (!projectExistsSnapshot.empty) {
        alert('A project with this name already exists!');
        return setShowModal(true);
      }

      // Update the project name
      const projectDocRef = doc(db, 'projects', project.id);
      await updateDoc(projectDocRef, { name: newProjectName });

      // Query todos with the old project name
      const todosQuery = query(
        collection(db, 'todos'),
        where('projectName', '==', project.name)
      );
      const todosSnapshot = await getDocs(todosQuery);

      // Update each todo's project name
      const updateTodoPromises = todosSnapshot.docs.map(todoDoc =>
        updateDoc(todoDoc.ref, { projectName: newProjectName })
      );
      await Promise.all(updateTodoPromises);

      if (selectedProject === project.name) {
        setSelectedProject(newProjectName);
      }

      console.log("Project and associated todos successfully renamed.");
      setShowModal(false);
    } catch (error) {
      console.error("Error renaming project or updating todos: ", error);
    }
  };

  return (
    <div className='RenameProject'>
      <ProjectForm
        handleSubmit={handleSubmit}
        heading='Edit Project Name'
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText='Confirm'
      />
    </div>
  );
};

export default RenameProject;