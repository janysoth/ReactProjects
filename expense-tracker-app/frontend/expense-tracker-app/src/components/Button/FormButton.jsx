import clsx from 'clsx';
import React from 'react';

const FormButton = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  children,
  className,
}) => {
  const baseClasses = 'flex items-center gap-1.5 font-medium whitespace-nowrap rounded-lg p-2 transition-all duration-200 mr-2 cursor-pointer';

  const sizeClasses = clsx({
    'text-xs md:text-sm': size === 'sm' || size === 'md',
  });

  const variantClasses = clsx({
    // Primary button: Purple
    'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-primary hover:text-white hover:border-primary': variant === 'primary',

    // Danger button: Red
    'bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500': variant === 'danger',

    // Outline (gray border)
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100': variant === 'outline',
  });

  const disabledClasses = disabled
    ? 'opacity-50  hover:bg-none hover:text-inherit hover:border-inherit'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        sizeClasses,
        variantClasses,
        disabledClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

export default FormButton;