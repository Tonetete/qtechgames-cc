import React from 'react'
import { GameCatalogueList } from 'components/pages/GameCatalogueList';
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameCatalogueList />
    </QueryClientProvider>
  );
}

export default App;
