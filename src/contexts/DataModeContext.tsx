import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';

interface DataModeContextType {
  useMockData: boolean;
  toggleDataMode: () => void;
}

const DataModeContext = createContext<DataModeContextType | undefined>(undefined);

export const DataModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [useMockData, setUseMockData] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('useMockData');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('useMockData', JSON.stringify(useMockData));
  }, [useMockData]);

  const toggleDataMode = () => {
    setUseMockData((prev: boolean) => !prev);
  };

  return (
    <DataModeContext.Provider value={{ useMockData, toggleDataMode }}>
      {children}
    </DataModeContext.Provider>
  );
};

export const useDataMode = () => {
  const context = useContext(DataModeContext);
  if (context === undefined) {
    throw new Error('useDataMode must be used within a DataModeProvider');
  }
  return context;
};
