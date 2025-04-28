import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-all active:scale-95 dark:hover:text-red-400 dark:hover:bg-gray-700"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;