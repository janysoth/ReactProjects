import React, { useState } from 'react';
import ProjectForm from './ProjectForm';

const RenameProject = ({ project, setShowModal }) => {
  const [newProjectName, setNewProjectName] = useState(project.name);

  const handleSubmit = (e) => {

  };
  return (
    <div className='RenameProject'>
      <ProjectForm
        handleSumbit={handleSubmit}
        heading='Edit Project Name'
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText='Confrim'
      />
    </div>
  );
};

export default RenameProject;