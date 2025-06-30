import { useInfiniteQuery } from '@tanstack/react-query';
import { GameCatalogueItem } from '../interfaces/Game';

let allGames: GameCatalogueItem[] | null = null;
const pageSize = 50;

const fetchPage = async ({ pageParam = 1 }) => {
    if (!allGames) {
        const res = await fetch('/games.json');
        if (!res.ok) throw new Error('Failed to fetch games');
        allGames = await res.json();
    }
    
    if (!allGames) {
        throw new Error("Failed to load games data");
    }
    
    const start = pageParam * pageSize;
    const end = start + pageSize;
    const items = allGames.slice(start, end);
    const nextPage = end < allGames.length ? pageParam + 1 : null;
    return { items, nextPage };
};

export const useGames = () => {
    return useInfiniteQuery<
        { items: GameCatalogueItem[]; nextPage: number | null },
        Error
    >({
        queryKey: ['games'],
        queryFn: ({ pageParam }) => fetchPage({ pageParam: pageParam as number }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: Infinity,
        initialPageParam: 0
    });
};