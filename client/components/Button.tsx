import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;  
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  const baseClasses = 'm-3 p-2 w-fit rounded-full bg-green-500 transition hover:opacity-80 hover:scale-105';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;