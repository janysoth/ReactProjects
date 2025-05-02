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
  const baseClasses =
    'flex items-center justify-center gap-1.5 font-medium whitespace-nowrap rounded-lg px-4 h-10 min-w-[100px] transition-all duration-200 cursor-pointer mr-2';

  const sizeClasses = clsx({
    'text-sm': size === 'sm' || size === 'md',
    // Add other size conditions if needed
  });

  const variantClasses = clsx({
    'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-primary hover:text-white hover:border-primary':
      variant === 'primary',

    'bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500':
      variant === 'danger',

    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100':
      variant === 'outline',
  });

  const disabledClasses = disabled
    ? 'opacity-50 pointer-events-none'
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