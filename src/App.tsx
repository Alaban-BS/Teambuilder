import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import TCDashboard from './components/TCDashboard';
import { ToastContainer } from './components/common/Toast';
import { ConfirmationDialog } from './components/common/ConfirmationDialog';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'tc']}>
                    <TCDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <ToastContainer />
            <ConfirmationDialog />
            <LoadingSpinner />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
