import React from 'react';

interface InputSearchBoxProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
}

export const InputSearchBox = React.memo(
  React.forwardRef<HTMLInputElement, InputSearchBoxProps>(
    ({ handleChange, placeholder, value }, ref) => {
      return (
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          //value={value}
          className="w-full max-w-md border border-gray-300 rounded-lg p-2"
        />
      );
    },
  ),
);
