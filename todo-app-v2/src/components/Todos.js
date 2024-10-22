import React from 'react';
import Next7Days from './Next7Days';
import Todo from './Todo';

const Todos = () => {
  return (
    <div className='Todos'>
      <Todo />
      <Next7Days />
    </div>
  );
};

export default Todos;