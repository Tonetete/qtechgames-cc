import React, { createContext, useContext, useState, useCallback } from 'react';

const GameFilterContext = createContext({
  filter: '',
  onFilterUpdate: (filterValue: string) => {},
});

export const GameFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filter, setFilter] = useState('');
  const updateFilter = useCallback((filterValue: string) => {
    setFilter(filterValue);
  }, []);

  return (
    <GameFilterContext.Provider
      value={{ filter, onFilterUpdate: updateFilter }}
    >
      {children}
    </GameFilterContext.Provider>
  );
};

export const useGameFilter = () => {
  return useContext(GameFilterContext);
};
