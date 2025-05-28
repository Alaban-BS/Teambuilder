import { Player, Scenario, Season, Staff, Team, User } from '../types/index';
import { mockPlayers, mockScenarios, mockSeasons, mockStaff, mockTeams, mockUsers } from './mockData';

class ApiService {
  private useMockData: boolean;

  constructor(useMockData: boolean) {
    this.useMockData = useMockData;
  }

  // Players
  async getPlayers(): Promise<Player[]> {
    if (this.useMockData) {
      return mockPlayers;
    }
    const response = await fetch('/api/players');
    return response.json();
  }

  async createPlayer(player: Omit<Player, 'id'>): Promise<Player> {
    if (this.useMockData) {
      const newPlayer = { ...player, id: String(mockPlayers.length + 1) };
      mockPlayers.push(newPlayer);
      return newPlayer;
    }
    const response = await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    });
    return response.json();
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    if (this.useMockData) {
      return mockTeams;
    }
    const response = await fetch('/api/teams');
    return response.json();
  }

  async createTeam(team: Omit<Team, 'id'>): Promise<Team> {
    if (this.useMockData) {
      const newTeam = { ...team, id: String(mockTeams.length + 1) };
      mockTeams.push(newTeam);
      return newTeam;
    }
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    return response.json();
  }

  // Staff
  async getStaff(): Promise<Staff[]> {
    if (this.useMockData) {
      return mockStaff;
    }
    const response = await fetch('/api/staff');
    return response.json();
  }

  async createStaff(staff: Omit<Staff, 'id'>): Promise<Staff> {
    if (this.useMockData) {
      const newStaff = { ...staff, id: String(mockStaff.length + 1) };
      mockStaff.push(newStaff);
      return newStaff;
    }
    const response = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staff),
    });
    return response.json();
  }

  // Seasons
  async getSeasons(): Promise<Season[]> {
    if (this.useMockData) {
      return mockSeasons;
    }
    const response = await fetch('/api/seasons');
    return response.json();
  }

  async createSeason(season: Omit<Season, 'id'>): Promise<Season> {
    if (this.useMockData) {
      const newSeason = { ...season, id: String(mockSeasons.length + 1) };
      mockSeasons.push(newSeason);
      return newSeason;
    }
    const response = await fetch('/api/seasons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(season),
    });
    return response.json();
  }

  // Scenarios
  async getScenarios(): Promise<Scenario[]> {
    if (this.useMockData) {
      return mockScenarios;
    }
    const response = await fetch('/api/scenarios');
    return response.json();
  }

  async createScenario(scenario: Omit<Scenario, 'id'>): Promise<Scenario> {
    if (this.useMockData) {
      const newScenario = { ...scenario, id: String(mockScenarios.length + 1) };
      mockScenarios.push(newScenario);
      return newScenario;
    }
    const response = await fetch('/api/scenarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scenario),
    });
    return response.json();
  }

  // Users
  async getUsers(): Promise<User[]> {
    if (this.useMockData) {
      return mockUsers;
    }
    const response = await fetch('/api/users');
    return response.json();
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    if (this.useMockData) {
      const newUser = { ...user, id: String(mockUsers.length + 1) };
      mockUsers.push(newUser);
      return newUser;
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  }
}

// Create a function to get a new instance of ApiService with the current data mode
export const createApiService = (useMockData: boolean) => new ApiService(useMockData);
