import React from 'react';
import { useGames } from '../../../hooks/useGames';
import { Card } from "../../atoms/Card"

export const GameCatalogueList: React.FC = () => {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) return <div>Loading games...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!games) return <div>There was an error loading games</div>

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {games.map(game => {
        const { id, title, thumbnail, studio, rating, demo_url } = game
        return (
          <Card 
           key={id} 
           title={title}
           studio={studio}
           thumbnail={thumbnail}
           url={demo_url}
           rating={rating}
          />
      )})
      }
    </main>
  );
};
