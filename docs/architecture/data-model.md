# Data Model

## Core Entities

### Season
Represents a seasonal planning cycle (e.g., "2025/2026").

**Attributes:**
- `id`: Unique identifier
- `name`: Season name
- `startDate`, `endDate`: Season boundaries
- `referenceDate`: For age calculations (2 decimal precision)

### Player
Represents a person who can be assigned to a team.

**Attributes:**
- `id`: Internal ID
- `federationNumber` (optional): Federation identifier
- `firstName`, `middleName`, `lastName`
- `gender`
- `dateOfBirth`
- `profilePhoto` (optional)
- `status`: active/inactive

### StaffMember
Represents a coach, trainer, or support role.

**Attributes:**
- `id`
- `firstName`, `lastName`
- `roles`: Array of role IDs

### TeamTemplate
Defines the rules for a team type.

**Attributes:**
- `id`
- `name`
- `ageCategory`
- `gender`
- `maxPlayers`
- `requiredRoleIds[]`

### Scenario
A planning snapshot containing teams and assignments.

**Attributes:**
- `id`
- `name`
- `status`: Draft/Final/Archived
- `seasonId`
- `lastUpdated`

## JSON Structure Examples

### players.json
```json
[
  {
    "id": "p001",
    "firstName": "Sophie",
    "lastName": "Janssen",
    "gender": "F",
    "birthDate": "2012-04-15",
    "profileImage": null,
    "notes": "Informatie ontbreekt",
    "status": "active"
  }
]
```

### teams.json
```json
[
  {
    "id": "t01",
    "name": "Team A",
    "maxPlayers": 10,
    "minAge": 10,
    "maxAge": 13
  }
]
```

### scenarios.json
```json
[
  {
    "id": "s001",
    "name": "Voorjaar 2025",
    "status": "draft",
    "teams": [
      {
        "teamId": "t01",
        "players": ["p001", "p002"]
      }
    ],
    "lastUpdated": "2025-05-14T10:30:00Z"
  }
]
``` 