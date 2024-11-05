import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div className='Todo'>
      {todo.text}
    </div>
  );
};

export default Todo;