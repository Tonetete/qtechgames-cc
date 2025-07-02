import React from 'react';
import { useTranslation } from 'react-i18next';
import { GameCatalogueList } from '../../organism/GameCatalogueList';
import { useDebounce, useGames } from '../../../hooks';
import { PlaceHolderText } from '../../atoms/PlaceHolderText';
import {
  GameFilterProvider,
  useGameFilter,
} from '../../../context/ContextFilter';
import { SearchFilterSection } from '../../organism/SearchFilterSection';

export const ContainerGameCatalogueList = (): React.ReactElement => {
  return (
    <GameFilterProvider>
      <main className="flex flex-col h-full">
        <SearchFilterSection />
        <WrapperGameCatalogueList />
      </main>
    </GameFilterProvider>
  );
};

export const WrapperGameCatalogueList = () => {
  const { t } = useTranslation();
  const { filter } = useGameFilter();
  const debouncedFilter = useDebounce(filter, 300);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames(debouncedFilter);

  if (isLoading) return <PlaceHolderText title={t('loading.games')} />;
  if (error) return <PlaceHolderText title={`Error: ${error.message}`} />;

  return (
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
  );
};
