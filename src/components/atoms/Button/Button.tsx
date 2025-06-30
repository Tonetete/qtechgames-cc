import React from 'react';

export interface ButtonProps {
  title: string;
  handler?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  title,
  handler,
  size = 'md',
}) => (
  <button
    onClick={handler}
    className={`inline-block text-center ${sizeClasses[size]} bg-indigo-600 text-white rounded-lg hover:bg-indigo-700`}
  >
    {title}
  </button>
);
