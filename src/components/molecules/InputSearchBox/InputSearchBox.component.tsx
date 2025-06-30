import React from 'react';

interface InputSearchBoxProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
}

export const InputSearchBoxComponent = ({
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
