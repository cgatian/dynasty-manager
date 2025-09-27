import rawData from './team-data.json';

export interface Team {
  id: number;
  school: string;
  mascot: null | string;
  abbreviation: null | string;
  alt_name1: null | string;
  alt_name2: null | string;
  alt_name3: null | string;
  conference: string | null;
  division: string | null;
  color: null | string;
  alt_color: null | string;
  logo: string;
  logoDark: string;
}

export const teamData: Array<Team> = rawData;
