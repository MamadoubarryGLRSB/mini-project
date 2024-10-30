export interface TeamsResponse {
  count: number;
  filters: {
    limit: number;
    offset: number;
    permission: string;
  };
  teams: TeamsItemResponse[];
}

export interface TeamsItemResponse {
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
  lastUpdated: string;
}
