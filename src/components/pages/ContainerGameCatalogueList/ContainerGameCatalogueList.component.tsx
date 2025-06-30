import React, { useCallback, useRef, useState } from 'react';
import { GameCatalogueList } from '../../organism/GameCatalogueList';
import { InputSearchBox } from '../../molecules/InputSearchBox/InputSearchBox';
import { useGames } from '../../../hooks/useGames';
import { useDebounce } from '../../../hooks/useDebounce';

export const ContainerGameCatalogueListComponent = () => {
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
    <main>
      <section id="filter-section">
        <InputSearchBox
          handleChange={(event) => handleSearchFilter(event.target.value)}
        />
      </section>
      <section
        id="game-list-section"
        className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <GameCatalogueList
          data={data}
          isLoading={isLoading}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        ></GameCatalogueList>
      </section>
    </main>
  );
};
