import { useQuery } from '@tanstack/react-query';
import { GameCatalogue } from '../interfaces/Game';

const fetchGames = async (): Promise<GameCatalogue> => {
  const res = await fetch('/games.json');
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
};

export const useGames = () => {
  return useQuery<GameCatalogue, Error>({  
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: Infinity
  });
};