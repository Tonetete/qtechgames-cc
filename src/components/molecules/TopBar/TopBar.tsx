import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ButtonComponent } from '../../atoms/Button/Button.component';
import { useSafeNavigation } from '../../../hooks/useNavigation';

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  const location = useLocation();
  const { goBack } = useSafeNavigation();

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-end min-h-[72px] bg-gray-700 z-10 shadow-md">
      {location.pathname === '/' && (
        <Link
          to={`/favorites`}
          className="inline-block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          See favorites
        </Link>
      )}
      {location.pathname.includes(`/game`) && (
        <ButtonComponent title="← Back to catalogue" handler={goBack} />
      )}
      {location.pathname.includes(`/favorites`) && (
        <ButtonComponent title="← Back to catalogue" handler={goBack} />
      )}
    </header>
  );
};
