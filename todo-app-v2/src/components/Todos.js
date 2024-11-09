import React, { useContext } from 'react';
import { TodoContext } from '../context';
import Next7Days from './Next7Days';
import Todo from './Todo';

const Todos = () => {
  const { selectedProject, todos } = useContext(TodoContext);

  return (
    <div className='Todos'>
      <div className="selected-project">
        {selectedProject}
      </div>

      <div className="todos">
        {
          selectedProject === "next 7 days" ?
            <Next7Days todos={todos} /> :
            todos.map(todo =>
              <Todo todo={todo} key={todo.id} />
            )
        }
      </div>
    </div>
  );
};

export default Todos;