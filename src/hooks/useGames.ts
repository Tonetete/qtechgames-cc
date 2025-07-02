import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { GameCatalogueItem } from '../interfaces/Game';
import {
  getCatalogueGameItems,
  getCatalogueItem,
} from '../services/apis/game-api';

const PAGE_SIZE = 50;

const fetchPage = async ({ pageParam = 0, filter = '' }) => {
  const data = await getCatalogueGameItems({
    pageSize: PAGE_SIZE,
    pageParam,
    filter,
  });
  return {
    items: data.items || [],
    nextPage: data.nextPage,
  };
};

async function fetchGameById(id: string): Promise<GameCatalogueItem> {
  return await getCatalogueItem({ gameId: id });
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
