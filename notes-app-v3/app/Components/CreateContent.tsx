"use client"

import React, { useState } from 'react';
import styled from 'styled-components';

import { useGlobalState } from '../Context/globalProvider';
import { add } from '../utils/Icons';
import Button from './Button';

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
    }
  };

  return (
    <CreateContentStyled theme={theme}>
      <h1>Create a Task</h1>
      {/* title input*/}
      <div className="input-control">
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder='e.g: Watch a video on YouTube'
        />
      </div>

      {/* description input*/}
      <div className="input-control">
        <label htmlFor='description'>Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder='e.g: Watch a video about Next.js on YouTube'
        ></textarea>
      </div>

      {/* date input */}
      <div className="input-control">
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
        />
      </div>

      {/* completed toggle */}
      <div className="input-control toggler">
        <label htmlFor='completed'>Toggle Completed</label>
        <input
          type='checkbox'
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>

      {/* important toggle */}
      <div className="input-control toggler">
        <label htmlFor='important'>Toggle Important</label>
        <input
          type='checkbox'
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
        />
      </div>

      {/* submit button */}
      <div className="submit-btn flex justify-end">
        <Button
          type='submit'
          name='Create Task'
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255"}
        />
      </div>
    </CreateContentStyled>
  )
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600; 
  }

  color: ${props => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 16rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${props => props.theme.colorGrey3};
      }
    }
  
    input, textarea {
    width: 100%;
    padding: 1rem;
    resize: none;
    background-color: ${props => props.theme.colorGrey3};
    color: ${props => props.theme.colorGrey2};
    border-radius: 0.5rem;
    }
  } 
  // end of .input-control 

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${props => props.theme.colorGrey0};
    }

    &:hover {
      background: ${props => props.theme.colorPrimaryGreen} !important;
      color: ${props => props.theme.colorWhite} !important;
    }
  }
  // end of .submit-btn

    .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
  // End of .toggler
`;

export default CreateContent