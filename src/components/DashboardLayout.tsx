import React, { useState } from 'react';
import { Scenario, Season } from '../types/index';
import { PlayerAssignmentDialog } from './common/PlayerAssignmentDialog';
import { usePlayerAssignment } from '../hooks/usePlayerAssignment';

interface DashboardLayoutProps {
  seasons: Season[];
  scenarios: Scenario[];
  onScenarioUpdate: (scenario: Scenario) => void;
  onScenarioCreate: (scenario: Omit<Scenario, 'id' | 'lastUpdated' | 'createdBy'>) => void;
  onScenarioDelete: (scenarioId: string) => void;
  currentUserId: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  seasons,
  scenarios,
  onScenarioUpdate,
  onScenarioCreate,
  onScenarioDelete,
  currentUserId,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [isCreatingScenario, setIsCreatingScenario] = useState(false);

  const handleScenarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScenario) {
      onScenarioUpdate(editingScenario);
      setEditingScenario(null);
    } else if (isCreatingScenario && selectedSeason) {
      onScenarioCreate({
        name: editingScenario!.name,
        description: editingScenario!.description || '',
        status: editingScenario!.status,
        teamAssignments: editingScenario!.teamAssignments.map(assignment => ({
          teamId: assignment.teamId,
          players: [...assignment.players],
          staff: [...assignment.staff]
        })),
        seasonId: selectedSeason.id,
        teams: editingScenario!.teams || []
      });
      setIsCreatingScenario(false);
    }
  };

  const handleCreateScenario = () => {
    if (!selectedSeason) return;
    setIsCreatingScenario(true);
    setEditingScenario({
      id: '',
      name: '',
      description: '',
      status: 'draft',
      teamAssignments: [],
      lastUpdated: new Date().toISOString(),
      createdBy: currentUserId,
      seasonId: selectedSeason.id,
      teams: []
    });
  };

  const handleDuplicateScenario = (scenario: Scenario) => {
    const newScenario: Omit<Scenario, 'id' | 'lastUpdated' | 'createdBy'> = {
      name: `${scenario.name} (Copy)`,
      description: scenario.description,
      status: 'draft',
      teamAssignments: scenario.teamAssignments.map(assignment => ({
        teamId: assignment.teamId,
        players: [...assignment.players],
        staff: [...assignment.staff]
      })),
      seasonId: scenario.seasonId,
      teams: scenario.teams
    };
    onScenarioCreate(newScenario);
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
    teams: [],
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

  const renderScenarioForm = () => (
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
  );

  const renderScenarioList = () => (
    <div className="scenarios-list">
      {scenarios
        .filter(scenario => !selectedSeason || scenario.seasonId === selectedSeason.id)
        .map((scenario) => (
          <div key={scenario.id} className="scenario-card">
            <div className="scenario-info">
              <h4>{scenario.name}</h4>
              <p>Status: {scenario.status}</p>
              <p>Last Updated: {new Date(scenario.lastUpdated).toLocaleDateString()}</p>
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
  );

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="season-selector">
          <label htmlFor="season-select">Select Season:</label>
          <select
            id="season-select"
            value={selectedSeason?.id || ''}
            onChange={(e) => {
              const season = seasons.find(s => s.id === e.target.value);
              setSelectedSeason(season || null);
            }}
          >
            <option value="">Select a season</option>
            {seasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="scenarios-section">
          <div className="section-header">
            <h3>Scenarios</h3>
            <button
              className="create-button"
              onClick={handleCreateScenario}
            >
              Create New Scenario
            </button>
          </div>

          {(isCreatingScenario || editingScenario) && renderScenarioForm()}

          {renderScenarioList()}
        </div>
      </div>

      <PlayerAssignmentDialog
        isOpen={isDialogOpen}
        player={selectedPlayer}
        currentTeam={null}
        targetTeam={targetTeam}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleClose}
      />
    </div>
  );
}; 