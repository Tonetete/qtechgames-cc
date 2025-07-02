import { API_URL_GAME_RATING, API_URL_GAMES } from '../../constants/constants';

export const patchGameRating = async ({
  gameId,
  rating,
}: {
  gameId: string;
  rating: number;
}) => {
  const response = await fetch(
    `${API_URL_GAME_RATING.replace(':id', gameId)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    },
  ).catch(() => {
    throw new Error('Failed to update rating');
  });
  return await response.json();
};

export const getCatalogueGameItems = async ({
  pageParam,
  pageSize,
  filter,
}: {
  pageParam: number;
  pageSize: number;
  filter: string;
}) => {
  const url = new URL(API_URL_GAMES);

  url.searchParams.append('page', pageParam.toString());
  url.searchParams.append('pageSize', pageSize.toString());
  if (filter) url.searchParams.append('search', filter);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch games');

  return await res.json();
};

export const getCatalogueItem = async ({ gameId }: { gameId: string }) => {
  const res = await fetch(`${API_URL_GAMES}/${gameId}`);
  if (!res.ok) throw new Error('Fetch failed');
  return await res.json();
};
