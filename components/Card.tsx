import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'accent' | 'glass';
}

export default function Card({ 
  children, 
  className = '', 
  onClick, 
  variant = 'default' 
}: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'accent':
        return 'bg-secondary-bg border border-primary-accent/20 hover:border-primary-accent hover:shadow-glow-primary';
      case 'glass':
        return 'card-glass hover:border-secondary-accent hover:shadow-glow-secondary';
      default:
        return 'bg-secondary-bg border border-border-subtle hover:border-secondary-accent/30 hover:shadow-glow-secondary/50';
    }
  };
  
  const baseClasses = 'rounded-xl p-6 transition-all duration-200';
  const variantClasses = getVariantClasses();
  const clickableClasses = onClick ? 'cursor-pointer hover:-translate-y-1' : '';
  const classes = `${baseClasses} ${variantClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
