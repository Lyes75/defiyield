import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function Button({
  onClick,
  children,
  variant = 'primary',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-colors';
  const variantStyles = {
    primary: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30',
    secondary: 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border border-gray-500/30',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {LeftIcon && <LeftIcon className={`w-4 h-4 ${disabled ? 'animate-spin' : ''}`} />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4" />}
    </button>
  );
}