import CompetitionDetails from '@/components/competitions/competition-details';

export interface CompetitionsResponse {
  count: number;
  filters: {
    client: string;
  };
  competitions: CompetitionItemResponse[];
}

export interface CompetitionItemResponse {
  id: number;
  area: unknown;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: unknown;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}
