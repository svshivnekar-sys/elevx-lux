import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  const baseClasses = 'card';
  const clickableClasses = onClick ? 'cursor-pointer hover:bg-white/[0.03] transition-colors' : '';
  const classes = `${baseClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
