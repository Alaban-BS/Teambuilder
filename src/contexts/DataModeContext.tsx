import React, { createContext, useContext, useEffect, useState } from 'react';

interface DataModeContextType {
  useMockData: boolean;
  toggleDataMode: () => void;
}

const DataModeContext = createContext<DataModeContextType | undefined>(undefined);

export const DataModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useMockData, setUseMockData] = useState(() => {
    const saved = localStorage.getItem('useMockData');
    return saved ? JSON.parse(saved) : true; // Default to mock data
  });

  useEffect(() => {
    localStorage.setItem('useMockData', JSON.stringify(useMockData));
  }, [useMockData]);

  const toggleDataMode = () => {
    setUseMockData(prev => !prev);
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
