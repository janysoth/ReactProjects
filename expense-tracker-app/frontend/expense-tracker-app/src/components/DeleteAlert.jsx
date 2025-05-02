import React from 'react';
import FormButton from './Button/FormButton';

const DeleteAlert = ({ content, onDelete, onClose }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        {/* <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          Delete
        </button> */}

        <FormButton variant='primary' onClick={onClose}>
          No
        </FormButton>

        <FormButton variant='danger' onClick={onDelete}>
          Yes
        </FormButton>
      </div>
    </div>
  );
};

export default DeleteAlert;