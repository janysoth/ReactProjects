import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useContext, useState } from 'react';

import { TodoContext } from '../context';
import { db } from '../firebase';
import ProjectForm from './ProjectForm';

const RenameProject = ({ project, setShowModal }) => {
  // Context 
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  // State
  const [newProjectName, setNewProjectName] = useState(project.name);

  const renameProject = async (project, newProjectName) => {
    try {
      // Reference to the projects collection
      const projectsRef = collection(db, 'projects');

      // Check if a project with the new name already exists
      const projectQuery = query(projectsRef, where('name', '==', newProjectName));
      const projectSnapshot = await getDocs(projectQuery);

      if (!projectSnapshot.empty) {
        alert('A project with this name already exists!');
        setShowModal(true);
        return; // Early return to stop execution if the project name exists
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
      todosSnapshot.forEach(async (todoDoc) => {
        await updateDoc(todoDoc.ref, { projectName: newProjectName });
      });

      // Update selected project if necessary
      if (selectedProject === project.name) {
        setSelectedProject(newProjectName);
      }

      console.log("Project and associated todos successfully renamed.");
    } catch (error) {
      console.error("Error in renaming project or updating todos: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renameProject(project, newProjectName);
    setShowModal(false);
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