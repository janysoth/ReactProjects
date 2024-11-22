import React, { useContext, useState } from 'react';
import { CalendarDate, CaretUp } from 'react-bootstrap-icons';
import { animated, useSpring } from 'react-spring';

import { calendarItems } from '../constants';
import { TodoContext } from '../context';

const Calendar = () => {
  // STATE 
  const [showMenu, setShowMenu] = useState(true);

  // Context
  const { setSelectedProject } = useContext(TodoContext);

  // Animation
  const spin = useSpring({
    transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
    config: { friction: 10 }
  });

  const menuAnimation = useSpring({
    display: showMenu ? 'block' : 'none',
    lineHeight: showMenu ? 1.2 : 0,
  });

  return (
    <div className='Calendar'>
      <div className="header">
        <div className="title">
          <CalendarDate size="18" />
          <p>Calendar</p>
        </div>

        <animated.div
          className="btns"
          style={spin}
          onClick={() => setShowMenu(!showMenu)}
        >
          <span>
            <CaretUp size="20" />
          </span>
        </animated.div>
      </div>

      <animated.div
        className="items"
        style={menuAnimation}
      >
        {
          calendarItems.map(item => (
            <div
              className="item"
              key={item}
              onClick={() => setSelectedProject(item)}
            >
              {item}
            </div>
          )
          )
        }
      </animated.div>
    </div>
  );
};

export default Calendar;