// import React from 'react';

// const Button = ({
//   children,
//   variant = 'primary',
//   size = 'md',
//   onClick,
//   disabled = false,
//   className = '',
//   type = 'button',
// }) => {
//   const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
//   const variantStyles = {
//     primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
//     secondary: 'bg-green-600 text-emerald-600 hover:bg-secondary-500 focus:ring-secondary-500',
//     outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
//     danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
//   };
  
//   const sizeStyles = {
//     sm: 'px-3 py-1.5 text-sm',
//     md: 'px-4 py-2 text-base',
//     lg: 'px-6 py-3 text-lg',
//   };
  
//   const disabledStyles = disabled 
//     ? 'opacity-50 cursor-not-allowed' 
//     : 'cursor-pointer transform hover:translate-y-[-1px] active:translate-y-[1px]';
  
//   return (
//     <button
//       type={type}
//       className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;


import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]',
    secondary: 'bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)] focus:ring-[var(--color-secondary-500)]',
    outline: 'bg-transparent border border-[var(--color-primary-600)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500', // Optional: You can also define `--color-danger` set if you want
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer transform hover:translate-y-[-1px] active:translate-y-[1px]';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
