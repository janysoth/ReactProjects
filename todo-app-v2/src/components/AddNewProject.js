import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Plus } from 'react-bootstrap-icons';

import { auth, db } from '../firebase'; // Import auth for user identification
import Modal from './Modal';
import ProjectForm from './ProjectForm';

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  // Track the currently logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user)
        setCurrentUserId(user.uid);
      else
        setCurrentUserId(null);
    });
  });

  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!projectName) return;

    try {
      const formattedName = capitalizeFirstLetter(projectName);
      const projectsRef = collection(db, 'projects');

      // Query to check if the project already exists for this user
      const projectQuery = query(
        projectsRef,
        where('name', '==', formattedName),
        where('userId', '==', currentUserId),
      );

      const querySnapshot = await getDocs(projectQuery);

      if (!querySnapshot.empty) {
        alert('Project already exists!');
        return;
      }

      // Add the new project associated with the current user
      await addDoc(projectsRef, {
        name: formattedName,
        userId: currentUserId,
        createdAt: new Date()
      });

      setShowModal(false);
      setProjectName("");
    } catch (error) {
      console.error("Error adding project: ", error);
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
          handleSubmit={handleSubmit}
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