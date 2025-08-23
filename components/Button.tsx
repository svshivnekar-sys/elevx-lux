import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center gap-3 font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-elevx-teal/50';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantClasses = {
    primary: 'btn-primary hover:transform hover:scale-105 active:scale-95',
    secondary: 'bg-elevx-teal/10 text-elevx-teal border border-elevx-teal/20 hover:bg-elevx-teal/20 hover:border-elevx-teal/40',
    outline: 'bg-transparent text-elevx-text border border-elevx-teal/20 hover:bg-elevx-teal/10 hover:border-elevx-teal/40',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
