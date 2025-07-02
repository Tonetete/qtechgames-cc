import React, { useCallback } from 'react';
import { InputSearchBox } from '../../molecules/InputSearchBox';
import { useTranslation } from 'react-i18next';
import { useGameFilter } from '../../../context';

export const SearchFilterSection = React.memo(function SearchSection() {
  const { t } = useTranslation();
  const { onFilterUpdate } = useGameFilter();

  const handleSearchFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilterUpdate(event.target.value);
    },
    [],
  );

  return (
    <section id="filter-section" className="bg-white z-10 p-4 shadow-md">
      <InputSearchBox
        placeholder={t('search.placeholder')}
        handleChange={handleSearchFilter}
      />
    </section>
  );
});
