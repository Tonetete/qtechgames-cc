import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GameCatalogueDetail } from './components/organism/GameCatalogueDetail';
import { ContainerGameCatalogueListComponent } from './components/pages/ContainerGameCatalogueList/ContainerGameCatalogueList.component';
import { GameCatalogueFavoriteList } from './components/organism/GameCatalogueFavoriteList';
import { TopBar } from './components/molecules/TopBar/TopBar';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<ContainerGameCatalogueListComponent />} />
          <Route path="/game/:id" element={<GameCatalogueDetail />} />
          <Route path="/favorites" element={<GameCatalogueFavoriteList />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
