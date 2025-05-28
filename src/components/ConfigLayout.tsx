import React, { useState } from 'react';
import { Team, Player, Season, User } from '../types/index';
import '../styles/ConfigLayout.css';

interface ConfigLayoutProps {
  teams: Team[];
  players: Player[];
  seasons: Season[];
  currentUser: User;
  onTeamUpdate: (team: Team) => void;
  onTeamCreate: (team: Omit<Team, 'id'>) => void;
  onTeamDelete: (teamId: string) => void;
  onPlayerUpdate: (player: Player) => void;
  onPlayerCreate: (player: Omit<Player, 'id'>) => void;
  onPlayerDelete: (playerId: string) => void;
  onSeasonUpdate: (season: Season) => void;
  onSeasonCreate: (season: Omit<Season, 'id'>) => void;
  onSeasonDelete: (seasonId: string) => void;
  onLogout: () => void;
}

const ConfigLayout: React.FC<ConfigLayoutProps> = ({
  teams,
  players,
  seasons,
  currentUser,
  onTeamUpdate,
  onTeamCreate,
  onTeamDelete,
  onPlayerUpdate,
  onPlayerCreate,
  onPlayerDelete,
  onSeasonUpdate,
  onSeasonCreate,
  onSeasonDelete,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'seasons' | 'teams' | 'players'>('seasons');
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  return (
    <div className="config-layout">
      <header className="config-header">
        <div className="header-content">
          <h1>Configuration</h1>
          <div className="user-info">
            <span className="username">Welcome, {currentUser.username}</span>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="config-tabs">
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
      </header>

      <main className="config-content">
        {activeTab === 'seasons' && (
          <div className="seasons-management">
            <div className="management-header">
              <h3>Seasons</h3>
              <button className="create-button" onClick={() => setEditingSeason({ 
                id: '', 
                name: '', 
                startDate: '', 
                endDate: '',
                status: 'upcoming',
                registrationDeadline: '',
                maxTeams: 8,
                ageGroups: [],
                isActive: true,
                notes: ''
              })}>
                Create Season
              </button>
            </div>
            <div className="seasons-list">
              {seasons.map(season => (
                <div key={season.id} className="season-card">
                  <div className="season-info">
                    <h4>{season.name}</h4>
                    <p>Start: {new Date(season.startDate).toLocaleDateString()}</p>
                    <p>End: {new Date(season.endDate).toLocaleDateString()}</p>
                    <p>Status: {season.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                  <div className="season-actions">
                    <button className="edit-button" onClick={() => setEditingSeason(season)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onSeasonDelete(season.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="teams-management">
            <div className="management-header">
              <h3>Teams</h3>
              <button className="create-button" onClick={() => setEditingTeam({ 
                id: '', 
                name: '', 
                location: '',
                maxPlayers: 12,
                players: [],
                staff: [],
                minAge: 0,
                maxAge: 99
              })}>
                Create Team
              </button>
            </div>
            <div className="teams-list">
              {teams.map(team => (
                <div key={team.id} className="team-card">
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <p>Location: {team.location}</p>
                    <p>Max Players: {team.maxPlayers}</p>
                    <p>Age Range: {team.minAge}-{team.maxAge}</p>
                    <p>Players: {team.players.length}</p>
                    <p>Staff: {team.staff.length}</p>
                  </div>
                  <div className="team-actions">
                    <button className="edit-button" onClick={() => setEditingTeam(team)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onTeamDelete(team.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="players-management">
            <div className="management-header">
              <h3>Players</h3>
              <button className="create-button" onClick={() => setEditingPlayer({ 
                id: '', 
                firstName: '',
                lastName: '',
                name: '',
                teamId: '',
                gender: 'male',
                birthDate: '',
                profileImage: null,
                status: 'active',
                federationNumber: '',
                notes: ''
              })}>
                Create Player
              </button>
            </div>
            <div className="players-list">
              {players.map(player => (
                <div key={player.id} className="player-card">
                  <div className="player-info">
                    <h4>{player.name}</h4>
                    <p>Team: {teams.find(t => t.id === player.teamId)?.name || 'Unassigned'}</p>
                    <p>Birth Date: {new Date(player.birthDate).toLocaleDateString()}</p>
                    <p>Gender: {player.gender}</p>
                  </div>
                  <div className="player-actions">
                    <button className="edit-button" onClick={() => setEditingPlayer(player)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onPlayerDelete(player.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Forms */}
        {editingSeason && (
          <div className="modal">
            <div className="modal-content">
              <h3>{editingSeason.id ? 'Edit Season' : 'Create Season'}</h3>
              <form className="edit-form" onSubmit={(e) => {
                e.preventDefault();
                if (editingSeason.id) {
                  onSeasonUpdate(editingSeason);
                } else {
                  onSeasonCreate(editingSeason);
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
                  <label>
                    <input
                      type="checkbox"
                      checked={editingSeason.isActive}
                      onChange={(e) => setEditingSeason({ ...editingSeason, isActive: e.target.checked })}
                    />
                    Active Season
                  </label>
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
          <div className="modal">
            <div className="modal-content">
              <h3>{editingTeam.id ? 'Edit Team' : 'Create Team'}</h3>
              <form className="edit-form" onSubmit={(e) => {
                e.preventDefault();
                if (editingTeam.id) {
                  onTeamUpdate(editingTeam);
                } else {
                  onTeamCreate(editingTeam);
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
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Min Age</label>
                  <input
                    type="number"
                    value={editingTeam.minAge}
                    onChange={(e) => setEditingTeam({ ...editingTeam, minAge: parseInt(e.target.value) })}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Age</label>
                  <input
                    type="number"
                    value={editingTeam.maxAge}
                    onChange={(e) => setEditingTeam({ ...editingTeam, maxAge: parseInt(e.target.value) })}
                    min={editingTeam.minAge}
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
          <div className="modal">
            <div className="modal-content">
              <h3>{editingPlayer.id ? 'Edit Player' : 'Create Player'}</h3>
              <form className="edit-form" onSubmit={(e) => {
                e.preventDefault();
                if (editingPlayer.id) {
                  onPlayerUpdate(editingPlayer);
                } else {
                  onPlayerCreate(editingPlayer);
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
                    {teams.map(team => (
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

export default ConfigLayout; 