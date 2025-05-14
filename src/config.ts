export const config = {
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
};
