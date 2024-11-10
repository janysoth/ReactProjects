import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';

import { Plus } from 'react-bootstrap-icons';
import { db } from "../firebase";
import Modal from './Modal';
import ProjectForm from './ProjectForm';

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      const projectsRef = collection(db, 'projects');

      // Create a query to check if the project already exists
      const projectQuery = query(projectsRef, where('name', '==', projectName));

      getDocs(projectQuery)
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            // If no project with the same name exists, add a new project
            addDoc(projectsRef, { name: projectName })
              .then(() => {
                setShowModal(false);
                setProjectName('');
              })
              .catch(error => {
                console.error("Error adding project: ", error);
              });
          } else {
            alert('Project already exists!');
          }
        })
        .catch(error => {
          console.error("Error checking project existence: ", error);
        });
    }
  }

  return (
    <div className='AddNewProject'>
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSumbit={handleSubmit}
          heading='New Project'
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText='Add Project'
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;