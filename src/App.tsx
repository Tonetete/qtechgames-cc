import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopBar } from './components/molecules/TopBar/TopBar';
import { ProfilerComponent } from './components/utils/Profiler';

// Lazy load route components
const ContainerGameCatalogueListComponent = React.lazy(() =>
  import(
    './components/pages/ContainerGameCatalogueList/ContainerGameCatalogueList'
  ).then((module) => ({ default: module.ContainerGameCatalogueList })),
);

const ContainerGameCatalogueDetailComponent = React.lazy(() =>
  import(
    './components/organism/GameCatalogueDetail/GameCatalogueDetail.component'
  ).then((module) => ({ default: module.ContainerGameCatalogueDetail })),
);

const GameCatalogueFavoriteList = React.lazy(() =>
  import(
    './components/organism/GameCatalogueFavoriteList/GameCatalogueFavoriteList.component'
  ).then((module) => ({ default: module.GameCatalogueFavoriteList })),
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen p-8">
    <div className="animate-pulse text-xl">Loading...</div>
  </div>
);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="grid grid-rows-[auto_1fr] h-screen">
          <TopBar />
          <div className="overflow-auto pt-4">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProfilerComponent id="GameCatalogList">
                      <ContainerGameCatalogueListComponent />
                    </ProfilerComponent>
                  }
                />
                <Route
                  path="/game/:id"
                  element={
                    <ProfilerComponent id="GameDetail">
                      <ContainerGameCatalogueDetailComponent />
                    </ProfilerComponent>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProfilerComponent id="FavoritesList">
                      <GameCatalogueFavoriteList />
                    </ProfilerComponent>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
