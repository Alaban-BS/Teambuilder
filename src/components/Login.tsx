import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { testTeams, testPlayers, testStaff, testSeasons, testScenarios } from '../data/TestData';
import '../styles/Login.css';

export const Login: React.FC = () => {
  const [useSampleData, setUseSampleData] = useState(false);
  const { login } = useAuth();
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleRoleLogin = async (role: 'admin' | 'manager' | 'coordinator') => {
    try {
      const user = await login(role);
      if (useSampleData) {
        dispatch({ type: 'SET_LOADING', payload: true });
        // Load sample data
        dispatch({ type: 'SET_TEAMS', payload: testTeams });
        dispatch({ type: 'SET_PLAYERS', payload: testPlayers });
        dispatch({ type: 'SET_STAFF', payload: testStaff });
        dispatch({ type: 'SET_SEASONS', payload: testSeasons });
        dispatch({ type: 'SET_SCENARIOS', payload: testScenarios });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      dispatch({
        type: 'ADD_TOAST',
        payload: {
          id: Date.now().toString(),
          type: 'error',
          message: 'Login failed'
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Select Role</h2>
        <div className="role-buttons">
          <button 
            className="role-button admin" 
            onClick={() => handleRoleLogin('admin')}
          >
            Login as Admin
          </button>
          <button 
            className="role-button manager" 
            onClick={() => handleRoleLogin('manager')}
          >
            Login as Manager
          </button>
          <button 
            className="role-button coordinator" 
            onClick={() => handleRoleLogin('coordinator')}
          >
            Login as Coordinator
          </button>
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="useSampleData"
            checked={useSampleData}
            onChange={(e) => setUseSampleData(e.target.checked)}
          />
          <label htmlFor="useSampleData">Use Sample Data</label>
        </div>
      </div>
    </div>
  );
};
