import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface TopBarProps {
  mode?: 'search' | 'back';
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-end min-h-[72px]">
      {location.pathname === '/' && (
        <Link
          to={`/favorites`}
          className="inline-block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          See favorites
        </Link>
      )}
    </header>
  );
};
