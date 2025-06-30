import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { useSafeNavigation } from '../../../hooks/useNavigation';

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  const location = useLocation();
  const { goBack } = useSafeNavigation();

  return (
    <header className="w-full p-4 flex items-center justify-end min-h-[72px] bg-gray-700 z-10 shadow-md">
      {location.pathname === '/' && (
        <Link
          to={`/favorites`}
          className="inline-block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          See favorites
        </Link>
      )}
      {location.pathname.includes(`/game`) && (
        <Button title="← Back to catalogue" handler={goBack} />
      )}
      {location.pathname.includes(`/favorites`) && (
        <Button title="← Back to catalogue" handler={goBack} />
      )}
    </header>
  );
};
