import React from 'react';

interface InputSearchBoxProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const InputSearchBox = ({ handleChange }: InputSearchBoxProps) => {
  return (
    <input
      type="text"
      placeholder="Search games..."
      onChange={handleChange}
      className="w-full max-w-md border border-gray-300 rounded-lg p-2"
    />
  );
};
