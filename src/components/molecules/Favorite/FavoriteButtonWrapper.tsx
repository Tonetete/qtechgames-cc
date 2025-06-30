import React, { useEffect, useRef } from 'react';
import './favorite-button.js';
import { useGameStore } from '../../../store/gameStore';
import { GameCatalogueItem } from '../../../interfaces/Game';

interface FavoriteButtonProps {
  game: GameCatalogueItem;
}

export const FavoriteButtonWrapper: React.FC<FavoriteButtonProps> = ({
  game,
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const { id } = game;
  const { setFavoriteGamesList, favoriteGamesList } = useGameStore();
  const isFav = favoriteGamesList.some((game) => game.id === id);

  useEffect(() => {
    const handleFavoriteToggle = (e: CustomEvent) => {
      if (e.detail.gameId === id) {
        if (isFav) {
          setFavoriteGamesList((favoriteList) =>
            favoriteList.filter((game) => game.id !== id),
          );
        } else {
          setFavoriteGamesList((favoriteList) => [
            ...favoriteList,
            { ...game },
          ]);
        }
      }
    };

    const buttonEl = buttonRef.current;
    if (buttonEl) {
      buttonEl.addEventListener(
        'favoriteToggle',
        handleFavoriteToggle as EventListener,
      );
    }

    return () => {
      if (buttonEl) {
        buttonEl.removeEventListener(
          'favoriteToggle',
          handleFavoriteToggle as EventListener,
        );
      }
    };
  }, [id, isFav]);

  useEffect(() => {
    const buttonEl = buttonRef.current;
    if (buttonEl) {
      buttonEl.setAttribute('is-favorite', isFav.toString());
    }
  }, [isFav]);

  return (
    // @ts-ignore
    <favorite-button
      ref={buttonRef as React.RefObject<HTMLElement>}
      game-id={id}
      is-favorite={isFav.toString()}
    />
  );
};
