import React, { useContext, useState } from 'react';
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons';
import { animated } from 'react-spring';

import { TodoContext } from '../context';
import { useMenuAnimation, useSpinAnimation } from '../hooks';
import AddNewProject from './AddNewProject';
import Project from './Project';

const Projects = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "#000000";

  // Context 
  const { projects } = useContext(TodoContext);

  // Animation
  const spin = useSpinAnimation(showMenu);
  const menuAnimation = useMenuAnimation(showMenu);

  return (
    <div className='Projects'>
      <div className="header">
        <div className="title">
          <Palette size="18" />
          <p>Projects</p>
        </div>

        <div className="btns">
          {
            showMenu && projects.length > 0 && (
              <span
                className="edit"
                onClick={() => setEdit(edit => !edit)}
              >
                <PencilFill size="15" color={pencilColor} />
              </span>
            )
          }

          <AddNewProject />
          <animated.span
            className="arrow"
            style={spin}
            onClick={() => setShowMenu(!showMenu)}
          >
            <CaretUp size="20" />
          </animated.span>
        </div>
      </div>

      <animated.div
        className="items"
        style={menuAnimation}
      >
        {
          projects.map(project =>
            <Project
              project={project}
              key={project.id}
              edit={edit}
            />
          )
        }
      </animated.div>
    </div>
  );
};

export default Projects;