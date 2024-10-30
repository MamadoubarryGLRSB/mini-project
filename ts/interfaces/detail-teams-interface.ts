export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface RunningCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string; // Format ISO 8601, ex: "YYYY-MM-DD"
  nationality: string;
  contract: {
    start: string; // Format "YYYY-MM"
    until: string; // Format "YYYY-MM"
  };
}

export interface SquadMember {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string; // Format ISO 8601, ex: "YYYY-MM-DD"
  nationality: string;
}

export interface TeamDetails {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: RunningCompetition[];
  coach: Coach;
  squad: SquadMember[];
  staff: unknown[]; // Change to a specific type if you have information about the staff structure.
  lastUpdated: string; // Format ISO 8601, ex: "YYYY-MM-DDTHH:mm:ssZ"
}
