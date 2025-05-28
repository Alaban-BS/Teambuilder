import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Team, Player, Season } from '../types/index';
import { Header } from './common/Header';
import '../styles/Configuration.css';

type TabType = 'seasons' | 'teams' | 'players';

export const Configuration: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('seasons');
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const createNewSeason = (): Season => ({
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    status: 'upcoming',
    registrationDeadline: '',
    maxTeams: 0,
    ageGroups: [],
    isActive: true,
    notes: ''
  });

  const createNewPlayer = (): Player => ({
    id: '',
    firstName: '',
    lastName: '',
    name: '',
    gender: 'male',
    birthDate: '',
    profileImage: null,
    status: 'active',
    federationNumber: '',
    teamId: '',
    notes: ''
  });

  return (
    <div className="configuration">
      <Header />
      <main className="configuration-content">
        <div className="configuration-header">
          <h1>Configuration</h1>
          <div className="tabs">
            <button
              className={activeTab === 'seasons' ? 'active' : ''}
              onClick={() => setActiveTab('seasons')}
            >
              Seasons
            </button>
            <button
              className={activeTab === 'teams' ? 'active' : ''}
              onClick={() => setActiveTab('teams')}
            >
              Teams
            </button>
            <button
              className={activeTab === 'players' ? 'active' : ''}
              onClick={() => setActiveTab('players')}
            >
              Players
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'seasons' && (
            <div className="seasons-section">
              <div className="section-header">
                <h2>Seasons</h2>
                <button 
                  className="create-button"
                  onClick={() => setEditingSeason(createNewSeason())}
                >
                  Create Season
                </button>
              </div>
              <div className="items-grid">
                {state.seasons.map(season => (
                  <div key={season.id} className="item-card">
                    <div className="item-info">
                      <h3>{season.name}</h3>
                      <p>Start: {new Date(season.startDate).toLocaleDateString()}</p>
                      <p>End: {new Date(season.endDate).toLocaleDateString()}</p>
                      <p>Status: {season.status}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="edit-button"
                        onClick={() => setEditingSeason({
                          ...season,
                          status: season.status || 'upcoming',
                          registrationDeadline: season.registrationDeadline || '',
                          maxTeams: season.maxTeams || 0,
                          ageGroups: season.ageGroups || [],
                          isActive: typeof season.isActive === 'boolean' ? season.isActive : true,
                          notes: season.notes || ''
                        })}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => dispatch({ 
                          type: 'SET_SEASONS', 
                          payload: state.seasons.filter(s => s.id !== season.id) 
                        })}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="teams-section">
              <div className="section-header">
                <h2>Teams</h2>
                <button 
                  className="create-button"
                  onClick={() => setEditingTeam({
                    id: '',
                    name: '',
                    location: '',
                    maxPlayers: 12,
                    minAge: 0,
                    maxAge: 99,
                    players: [],
                    staff: []
                  })}
                >
                  Create Team
                </button>
              </div>
              <div className="items-grid">
                {state.teams.map(team => (
                  <div key={team.id} className="item-card">
                    <div className="item-info">
                      <h3>{team.name}</h3>
                      <p>Location: {team.location}</p>
                      <p>Max Players: {team.maxPlayers}</p>
                      <p>Age Range: {team.minAge}-{team.maxAge}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="edit-button"
                        onClick={() => setEditingTeam(team)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => dispatch({ 
                          type: 'SET_TEAMS', 
                          payload: state.teams.filter(t => t.id !== team.id) 
                        })}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div className="players-section">
              <div className="section-header">
                <h2>Players</h2>
                <button 
                  className="create-button"
                  onClick={() => setEditingPlayer(createNewPlayer())}
                >
                  Create Player
                </button>
              </div>
              <div className="items-grid">
                {state.players.map(player => (
                  <div key={player.id} className="item-card">
                    <div className="player-info">
                      <h4>{player.name}</h4>
                      <p>Team: {state.teams.find(t => t.id === player.teamId)?.name || 'Unassigned'}</p>
                      <p>Birth Date: {new Date(player.birthDate).toLocaleDateString()}</p>
                      <p>Gender: {player.gender}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="edit-button"
                        onClick={() => setEditingPlayer({
                          ...player,
                          firstName: player.firstName || '',
                          lastName: player.lastName || '',
                          name: player.name || '',
                          gender: player.gender || 'male',
                          birthDate: player.birthDate || '',
                          profileImage: player.profileImage || null,
                          status: player.status || 'active',
                          federationNumber: player.federationNumber || '',
                          teamId: player.teamId || '',
                          notes: player.notes || ''
                        })}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => dispatch({ 
                          type: 'SET_PLAYERS', 
                          payload: state.players.filter(p => p.id !== player.id) 
                        })}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Edit Forms */}
        {editingSeason && (
          <div className="edit-form-modal">
            <div className="edit-form-content">
              <h3>{editingSeason.id ? 'Edit Season' : 'Create Season'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (editingSeason.id) {
                  dispatch({ 
                    type: 'SET_SEASONS', 
                    payload: state.seasons.map(s => s.id === editingSeason.id ? editingSeason : s) 
                  });
                } else {
                  dispatch({ 
                    type: 'SET_SEASONS', 
                    payload: [...state.seasons, { ...editingSeason, id: `season-${Date.now()}` }] 
                  });
                }
                setEditingSeason(null);
              }}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingSeason.name}
                    onChange={(e) => setEditingSeason({ ...editingSeason, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={editingSeason.startDate}
                    onChange={(e) => setEditingSeason({ ...editingSeason, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={editingSeason.endDate}
                    onChange={(e) => setEditingSeason({ ...editingSeason, endDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingSeason.status}
                    onChange={(e) => setEditingSeason({ ...editingSeason, status: e.target.value as 'upcoming' | 'active' | 'completed' })}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" className="cancel-button" onClick={() => setEditingSeason(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingTeam && (
          <div className="edit-form-modal">
            <div className="edit-form-content">
              <h3>{editingTeam.id ? 'Edit Team' : 'Create Team'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (editingTeam.id) {
                  dispatch({ 
                    type: 'SET_TEAMS', 
                    payload: state.teams.map(t => t.id === editingTeam.id ? editingTeam : t) 
                  });
                } else {
                  dispatch({ 
                    type: 'SET_TEAMS', 
                    payload: [...state.teams, { ...editingTeam, id: `team-${Date.now()}` }] 
                  });
                }
                setEditingTeam(null);
              }}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingTeam.name}
                    onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editingTeam.location}
                    onChange={(e) => setEditingTeam({ ...editingTeam, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Players</label>
                  <input
                    type="number"
                    value={editingTeam.maxPlayers}
                    onChange={(e) => setEditingTeam({ ...editingTeam, maxPlayers: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Min Age</label>
                  <input
                    type="number"
                    value={editingTeam.minAge}
                    onChange={(e) => setEditingTeam({ ...editingTeam, minAge: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Age</label>
                  <input
                    type="number"
                    value={editingTeam.maxAge}
                    onChange={(e) => setEditingTeam({ ...editingTeam, maxAge: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" className="cancel-button" onClick={() => setEditingTeam(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingPlayer && (
          <div className="edit-form-modal">
            <div className="edit-form-content">
              <h3>{editingPlayer.id ? 'Edit Player' : 'Create Player'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (editingPlayer.id) {
                  dispatch({ 
                    type: 'SET_PLAYERS', 
                    payload: state.players.map(p => p.id === editingPlayer.id ? editingPlayer : p) 
                  });
                } else {
                  dispatch({ 
                    type: 'SET_PLAYERS', 
                    payload: [...state.players, { ...editingPlayer, id: `player-${Date.now()}` }] 
                  });
                }
                setEditingPlayer(null);
              }}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={editingPlayer.firstName}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={editingPlayer.lastName}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Team</label>
                  <select
                    value={editingPlayer.teamId}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, teamId: e.target.value })}
                  >
                    <option value="">Unassigned</option>
                    {state.teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={editingPlayer.gender}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, gender: e.target.value as 'male' | 'female' | 'other' })}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Birth Date</label>
                  <input
                    type="date"
                    value={editingPlayer.birthDate}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, birthDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" className="cancel-button" onClick={() => setEditingPlayer(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}; 