import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameCatalogueList } from './components/pages/GameCatalogueList';
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {GameCatalogueDetail} from "./components/pages/GameCatalogueDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GameCatalogueList/>} />
                <Route path="/game/:id" element={<GameCatalogueDetail />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
