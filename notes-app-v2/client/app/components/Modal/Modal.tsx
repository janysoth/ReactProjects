"use client";
import { useTasks } from '@/context/taskContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import useValidation from '@/hooks/useValidation';
import React, { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import FormField from '../InputField/FormField';

const Modal = () => {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();

  const { formErrors, validateInput } = useValidation();
  const ref = useRef(null);

  // To Detect Click outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask)
      handleInput("setTask")(activeTask);
  }, [modalMode, activeTask]);

  // Check if all required fields are filled and there are no validation errors
  const isFormValid =
    task.title?.trim() &&
    task.description?.trim() &&
    !Object.values(formErrors).some(error => error); // Ensure no validation errors

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return; // Prevent submission if invalid

    if (modalMode === "edit")
      updateTask(task);
    else if (modalMode === "add")
      createTask(task);

    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        {/* Close (X) Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title Input */}
        <FormField
          label="Title"
          id="title"
          value={task.title || ""}
          placeholder="Task Title"
          onChange={(e) => {
            handleInput("title")(e);
            validateInput("title", e.target.value);
          }}
          error={formErrors.title}
        />

        {/* Description Input (Textarea) */}
        <FormField
          label="Description"
          id="description"
          type="textarea"
          value={task.description || ""}
          placeholder="Task Description"
          onChange={(e) => {
            handleInput("description")(e);
            validateInput("description", e.target.value);
          }}
          error={formErrors.description}
        />

        {/* Priority Input (Select) */}
        <FormField
          label="Select Priority"
          id="priority"
          type="select"
          value={task.priority || ""}
          onChange={(e) => {
            handleInput("priority")(e);
            validateInput("priority", e.target.value);
          }}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />

        {/* Due Date Input */}
        <FormField
          label="Due Date"
          id="dueDate"
          type="date"
          value={task.dueDate ? task.dueDate.split('T')[0] : new Date().toISOString().split('T')[0]} // Default to today's date if not provided
          onChange={(e) => {
            handleInput("dueDate")(e);
            validateInput("dueDate", e.target.value);
          }}
        />

        {/* Status Input (Select) */}
        <FormField
          label="Task Completed"
          id="completed"
          type="select"
          value={task.completed || ""}
          onChange={(e) => handleInput("completed")(e)}
          options={[
            { value: "false", label: "No" },
            { value: "true", label: "Yes" },
          ]}
        />

        {/* Buttons: Submit & Cancel */}
        <div className="flex justify-between gap-2">
          {/* <button
            type="button"
            onClick={closeModal}
            className="w-1/2 py-3 border border-gray-300 rounded-full bg-red-500 text-white hover:bg-red-700 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-1/2 text-white py-3 hover:bg-blue-500 transition duration-200 rounded-full ${modalMode === "edit" ? "bg-blue-400" : "bg-[#3aafae]"
              } ${!isFormValid ? "opacity-50 bg-gray-400 cursor-not-allowed" : ""}`}
            disabled={!isFormValid} // Disable if any field is empty
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button> */}
          <Button
            type='button'
            onClick={closeModal}
            className='bg-red-500 hover:bg-red-700'
          >
            Cancel
          </Button>

          <Button
            type='submit'
            className={`
              ${modalMode === "edit" ? "bg-green-500 hover:bg-green-700" : ""} 
              ${!isFormValid ? "opacity-50 bg-gray-400 cursor-not-allowed" : ""}
            `}
            disabled={!isFormValid}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
