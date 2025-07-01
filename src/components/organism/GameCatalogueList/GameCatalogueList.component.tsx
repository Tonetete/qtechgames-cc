import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../atoms/Card';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

export const GameCatalogueList = ({
  error,
  data,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: any) => {
  const lastGameRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <div>Loading games...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data?.pages.map(
        (page: { items: GameCatalogueItem[] }, pageIndex: number) =>
          page.items.map((game: GameCatalogueItem, idx: number) => {
            const { id, title, studio, thumbnail, rating } = game;
            const isLast =
              pageIndex === data.pages.length - 1 &&
              idx === page.items.length - 1;
            return (
              <div key={id} ref={isLast ? lastGameRef : null}>
                <Link
                  to={`/game/${game.id}`}
                  className="block hover:opacity-90"
                >
                  <Card
                    rating={rating}
                    studio={studio}
                    title={title}
                    thumbnail={thumbnail}
                  />
                </Link>
              </div>
            );
          }),
      )}
      {isFetchingNextPage && <div>Loading more...</div>}
    </>
  );
};
