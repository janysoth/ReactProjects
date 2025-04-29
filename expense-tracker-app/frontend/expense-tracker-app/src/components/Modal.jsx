import React, { useEffect } from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  // ✅ Hook is called unconditionally
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // ❌ Do not return early before the hook
  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50 p-4"
      onClick={onClose} // Close modal on background click
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full mt-15 md:mt-20 transition-all duration-300 transform"
        onClick={stopPropagation} // Prevent closing on modal content click
      >
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
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-all active:scale-95 dark:hover:text-red-400 dark:hover:bg-gray-700 cursor-pointer"
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