import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { GameCatalogueItem } from '../interfaces/Game';

const PAGE_SIZE = 50;
const PATH = '/games.json';

let allGames: GameCatalogueItem[] | null = null;

const fetchPage = async ({ pageParam = 1, searchTerm = '' }) => {
  if (!allGames) {
    const res = await fetch(PATH);
    if (!res.ok) throw new Error('Failed to fetch games');
    allGames = await res.json();
  }

  if (!allGames) {
    throw new Error('Failed to load games data');
  }

  const filtered = searchTerm
    ? allGames.filter(
        (g) =>
          g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.studio.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allGames;

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const items = filtered.slice(start, end);
  const nextPage = end < filtered.length ? pageParam + 1 : null;

  return { items, nextPage };
};

async function fetchGameById(id: string): Promise<GameCatalogueItem> {
  const res = await fetch(PATH);
  if (!res.ok) throw new Error('Fetch failed');
  const all: GameCatalogueItem[] = await res.json();
  const found = all.find((g) => g.id === id);
  if (!found) throw new Error('Not found');
  return found;
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

export const useGames = (searchTerm: string) => {
  return useInfiniteQuery<
    { items: GameCatalogueItem[]; nextPage: number | null },
    Error
  >({
    queryKey: ['games', searchTerm],
    queryFn: ({ pageParam }) =>
      fetchPage({ pageParam: pageParam as number, searchTerm }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: Infinity,
    initialPageParam: 0,
  });
};
