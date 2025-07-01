import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useGameDetail } from '../../../hooks';
import { GameCatalogueDetail } from './GameCatalogueDetail.component';
import { mockGameListData } from '../../../tests/__mocks__/GameListData.mock';

jest.mock('../../../hooks', () => ({
  useGameDetail: jest.fn(),
}));
const mockUseGameDetail = useGameDetail as jest.MockedFunction<
  typeof useGameDetail
>;

const mockGameDetail = { ...mockGameListData[0] };

describe('GameCatalogueDetail Integration Test', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderComponent = (gameId = 'game-123') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/game/${gameId}`]}>
          <Routes>
            <Route path="/game/:id" element={<GameCatalogueDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  test('renders loading state initially', () => {
    mockUseGameDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders game details when data is loaded', async () => {
    mockUseGameDetail.mockReturnValue({
      data: mockGameDetail,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Forecast Talent')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Inside from lately stress why lie here yet vanish in.',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Endorphina')).toBeInTheDocument();
    });
  });

  test('renders error state when there is an error', async () => {
    mockUseGameDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch game details' },
    } as any);

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch game details/i),
      ).toBeInTheDocument();
    });
  });

  test('displays not found message when game ID is invalid', async () => {
    mockUseGameDetail.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    renderComponent('invalid-id');

    await waitFor(() => {
      expect(screen.getByText(/game not found/i)).toBeInTheDocument();
    });
  });
});
