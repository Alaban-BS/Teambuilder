import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UnauthorizedPage } from './components/auth/UnauthorizedPage';
import { ConfirmationDialog } from './components/common/ConfirmationDialog';
import { Header } from './components/common/Header';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ToastContainer } from './components/common/Toast';
import TCDashboard from './components/TCDashboard';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { DataModeProvider } from './contexts/DataModeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/global.css';
import { Player, Scenario, Season, Staff, Team } from './types';

// Initial test data
const initialTeams: Team[] = [];
const initialPlayers: Player[] = [];
const initialStaff: Staff[] = [];
const initialSeasons: Season[] = [];
const initialScenarios: Scenario[] = [];

const App: React.FC = () => {
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', initialTeams);
  const [players, setPlayers] = useLocalStorage<Player[]>('players', initialPlayers);
  const [staff, setStaff] = useLocalStorage<Staff[]>('staff', initialStaff);
  const [seasons, setSeasons] = useLocalStorage<Season[]>('seasons', initialSeasons);
  const [scenarios, setScenarios] = useLocalStorage<Scenario[]>('scenarios', initialScenarios);

  return (
    <DataModeProvider>
      <Router>
        <AuthProvider>
          <AppProvider>
            <div className="app">
              <Header />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'tc']}>
                      <TCDashboard
                        teams={teams}
                        players={players}
                        staff={staff}
                        seasons={seasons}
                        scenarios={scenarios}
                        onTeamUpdate={(team) => setTeams(prev => prev.map(t => t.id === team.id ? team : t))}
                        onTeamCreate={(team) => setTeams(prev => [...prev, { ...team, id: Math.random().toString(36).substr(2, 9) }])}
                        onTeamDelete={(teamId) => setTeams(prev => prev.filter(t => t.id !== teamId))}
                        onPlayerUpdate={(player) => setPlayers(prev => prev.map(p => p.id === player.id ? player : p))}
                        onPlayerCreate={(player) => setPlayers(prev => [...prev, { ...player, id: Math.random().toString(36).substr(2, 9) }])}
                        onPlayerDelete={(playerId) => setPlayers(prev => prev.filter(p => p.id !== playerId))}
                        onStaffUpdate={(staff) => setStaff(prev => prev.map(s => s.id === staff.id ? staff : s))}
                        onStaffCreate={(staff) => setStaff(prev => [...prev, { ...staff, id: Math.random().toString(36).substr(2, 9) }])}
                        onStaffDelete={(staffId) => setStaff(prev => prev.filter(s => s.id !== staffId))}
                        onSeasonUpdate={(season) => setSeasons(prev => prev.map(s => s.id === season.id ? season : s))}
                        onSeasonCreate={(season) => setSeasons(prev => [...prev, { ...season, id: Math.random().toString(36).substr(2, 9) }])}
                        onSeasonDelete={(seasonId) => setSeasons(prev => prev.filter(s => s.id !== seasonId))}
                        onScenarioUpdate={(scenario) => setScenarios(prev => prev.map(s => s.id === scenario.id ? scenario : s))}
                        onScenarioCreate={(scenario) => setScenarios(prev => [...prev, {
                          ...scenario,
                          id: Math.random().toString(36).substr(2, 9),
                          lastUpdated: new Date().toISOString(),
                          createdBy: 'current-user-id'
                        }])}
                        onScenarioDelete={(scenarioId) => setScenarios(prev => prev.filter(s => s.id !== scenarioId))}
                        currentUserId="current-user-id"
                      />
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
    </DataModeProvider>
  );
};

export default App;
