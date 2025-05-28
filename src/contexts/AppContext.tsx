import React, { createContext, useContext, useState, useEffect, useReducer, ReactNode } from 'react';
import { Team, Player, Staff, Season, Scenario } from '../types/index';
import { Toast, ConfirmationDialog } from '../types/common';
import { testTeams, testPlayers, testStaff, testSeasons, testScenarios } from '../data/TestData';

interface AppState {
  teams: Team[];
  players: Player[];
  staff: Staff[];
  seasons: Season[];
  scenarios: Scenario[];
  selectedSeason: string;
  toasts: Toast[];
  confirmationDialog: ConfirmationDialog;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_TEAMS'; payload: Team[] }
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'SET_STAFF'; payload: Staff[] }
  | { type: 'SET_SEASONS'; payload: Season[] }
  | { type: 'SET_SCENARIOS'; payload: Scenario[] }
  | { type: 'SET_SELECTED_SEASON'; payload: string }
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SHOW_CONFIRMATION_DIALOG'; payload: ConfirmationDialog }
  | { type: 'HIDE_CONFIRMATION_DIALOG' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  teams: [],
  players: [],
  staff: [],
  seasons: [],
  scenarios: [],
  selectedSeason: '',
  toasts: [],
  confirmationDialog: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  },
  isLoading: false
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  updateTeam: (team: Team) => void;
  createTeam: (team: Omit<Team, 'id'>) => void;
  deleteTeam: (teamId: string) => void;
  updatePlayer: (player: Player) => void;
  createPlayer: (player: Omit<Player, 'id'>) => void;
  deletePlayer: (playerId: string) => void;
  updateStaff: (staff: Staff) => void;
  createStaff: (staff: Omit<Staff, 'id'>) => void;
  deleteStaff: (staffId: string) => void;
  updateSeason: (season: Season) => void;
  createSeason: (season: Omit<Season, 'id'>) => void;
  deleteSeason: (seasonId: string) => void;
  updateScenario: (scenario: Scenario) => void;
  createScenario: (scenario: Omit<Scenario, 'id'>) => void;
  deleteScenario: (scenarioId: string) => void;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_STAFF':
      return { ...state, staff: action.payload };
    case 'SET_SEASONS':
      return { ...state, seasons: action.payload };
    case 'SET_SCENARIOS':
      return { ...state, scenarios: action.payload };
    case 'SET_SELECTED_SEASON':
      return { ...state, selectedSeason: action.payload };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) };
    case 'SHOW_CONFIRMATION_DIALOG':
      return { ...state, confirmationDialog: action.payload };
    case 'HIDE_CONFIRMATION_DIALOG':
      return { ...state, confirmationDialog: { ...state.confirmationDialog, isOpen: false } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load test data on initialization
  useEffect(() => {
    dispatch({ type: 'SET_TEAMS', payload: testTeams });
    dispatch({ type: 'SET_PLAYERS', payload: testPlayers });
    dispatch({ type: 'SET_STAFF', payload: testStaff });
    dispatch({ type: 'SET_SEASONS', payload: testSeasons });
    dispatch({ type: 'SET_SCENARIOS', payload: testScenarios });
  }, []);

  const updateTeam = (team: Team) => {
    dispatch({ type: 'SET_TEAMS', payload: state.teams.map(t => t.id === team.id ? team : t) });
  };

  const createTeam = (team: Omit<Team, 'id'>) => {
    const newTeam = { ...team, id: `team-${Date.now()}` };
    dispatch({ type: 'SET_TEAMS', payload: [...state.teams, newTeam] });
  };

  const deleteTeam = (teamId: string) => {
    dispatch({ type: 'SET_TEAMS', payload: state.teams.filter(t => t.id !== teamId) });
  };

  const updatePlayer = (player: Player) => {
    dispatch({ type: 'SET_PLAYERS', payload: state.players.map(p => p.id === player.id ? player : p) });
  };

  const createPlayer = (player: Omit<Player, 'id'>) => {
    const newPlayer = { ...player, id: `player-${Date.now()}` };
    dispatch({ type: 'SET_PLAYERS', payload: [...state.players, newPlayer] });
  };

  const deletePlayer = (playerId: string) => {
    dispatch({ type: 'SET_PLAYERS', payload: state.players.filter(p => p.id !== playerId) });
  };

  const updateStaff = (staffMember: Staff) => {
    dispatch({ type: 'SET_STAFF', payload: state.staff.map(s => s.id === staffMember.id ? staffMember : s) });
  };

  const createStaff = (staffMember: Omit<Staff, 'id'>) => {
    const newStaff = { ...staffMember, id: `staff-${Date.now()}` };
    dispatch({ type: 'SET_STAFF', payload: [...state.staff, newStaff] });
  };

  const deleteStaff = (staffId: string) => {
    dispatch({ type: 'SET_STAFF', payload: state.staff.filter(s => s.id !== staffId) });
  };

  const updateSeason = (season: Season) => {
    dispatch({ type: 'SET_SEASONS', payload: state.seasons.map(s => s.id === season.id ? season : s) });
  };

  const createSeason = (season: Omit<Season, 'id'>) => {
    const newSeason = { ...season, id: `season-${Date.now()}` };
    dispatch({ type: 'SET_SEASONS', payload: [...state.seasons, newSeason] });
  };

  const deleteSeason = (seasonId: string) => {
    dispatch({ type: 'SET_SEASONS', payload: state.seasons.filter(s => s.id !== seasonId) });
  };

  const updateScenario = (scenario: Scenario) => {
    dispatch({ type: 'SET_SCENARIOS', payload: state.scenarios.map(s => s.id === scenario.id ? scenario : s) });
  };

  const createScenario = (scenario: Omit<Scenario, 'id'>) => {
    const newScenario = { ...scenario, id: `scenario-${Date.now()}` };
    dispatch({ type: 'SET_SCENARIOS', payload: [...state.scenarios, newScenario] });
  };

  const deleteScenario = (scenarioId: string) => {
    dispatch({ type: 'SET_SCENARIOS', payload: state.scenarios.filter(s => s.id !== scenarioId) });
  };

  const value = {
    state,
    dispatch,
    updateTeam,
    createTeam,
    deleteTeam,
    updatePlayer,
    createPlayer,
    deletePlayer,
    updateStaff,
    createStaff,
    deleteStaff,
    updateSeason,
    createSeason,
    deleteSeason,
    updateScenario,
    createScenario,
    deleteScenario
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 