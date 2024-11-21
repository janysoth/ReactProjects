import React, { useContext, useEffect, useRef } from 'react';

import { TodoContext } from '../context';

const Main = ({ children }) => {
  // CONTEXT
  const { setSelectedTodo } = useContext(TodoContext);

  // REF
  const mainRef = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  });

  const handleClick = e => {
    if (e.target === mainRef.current)
      setSelectedTodo(undefined);
  };
  return (
    <div className="Main" ref={mainRef}>
      {children}
    </div>
  );
};

export default Main;