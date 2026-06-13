import { Team, Player, Match, League, UserSettings, FavoriteItems, LineupPlayer } from './types';

// Let's create some players first to avoid circular nesting or build static structures.
// Team 1: Manchester City (teamId: 'mci')
export const mciPlayers: Player[] = [
  {
    id: 'p_haaland',
    name: 'Erling Haaland',
    photoUrl: 'EH',
    nationality: 'Norway',
    position: 'Forward',
    age: 25,
    height: '194 cm',
    preferredFoot: 'Left',
    teamId: 'mci',
    teamName: 'Manchester City',
    marketValue: '€180.00m',
    stats: { goals: 28, assists: 5, appearances: 31, minutesPlayed: 2790, yellowCards: 3, redCards: 0, passAccuracy: 78, shotsOnTarget: 56, expectedGoals: 26.4, rating: 8.2 }
  },
  {
    id: 'p_kdb',
    name: 'Kevin De Bruyne',
    photoUrl: 'KDB',
    nationality: 'Belgium',
    position: 'Midfielder',
    age: 34,
    height: '181 cm',
    preferredFoot: 'Right',
    teamId: 'mci',
    teamName: 'Manchester City',
    marketValue: '€60.00m',
    stats: { goals: 8, assists: 19, appearances: 24, minutesPlayed: 1980, yellowCards: 2, redCards: 0, passAccuracy: 88, shotsOnTarget: 22, expectedGoals: 6.8, rating: 8.4 }
  },
  {
    id: 'p_rodri',
    name: 'Rodri',
    photoUrl: 'RND',
    nationality: 'Spain',
    position: 'Midfielder',
    age: 29,
    height: '191 cm',
    preferredFoot: 'Right',
    teamId: 'mci',
    teamName: 'Manchester City',
    marketValue: '€110.00m',
    stats: { goals: 10, assists: 9, appearances: 33, minutesPlayed: 2950, yellowCards: 6, redCards: 1, passAccuracy: 93, shotsOnTarget: 18, expectedGoals: 7.2, rating: 8.1 }
  },
  {
    id: 'p_gvardiol',
    name: 'Josko Gvardiol',
    photoUrl: 'JG',
    nationality: 'Croatia',
    position: 'Defender',
    age: 24,
    height: '185 cm',
    preferredFoot: 'Left',
    teamId: 'mci',
    teamName: 'Manchester City',
    marketValue: '€80.00m',
    stats: { goals: 4, assists: 3, appearances: 28, minutesPlayed: 2340, yellowCards: 1, redCards: 0, passAccuracy: 89, shotsOnTarget: 7, expectedGoals: 2.1, rating: 7.4 }
  },
  {
    id: 'p_ederson',
    name: 'Ederson',
    photoUrl: 'EM',
    nationality: 'Brazil',
    position: 'Goalkeeper',
    age: 32,
    height: '188 cm',
    preferredFoot: 'Left',
    teamId: 'mci',
    teamName: 'Manchester City',
    marketValue: '€40.00m',
    stats: { goals: 0, assists: 1, appearances: 32, minutesPlayed: 2880, yellowCards: 2, redCards: 0, passAccuracy: 86, shotsOnTarget: 0, expectedGoals: 0.0, rating: 7.2 }
  }
];

// Team 2: Real Madrid (teamId: 'rma')
export const rmaPlayers: Player[] = [
  {
    id: 'p_mbappe',
    name: 'Kylian Mbappé',
    photoUrl: 'KM',
    nationality: 'France',
    position: 'Forward',
    age: 27,
    height: '178 cm',
    preferredFoot: 'Right',
    teamId: 'rma',
    teamName: 'Real Madrid',
    marketValue: '€180.00m',
    stats: { goals: 24, assists: 8, appearances: 30, minutesPlayed: 2610, yellowCards: 2, redCards: 0, passAccuracy: 84, shotsOnTarget: 48, expectedGoals: 21.9, rating: 8.0 }
  },
  {
    id: 'p_vini',
    name: 'Vinícius Júnior',
    photoUrl: 'VJ',
    nationality: 'Brazil',
    position: 'Forward',
    age: 25,
    height: '176 cm',
    preferredFoot: 'Right',
    teamId: 'rma',
    teamName: 'Real Madrid',
    marketValue: '€150.00m',
    stats: { goals: 19, assists: 12, appearances: 29, minutesPlayed: 2540, yellowCards: 5, redCards: 0, passAccuracy: 81, shotsOnTarget: 41, expectedGoals: 16.5, rating: 8.3 }
  },
  {
    id: 'p_bellingham',
    name: 'Jude Bellingham',
    photoUrl: 'JB',
    nationality: 'England',
    position: 'Midfielder',
    age: 22,
    height: '186 cm',
    preferredFoot: 'Right',
    teamId: 'rma',
    teamName: 'Real Madrid',
    marketValue: '€180.00m',
    stats: { goals: 17, assists: 11, appearances: 28, minutesPlayed: 2420, yellowCards: 4, redCards: 1, passAccuracy: 89, shotsOnTarget: 29, expectedGoals: 14.1, rating: 8.2 }
  },
  {
    id: 'p_rudiger',
    name: 'Antonio Rüdiger',
    photoUrl: 'AR',
    nationality: 'Germany',
    position: 'Defender',
    age: 33,
    height: '190 cm',
    preferredFoot: 'Right',
    teamId: 'rma',
    teamName: 'Real Madrid',
    marketValue: '€25.00m',
    stats: { goals: 3, assists: 1, appearances: 34, minutesPlayed: 3060, yellowCards: 7, redCards: 0, passAccuracy: 91, shotsOnTarget: 6, expectedGoals: 1.8, rating: 7.5 }
  },
  {
    id: 'p_courtois',
    name: 'Thibaut Courtois',
    photoUrl: 'TC',
    nationality: 'Belgium',
    position: 'Goalkeeper',
    age: 34,
    height: '200 cm',
    preferredFoot: 'Left',
    teamId: 'rma',
    teamName: 'Real Madrid',
    marketValue: '€35.00m',
    stats: { goals: 0, assists: 0, appearances: 22, minutesPlayed: 1980, yellowCards: 0, redCards: 0, passAccuracy: 81, shotsOnTarget: 0, expectedGoals: 0.0, rating: 7.4 }
  }
];

// Team 3: Arsenal FC (teamId: 'ars')
export const arsPlayers: Player[] = [
  {
    id: 'p_saka',
    name: 'Bukayo Saka',
    photoUrl: 'BS',
    nationality: 'England',
    position: 'Forward',
    age: 24,
    height: '178 cm',
    preferredFoot: 'Left',
    teamId: 'ars',
    teamName: 'Arsenal',
    marketValue: '€130.00m',
    stats: { goals: 16, assists: 14, appearances: 33, minutesPlayed: 2890, yellowCards: 4, redCards: 0, passAccuracy: 83, shotsOnTarget: 38, expectedGoals: 14.5, rating: 8.1 }
  },
  {
    id: 'p_odegaard',
    name: 'Martin Ødegaard',
    photoUrl: 'MO',
    nationality: 'Norway',
    position: 'Midfielder',
    age: 27,
    height: '178 cm',
    preferredFoot: 'Left',
    teamId: 'ars',
    teamName: 'Arsenal',
    marketValue: '€110.00m',
    stats: { goals: 11, assists: 12, appearances: 32, minutesPlayed: 2820, yellowCards: 2, redCards: 0, passAccuracy: 87, shotsOnTarget: 30, expectedGoals: 9.6, rating: 7.9 }
  },
  {
    id: 'p_saliba',
    name: 'William Saliba',
    photoUrl: 'WS',
    nationality: 'France',
    position: 'Defender',
    age: 25,
    height: '192 cm',
    preferredFoot: 'Right',
    teamId: 'ars',
    teamName: 'Arsenal',
    marketValue: '€80.00m',
    stats: { goals: 2, assists: 1, appearances: 35, minutesPlayed: 3150, yellowCards: 3, redCards: 0, passAccuracy: 92, shotsOnTarget: 4, expectedGoals: 1.1, rating: 7.7 }
  },
  {
    id: 'p_raya',
    name: 'David Raya',
    photoUrl: 'DR',
    nationality: 'Spain',
    position: 'Goalkeeper',
    age: 30,
    height: '183 cm',
    preferredFoot: 'Right',
    teamId: 'ars',
    teamName: 'Arsenal',
    marketValue: '€35.00m',
    stats: { goals: 0, assists: 0, appearances: 32, minutesPlayed: 2880, yellowCards: 1, redCards: 0, passAccuracy: 82, shotsOnTarget: 0, expectedGoals: 0.0, rating: 7.5 }
  }
];

// Team 4: Barcelona (teamId: 'fcb')
export const fcbPlayers: Player[] = [
  {
    id: 'p_lewandowski',
    name: 'Robert Lewandowski',
    photoUrl: 'RL',
    nationality: 'Poland',
    position: 'Forward',
    age: 37,
    height: '185 cm',
    preferredFoot: 'Right',
    teamId: 'fcb',
    teamName: 'FC Barcelona',
    marketValue: '€15.00m',
    stats: { goals: 22, assists: 7, appearances: 32, minutesPlayed: 2650, yellowCards: 3, redCards: 1, passAccuracy: 77, shotsOnTarget: 45, expectedGoals: 20.2, rating: 7.8 }
  },
  {
    id: 'p_yamal',
    name: 'Lamine Yamal',
    photoUrl: 'LY',
    nationality: 'Spain',
    position: 'Forward',
    age: 18,
    height: '178 cm',
    preferredFoot: 'Left',
    teamId: 'fcb',
    teamName: 'FC Barcelona',
    marketValue: '€120.00m',
    stats: { goals: 11, assists: 11, appearances: 34, minutesPlayed: 2470, yellowCards: 2, redCards: 0, passAccuracy: 82, shotsOnTarget: 33, expectedGoals: 9.8, rating: 8.2 }
  },
  {
    id: 'p_pedri',
    name: 'Pedri',
    photoUrl: 'PG',
    nationality: 'Spain',
    position: 'Midfielder',
    age: 23,
    height: '174 cm',
    preferredFoot: 'Right',
    teamId: 'fcb',
    teamName: 'FC Barcelona',
    marketValue: '€90.00m',
    stats: { goals: 7, assists: 9, appearances: 25, minutesPlayed: 1890, yellowCards: 1, redCards: 0, passAccuracy: 90, shotsOnTarget: 14, expectedGoals: 4.5, rating: 7.7 }
  },
  {
    id: 'p_terstegen',
    name: 'Marc-André ter Stegen',
    photoUrl: 'TS',
    nationality: 'Germany',
    position: 'Goalkeeper',
    age: 34,
    height: '187 cm',
    preferredFoot: 'Right',
    teamId: 'fcb',
    teamName: 'FC Barcelona',
    marketValue: '€28.00m',
    stats: { goals: 0, assists: 0, appearances: 26, minutesPlayed: 2340, yellowCards: 1, redCards: 0, passAccuracy: 88, shotsOnTarget: 0, expectedGoals: 0.0, rating: 7.3 }
  }
];

// Team 5: Bayern Munich (teamId: 'bay')
export const bayPlayers: Player[] = [
  {
    id: 'p_kane',
    name: 'Harry Kane',
    photoUrl: 'HK',
    nationality: 'England',
    position: 'Forward',
    age: 32,
    height: '188 cm',
    preferredFoot: 'Right',
    teamId: 'bay',
    teamName: 'Bayern Munich',
    marketValue: '€110.00m',
    stats: { goals: 36, assists: 10, appearances: 32, minutesPlayed: 2860, yellowCards: 2, redCards: 0, passAccuracy: 81, shotsOnTarget: 61, expectedGoals: 31.2, rating: 8.5 }
  },
  {
    id: 'p_musiala',
    name: 'Jamal Musiala',
    photoUrl: 'JM',
    nationality: 'Germany',
    position: 'Midfielder',
    age: 23,
    height: '184 cm',
    preferredFoot: 'Right',
    teamId: 'bay',
    teamName: 'Bayern Munich',
    marketValue: '€110.00m',
    stats: { goals: 13, assists: 11, appearances: 28, minutesPlayed: 2210, yellowCards: 1, redCards: 0, passAccuracy: 86, shotsOnTarget: 26, expectedGoals: 10.4, rating: 8.0 }
  },
  {
    id: 'p_neuer',
    name: 'Manuel Neuer',
    photoUrl: 'MN',
    nationality: 'Germany',
    position: 'Goalkeeper',
    age: 40,
    height: '193 cm',
    preferredFoot: 'Right',
    teamId: 'bay',
    teamName: 'Bayern Munich',
    marketValue: '€5.00m',
    stats: { goals: 0, assists: 0, appearances: 27, minutesPlayed: 2430, yellowCards: 0, redCards: 0, passAccuracy: 85, shotsOnTarget: 0, expectedGoals: 0.0, rating: 7.1 }
  }
];

// Team 6: Inter Milan (teamId: 'int')
export const intPlayers: Player[] = [
  {
    id: 'p_martinez',
    name: 'Lautaro Martínez',
    photoUrl: 'LM',
    nationality: 'Argentina',
    position: 'Forward',
    age: 28,
    height: '177 cm',
    preferredFoot: 'Right',
    teamId: 'int',
    teamName: 'Inter Milan',
    marketValue: '€110.00m',
    stats: { goals: 23, assists: 5, appearances: 33, minutesPlayed: 2750, yellowCards: 4, redCards: 0, passAccuracy: 75, shotsOnTarget: 44, expectedGoals: 21.1, rating: 7.9 }
  },
  {
    id: 'p_barella',
    name: 'Nicolò Barella',
    photoUrl: 'NB',
    nationality: 'Italy',
    position: 'Midfielder',
    age: 29,
    height: '172 cm',
    preferredFoot: 'Right',
    teamId: 'int',
    teamName: 'Inter Milan',
    marketValue: '€75.00m',
    stats: { goals: 5, assists: 8, appearances: 34, minutesPlayed: 2910, yellowCards: 5, redCards: 0, passAccuracy: 88, shotsOnTarget: 17, expectedGoals: 4.1, rating: 7.6 }
  }
];

// Let's bundle all players in a single list
export const allPlayers: Player[] = [
  ...mciPlayers,
  ...rmaPlayers,
  ...arsPlayers,
  ...fcbPlayers,
  ...bayPlayers,
  ...intPlayers
];

// Compile Teams Data with custom stats and stadium values:
export const teamsDatabase: Record<string, Team> = {
  mci: {
    id: 'mci',
    name: 'Manchester City',
    logo: '🔵',
    stadium: 'Etihad Stadium',
    founded: 1880,
    coach: 'Pep Guardiola',
    squadValue: '€1.27bn',
    leagueId: 'pl',
    leagueName: 'Premier League',
    form: ['W', 'D', 'W', 'W', 'W'],
    recentMatches: [
      { opponent: 'Arsenal', opponentLogo: '🔴', score: '2 - 2', wasHome: true, result: 'D' },
      { opponent: 'Chelsea', opponentLogo: '🦁', score: '3 - 1', wasHome: false, result: 'W' },
      { opponent: 'Spurs', opponentLogo: '⚪', score: '4 - 0', wasHome: true, result: 'W' },
      { opponent: 'Real Madrid', opponentLogo: '👑', score: '1 - 1', wasHome: false, result: 'D' },
      { opponent: 'Fulham', opponentLogo: '⚫', score: '5 - 1', wasHome: true, result: 'W' }
    ],
    squad: mciPlayers,
    stats: { goalsScored: 86, goalsConceded: 29, cleanSheets: 14, possessionAverage: 64, shotsPerMatch: 16.4, passAccuracy: 90, yellowCards: 48, redCards: 1 }
  },
  rma: {
    id: 'rma',
    name: 'Real Madrid',
    logo: '👑',
    stadium: 'Santiago Bernabéu',
    founded: 1902,
    coach: 'Carlo Ancelotti',
    squadValue: '€1.04bn',
    leagueId: 'laliga',
    leagueName: 'La Liga',
    form: ['W', 'W', 'W', 'L', 'W'],
    recentMatches: [
      { opponent: 'FC Barcelona', opponentLogo: '🔵🔴', score: '3 - 2', wasHome: true, result: 'W' },
      { opponent: 'Atletico', opponentLogo: '🔴⚪', score: '1 - 2', wasHome: false, result: 'L' },
      { opponent: 'Sevilla', opponentLogo: '⚪🔴', score: '2 - 0', wasHome: true, result: 'W' },
      { opponent: 'Valencia', opponentLogo: '🦇', score: '4 - 1', wasHome: false, result: 'W' },
      { opponent: 'Betis', opponentLogo: '🟢', score: '3 - 0', wasHome: true, result: 'W' }
    ],
    squad: rmaPlayers,
    stats: { goalsScored: 78, goalsConceded: 24, cleanSheets: 17, possessionAverage: 59, shotsPerMatch: 14.8, passAccuracy: 88, yellowCards: 52, redCards: 2 }
  },
  ars: {
    id: 'ars',
    name: 'Arsenal',
    logo: '🔴',
    stadium: 'Emirates Stadium',
    founded: 1886,
    coach: 'Mikel Arteta',
    squadValue: '€1.12bn',
    leagueId: 'pl',
    leagueName: 'Premier League',
    form: ['W', 'D', 'W', 'W', 'L'],
    recentMatches: [
      { opponent: 'Manchester City', opponentLogo: '🔵', score: '2 - 2', wasHome: false, result: 'D' },
      { opponent: 'Tottenham', opponentLogo: '⚪', score: '3 - 2', wasHome: false, result: 'W' },
      { opponent: 'Everton', opponentLogo: '🔵', score: '2 - 1', wasHome: true, result: 'W' },
      { opponent: 'FC Bayern', opponentLogo: '⚽', score: '0 - 1', wasHome: false, result: 'L' },
      { opponent: 'Bournemouth', opponentLogo: '🍒', score: '3 - 0', wasHome: true, result: 'W' }
    ],
    squad: arsPlayers,
    stats: { goalsScored: 79, goalsConceded: 26, cleanSheets: 16, possessionAverage: 60, shotsPerMatch: 15.2, passAccuracy: 88, yellowCards: 42, redCards: 0 }
  },
  fcb: {
    id: 'fcb',
    name: 'FC Barcelona',
    logo: '🔵🔴',
    stadium: 'Camp Nou',
    founded: 1899,
    coach: 'Hansi Flick',
    squadValue: '€890.00m',
    leagueId: 'laliga',
    leagueName: 'La Liga',
    form: ['W', 'W', 'L', 'W', 'W'],
    recentMatches: [
      { opponent: 'Getafe', opponentLogo: '🔵', score: '4 - 0', wasHome: true, result: 'W' },
      { opponent: 'Real Madrid', opponentLogo: '👑', score: '2 - 3', wasHome: false, result: 'L' },
      { opponent: 'Girona', opponentLogo: '🔴⚪', score: '3 - 1', wasHome: true, result: 'W' },
      { opponent: 'Celta Vigo', opponentLogo: '🩵', score: '2 - 1', wasHome: false, result: 'W' },
      { opponent: 'Mallorca', opponentLogo: '🔴', score: '1 - 0', wasHome: true, result: 'W' }
    ],
    squad: fcbPlayers,
    stats: { goalsScored: 74, goalsConceded: 33, cleanSheets: 12, possessionAverage: 62, shotsPerMatch: 14.5, passAccuracy: 89, yellowCards: 49, redCards: 1 }
  },
  bay: {
    id: 'bay',
    name: 'Bayern Munich',
    logo: '🔴⚽',
    stadium: 'Allianz Arena',
    founded: 1900,
    coach: 'Vincent Kompany',
    squadValue: '€950.00m',
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga',
    form: ['W', 'W', 'W', 'W', 'D'],
    recentMatches: [
      { opponent: 'Dortmund', opponentLogo: '🟡', score: '2 - 1', wasHome: true, result: 'W' },
      { opponent: 'Stuttgart', opponentLogo: '⚪', score: '3 - 2', wasHome: false, result: 'W' },
      { opponent: 'Bayer Leverkusen', opponentLogo: '🔴⚫', score: '1 - 1', wasHome: true, result: 'D' },
      { opponent: 'Frankfurt', opponentLogo: '🦅', score: '4 - 0', wasHome: false, result: 'W' },
      { opponent: 'Arsenal', opponentLogo: '🔴', score: '1 - 0', wasHome: true, result: 'W' }
    ],
    squad: bayPlayers,
    stats: { goalsScored: 89, goalsConceded: 28, cleanSheets: 13, possessionAverage: 61, shotsPerMatch: 15.8, passAccuracy: 89, yellowCards: 38, redCards: 0 }
  },
  int: {
    id: 'int',
    name: 'Inter Milan',
    logo: '🔵⚫',
    stadium: 'San Siro',
    founded: 1908,
    coach: 'Simone Inzaghi',
    squadValue: '€680.00m',
    leagueId: 'seriea',
    leagueName: 'Serie A',
    form: ['W', 'D', 'W', 'W', 'W'],
    recentMatches: [
      { opponent: 'Juventus', opponentLogo: '⚪⚫', score: '1 - 0', wasHome: true, result: 'W' },
      { opponent: 'AC Milan', opponentLogo: '🔴⚫', score: '2 - 1', wasHome: false, result: 'W' },
      { opponent: 'Napoli', opponentLogo: '🩵', score: '1 - 1', wasHome: true, result: 'D' },
      { opponent: 'Lazio', opponentLogo: '🦅', score: '2 - 0', wasHome: false, result: 'W' },
      { opponent: 'Atalanta', opponentLogo: '🔵⚫', score: '3 - 2', wasHome: true, result: 'W' }
    ],
    squad: intPlayers,
    stats: { goalsScored: 72, goalsConceded: 20, cleanSheets: 19, possessionAverage: 56, shotsPerMatch: 13.9, passAccuracy: 87, yellowCards: 44, redCards: 0 }
  }
};

// Available Leagues List with complete Standings Rows
export const listLeagues: League[] = [
  {
    id: 'pl',
    name: 'Premier League',
    logo: '🦁',
    country: 'England',
    season: '2025/2026',
    topScorer: 'Erling Haaland (28 Goals)',
    topAssists: 'Kevin De Bruyne (19 Assists)',
    cleanSheetsLeader: 'David Raya (16 Clean Sheets)',
    standings: [
      { position: 1, teamId: 'mci', teamName: 'Manchester City', teamLogo: '🔵', played: 35, wins: 26, draws: 6, losses: 3, goalsFor: 86, goalsAgainst: 29, goalDifference: 57, points: 84, form: ['W', 'D', 'W', 'W', 'W'], zone: 'ucl' },
      { position: 2, teamId: 'ars', teamName: 'Arsenal', teamLogo: '🔴', played: 35, wins: 24, draws: 7, losses: 4, goalsFor: 79, goalsAgainst: 26, goalDifference: 53, points: 79, form: ['W', 'D', 'W', 'W', 'L'], zone: 'ucl' },
      { position: 3, teamId: 'liv', teamName: 'Liverpool', teamLogo: '🔴⚽', played: 35, wins: 23, draws: 6, losses: 6, goalsFor: 75, goalsAgainst: 34, goalDifference: 41, points: 75, form: ['L', 'W', 'W', 'D', 'W'], zone: 'ucl' },
      { position: 4, teamId: 'avl', teamName: 'Aston Villa', teamLogo: '🦁', played: 35, wins: 20, draws: 7, losses: 8, goalsFor: 68, goalsAgainst: 48, goalDifference: 20, points: 67, form: ['W', 'L', 'D', 'W', 'W'], zone: 'ucl' },
      { position: 5, teamId: 'tot', teamName: 'Tottenham Hotspur', teamLogo: '⚪', played: 35, wins: 18, draws: 6, losses: 11, goalsFor: 64, goalsAgainst: 52, goalDifference: 12, points: 60, form: ['L', 'W', 'L', 'W', 'D'], zone: 'uel' },
      { position: 6, teamId: 'che', teamName: 'Chelsea', teamLogo: '🔵🦁', played: 35, wins: 16, draws: 9, losses: 10, goalsFor: 65, goalsAgainst: 55, goalDifference: 10, points: 57, form: ['W', 'W', 'W', 'L', 'D'], zone: 'none' },
      { position: 18, teamId: 'lut', teamName: 'Luton Town', teamLogo: '🟠', played: 35, wins: 6, draws: 8, losses: 21, goalsFor: 44, goalsAgainst: 75, goalDifference: -31, points: 26, form: ['L', 'L', 'D', 'L', 'W'], zone: 'relegation' },
      { position: 19, teamId: 'bur', teamName: 'Burnley', teamLogo: '🍷', played: 35, wins: 5, draws: 9, losses: 21, goalsFor: 37, goalsAgainst: 71, goalDifference: -34, points: 24, form: ['D', 'L', 'W', 'L', 'L'], zone: 'relegation' },
      { position: 20, teamId: 'shu', teamName: 'Sheffield United', teamLogo: '⚔️', played: 35, wins: 3, draws: 7, losses: 25, goalsFor: 32, goalsAgainst: 95, goalDifference: -63, points: 16, form: ['L', 'L', 'L', 'L', 'L'], zone: 'relegation' }
    ]
  },
  {
    id: 'laliga',
    name: 'La Liga',
    logo: '👑',
    country: 'Spain',
    season: '2025/2026',
    topScorer: 'Kylian Mbappé (24 Goals)',
    topAssists: 'Vinícius Júnior (12 Assists)',
    cleanSheetsLeader: 'Thibaut Courtois (17 Clean Sheets)',
    standings: [
      { position: 1, teamId: 'rma', teamName: 'Real Madrid', teamLogo: '👑', played: 35, wins: 27, draws: 6, losses: 2, goalsFor: 78, goalsAgainst: 24, goalDifference: 54, points: 87, form: ['W', 'W', 'W', 'L', 'W'], zone: 'ucl' },
      { position: 2, teamId: 'fcb', teamName: 'FC Barcelona', teamLogo: '🔵🔴', played: 35, wins: 25, draws: 5, losses: 5, goalsFor: 74, goalsAgainst: 33, goalDifference: 41, points: 80, form: ['W', 'W', 'L', 'W', 'W'], zone: 'ucl' },
      { position: 3, teamId: 'atm', teamName: 'Atlético Madrid', teamLogo: '🔴⚪', played: 35, wins: 22, draws: 5, losses: 8, goalsFor: 64, goalsAgainst: 36, goalDifference: 28, points: 71, form: ['L', 'W', 'W', 'W', 'D'], zone: 'ucl' },
      { position: 4, teamId: 'gir', teamName: 'Girona', teamLogo: '🔴⚪', played: 35, wins: 21, draws: 5, losses: 9, goalsFor: 71, goalsAgainst: 44, goalDifference: 27, points: 68, form: ['W', 'L', 'W', 'L', 'W'], zone: 'ucl' },
      { position: 5, teamId: 'ath', teamName: 'Athletic Bilbao', teamLogo: '🔴⚪', played: 35, wins: 17, draws: 11, losses: 7, goalsFor: 55, goalsAgainst: 35, goalDifference: 20, points: 62, form: ['D', 'W', 'D', 'W', 'W'], zone: 'uel' },
      { position: 18, teamId: 'cad', teamName: 'Cádiz', teamLogo: '🟡', played: 35, wins: 5, draws: 11, losses: 19, goalsFor: 23, goalsAgainst: 49, goalDifference: -26, points: 26, form: ['L', 'D', 'W', 'L', 'L'], zone: 'relegation' },
      { position: 19, teamId: 'gra', teamName: 'Granada', teamLogo: '🔴⚪', played: 35, wins: 4, draws: 9, losses: 22, goalsFor: 36, goalsAgainst: 68, goalDifference: -32, points: 21, form: ['L', 'L', 'W', 'L', 'L'], zone: 'relegation' },
      { position: 20, teamId: 'alm', teamName: 'Almería', teamLogo: '🔴', played: 35, wins: 2, draws: 11, losses: 22, goalsFor: 32, goalsAgainst: 70, goalDifference: -38, points: 17, form: ['D', 'L', 'L', 'L', 'L'], zone: 'relegation' }
    ]
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    logo: '⚽',
    country: 'Germany',
    season: '2025/2026',
    topScorer: 'Harry Kane (36 Goals)',
    topAssists: 'Jamal Musiala (11 Assists)',
    cleanSheetsLeader: 'Manuel Neuer (13 Clean Sheets)',
    standings: [
      { position: 1, teamId: 'bay', teamName: 'Bayern Munich', teamLogo: '🔴⚽', played: 31, wins: 24, draws: 5, losses: 2, goalsFor: 89, goalsAgainst: 28, goalDifference: 61, points: 77, form: ['W', 'W', 'W', 'W', 'D'], zone: 'ucl' },
      { position: 2, teamId: 'lev', teamName: 'Bayer Leverkusen', teamLogo: '🔴⚫', played: 31, wins: 22, draws: 7, losses: 2, goalsFor: 77, goalsAgainst: 21, goalDifference: 56, points: 73, form: ['D', 'W', 'D', 'W', 'W'], zone: 'ucl' },
      { position: 3, teamId: 'vfb', teamName: 'VfB Stuttgart', teamLogo: '⚪', played: 31, wins: 20, draws: 4, losses: 7, goalsFor: 70, goalsAgainst: 39, goalDifference: 31, points: 64, form: ['W', 'L', 'W', 'W', 'L'], zone: 'ucl' },
      { position: 4, teamId: 'rbl', teamName: 'RB Leipzig', teamLogo: '🔴🐂', played: 31, wins: 19, draws: 5, losses: 7, goalsFor: 69, goalsAgainst: 35, goalDifference: 34, points: 62, form: ['W', 'W', 'W', 'D', 'W'], zone: 'ucl' },
      { position: 5, teamId: 'bvb', teamName: 'Borussia Dortmund', teamLogo: '🟡', played: 31, wins: 17, draws: 9, losses: 5, goalsFor: 62, goalsAgainst: 40, goalDifference: 22, points: 60, form: ['L', 'W', 'D', 'L', 'W'], zone: 'uel' }
    ]
  },
  {
    id: 'seriea',
    name: 'Serie A',
    logo: '🇮🇹',
    country: 'Italy',
    season: '2025/2026',
    topScorer: 'Lautaro Martínez (23 Goals)',
    topAssists: 'Nicolò Barella (8 Assists)',
    cleanSheetsLeader: 'Yann Sommer (19 Clean Sheets)',
    standings: [
      { position: 1, teamId: 'int', teamName: 'Inter Milan', teamLogo: '🔵⚫', played: 35, wins: 26, draws: 7, losses: 2, goalsFor: 72, goalsAgainst: 20, goalDifference: 52, points: 85, form: ['W', 'D', 'W', 'W', 'W'], zone: 'ucl' },
      { position: 2, teamId: 'mil', teamName: 'AC Milan', teamLogo: '🔴⚫', played: 35, wins: 21, draws: 7, losses: 7, goalsFor: 64, goalsAgainst: 39, goalDifference: 25, points: 70, form: ['D', 'W', 'L', 'D', 'D'], zone: 'ucl' },
      { position: 3, teamId: 'juv', teamName: 'Juventus', teamLogo: '⚪⚫', played: 35, wins: 18, draws: 13, losses: 4, goalsFor: 49, goalsAgainst: 26, goalDifference: 23, points: 67, form: ['D', 'D', 'D', 'D', 'W'], zone: 'ucl' },
      { position: 4, teamId: 'bol', teamName: 'Bologna', teamLogo: '🔴🔵', played: 35, wins: 17, draws: 13, losses: 5, goalsFor: 48, goalsAgainst: 27, goalDifference: 21, points: 64, form: ['W', 'D', 'D', 'D', 'W'], zone: 'ucl' },
      { position: 5, teamId: 'rom', teamName: 'AS Roma', teamLogo: '🐺', played: 35, wins: 17, draws: 9, losses: 9, goalsFor: 61, goalsAgainst: 42, goalDifference: 19, points: 60, form: ['D', 'D', 'W', 'L', 'W'], zone: 'uel' }
    ]
  },
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    logo: '🏆',
    country: 'Europe',
    season: '2025/2026',
    topScorer: 'Kylian Mbappé (9 Goals)',
    topAssists: 'Kevin De Bruyne (6 Assists)',
    cleanSheetsLeader: 'Thibaut Courtois (5 Clean Sheets)',
    standings: [
      { position: 1, teamId: 'rma', teamName: 'Real Madrid', teamLogo: '👑', played: 10, wins: 8, draws: 2, losses: 0, goalsFor: 24, goalsAgainst: 8, goalDifference: 16, points: 26, form: ['W', 'W', 'W', 'W', 'D'], zone: 'ucl' },
      { position: 2, teamId: 'mci', teamName: 'Manchester City', teamLogo: '🔵', played: 10, wins: 7, draws: 2, losses: 1, goalsFor: 26, goalsAgainst: 10, goalDifference: 16, points: 23, form: ['W', 'L', 'W', 'W', 'D'], zone: 'ucl' },
      { position: 3, teamId: 'bay', teamName: 'Bayern Munich', teamLogo: '🔴⚽', played: 10, wins: 6, draws: 3, losses: 1, goalsFor: 20, goalsAgainst: 9, goalDifference: 11, points: 21, form: ['W', 'D', 'W', 'D', 'W'], zone: 'ucl' },
      { position: 4, teamId: 'ars', teamName: 'Arsenal', teamLogo: '🔴', played: 10, wins: 6, draws: 1, losses: 3, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 19, form: ['L', 'W', 'W', 'W', 'L'], zone: 'ucl' },
      { position: 5, teamId: 'fcb', teamName: 'FC Barcelona', teamLogo: '🔵🔴', played: 10, wins: 5, draws: 2, losses: 3, goalsFor: 19, goalsAgainst: 14, goalDifference: 5, points: 17, form: ['W', 'W', 'L', 'W', 'L'], zone: 'uel' }
    ]
  }
];

// Reusable custom lineups templates
const homeStartingXI: LineupPlayer[] = [
  { id: 'p_ederson', name: 'Ederson', number: 31, position: 'GK', x: 50, y: 10, rating: 7.2 },
  { id: 'df1', name: 'Kyle Walker', number: 2, position: 'DF', x: 15, y: 30, rating: 7.1 },
  { id: 'df2', name: 'Rúben Dias', number: 3, position: 'DF', x: 38, y: 30, rating: 7.5 },
  { id: 'df3', name: 'Manuel Akanji', number: 25, position: 'DF', x: 62, y: 30, rating: 7.0 },
  { id: 'p_gvardiol', name: 'Josko Gvardiol', number: 24, position: 'DF', x: 85, y: 30, rating: 7.4 },
  { id: 'p_rodri', name: 'Rodri', number: 16, position: 'MF', x: 50, y: 50, rating: 8.1 },
  { id: 'mf2', name: 'Bernardo Silva', number: 20, position: 'MF', x: 25, y: 65, rating: 7.6 },
  { id: 'p_kdb', name: 'Kevin De Bruyne', number: 17, position: 'MF', x: 75, y: 65, rating: 8.4 },
  { id: 'fw1', name: 'Phil Foden', number: 47, position: 'FW', x: 15, y: 85, rating: 7.9 },
  { id: 'p_haaland', name: 'Erling Haaland', number: 9, position: 'FW', x: 50, y: 88, rating: 8.2 },
  { id: 'fw3', name: 'Jérémy Doku', number: 11, position: 'FW', x: 85, y: 85, rating: 7.5 }
];

const awayStartingXI: LineupPlayer[] = [
  { id: 'p_courtois', name: 'Thibaut Courtois', number: 1, position: 'GK', x: 50, y: 90, rating: 7.4 },
  { id: 'adf1', name: 'Dani Carvajal', number: 2, position: 'DF', x: 15, y: 70, rating: 7.0 },
  { id: 'adf2', name: 'Éder Militão', number: 3, position: 'DF', x: 38, y: 70, rating: 7.2 },
  { id: 'p_rudiger', name: 'Antonio Rüdiger', number: 22, position: 'DF', x: 62, y: 70, rating: 7.5 },
  { id: 'adf4', name: 'Ferland Mendy', number: 23, position: 'DF', x: 85, y: 70, rating: 6.9 },
  { id: 'amf1', name: 'Aurélien Tchouaméni', number: 18, position: 'MF', x: 35, y: 55, rating: 7.1 },
  { id: 'amf2', name: 'Federico Valverde', number: 15, position: 'MF', x: 65, y: 55, rating: 7.4 },
  { id: 'p_bellingham', name: 'Jude Bellingham', number: 5, position: 'MF', x: 50, y: 40, rating: 8.2 },
  { id: 'afw1', name: 'Rodrygo', number: 11, position: 'FW', x: 20, y: 20, rating: 7.3 },
  { id: 'p_mbappe', name: 'Kylian Mbappé', number: 9, position: 'FW', x: 50, y: 15, rating: 8.0 },
  { id: 'p_vini', name: 'Vinícius Júnior', number: 7, position: 'FW', x: 80, y: 20, rating: 8.3 }
];

const homeBench: LineupPlayer[] = [
  { id: 'hb1', name: 'Stefan Ortega', number: 18, position: 'GK', x: 0, y: 0 },
  { id: 'hb2', name: 'John Stones', number: 5, position: 'DF', x: 0, y: 0 },
  { id: 'hb3', name: 'Mateo Kovacic', number: 8, position: 'MF', x: 0, y: 0 },
  { id: 'hb4', name: 'Jack Grealish', number: 10, position: 'FW', x: 0, y: 0 },
  { id: 'hb5', name: 'Matheus Nunes', number: 27, position: 'MF', x: 0, y: 0 },
  { id: 'hb6', name: 'Rico Lewis', number: 82, position: 'DF', x: 0, y: 0 }
];

const awayBench: LineupPlayer[] = [
  { id: 'ab1', name: 'Andriy Lunin', number: 13, position: 'GK', x: 0, y: 0 },
  { id: 'ab2', name: 'Luka Modrić', number: 10, position: 'MF', x: 0, y: 0 },
  { id: 'ab3', name: 'Eduardo Camavinga', number: 12, position: 'MF', x: 0, y: 0 },
  { id: 'ab4', name: 'Brahim Díaz', number: 21, position: 'FW', x: 0, y: 0 },
  { id: 'ab5', name: 'Arda Güler', number: 15, position: 'MF', x: 0, y: 0 },
  { id: 'ab6', name: 'Fran García', number: 20, position: 'DF', x: 0, y: 0 }
];

// Matches database
export const listMatches: Match[] = [
  {
    id: 'm1_live',
    leagueId: 'ucl',
    leagueName: 'Champions League',
    leagueLogo: '🏆',
    homeTeam: { id: 'mci', name: 'Manchester City', logo: '🔵', redCards: 0, yellowCards: 1 },
    awayTeam: { id: 'rma', name: 'Real Madrid', logo: '👑', redCards: 0, yellowCards: 2 },
    score: { home: 1, away: 2 },
    status: 'live',
    minute: 68,
    stadium: 'Estadi Olímpic Lluís Companys, Barcelona',
    referee: 'Clément Turpin (France)',
    weather: 'Clear Night, 18°C',
    date: 'Today',
    time: '20:00',
    possessionIndicator: 56, // 56% home possession
    winProbability: { home: 35, draw: 18, away: 47 },
    headToHead: {
      winsHome: 4,
      draws: 5,
      winsAway: 5,
      recentResults: [
        { date: '17 Apr 2024', score: '1 - 1 (Real win on pens)', winner: 'draw' },
        { date: '09 Apr 2024', score: '3 - 3', winner: 'draw' },
        { date: '17 May 2023', score: '4 - 0', winner: 'home' },
        { date: '09 May 2023', score: '1 - 1', winner: 'draw' },
        { date: '04 May 2022', score: '3 - 1 (AET)', winner: 'away' }
      ]
    },
    lineups: {
      home: { formation: '4-3-3', startingXI: homeStartingXI, bench: homeBench, coach: 'Pep Guardiola' },
      away: { formation: '4-3-1-2', startingXI: awayStartingXI, bench: awayBench, coach: 'Carlo Ancelotti' },
      injured: [
        { name: 'David Alaba', teamId: 'rma', reason: 'ACL Injury recovery' },
        { name: 'Nathan Aké', teamId: 'mci', reason: 'Hamstring Strain' }
      ],
      suspended: [{ name: 'Aurélien Tchouaméni (for next round)', teamId: 'rma' }]
    },
    timeline: [
      { minute: 15, teamId: 'rma', type: 'goal', playerName: 'Kylian Mbappé', subbedPlayerName: 'Assist: Jude Bellingham' },
      { minute: 28, teamId: 'rma', type: 'yellow', playerName: 'Antonio Rüdiger' },
      { minute: 42, teamId: 'mci', type: 'goal', playerName: 'Erling Haaland', subbedPlayerName: 'Assist: Kevin De Bruyne' },
      { minute: 51, teamId: 'mci', type: 'yellow', playerName: 'Rodri' },
      { minute: 58, teamId: 'rma', type: 'goal', playerName: 'Vinícius Júnior', subbedPlayerName: 'Solo counter attack' },
      { minute: 62, teamId: 'rma', type: 'yellow', playerName: 'Ferland Mendy' }
    ],
    stats: [
      { label: 'Ball possession', home: 56, away: 44, type: 'percentage' },
      { label: 'Total shots', home: 14, away: 9, type: 'number' },
      { label: 'Shots on target', home: 6, away: 5, type: 'number' },
      { label: 'Expected Goals (xG)', home: 1.84, away: 1.12, type: 'number' },
      { label: 'Corners', home: 7, away: 3, type: 'number' },
      { label: 'Fouls', home: 8, away: 11, type: 'number' },
      { label: 'Offsides', home: 2, away: 4, type: 'number' },
      { label: 'Saves', home: 3, away: 5, type: 'number' },
      { label: 'Pass accuracy', home: 91, away: 84, type: 'percentage' },
      { label: 'Big chances', home: 3, away: 2, type: 'number' },
      { label: 'Tackles', home: 15, away: 18, type: 'number' }
    ],
    commentary: [
      { id: 'com1', minute: 68, type: 'info', detail: 'Kevin De Bruyne delivers a curling cross from the right wing, but Thibaut Courtois catches comfortably.' },
      { id: 'com2', minute: 65, type: 'substitution', detail: 'Manchester City change: Jack Grealish replaces Jérémy Doku.', playerName: 'Jack Grealish', playerNameOut: 'Jérémy Doku' },
      { id: 'com3', minute: 62, type: 'card-yellow', detail: 'Yellow Card! Ferland Mendy is booked for pulling back Phil Foden on a quick turnaround.', playerName: 'Ferland Mendy' },
      { id: 'com4', minute: 58, type: 'goal', detail: 'GOAL!!! Real Madrid take the lead again! Vinícius Júnior sprints down the left flank, beats Kyle Walker for pace, and slots it past Ederson in the bottom corner.', playerName: 'Vinícius Júnior' },
      { id: 'com5', minute: 51, type: 'card-yellow', detail: 'Yellow Card! Rodri receives a warning and yellow card after bringing down Jude Bellingham to prevent a counter.', playerName: 'Rodri' },
      { id: 'com6', minute: 45, type: 'whistle-start', detail: 'Second Half starts!' },
      { id: 'com7', minute: 42, type: 'goal', detail: 'GOAL!!! Manchester City equalize! A majestic through ball from Kevin De Bruyne finds Erling Haaland, who power-strikes it high into the roof of the net!', playerName: 'Erling Haaland' },
      { id: 'com8', minute: 15, type: 'goal', detail: 'GOAL!!! Real Madrid open the scoring! A brilliant cross from Jude Bellingham is met by Kylian Mbappé on the volley!', playerName: 'Kylian Mbappé' },
      { id: 'com9', minute: 1, type: 'whistle-start', detail: 'Match starts under beautiful night sky at Santiago Bernabéu!' }
    ]
  },
  {
    id: 'm2_pl_live',
    leagueId: 'pl',
    leagueName: 'Premier League',
    leagueLogo: '🦁',
    homeTeam: { id: 'ars', name: 'Arsenal', logo: '🔴', redCards: 0, yellowCards: 0 },
    awayTeam: { id: 'che', name: 'Chelsea', logo: '🦁', redCards: 0, yellowCards: 1 },
    score: { home: 1, away: 1 },
    status: 'live',
    minute: 41,
    stadium: 'Emirates Stadium, London',
    referee: 'Michael Oliver',
    weather: 'Overcast, 15°C',
    date: 'Today',
    time: '17:30',
    possessionIndicator: 60,
    winProbability: { home: 48, draw: 32, away: 20 },
    headToHead: {
      winsHome: 3,
      draws: 2,
      winsAway: 1,
      recentResults: [
        { date: '21 Oct 2025', score: '2 - 2', winner: 'draw' },
        { date: '23 Apr 2025', score: '5 - 0', winner: 'home' }
      ]
    },
    lineups: {
      home: {
        formation: '4-3-3',
        startingXI: [
          { id: 'p_raya', name: 'David Raya', number: 22, position: 'GK', x: 50, y: 10, rating: 7.5 },
          { id: 'ars_df1', name: 'Ben White', number: 4, position: 'DF', x: 15, y: 30, rating: 7.2 },
          { id: 'p_saliba', name: 'William Saliba', number: 2, position: 'DF', x: 38, y: 30, rating: 7.7 },
          { id: 'ars_df3', name: 'Gabriel Magalhães', number: 6, position: 'DF', x: 62, y: 30, rating: 7.5 },
          { id: 'ars_df4', name: 'Jurriën Timber', number: 12, position: 'DF', x: 85, y: 30, rating: 7.0 },
          { id: 'ars_mf1', name: 'Declan Rice', number: 41, position: 'MF', x: 50, y: 50, rating: 7.5 },
          { id: 'ars_mf2', name: 'Thomas Partey', number: 5, position: 'MF', x: 25, y: 65, rating: 7.1 },
          { id: 'p_odegaard', name: 'Martin Ødegaard', number: 8, position: 'MF', x: 75, y: 65, rating: 7.9 },
          { id: 'p_saka', name: 'Bukayo Saka', number: 7, position: 'FW', x: 15, y: 85, rating: 8.1 },
          { id: 'ars_fw2', name: 'Kai Havertz', number: 29, position: 'FW', x: 50, y: 88, rating: 7.0 },
          { id: 'ars_fw3', name: 'Leandro Trossard', number: 19, position: 'FW', x: 85, y: 85, rating: 7.4 }
        ],
        bench: homeBench,
        coach: 'Mikel Arteta'
      },
      away: {
        formation: '4-2-3-1',
        startingXI: awayStartingXI, // generic lineup for mock
        bench: awayBench,
        coach: 'Enzo Maresca'
      },
      injured: [],
      suspended: []
    },
    timeline: [
      { minute: 12, teamId: 'che', type: 'goal', playerName: 'Cole Palmer', subbedPlayerName: 'Penalty goal' },
      { minute: 34, teamId: 'ars', type: 'goal', playerName: 'Bukayo Saka', subbedPlayerName: 'Assist: Martin Ødegaard' },
      { minute: 38, teamId: 'che', type: 'yellow', playerName: 'Enzo Fernández' }
    ],
    stats: [
      { label: 'Ball possession', home: 60, away: 40, type: 'percentage' },
      { label: 'Total shots', home: 8, away: 4, type: 'number' },
      { label: 'Shots on target', home: 4, away: 2, type: 'number' },
      { label: 'Expected Goals (xG)', home: 1.15, away: 0.85, type: 'number' },
      { label: 'Corners', home: 4, away: 1, type: 'number' },
      { label: 'Fouls', home: 5, away: 6, type: 'number' },
      { label: 'Saves', home: 1, away: 3, type: 'number' }
    ],
    commentary: [
      { id: 'c_ars_1', minute: 41, type: 'info', detail: 'Arsenal keeping the ball in Chelsea half. Ødegaard controls and probes for an opening.' },
      { id: 'c_ars_2', minute: 38, type: 'card-yellow', detail: 'Enzo Fernández goes into the book for a late challenge on Saka.', playerName: 'Enzo Fernández' },
      { id: 'c_ars_3', minute: 34, type: 'goal', detail: 'GOAL!!! Arsenal level it up! Bukayo Saka cuts inside on his magical left foot and blasts it into the bottom corner!', playerName: 'Bukayo Saka' },
      { id: 'c_ars_4', minute: 12, type: 'goal', detail: 'GOAL!!! Cole Palmer converts the penalty perfectly, sending David Raya the wrong way.', playerName: 'Cole Palmer' }
    ]
  },
  {
    id: 'm3_laliga_fin',
    leagueId: 'laliga',
    leagueName: 'La Liga',
    leagueLogo: '👑',
    homeTeam: { id: 'fcb', name: 'FC Barcelona', logo: '🔵🔴', redCards: 0, yellowCards: 1 },
    awayTeam: { id: 'rma', name: 'Real Madrid', logo: '👑', redCards: 0, yellowCards: 3 },
    score: { home: 3, away: 2 },
    status: 'finished',
    minute: 90,
    stadium: 'Camp Nou, Barcelona',
    referee: 'Gil Manzano',
    weather: 'Warm Summer Evening, 22°C',
    date: 'Yesterday',
    time: '21:00',
    possessionIndicator: 62,
    winProbability: { home: 100, draw: 0, away: 0 },
    headToHead: { winsHome: 12, draws: 8, winsAway: 15, recentResults: [] },
    lineups: {
      home: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Hansi Flick' },
      away: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Carlo Ancelotti' },
      injured: [],
      suspended: []
    },
    timeline: [
      { minute: 18, teamId: 'fcb', type: 'goal', playerName: 'Robert Lewandowski', subbedPlayerName: 'Assist: Lamine Yamal' },
      { minute: 31, teamId: 'rma', type: 'goal', playerName: 'Kylian Mbappé', subbedPlayerName: 'Assist: Vinícius Júnior' },
      { minute: 55, teamId: 'fcb', type: 'goal', playerName: 'Lamine Yamal', subbedPlayerName: 'Incredible individual effort' },
      { minute: 78, teamId: 'rma', type: 'goal', playerName: 'Jude Bellingham', subbedPlayerName: 'Header from corner' },
      { minute: 90, teamId: 'fcb', type: 'goal', playerName: 'Pedri', subbedPlayerName: 'Match winner inside injury time' }
    ],
    stats: [
      { label: 'Ball possession', home: 62, away: 38, type: 'percentage' },
      { label: 'Total shots', home: 18, away: 12, type: 'number' },
      { label: 'Shots on target', home: 9, away: 6, type: 'number' },
      { label: 'Expected Goals (xG)', home: 2.34, away: 1.67, type: 'number' },
      { label: 'Corners', home: 9, away: 5, type: 'number' },
      { label: 'Saves', home: 4, away: 6, type: 'number' }
    ],
    commentary: [
      { id: 'com_fcb_1', minute: 90, type: 'goal', detail: 'GOAL!!!! Pedri takes a sensational volley from the edge of the area! Camp Nou erupts! Barcelona win the Clásico in the final seconds!', playerName: 'Pedri' },
      { id: 'com_fcb_2', minute: 78, type: 'goal', detail: 'GOAL! Jude Bellingham rises highest from a Modric corner and powers a header home.', playerName: 'Jude Bellingham' }
    ]
  },
  {
    id: 'm4_bund_sched',
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga',
    leagueLogo: '⚽',
    homeTeam: { id: 'bay', name: 'Bayern Munich', logo: '🔴⚽', redCards: 0, yellowCards: 0 },
    awayTeam: { id: 'int', name: 'Inter Milan', logo: '🔵⚫', redCards: 0, yellowCards: 0 }, // Using inter as mock friend
    score: { home: 0, away: 0 },
    status: 'scheduled',
    minute: 0,
    stadium: 'Allianz Arena, Munich',
    referee: 'Felix Zwayer',
    weather: 'Clear Sky, 14°C',
    date: 'Tomorrow',
    time: '18:30',
    possessionIndicator: 50,
    winProbability: { home: 55, draw: 25, away: 20 },
    headToHead: { winsHome: 3, draws: 1, winsAway: 2, recentResults: [] },
    lineups: {
      home: { formation: '4-2-3-1', startingXI: [], bench: [], coach: 'Vincent Kompany' },
      away: { formation: '3-5-2', startingXI: [], bench: [], coach: 'Simone Inzaghi' },
      injured: [],
      suspended: []
    },
    timeline: [],
    stats: [],
    commentary: [
      { id: 'c_bay_1', minute: 0, type: 'info', detail: 'Match will commence tomorrow at Allianz Arena. Check back for live lineups and commentary.' }
    ]
  },
  {
    id: 'm5_pl_sched',
    leagueId: 'pl',
    leagueName: 'Premier League',
    leagueLogo: '🦁',
    homeTeam: { id: 'mci', name: 'Manchester City', logo: '🔵', redCards: 0, yellowCards: 0 },
    awayTeam: { id: 'ars', name: 'Arsenal', logo: '🔴', redCards: 0, yellowCards: 0 },
    score: { home: 0, away: 0 },
    status: 'scheduled',
    minute: 0,
    stadium: 'Etihad Stadium, Manchester',
    referee: 'Anthony Taylor',
    weather: 'Rainy, 11°C',
    date: '2026-06-17',
    time: '15:00',
    possessionIndicator: 50,
    winProbability: { home: 44, draw: 30, away: 26 },
    headToHead: { winsHome: 15, draws: 9, winsAway: 8, recentResults: [] },
    lineups: {
      home: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Pep Guardiola' },
      away: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Mikel Arteta' },
      injured: [],
      suspended: []
    },
    timeline: [],
    stats: [],
    commentary: [
      { id: 'c_mci_1', minute: 0, type: 'info', detail: 'Manchester City vs Arsenal scheduled for Wednesday at Etihad Stadium.' }
    ]
  }
];

// Default User Settings
export const defaultSettings: UserSettings = {
  theme: 'dark',
  accentColor: 'emerald',
  timeZone: 'Europe/London (GMT+1)',
  language: 'English',
  notifications: {
    goals: true,
    matchStart: true,
    matchEnd: true,
    redCards: true,
    halfFullTime: true
  }
};

// Default Favorites
export const defaultFavorites: FavoriteItems = {
  teams: ['mci', 'rma'],
  players: ['p_haaland', 'p_mbappe'],
  competitions: ['ucl', 'pl']
};
