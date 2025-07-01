import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../atoms/Card';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { useInfiniteScroll } from '../../../hooks';

interface GameCatalogueListProps {
  data:
    | {
        pages: { items: GameCatalogueItem[] }[];
      }
    | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
}

export const GameCatalogueList = ({
  data,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: GameCatalogueListProps) => {
  const { t } = useTranslation();
  const lastGameRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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
      {isFetchingNextPage && <div>{t('loading.more')}</div>}
    </>
  );
};
