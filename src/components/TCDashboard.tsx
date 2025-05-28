import React, { useState } from 'react';
import '../styles/TCDashboard.css';
import { Player, Scenario, Season, Staff, Team } from '../types';
import { PlayerAssignmentDialog } from './common/PlayerAssignmentDialog';
import { usePlayerAssignment } from '../hooks/usePlayerAssignment';

interface TCDashboardProps {
  teams: Team[];
  players: Player[];
  staff: Staff[];
  seasons: Season[];
  scenarios: Scenario[];
  onTeamUpdate: (team: Team) => void;
  onTeamCreate: (team: Omit<Team, 'id'>) => void;
  onTeamDelete: (teamId: string) => void;
  onPlayerUpdate: (player: Player) => void;
  onPlayerCreate: (player: Omit<Player, 'id'>) => void;
  onPlayerDelete: (playerId: string) => void;
  onStaffUpdate: (staff: Staff) => void;
  onStaffCreate: (staff: Omit<Staff, 'id'>) => void;
  onStaffDelete: (staffId: string) => void;
  onSeasonUpdate: (season: Season) => void;
  onSeasonCreate: (season: Omit<Season, 'id'>) => void;
  onSeasonDelete: (seasonId: string) => void;
  onScenarioUpdate: (scenario: Scenario) => void;
  onScenarioCreate: (scenario: Omit<Scenario, 'id' | 'lastUpdated' | 'createdBy'>) => void;
  onScenarioDelete: (scenarioId: string) => void;
  currentUserId: string;
}

function TCDashboard({
  teams,
  players,
  staff,
  seasons,
  scenarios,
  onTeamUpdate,
  onTeamCreate,
  onTeamDelete,
  onPlayerUpdate,
  onPlayerCreate,
  onPlayerDelete,
  onStaffUpdate,
  onStaffCreate,
  onStaffDelete,
  onSeasonUpdate,
  onSeasonCreate,
  onSeasonDelete,
  onScenarioUpdate,
  onScenarioCreate,
  onScenarioDelete,
  currentUserId,
}: TCDashboardProps) {
  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'staff' | 'seasons' | 'scenarios'>('teams');
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);
  const [isCreatingStaff, setIsCreatingStaff] = useState(false);
  const [isCreatingSeason, setIsCreatingSeason] = useState(false);
  const [isCreatingScenario, setIsCreatingScenario] = useState(false);

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeam) {
      onTeamUpdate(editingTeam);
      setEditingTeam(null);
    } else if (isCreatingTeam) {
      const newTeam = {
        name: editingTeam!.name,
        maxPlayers: editingTeam!.maxPlayers,
        players: [],
        staff: [],
        minAge: editingTeam!.minAge,
        maxAge: editingTeam!.maxAge,
      };
      onTeamCreate(newTeam);
      setIsCreatingTeam(false);
    }
  };

  const handleCreateTeam = () => {
    setIsCreatingTeam(true);
    setEditingTeam({
      id: '',
      name: '',
      maxPlayers: 12,
      players: [],
      staff: [],
      minAge: 0,
      maxAge: 99,
    });
  };

  const handlePlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlayer) {
      onPlayerUpdate(editingPlayer);
      setEditingPlayer(null);
    } else if (isCreatingPlayer) {
      const newPlayer = {
        ...editingPlayer!,
        id: `player-${Date.now()}`,
        gender: editingPlayer!.gender as 'male' | 'female' | 'other',
      };
      onPlayerCreate(newPlayer);
      setIsCreatingPlayer(false);
    }
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      onStaffUpdate(editingStaff);
      setEditingStaff(null);
    } else if (isCreatingStaff) {
      onStaffCreate(editingStaff!);
      setIsCreatingStaff(false);
    }
  };

  const handleCreateStaff = () => {
    setIsCreatingStaff(true);
    setEditingStaff({
      id: '',
      name: '',
      role: 'coach',
      teamId: undefined,
    });
  };

  const handleSeasonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSeason) {
      onSeasonUpdate(editingSeason);
      setEditingSeason(null);
    } else if (isCreatingSeason) {
      onSeasonCreate(editingSeason!);
      setIsCreatingSeason(false);
    }
  };

  const handleCreateSeason = () => {
    setIsCreatingSeason(true);
    setEditingSeason({
      id: '',
      name: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      isActive: true,
    });
  };

  const handleScenarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScenario) {
      onScenarioUpdate({
        ...editingScenario,
        lastUpdated: new Date().toISOString(),
      });
      setEditingScenario(null);
    } else if (isCreatingScenario) {
      onScenarioCreate({
        name: editingScenario!.name,
        status: editingScenario!.status,
        teamAssignments: editingScenario!.teamAssignments.map(assignment => ({
          teamId: assignment.teamId,
          players: [...assignment.players],
          staff: [...assignment.staff]
        }))
      });
      setIsCreatingScenario(false);
    }
  };

  const handleCreateScenario = () => {
    setIsCreatingScenario(true);
    setEditingScenario({
      id: '',
      name: '',
      status: 'draft',
      teamAssignments: [],
      lastUpdated: new Date().toISOString(),
      createdBy: currentUserId,
    });
  };

  const handleDuplicateScenario = (scenario: Scenario) => {
    const newScenario: Omit<Scenario, 'id' | 'lastUpdated' | 'createdBy'> = {
      name: `${scenario.name} (Copy)`,
      status: 'draft',
      teamAssignments: scenario.teamAssignments.map(assignment => ({
        teamId: assignment.teamId,
        players: [...assignment.players],
        staff: [...assignment.staff]
      }))
    };
    onScenarioCreate(newScenario);
  };

  const handleCreatePlayer = () => {
    setIsCreatingPlayer(true);
    setEditingPlayer({
      id: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      position: '',
      age: undefined,
      email: '',
      phone: '',
    });
  };

  const handlePlayerMove = (playerId: string, fromTeamId: string | undefined, toTeamId: string) => {
    // Update the player's teamId
    const updatedPlayer = players.find(p => p.id === playerId);
    if (updatedPlayer) {
      onPlayerUpdate({ ...updatedPlayer, teamId: toTeamId });
    }

    // Update the teams' player lists
    if (fromTeamId) {
      const fromTeam = teams.find(t => t.id === fromTeamId);
      if (fromTeam) {
        onTeamUpdate({
          ...fromTeam,
          players: fromTeam.players.filter(p => p !== playerId)
        });
      }
    }

    const toTeam = teams.find(t => t.id === toTeamId);
    if (toTeam) {
      onTeamUpdate({
        ...toTeam,
        players: [...toTeam.players, playerId]
      });
    }
  };

  const {
    isDialogOpen,
    selectedPlayer,
    targetTeam,
    handlePlayerAssignment,
    handleConfirm,
    handleCancel,
    handleClose
  } = usePlayerAssignment({
    teams,
    teamAssignments: editingScenario?.teamAssignments || [],
    setTeamAssignments: (assignments) => {
      if (editingScenario) {
        setEditingScenario({
          ...editingScenario,
          teamAssignments: typeof assignments === 'function' 
            ? assignments(editingScenario.teamAssignments)
            : assignments
        });
      }
    }
  });

  const renderScenariosTab = () => (
    <div className="scenarios-section">
      <div className="section-header">
        <h2>Scenarios</h2>
        <button
          className="create-button"
          onClick={() => setIsCreatingScenario(true)}
        >
          Create New Scenario
        </button>
      </div>

      <div className="scenarios-list">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="scenario-card">
            <div className="scenario-info">
              <h4>{scenario.name}</h4>
              <p>Status: {scenario.status}</p>
              <p>Last Updated: {new Date(scenario.lastUpdated).toLocaleDateString()}</p>
              <div className="scenario-teams">
                {scenario.teamAssignments.map((assignment) => {
                  const team = teams.find((t) => t.id === assignment.teamId);
                  return (
                    <div key={assignment.teamId} className="scenario-team">
                      <h5>{team?.name}</h5>
                      <p>
                        {assignment.players.length} players assigned
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="scenario-actions">
              <button
                className="edit-button"
                onClick={() => {
                  setEditingScenario(scenario);
                  setIsCreatingScenario(false);
                }}
              >
                Edit
              </button>
              <button
                className="duplicate-button"
                onClick={() => handleDuplicateScenario(scenario)}
              >
                Duplicate
              </button>
              {scenario.createdBy === currentUserId && (
                <button
                  className="delete-button"
                  onClick={() => onScenarioDelete(scenario.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {(isCreatingScenario || editingScenario) && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingScenario ? 'Edit Scenario' : 'Create New Scenario'}</h3>
            <form onSubmit={handleScenarioSubmit}>
              <div className="form-group">
                <label htmlFor="scenario-name">Name</label>
                <input
                  id="scenario-name"
                  type="text"
                  value={editingScenario?.name || ''}
                  onChange={(e) =>
                    setEditingScenario((prev) =>
                      prev
                        ? {
                            ...prev,
                            name: e.target.value,
                          }
                        : null
                    )
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="scenario-status">Status</label>
                <select
                  id="scenario-status"
                  value={editingScenario?.status || 'draft'}
                  onChange={(e) =>
                    setEditingScenario((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: e.target.value as 'draft' | 'active' | 'archived',
                          }
                        : null
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="form-group">
                <label>Team Assignments</label>
                {editingScenario?.teamAssignments.map((assignment, index) => (
                  <div key={index} className="team-assignment-row">
                    <select
                      value={assignment.teamId}
                      onChange={(e) =>
                        setEditingScenario((prev) =>
                          prev
                            ? {
                                ...prev,
                                teamAssignments: prev.teamAssignments.map((t, i) =>
                                  i === index
                                    ? { ...t, teamId: e.target.value }
                                    : t
                                ),
                              }
                            : null
                        )
                      }
                    >
                      <option value="">Select a team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>

                    <div className="player-selection">
                      {players.map((player) => (
                        <label
                          key={player.id}
                          className="player-checkbox"
                        >
                          <input
                            type="checkbox"
                            checked={assignment.players.includes(
                              player.id
                            )}
                            onChange={(e) =>
                              setEditingScenario((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      teamAssignments: prev.teamAssignments.map((t, i) =>
                                        i === index
                                          ? {
                                              ...t,
                                              players: e.target.checked
                                                ? [...t.players, player.id]
                                                : t.players.filter(
                                                    (id) => id !== player.id
                                                  ),
                                            }
                                          : t
                                      ),
                                    }
                                  : null
                              )
                            }
                          />
                          {player.firstName} {player.lastName}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-button"
                  onClick={() =>
                    setEditingScenario((prev) =>
                      prev
                        ? {
                            ...prev,
                            teamAssignments: [
                              ...prev.teamAssignments,
                              { teamId: '', players: [], staff: [] },
                            ],
                          }
                        : null
                    )
                  }
                >
                  Add Team Assignment
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">
                  {editingScenario ? 'Save Changes' : 'Create Scenario'}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setEditingScenario(null);
                    setIsCreatingScenario(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlayerForm = () => (
    <form className="edit-form" onSubmit={handlePlayerSubmit}>
      <h4>{isCreatingPlayer ? 'Create Player' : 'Edit Player'}</h4>
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={editingPlayer?.firstName || ''}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                firstName: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={editingPlayer?.lastName || ''}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                lastName: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Gender</label>
          <select
            value={editingPlayer?.gender || 'male'}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                gender: e.target.value as 'male' | 'female' | 'other',
              }))
            }
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            value={editingPlayer?.position || ''}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                position: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={editingPlayer?.age || ''}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                age: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={editingPlayer?.email || ''}
            onChange={(e) =>
              setEditingPlayer((prev) => ({
                ...prev!,
                email: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={editingPlayer?.phone || ''}
          onChange={(e) =>
            setEditingPlayer((prev) => ({
              ...prev!,
              phone: e.target.value,
            }))
          }
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          {isCreatingPlayer ? 'Create' : 'Save'}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setEditingPlayer(null);
            setIsCreatingPlayer(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderTeamForm = () => (
    <form className="edit-form" onSubmit={handleTeamSubmit}>
      <h4>{isCreatingTeam ? 'Create Team' : 'Edit Team'}</h4>
      <div className="form-group">
        <label>Team Name</label>
        <input
          type="text"
          value={editingTeam?.name || ''}
          onChange={(e) =>
            setEditingTeam((prev) => ({
              ...prev!,
              name: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="form-group">
        <label>Max Players</label>
        <input
          type="number"
          value={editingTeam?.maxPlayers || 12}
          onChange={(e) =>
            setEditingTeam((prev) => ({
              ...prev!,
              maxPlayers: parseInt(e.target.value),
            }))
          }
          min="1"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          {isCreatingTeam ? 'Create' : 'Save'}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setEditingTeam(null);
            setIsCreatingTeam(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderTeamList = () => (
    <div className="teams-list">
      {teams.map((team) => (
        <div key={team.id} className="team-card">
          <div className="team-info">
            <h4>{team.name}</h4>
            <p>Max Players: {team.maxPlayers}</p>
            <p>Current Players: {team.players.length}</p>
            <p>Staff Members: {team.staff.length}</p>
          </div>
          <div className="team-actions">
            <button
              className="edit-button"
              onClick={() => setEditingTeam(team)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onTeamDelete(team.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStaffForm = () => (
    <form className="edit-form" onSubmit={handleStaffSubmit}>
      <h4>{isCreatingStaff ? 'Add Staff Member' : 'Edit Staff Member'}</h4>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={editingStaff?.name || ''}
          onChange={(e) =>
            setEditingStaff((prev) => ({
              ...prev!,
              name: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          value={editingStaff?.role || 'coach'}
          onChange={(e) =>
            setEditingStaff((prev) => ({
              ...prev!,
              role: e.target.value,
            }))
          }
          required
        >
          <option value="coach">Coach</option>
          <option value="assistant">Assistant</option>
          <option value="manager">Manager</option>
          <option value="trainer">Trainer</option>
        </select>
      </div>
      <div className="form-group">
        <label>Team</label>
        <select
          value={editingStaff?.teamId || ''}
          onChange={(e) =>
            setEditingStaff((prev) => ({
              ...prev!,
              teamId: e.target.value || undefined,
            }))
          }
        >
          <option value="">No Team Assigned</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          {isCreatingStaff ? 'Add Staff' : 'Save Changes'}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setEditingStaff(null);
            setIsCreatingStaff(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderStaffList = () => (
    <div className="staff-list">
      {staff.map((staffMember) => (
        <div key={staffMember.id} className="staff-card">
          <div className="staff-info">
            <h4>{staffMember.name}</h4>
            <p>Role: {staffMember.role}</p>
            {staffMember.teamId && (
              <p>
                Team:{' '}
                {teams.find((t) => t.id === staffMember.teamId)?.name}
              </p>
            )}
          </div>
          <div className="staff-actions">
            <button
              className="edit-button"
              onClick={() => setEditingStaff(staffMember)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onStaffDelete(staffMember.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSeasonForm = () => (
    <form className="edit-form" onSubmit={handleSeasonSubmit}>
      <h4>{isCreatingSeason ? 'Create Season' : 'Edit Season'}</h4>
      <div className="form-group">
        <label>Season Name</label>
        <input
          type="text"
          value={editingSeason?.name || ''}
          onChange={(e) =>
            setEditingSeason((prev) => ({
              ...prev!,
              name: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={editingSeason?.startDate || ''}
            onChange={(e) =>
              setEditingSeason((prev) => ({
                ...prev!,
                startDate: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={editingSeason?.endDate || ''}
            onChange={(e) =>
              setEditingSeason((prev) => ({
                ...prev!,
                endDate: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          value={editingSeason?.isActive ? 'active' : 'inactive'}
          onChange={(e) =>
            setEditingSeason((prev) => ({
              ...prev!,
              isActive: e.target.value === 'active',
            }))
          }
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          {isCreatingSeason ? 'Create Season' : 'Save Changes'}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setEditingSeason(null);
            setIsCreatingSeason(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderSeasonList = () => (
    <div className="seasons-list">
      {seasons.map((season) => (
        <div key={season.id} className="season-card">
          <div className="season-info">
            <h4>{season.name}</h4>
            <p>Status: {season.isActive ? 'Active' : 'Inactive'}</p>
            <p>
              Dates: {new Date(season.startDate).toLocaleDateString()} -{' '}
              {new Date(season.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="season-actions">
            <button
              className="edit-button"
              onClick={() => setEditingSeason(season)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onSeasonDelete(season.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPlayerList = () => (
    <div className="space-y-4">
      {players.map(player => (
        <div key={player.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <h3 className="font-medium">{player.firstName} {player.lastName}</h3>
            <p className="text-sm text-gray-600">{player.position} • {player.age} years old</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={player.teamId || ''}
              onChange={(e) => {
                const targetTeam = teams.find(t => t.id === e.target.value);
                if (targetTeam) {
                  handlePlayerAssignment(player, targetTeam);
                }
              }}
              className="border rounded px-2 py-1"
            >
              <option value="">No Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setEditingPlayer(player)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={() => onPlayerDelete(player.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="tc-dashboard">
        <div className="tc-header">
          <h2>Team Coordinator Dashboard</h2>
          <div className="tc-tabs">
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
            <button
              className={activeTab === 'staff' ? 'active' : ''}
              onClick={() => setActiveTab('staff')}
            >
              Staff
            </button>
            <button
              className={activeTab === 'seasons' ? 'active' : ''}
              onClick={() => setActiveTab('seasons')}
            >
              Seasons
            </button>
            <button
              className={activeTab === 'scenarios' ? 'active' : ''}
              onClick={() => setActiveTab('scenarios')}
            >
              Scenarios
            </button>
          </div>
        </div>

        <div className="tc-content">
          {activeTab === 'teams' ? (
            <div className="teams-management">
              <div className="management-header">
                <h3>Teams Management</h3>
                <button
                  className="create-button"
                  onClick={handleCreateTeam}
                >
                  Create New Team
                </button>
              </div>

              {(editingTeam || isCreatingTeam) && renderTeamForm()}

              {renderTeamList()}
            </div>
          ) : activeTab === 'players' ? (
            <div className="players-management">
              <div className="management-header">
                <h3>Players Management</h3>
                <button
                  className="create-button"
                  onClick={handleCreatePlayer}
                >
                  Create New Player
                </button>
              </div>

              {(editingPlayer || isCreatingPlayer) && renderPlayerForm()}

              {renderPlayerList()}
            </div>
          ) : activeTab === 'staff' ? (
            <div className="staff-management">
              <div className="management-header">
                <h3>Staff Management</h3>
                <button
                  className="create-button"
                  onClick={handleCreateStaff}
                >
                  Add New Staff
                </button>
              </div>

              {(editingStaff || isCreatingStaff) && renderStaffForm()}

              {renderStaffList()}
            </div>
          ) : activeTab === 'seasons' ? (
            <div className="seasons-management">
              <div className="management-header">
                <h3>Season Management</h3>
                <button
                  className="create-button"
                  onClick={handleCreateSeason}
                >
                  Create New Season
                </button>
              </div>

              {(editingSeason || isCreatingSeason) && renderSeasonForm()}

              {renderSeasonList()}
            </div>
          ) : renderScenariosTab()}
        </div>
      </div>

      <PlayerAssignmentDialog
        isOpen={isDialogOpen}
        player={selectedPlayer}
        currentTeam={teams.find(t => t.players.includes(selectedPlayer?.id || '')) || null}
        targetTeam={targetTeam}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleClose}
      />
    </div>
  );
}

export default TCDashboard;
