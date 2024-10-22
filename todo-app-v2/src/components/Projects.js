import React from 'react';
import AddNewProject from './AddNewProject';
import Project from './Project';

const Projects = () => {
  return (
    <div className='Projects'>
      <Project />
      <AddNewProject />
    </div>
  );
};

export default Projects;