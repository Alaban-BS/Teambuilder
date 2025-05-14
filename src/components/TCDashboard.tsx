import React, { useState } from 'react';
import '../styles/TCDashboard.css';
import { Player, Scenario, Season, Staff, Team } from '../types';

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
      // Generate a temporary ID - in real app, this would come from the backend
      const newTeam = {
        ...editingTeam!,
        id: `team-${Date.now()}`,
      };
      onTeamCreate(newTeam);
      setIsCreatingTeam(false);
    }
  };

  const handlePlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlayer) {
      onPlayerUpdate(editingPlayer);
      setEditingPlayer(null);
    } else if (isCreatingPlayer) {
      // Generate a temporary ID - in real app, this would come from the backend
      const newPlayer = {
        ...editingPlayer!,
        id: `player-${Date.now()}`,
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
        teamAssignments: editingScenario!.teamAssignments,
      });
      setIsCreatingScenario(false);
    }
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
                      prev ? { ...prev, name: e.target.value } : null
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
                            status: e.target.value as 'draft' | 'final' | 'archived',
                          }
                        : null
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="final">Final</option>
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
                              { teamId: '', players: [] },
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

  return (
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
                onClick={() => {
                  setIsCreatingTeam(true);
                  setEditingTeam({
                    id: '',
                    name: '',
                    maxPlayers: 12,
                    minAge: 8,
                    maxAge: 10,
                  });
                }}
              >
                Create New Team
              </button>
            </div>

            {(editingTeam || isCreatingTeam) && (
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Min Age</label>
                    <input
                      type="number"
                      value={editingTeam?.minAge || 8}
                      onChange={(e) =>
                        setEditingTeam((prev) => ({
                          ...prev!,
                          minAge: parseInt(e.target.value),
                        }))
                      }
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Age</label>
                    <input
                      type="number"
                      value={editingTeam?.maxAge || 10}
                      onChange={(e) =>
                        setEditingTeam((prev) => ({
                          ...prev!,
                          maxAge: parseInt(e.target.value),
                        }))
                      }
                      min="1"
                      required
                    />
                  </div>
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
            )}

            <div className="teams-list">
              {teams.map((team) => (
                <div key={team.id} className="team-card">
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <p>Players: {team.maxPlayers}</p>
                    <p>Ages: {team.minAge}-{team.maxAge}</p>
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
          </div>
        ) : activeTab === 'players' ? (
          <div className="players-management">
            <div className="management-header">
              <h3>Players Management</h3>
              <button
                className="create-button"
                onClick={() => {
                  setIsCreatingPlayer(true);
                  setEditingPlayer({
                    id: '',
                    firstName: '',
                    lastName: '',
                    gender: 'M',
                    birthDate: new Date().toISOString().split('T')[0],
                    profileImage: null,
                    status: 'active',
                  });
                }}
              >
                Create New Player
              </button>
            </div>

            {(editingPlayer || isCreatingPlayer) && (
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
                      value={editingPlayer?.gender || 'M'}
                      onChange={(e) =>
                        setEditingPlayer((prev) => ({
                          ...prev!,
                          gender: e.target.value as 'M' | 'F',
                        }))
                      }
                      required
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Birth Date</label>
                    <input
                      type="date"
                      value={editingPlayer?.birthDate || ''}
                      onChange={(e) =>
                        setEditingPlayer((prev) => ({
                          ...prev!,
                          birthDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingPlayer?.status || 'active'}
                    onChange={(e) =>
                      setEditingPlayer((prev) => ({
                        ...prev!,
                        status: e.target.value as 'active' | 'inactive',
                      }))
                    }
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={editingPlayer?.notes || ''}
                    onChange={(e) =>
                      setEditingPlayer((prev) => ({
                        ...prev!,
                        notes: e.target.value,
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
            )}

            <div className="players-list">
              {players.map((player) => (
                <div key={player.id} className="player-card">
                  <div className="player-info">
                    <h4>{player.firstName} {player.lastName}</h4>
                    <p>Gender: {player.gender}</p>
                    <p>Age: {new Date().getFullYear() - new Date(player.birthDate).getFullYear()}</p>
                    <p>Status: {player.status}</p>
                    {player.notes && <p>Notes: {player.notes}</p>}
                  </div>
                  <div className="player-actions">
                    <button
                      className="edit-button"
                      onClick={() => setEditingPlayer(player)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => onPlayerDelete(player.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'staff' ? (
          <div className="staff-management">
            <div className="management-header">
              <h3>Staff Management</h3>
              <button
                className="create-button"
                onClick={() => {
                  setIsCreatingStaff(true);
                  setEditingStaff({
                    id: '',
                    firstName: '',
                    lastName: '',
                    role: 'coach',
                    email: '',
                    phone: '',
                    status: 'active',
                    assignedTeams: [],
                    qualifications: [],
                  });
                }}
              >
                Add New Staff
              </button>
            </div>

            {(editingStaff || isCreatingStaff) && (
              <form className="edit-form" onSubmit={handleStaffSubmit}>
                <h4>{isCreatingStaff ? 'Add Staff Member' : 'Edit Staff Member'}</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={editingStaff?.firstName || ''}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
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
                      value={editingStaff?.lastName || ''}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
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
                    <label>Role</label>
                    <select
                      value={editingStaff?.role || 'coach'}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
                          ...prev!,
                          role: e.target.value as Staff['role'],
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
                    <label>Status</label>
                    <select
                      value={editingStaff?.status || 'active'}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
                          ...prev!,
                          status: e.target.value as 'active' | 'inactive',
                        }))
                      }
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editingStaff?.email || ''}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
                          ...prev!,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={editingStaff?.phone || ''}
                      onChange={(e) =>
                        setEditingStaff((prev) => ({
                          ...prev!,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Qualifications</label>
                  <input
                    type="text"
                    value={editingStaff?.qualifications.join(', ') || ''}
                    onChange={(e) =>
                      setEditingStaff((prev) => ({
                        ...prev!,
                        qualifications: e.target.value.split(',').map(q => q.trim()),
                      }))
                    }
                    placeholder="Enter qualifications separated by commas"
                  />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={editingStaff?.notes || ''}
                    onChange={(e) =>
                      setEditingStaff((prev) => ({
                        ...prev!,
                        notes: e.target.value,
                      }))
                    }
                  />
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
            )}

            <div className="staff-list">
              {staff.map((staffMember) => (
                <div key={staffMember.id} className="staff-card">
                  <div className="staff-info">
                    <h4>{staffMember.firstName} {staffMember.lastName}</h4>
                    <p>Role: {staffMember.role}</p>
                    <p>Status: {staffMember.status}</p>
                    <p>Email: {staffMember.email}</p>
                    <p>Phone: {staffMember.phone}</p>
                    {staffMember.qualifications.length > 0 && (
                      <p>Qualifications: {staffMember.qualifications.join(', ')}</p>
                    )}
                    {staffMember.notes && <p>Notes: {staffMember.notes}</p>}
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
          </div>
        ) : activeTab === 'seasons' ? (
          <div className="seasons-management">
            <div className="management-header">
              <h3>Season Management</h3>
              <button
                className="create-button"
                onClick={() => {
                  setIsCreatingSeason(true);
                  setEditingSeason({
                    id: '',
                    name: '',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    status: 'upcoming',
                    registrationDeadline: new Date().toISOString().split('T')[0],
                    maxTeams: 10,
                    ageGroups: [{ minAge: 8, maxAge: 10 }],
                  });
                }}
              >
                Create New Season
              </button>
            </div>

            {(editingSeason || isCreatingSeason) && (
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Registration Deadline</label>
                    <input
                      type="date"
                      value={editingSeason?.registrationDeadline || ''}
                      onChange={(e) =>
                        setEditingSeason((prev) => ({
                          ...prev!,
                          registrationDeadline: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Teams</label>
                    <input
                      type="number"
                      value={editingSeason?.maxTeams || 10}
                      onChange={(e) =>
                        setEditingSeason((prev) => ({
                          ...prev!,
                          maxTeams: parseInt(e.target.value),
                        }))
                      }
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingSeason?.status || 'upcoming'}
                    onChange={(e) =>
                      setEditingSeason((prev) => ({
                        ...prev!,
                        status: e.target.value as Season['status'],
                      }))
                    }
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Age Groups</label>
                  {editingSeason?.ageGroups.map((group, index) => (
                    <div key={index} className="age-group-row">
                      <input
                        type="number"
                        value={group.minAge}
                        onChange={(e) => {
                          const newAgeGroups = [...editingSeason.ageGroups];
                          newAgeGroups[index] = {
                            ...group,
                            minAge: parseInt(e.target.value),
                          };
                          setEditingSeason((prev) => ({
                            ...prev!,
                            ageGroups: newAgeGroups,
                          }));
                        }}
                        min="1"
                        placeholder="Min Age"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        value={group.maxAge}
                        onChange={(e) => {
                          const newAgeGroups = [...editingSeason.ageGroups];
                          newAgeGroups[index] = {
                            ...group,
                            maxAge: parseInt(e.target.value),
                          };
                          setEditingSeason((prev) => ({
                            ...prev!,
                            ageGroups: newAgeGroups,
                          }));
                        }}
                        min="1"
                        placeholder="Max Age"
                      />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => {
                          const newAgeGroups = editingSeason.ageGroups.filter((_, i) => i !== index);
                          setEditingSeason((prev) => ({
                            ...prev!,
                            ageGroups: newAgeGroups,
                          }));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => {
                      setEditingSeason((prev) => ({
                        ...prev!,
                        ageGroups: [
                          ...prev!.ageGroups,
                          { minAge: 8, maxAge: 10 },
                        ],
                      }));
                    }}
                  >
                    Add Age Group
                  </button>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={editingSeason?.notes || ''}
                    onChange={(e) =>
                      setEditingSeason((prev) => ({
                        ...prev!,
                        notes: e.target.value,
                      }))
                    }
                  />
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
            )}

            <div className="seasons-list">
              {seasons.map((season) => (
                <div key={season.id} className="season-card">
                  <div className="season-info">
                    <h4>{season.name}</h4>
                    <p>Status: {season.status}</p>
                    <p>Dates: {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}</p>
                    <p>Registration Deadline: {new Date(season.registrationDeadline).toLocaleDateString()}</p>
                    <p>Max Teams: {season.maxTeams}</p>
                    <p>Age Groups: {season.ageGroups.map(group => `${group.minAge}-${group.maxAge}`).join(', ')}</p>
                    {season.notes && <p>Notes: {season.notes}</p>}
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
          </div>
        ) : renderScenariosTab()}
      </div>
    </div>
  );
}

export default TCDashboard;
