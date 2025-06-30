import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../atoms/Card';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { useGameStore } from '../../../store/gameStore';

export const GameCatalogueFavoriteList = () => {
  const { favoriteGamesList } = useGameStore();

  return (
    <section
      id="favorite-game-list-section"
      className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {favoriteGamesList.map((game: GameCatalogueItem) => {
        const { id, title, studio, thumbnail, rating } = game;
        return (
          <div key={id}>
            <Link
              to={`/game/${game.id}`}
              state={{ game }}
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
      })}
    </section>
  );
};
