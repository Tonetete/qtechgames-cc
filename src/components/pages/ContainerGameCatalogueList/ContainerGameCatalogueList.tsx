import React, { useCallback, useRef, useState } from 'react';
import { GameCatalogueList } from '../../organism/GameCatalogueList';
import { InputSearchBoxComponent } from '../../molecules/InputSearchBox/InputSearchBox.component';
import { useGames, useDebounce } from '../../../hooks';

export const ContainerGameCatalogueList = () => {
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

  return (
    <main className="flex flex-col h-full">
      <section id="filter-section" className="bg-white z-10 p-4 shadow-md">
        <InputSearchBoxComponent
          placeholder="Search by title or studio..."
          handleChange={(event) => handleSearchFilter(event.target.value)}
        />
      </section>
      <section
        id="game-list-section"
        className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-grow overflow-auto"
      >
        <GameCatalogueList
          data={data}
          isLoading={isLoading}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </main>
  );
};
