import clsx from 'clsx';
import React from 'react';

const IconButton = ({
  onClick,
  icon,
  className = '',
  size = 'md',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer';

  const sizeClasses = clsx({
    'w-8 h-8': size === 'md',
    'w-6 h-6': size === 'sm',
  });

  const colorClasses = 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:text-red-400 dark:hover:bg-gray-700';

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClasses, sizeClasses, colorClasses, className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;