export interface Player {
  id: string;
  name: string;
  photoUrl: string;
  nationality: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  age: number;
  height: string;
  preferredFoot: 'Left' | 'Right' | 'Both';
  teamId: string;
  teamName: string;
  marketValue: string;
  stats: {
    goals: number;
    assists: number;
    appearances: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
    passAccuracy: number;
    shotsOnTarget: number;
    expectedGoals: number; // xG
    rating: number; // e.g. 7.8
  };
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  stadium: string;
  founded: number;
  coach: string;
  squadValue: string;
  leagueId: string;
  leagueName: string;
  form: ('W' | 'D' | 'L')[];
  recentMatches: {
    opponent: string;
    opponentLogo: string;
    score: string;
    wasHome: boolean;
    result: 'W' | 'D' | 'L';
  }[];
  squad: Player[];
  stats: {
    goalsScored: number;
    goalsConceded: number;
    cleanSheets: number;
    possessionAverage: number;
    shotsPerMatch: number;
    passAccuracy: number;
    yellowCards: number;
    redCards: number;
  };
}

export interface StandingsRow {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  zone?: 'ucl' | 'uel' | 'relegation' | 'none';
}

export interface CommentaryEvent {
  id: string;
  minute: number;
  type: 'goal' | 'card-yellow' | 'card-red' | 'substitution' | 'var' | 'shot-woodwork' | 'penalty-missed' | 'whistle-start' | 'whistle-end' | 'info';
  detail: string;
  playerName?: string;
  playerNameOut?: string; // for substitutions
}

export interface MatchStat {
  label: string;
  home: number;
  away: number;
  type: 'percentage' | 'number';
}

export interface LineupPlayer {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  x: number; // position on visual pitch (0-100)
  y: number; // position on visual pitch (0-100)
  rating?: number;
}

export interface Match {
  id: string;
  leagueId: string;
  leagueName: string;
  leagueLogo: string;
  homeTeam: {
    id: string;
    name: string;
    logo: string;
    redCards: number;
    yellowCards: number;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
    redCards: number;
    yellowCards: number;
  };
  score: {
    home: number;
    away: number;
  };
  status: 'live' | 'scheduled' | 'finished';
  minute: number; // current minute if live
  stadium: string;
  referee: string;
  weather: string;
  date: string; // "Today", "Tomorrow", etc. or "2026-06-13"
  time: string; // "14:30"
  possessionIndicator: number; // home possession %, e.g. 54
  winProbability: {
    home: number; // %
    draw: number; // %
    away: number; // %
  };
  headToHead: {
    winsHome: number;
    draws: number;
    winsAway: number;
    recentResults: {
      date: string;
      score: string;
      winner: 'home' | 'away' | 'draw';
    }[];
  };
  lineups: {
    home: {
      formation: string;
      startingXI: LineupPlayer[];
      bench: LineupPlayer[];
      coach: string;
    };
    away: {
      formation: string;
      startingXI: LineupPlayer[];
      bench: LineupPlayer[];
      coach: string;
    };
    injured: { name: string; teamId: string; reason: string }[];
    suspended: { name: string; teamId: string }[];
  };
  timeline: {
    minute: number;
    teamId?: string;
    type: 'goal' | 'yellow' | 'red' | 'sub';
    playerName: string;
    subbedPlayerName?: string;
  }[];
  stats: MatchStat[];
  commentary: CommentaryEvent[];
}

export interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
  season: string;
  topScorer: string;
  topAssists: string;
  cleanSheetsLeader: string;
  standings: StandingsRow[];
}

export interface UserSettings {
  theme: 'dark' | 'light';
  accentColor: 'rose' | 'emerald' | 'blue' | 'violet' | 'amber';
  timeZone: string;
  language: string;
  notifications: {
    goals: boolean;
    matchStart: boolean;
    matchEnd: boolean;
    redCards: boolean;
    halfFullTime: boolean;
  };
}

export interface FavoriteItems {
  teams: string[]; // array of team ids
  players: string[]; // array of player ids
  competitions: string[]; // array of league ids
}
