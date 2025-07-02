import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useSafeNavigation } from '../../../hooks/useNavigation';

export const TopBar = (): React.ReactElement => {
  const location = useLocation();
  const { goBack } = useSafeNavigation();
  const { t } = useTranslation();

  return (
    <header className="w-full p-4 flex items-center justify-end min-h-[72px] bg-gray-700 z-10 shadow-md">
      <LanguageSwitcher />
      {location.pathname === '/' && (
        <Link
          to={`/favorites`}
          className="inline-block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {t('navigation.seeFavorites')}
        </Link>
      )}
      {location.pathname.includes(`/game`) && (
        <Button title={t('navigation.back')} handler={goBack} />
      )}
      {location.pathname.includes(`/favorites`) && (
        <Button title={t('navigation.back')} handler={goBack} />
      )}
    </header>
  );
};
