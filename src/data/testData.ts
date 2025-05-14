import { Team, Player } from '../types';

export const testTeams: Team[] = [
  {
    id: 'team-u10',
    name: 'Under 10 Boys',
    maxPlayers: 12,
    minAge: 8,
    maxAge: 10,
  },
  {
    id: 'team-u12',
    name: 'Under 12 Girls',
    maxPlayers: 12,
    minAge: 10,
    maxAge: 12,
  },
  {
    id: 'team-u14',
    name: 'Under 14 Boys',
    maxPlayers: 14,
    minAge: 12,
    maxAge: 14,
  },
  {
    id: 'team-u16',
    name: 'Under 16 Girls',
    maxPlayers: 14,
    minAge: 14,
    maxAge: 16,
  },
  {
    id: 'team-u18',
    name: 'Under 18 Boys',
    maxPlayers: 16,
    minAge: 16,
    maxAge: 18,
  },
];

export const testPlayers: Player[] = [
  // Under 10 Boys
  {
    id: 'p-u10-1',
    firstName: 'Liam',
    lastName: 'Johnson',
    gender: 'M',
    birthDate: '2014-03-15',
    profileImage: null,
    status: 'active',
    notes: 'Goalkeeper',
  },
  {
    id: 'p-u10-2',
    firstName: 'Noah',
    lastName: 'Williams',
    gender: 'M',
    birthDate: '2014-06-22',
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-u10-3',
    firstName: 'Oliver',
    lastName: 'Brown',
    gender: 'M',
    birthDate: '2014-09-10',
    profileImage: null,
    status: 'active',
  },

  // Under 12 Girls
  {
    id: 'p-u12-1',
    firstName: 'Emma',
    lastName: 'Davis',
    gender: 'F',
    birthDate: '2012-01-05',
    profileImage: null,
    status: 'active',
    notes: 'Team captain',
  },
  {
    id: 'p-u12-2',
    firstName: 'Ava',
    lastName: 'Miller',
    gender: 'F',
    birthDate: '2012-04-18',
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-u12-3',
    firstName: 'Sophia',
    lastName: 'Wilson',
    gender: 'F',
    birthDate: '2012-07-30',
    profileImage: null,
    status: 'active',
  },

  // Under 14 Boys
  {
    id: 'p-u14-1',
    firstName: 'Ethan',
    lastName: 'Moore',
    gender: 'M',
    birthDate: '2010-02-14',
    profileImage: null,
    status: 'active',
    notes: 'Defender',
  },
  {
    id: 'p-u14-2',
    firstName: 'Mason',
    lastName: 'Taylor',
    gender: 'M',
    birthDate: '2010-05-27',
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-u14-3',
    firstName: 'Lucas',
    lastName: 'Anderson',
    gender: 'M',
    birthDate: '2010-08-09',
    profileImage: null,
    status: 'active',
  },

  // Under 16 Girls
  {
    id: 'p-u16-1',
    firstName: 'Isabella',
    lastName: 'Thomas',
    gender: 'F',
    birthDate: '2008-03-21',
    profileImage: null,
    status: 'active',
    notes: 'Midfielder',
  },
  {
    id: 'p-u16-2',
    firstName: 'Mia',
    lastName: 'Jackson',
    gender: 'F',
    birthDate: '2008-06-04',
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-u16-3',
    firstName: 'Charlotte',
    lastName: 'White',
    gender: 'F',
    birthDate: '2008-09-17',
    profileImage: null,
    status: 'active',
  },

  // Under 18 Boys
  {
    id: 'p-u18-1',
    firstName: 'William',
    lastName: 'Harris',
    gender: 'M',
    birthDate: '2006-01-30',
    profileImage: null,
    status: 'active',
    notes: 'Forward',
  },
  {
    id: 'p-u18-2',
    firstName: 'James',
    lastName: 'Martin',
    gender: 'M',
    birthDate: '2006-04-12',
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-u18-3',
    firstName: 'Benjamin',
    lastName: 'Thompson',
    gender: 'M',
    birthDate: '2006-07-25',
    profileImage: null,
    status: 'active',
  },

  // Additional players for testing edge cases
  {
    id: 'p-edge-1',
    firstName: 'Alex',
    lastName: 'Smith',
    gender: 'M',
    birthDate: '2014-12-31', // Just turned 10
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-edge-2',
    firstName: 'Jordan',
    lastName: 'Lee',
    gender: 'F',
    birthDate: '2012-01-01', // Just turned 12
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-edge-3',
    firstName: 'Casey',
    lastName: 'Wright',
    gender: 'M',
    birthDate: '2010-12-31', // Just turned 14
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-edge-4',
    firstName: 'Taylor',
    lastName: 'Clark',
    gender: 'F',
    birthDate: '2008-01-01', // Just turned 16
    profileImage: null,
    status: 'active',
  },
  {
    id: 'p-edge-5',
    firstName: 'Morgan',
    lastName: 'Lewis',
    gender: 'M',
    birthDate: '2006-12-31', // Just turned 18
    profileImage: null,
    status: 'active',
  },
]; 