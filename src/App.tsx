import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GameCatalogueDetail } from './components/organism/GameCatalogueDetail';
import { ContainerGameCatalogueListComponent } from './components/pages/ContainerGameCatalogueList/ContainerGameCatalogueList.component';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerGameCatalogueListComponent />} />
          <Route path="/game/:id" element={<GameCatalogueDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
