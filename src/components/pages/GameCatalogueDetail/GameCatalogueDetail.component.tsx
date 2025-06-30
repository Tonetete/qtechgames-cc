import React from 'react';
import { useParams } from 'react-router-dom';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { useQuery } from '@tanstack/react-query';

export const GameCatalogueDetail = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  
  const { data: game, isLoading, error } = useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      // Replace this with your actual API endpoint
      const response = await fetch(`/api/games/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game details');
      }
      return response.json() as Promise<GameCatalogueItem>;
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading game data!</div>;
  if (!game) return <div>Game not found!</div>;

  return (
    <div className="game-detail-container">
      <h1>{game.title}</h1>
      <div className="game-metadata">
        <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
        <div className="game-info">
          <p><strong>Studio:</strong> {game.studio}</p>
          <p><strong>Rating:</strong> {game.rating}/5</p>
          <p><strong>Type:</strong> {game.type}</p>
          <p><strong>RTP:</strong> {game.rtp}%</p>
          <p><strong>Volatility:</strong> {game.volatility}</p>
          <p><strong>Release Date:</strong> {game.release_date}</p>
          <p><strong>Has Jackpot:</strong> {game.has_jackpot ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className="game-description">
        <h2>Description</h2>
        <p>{game.description}</p>
      </div>
      <div className="game-categories">
        <h2>Categories</h2>
        <div className="tag-container">
          {game.categories.map((category, index) => (
            <span key={index} className="tag">{category}</span>
          ))}
        </div>
      </div>
      <div className="game-features">
        <h2>Features</h2>
        <div className="tag-container">
          {game.features.map((feature, index) => (
            <span key={index} className="tag">{feature}</span>
          ))}
        </div>
      </div>
      <div className="game-platforms">
        <h2>Supported Platforms</h2>
        <div className="tag-container">
          {game.supported_platforms.map((platform, index) => (
            <span key={index} className="tag">{platform}</span>
          ))}
        </div>
      </div>
      {game.demo_url && (
        <div className="game-demo">
          <h2>Try the Demo</h2>
          <a href={game.demo_url} target="_blank" rel="noopener noreferrer" className="demo-button">
            Play Demo
          </a>
        </div>
      )}
    </div>
  );
}