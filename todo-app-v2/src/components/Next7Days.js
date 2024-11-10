import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Todo from './Todo';


const Next7Days = ({ todos }) => {
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const days = ['0', '1', '2', '3', '4', '5', '6'];

    const sortedTodosByDay = days.map(day => {
      return {
        todos: todos.filter(todo => todo.day === day),
        number: day
      };
    });

    const today = parseInt(moment().format('d'));
    const afterToday = sortedTodosByDay.slice(today);
    const beforeToday = sortedTodosByDay.slice(0, today);

    const arrangeDays = afterToday.concat(beforeToday);

    setWeekTodos(arrangeDays);
  }, [todos]);

  return (
    <div className='Next7Days'>
      {
        weekTodos.map(day =>
          <div key={day.number}>
            <div className="day">
              <div className="name">
                {`
                  ${moment(day.number, 'd').format('dddd')} - ${moment(day.number, 'd').format('MM/DD/YYYY')}
                `}
                {day.number === moment().format('d') && ' (Today)'}
              </div>

              <div className="total-todos">
                ({day.todos.length})
              </div>
            </div>

            <div className="todos">
              {
                day.todos.map(todo =>
                  <Todo key={todo.id} todo={todo} />
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Next7Days;