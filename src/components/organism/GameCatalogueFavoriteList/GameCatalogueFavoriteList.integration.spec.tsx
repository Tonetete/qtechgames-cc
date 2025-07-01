import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GameCatalogueFavoriteList } from './GameCatalogueFavoriteList.component';
import { useGameStore } from '../../../store/gameStore';
import { mockGameListData } from '../../../tests/__mocks__/GameListData.mock';

jest.mock('../../../store/gameStore', () => ({
  useGameStore: jest.fn(),
}));

const mockUseGameStore = useGameStore as jest.MockedFunction<
  typeof useGameStore
>;

describe('GameCatalogueFavoriteList Integration Test', () => {
  const mockFavoriteGames = [
    { ...mockGameListData[0] },
    { ...mockGameListData[1] },
  ];

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <GameCatalogueFavoriteList />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders favorite games from the store', () => {
    mockUseGameStore.mockReturnValue({
      favoriteGamesList: mockFavoriteGames,
    } as any);

    renderComponent();

    expect(screen.getByText('Forecast Talent')).toBeInTheDocument();
    expect(screen.getByText('Encompassing Posse')).toBeInTheDocument();

    expect(screen.getByText('Studio: Endorphina')).toBeInTheDocument();
    expect(screen.getByText('Studio: Merkur')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/game/qt-0001');
    expect(links[1]).toHaveAttribute('href', '/game/qt-0002');
  });

  test('renders empty state when no favorite games', () => {
    mockUseGameStore.mockReturnValue({
      favoriteGamesList: [],
    } as any);

    renderComponent();

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);

    const noFavorites = screen.getByText('There are no favorite games yet.');
    expect(noFavorites).toBeInTheDocument();
  });
});
