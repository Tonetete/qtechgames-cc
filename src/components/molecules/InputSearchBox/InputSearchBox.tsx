import React from 'react';

interface InputSearchBoxProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

export const InputSearchBox = React.forwardRef<
  HTMLInputElement,
  InputSearchBoxProps
>(({ handleChange, placeholder, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full max-w-md border border-gray-300 rounded-lg p-2"
    />
  );
});
