import React from 'react';

interface PlaceHolderTextProps {
  title: string;
}

export const PlaceHolderText = ({
  title,
}: PlaceHolderTextProps): React.ReactElement => (
  <div className="flex items-center justify-center h-screen w-full">
    <p className="text-gray-500 text-lg animate-pulse">{title}</p>
  </div>
);
