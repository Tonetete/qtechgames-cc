import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { patchGameRating } from '../../../services/apis/game-api';
import { useGameDetail } from '../../../hooks';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { FavoriteButtonWrapperComponent } from '../../molecules/Favorite/FavoriteButtonWrapper.component';
import { RatingStars } from '../../molecules/RatingStars/RatingStars';
import { useGameStore } from '../../../store/gameStore';

export const GameCatalogueDetail = (): React.ReactElement => {
  const { t } = useTranslation();
  const [game, setGame] = useState<GameCatalogueItem | null>(null);
  const [rating, setRating] = useState<number | null>(game?.rating || null);
  const { id } = useParams<{ id: string }>();
  const { updateGameRating } = useGameStore();

  const { data: fetchedGame, isLoading, error } = useGameDetail(id!);

  const onUpdateRating = useCallback((newRating: number) => {
    setRating(newRating);
    updateGameRating(id!, newRating);
  }, []);

  useEffect(() => {
    if (fetchedGame) {
      setGame(fetchedGame);
    }
  }, [fetchedGame]);

  useEffect(() => {
    if (!game || !rating) return;
    patchGameRating({
      gameId: game.id,
      rating,
    });
  }, [rating]);

  if (isLoading) return <div className="p-8 text-center">Loading game…</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">Error: {error.message}</div>
    );
  if (!game) return <div>Game not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow overflow-hidden lg:flex">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-64 object-cover lg:w-1/2 lg:h-auto"
        />
        <div className="p-6 flex-1 space-y-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <FavoriteButtonWrapperComponent game={game} />
          </div>
          <p className="text-gray-500">{game.studio}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Rate this game:</span>{' '}
              <RatingStars
                gameId={game.id}
                initialRating={game.rating}
                onUpdateRating={onUpdateRating}
              />
            </div>
            <div>
              <span className="font-semibold">Type:</span> {game.type}
            </div>
            <div>
              <span className="font-semibold">RTP:</span> {game.rtp.toFixed(2)}%
            </div>
            <div>
              <span className="font-semibold">Volatility:</span>{' '}
              {game.volatility}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Jackpot:</span>{' '}
              {game.has_jackpot ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700">{game.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold">Categories</h3>
              <ul className="list-disc list-inside text-gray-700">
                {game.categories.map((cat) => (
                  <li key={cat}>{cat}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                {game.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Supported Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {game.supported_platforms.map((plat) => (
                <span
                  key={plat}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>
          <a
            href={game.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {t('navigation.play')}
          </a>
        </div>
      </div>
    </div>
  );
};
