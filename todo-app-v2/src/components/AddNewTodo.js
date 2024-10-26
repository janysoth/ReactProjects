
import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import React, { useState } from 'react';
import { Bell, Calendar, Clock, Palette, X } from 'react-bootstrap-icons';
import Modal from './Modal';

const AddNewTodo = () => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());


  return (
    <div className='AddNewTodo'>
      <div className="btn">
        <button onClick={() => setShowModal(true)}>
          + New Todo
        </button>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form>
            <div className="text">
              <h3>Add New Todo!</h3>
              <input
                type='text'
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder='Enter your Todo here...'
                autoFocus
              />
            </div>

            <div className="remind">
              <Bell />
              <p>Remind Me!</p>
            </div>

            <div className="pick-day">
              <div className="title">
                <Calendar />
                <p>Choose a Day</p>
              </div>
              <DatePicker
                value={day}
                onChange={day => setDay(day)}
              />
            </div>

            <div className="pick-time">
              <div className="title">
                <Clock />
                <p>Choose Time</p>
              </div>
              <TimePicker
                value={time}
                onChange={time => setTime(time)}
              />
            </div>

            <div className="pick-project">
              <div className="title">
                <Palette />
                <p>Choose a Prject</p>
              </div>

              <div className="projects">
                <div className="project active">
                  Personal
                </div>

                <div className="project">
                  Work
                </div>
              </div>
            </div>

            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size='40' />
            </div>

            <div className="confirm">
              <button>+ Add Todo</button>
            </div>
          </form>
        </MuiPickersUtilsProvider>
      </Modal>
    </div>
  );
};

export default AddNewTodo;