import { combine } from 'zustand/middleware';
import { create } from 'zustand/react';
import { GameCatalogueItem } from '../interfaces/Game';

export interface State {
  gamesList: GameCatalogueItem[];
  favoriteGamesList: GameCatalogueItem[];
}

export const useGameListStore = create(
  combine(
    {
      gamesList: [],
      favoriteGamesList: localStorage.getItem('favoriteGamesList')
        ? JSON.parse(localStorage.getItem('favoriteGamesList')!)
        : [],
    } as State,
    (set) => {
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
      };
    },
  ),
);
