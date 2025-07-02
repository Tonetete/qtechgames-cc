import React from 'react';

interface InputSearchBoxProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const InputSearchBox = ({
  handleChange,
  placeholder,
}: InputSearchBoxProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full max-w-md border border-gray-300 rounded-lg p-2"
    />
  );
};
