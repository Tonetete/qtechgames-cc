import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { GameCatalogueItem } from '../interfaces/Game';
import { useGameStore } from '../store/gameStore';
import { API_URL_GAMES } from '../constants/constants';

const PAGE_SIZE = 50;
const PATH = '/games.json';

let allGames: GameCatalogueItem[] | null = null;

const fetchPage = async ({ pageParam = 0, filter = '' }) => {
  const url = new URL(API_URL_GAMES);

  // Add query params for pagination and search
  url.searchParams.append('page', pageParam.toString());
  url.searchParams.append('pageSize', PAGE_SIZE.toString());
  if (filter) url.searchParams.append('search', filter);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch games');

  const data = await res.json();
  return {
    items: data.items || [],
    nextPage: data.nextPage,
  };
};

async function fetchGameById(id: string): Promise<GameCatalogueItem> {
  const res = await fetch(`${API_URL_GAMES}/${id}`);
  if (!res.ok) throw new Error('Fetch failed');
  return await res.json();
}

export const useGameDetail = (
  id: string,
  options?: Partial<UseQueryOptions<GameCatalogueItem, Error>>,
) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGameById(id),
    staleTime: Infinity,
    ...options,
  });
};

export const useGames = (filter: string) => {
  return useInfiniteQuery<
    { items: GameCatalogueItem[]; nextPage: number | null },
    Error
  >({
    queryKey: ['games', filter],
    queryFn: ({ pageParam }) =>
      fetchPage({
        pageParam: pageParam as number,
        filter,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: Infinity,
    initialPageParam: 0,
  });
};
