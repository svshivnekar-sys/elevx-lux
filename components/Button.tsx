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
  const baseClasses = 'inline-flex items-center justify-center gap-3 font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent/50';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-gradient-primary-accent text-white shadow-glow-primary hover:shadow-glow-primary-hover hover:-translate-y-1 active:translate-y-0',
    secondary: 'bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20 hover:bg-gradient-secondary-accent hover:text-white hover:border-transparent hover:shadow-glow-secondary hover:-translate-y-0.5',
    outline: 'bg-transparent text-text-body border border-border-subtle hover:border-secondary-accent hover:text-secondary-accent hover:shadow-glow-secondary/50',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none' 
    : 'cursor-pointer';
  
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
