import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GameCatalogueItem } from '../../../interfaces/Game';
import { useQuery } from '@tanstack/react-query';

export const GameCatalogueDetail = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const passedGame = location.state?.game;

  const [game, setGame] = useState<GameCatalogueItem | undefined>(passedGame);
  const [loading, setLoading] = useState(!passedGame);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (passedGame) return;

    setLoading(true);
    // TODO: implement query mechanism by id param to get game details via react query
    // if by checking the global state, it's not present, then fetch the game details from the API
  }, [id, passedGame]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading game data!</div>;
  if (!game) return <div>Game not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 hover:underline"
      >
        ← Back to catalogue
      </button>

      <div className="bg-white rounded-2xl shadow overflow-hidden lg:flex">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-64 object-cover lg:w-1/2 lg:h-auto"
        />

        <div className="p-6 flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="text-gray-500">{game.studio}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Rating:</span>{' '}
              {game.rating.toFixed(2)}/5
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
            Play Full Demo
          </a>
        </div>
      </div>
    </div>
  );
};
