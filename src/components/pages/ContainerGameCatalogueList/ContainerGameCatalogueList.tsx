import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameCatalogueList } from '../../organism/GameCatalogueList';
import { InputSearchBox } from '../../molecules/InputSearchBox';
import { useGames, useDebounce } from '../../../hooks';
import { PlaceHolderText } from '../../atoms/PlaceHolderText';

export const ContainerGameCatalogueList = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const debouncedFilter = useDebounce(filter, 300);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames(debouncedFilter);

  const handleSearchFilter = useCallback((value: string) => {
    setFilter(value);
  }, []);

  if (isLoading) return <PlaceHolderText title={t('loading.games')} />;
  if (error) return <PlaceHolderText title={`Error: ${error.message}`} />;

  return (
    <main className="flex flex-col h-full">
      <section id="filter-section" className="bg-white z-10 p-4 shadow-md">
        <InputSearchBox
          placeholder={t('search.placeholder')}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchFilter(event.target.value)
          }
          value={filter}
        />
      </section>
      <section
        id="game-list-section"
        className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-grow overflow-auto"
      >
        <GameCatalogueList
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </main>
  );
};
