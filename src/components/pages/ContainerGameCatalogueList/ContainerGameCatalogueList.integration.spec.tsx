import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContainerGameCatalogueList } from './ContainerGameCatalogueList';
import { mockGameListData } from '../../../tests/__mocks__/GameListData.mock';
import { useGames } from '../../../hooks';

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useGames: jest.fn(),
}));
const mockUseGames = useGames as jest.MockedFunction<typeof useGames>;

describe('ContainerGameCatalogueList Integration Test', () => {
  let queryClient: QueryClient;

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ContainerGameCatalogueList />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    mockUseGames.mockReset();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  test('shows loading state initially', () => {
    mockUseGames.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    } as any);

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error state when API fails', () => {
    mockUseGames.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch games'),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ContainerGameCatalogueList />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      screen.getByText(/Error: Failed to fetch games/i),
    ).toBeInTheDocument();
  });

  test('renders games list when data is loaded', async () => {
    mockUseGames.mockReturnValue({
      data: {
        pages: [
          {
            items: [...mockGameListData],
            nextPage: 2,
          },
        ],
        pageParams: [null],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    } as any);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Forecast Talent')).toBeInTheDocument();
      expect(screen.getByText('Horizontal Basket')).toBeInTheDocument();
    });
  });

  test('filters games when search input changes', async () => {
    const mockFetchNextPage = jest.fn();

    mockUseGames.mockReturnValue({
      data: {
        pages: [
          {
            items: [...mockGameListData],
            nextPage: 1,
          },
        ],
        pageParams: [null],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    } as any);

    renderComponent();

    const searchInput = screen.getByPlaceholderText(
      'Search by title or studio...',
    );

    await userEvent.type(searchInput, 'zelda');

    // Wait for debounce
    await waitFor(
      () => {
        // Check that useGames was called with the search term
        expect(mockUseGames).toHaveBeenCalledWith('zelda');
      },
      { timeout: 350 },
    ); // Slightly more than the 300ms debounce
  });
});
