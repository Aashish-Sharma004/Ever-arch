import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseStyles = "px-6 py-3 font-medium tracking-wide transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-transparent text-black border border-black hover:bg-neutral-100",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}