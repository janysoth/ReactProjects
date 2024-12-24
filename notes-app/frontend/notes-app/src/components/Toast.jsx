import PropTypes from "prop-types";
import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, onClose, type }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500); // Close toast after 1.5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={
      `absolute top-20 right-6 transition-all duration-400 
      ${isShown ? "opacity-100" : "opacity-0"}`
    }>
      <div
        className={`relative min-w-52 bg-white border shadow-2xl rounded-md 
          before:w-[5px] before:h-full before:absolute before:left-0 before:top-0 before:rounded-l-lg 
          ${type === "delete" ? "before:bg-red-500" : "before:bg-green-500"}`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full 
              ${type === "delete" ? "bg-red-50" : "bg-green-50"}`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.string,
};

export default Toast;