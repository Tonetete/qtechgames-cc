import { combine } from 'zustand/middleware';
import { create } from 'zustand/react';
import { GameCatalogueItem } from '../interfaces/Game';
import { API_URL_GAME_RATING } from '../constants/constants';

export interface State {
  gamesList: GameCatalogueItem[];
  favoriteGamesList: GameCatalogueItem[];
  updateGameRating: (gameId: string, rating: number) => void;
}

const loadFavoriteGamesList = () => {
  return localStorage.getItem('favoriteGamesList')
    ? JSON.parse(localStorage.getItem('favoriteGamesList')!)
    : [];
};

export const useGameStore = create(
  combine(
    {
      gamesList: [],
      updateGameRating: () => {},
      favoriteGamesList: loadFavoriteGamesList(),
    } as State,
    (set, get) => {
      return {
        setGamesList: (
          nextGamesList:
            | GameCatalogueItem[]
            | ((gameList: GameCatalogueItem[]) => GameCatalogueItem[]),
        ) =>
          set(
            (state: State): Pick<State, 'gamesList'> => ({
              gamesList:
                typeof nextGamesList === 'function'
                  ? nextGamesList(state.gamesList)
                  : nextGamesList,
            }),
          ),
        setFavoriteGamesList: (
          nextFavoriteGamesList:
            | GameCatalogueItem[]
            | ((favoriteList: GameCatalogueItem[]) => GameCatalogueItem[]),
        ) =>
          set((state: State): Pick<State, 'favoriteGamesList'> => {
            const favoriteGamesList =
              typeof nextFavoriteGamesList === 'function'
                ? nextFavoriteGamesList(state.favoriteGamesList)
                : nextFavoriteGamesList;

            localStorage.setItem(
              'favoriteGamesList',
              JSON.stringify(favoriteGamesList),
            );
            return {
              favoriteGamesList,
            };
          }),
        updateGameRating: async (gameId: string, rating: number) => {
          try {
            const { favoriteGamesList } = get();

            // Update ratings in favoritesList if needed
            const updatedFavorites = favoriteGamesList.map((game) => {
              if (game.id === gameId) {
                return { ...game, rating };
              }
              return game;
            });

            // Update store state
            set({
              favoriteGamesList: updatedFavorites,
            });

            // Also update localStorage for persistence
            localStorage.setItem(
              'favoriteGamesList',
              JSON.stringify(updatedFavorites),
            );

            return true;
          } catch (error) {
            console.error('Error updating game rating:', error);
            return false;
          }
        },
      };
    },
  ),
);
