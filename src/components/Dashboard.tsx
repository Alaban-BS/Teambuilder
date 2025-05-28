import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Player, Scenario, Season, Staff, Team } from '../types/index';
import { PlayerAssignmentDialog } from './common/PlayerAssignmentDialog';
import { usePlayerAssignment } from '../hooks/usePlayerAssignment';
import { Header } from './common/Header';
import '../styles/Dashboard.css';

export const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { state, dispatch } = useApp();
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const navigate = useNavigate();

  const canAccessConfig = currentUser?.role === 'admin' || currentUser?.role === 'manager';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (state.seasons.length > 0 && !selectedSeason) {
      const activeSeason = state.seasons.find(s => s.isActive);
      if (activeSeason) {
        setSelectedSeason(activeSeason.id);
      } else {
        setSelectedSeason(state.seasons[0].id);
      }
    }
  }, [state.seasons, selectedSeason]);

  const currentSeason = state.seasons.find(s => s.id === selectedSeason);
  const seasonScenarios = state.scenarios.filter(s => s.seasonId === selectedSeason);

  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div className="season-selector">
            <h3>Current Season</h3>
            <select 
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="season-select"
            >
              {state.seasons.map(season => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>
          {canAccessConfig && (
            <button className="config-button" onClick={() => navigate('/config')}>
              Configuration
            </button>
          )}
        </div>

        <div className="scenarios-section">
          <div className="scenarios-header">
            <h2>Scenarios for {currentSeason?.name}</h2>
            {canAccessConfig && (
              <button 
                className="create-button"
                onClick={() => {
                  const newScenario: Omit<Scenario, 'id'> = {
                    name: `New Scenario ${seasonScenarios.length + 1}`,
                    description: '',
                    status: 'draft',
                    seasonId: selectedSeason,
                    teamAssignments: [],
                    lastUpdated: new Date().toISOString(),
                    createdBy: currentUser?.id || '',
                    teams: []
                  };
                  dispatch({ 
                    type: 'SET_SCENARIOS', 
                    payload: [...state.scenarios, { ...newScenario, id: `scenario-${Date.now()}` }] 
                  });
                }}
              >
                Create New Scenario
              </button>
            )}
          </div>

          <div className="scenarios-grid">
            {seasonScenarios.map(scenario => (
              <div key={scenario.id} className="scenario-card">
                <div className="scenario-info">
                  <h3>{scenario.name}</h3>
                  <p>Status: {scenario.status}</p>
                  <p>Last Updated: {new Date(scenario.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div className="scenario-actions">
                  {canAccessConfig && (
                    <>
                      <button 
                        className="edit-button"
                        onClick={() => {
                          // TODO: Implement scenario editing
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="duplicate-button"
                        onClick={() => {
                          const duplicatedScenario: Omit<Scenario, 'id'> = {
                            ...scenario,
                            name: `${scenario.name} (Copy)`,
                            status: 'draft',
                            lastUpdated: new Date().toISOString()
                          };
                          dispatch({ 
                            type: 'SET_SCENARIOS', 
                            payload: [...state.scenarios, { ...duplicatedScenario, id: `scenario-${Date.now()}` }] 
                          });
                        }}
                      >
                        Duplicate
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
