import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Seed the same lineups and starters inside server side to simulate matches realistically
const homeStartingXI = [
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

const awayStartingXI = [
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

let ServerMatches = [
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
    possessionIndicator: 56,
    winProbability: { home: 35, draw: 18, away: 47 },
    headToHead: {
      winsHome: 4,
      draws: 5,
      winsAway: 5,
      recentResults: [
        { date: '17 Apr 2024', score: '1 - 1 (Real win on pens)', winner: 'draw' },
        { date: '09 Apr 2024', score: '3 - 3', winner: 'draw' }
      ]
    },
    lineups: {
      home: { formation: '4-3-3', startingXI: homeStartingXI, bench: [], coach: 'Pep Guardiola' },
      away: { formation: '4-3-1-2', startingXI: awayStartingXI, bench: [], coach: 'Carlo Ancelotti' },
      injured: [],
      suspended: []
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
      { label: 'Pass accuracy', home: 91, away: 84, type: 'percentage' }
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
      { id: 'com9', minute: 1, type: 'whistle-start', detail: 'Match starts under beautiful night sky!' }
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
      home: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Mikel Arteta' },
      away: { formation: '4-2-3-1', startingXI: [], bench: [], coach: 'Enzo Maresca' },
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
    awayTeam: { id: 'int', name: 'Inter Milan', logo: '🔵⚫', redCards: 0, yellowCards: 0 },
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

// Map of connected SSE client responses
let clients: express.Response[] = [];

// Helper to broadcast message to all SSE clients in standard SSE protocol format
function broadcast(event: string, data: any) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  clients.forEach(res => {
    try {
      res.write(payload);
    } catch (e) {
      // client connection likely dropped
    }
  });
}

// Global matches simulation tick speed (defaults to 10 seconds for steady background updates)
let simulationIntervalMs = 12000;
let simulationTimer: NodeJS.Timeout | null = null;
let simulationEnabled = true;

function startSimulationTimer() {
  if (simulationTimer) clearInterval(simulationTimer);
  simulationTimer = setInterval(() => {
    if (!simulationEnabled) return;
    
    let stateChanged = false;
    
    ServerMatches = ServerMatches.map(match => {
      if (match.status !== 'live') return match;
      stateChanged = true;

      // Increment clock minute
      let nextMinute = match.minute + 1;
      let status = match.status;

      // When the match runs past extra time, finish the match
      if (nextMinute > 90 + Math.floor(Math.random() * 4)) {
        nextMinute = 90;
        status = 'finished' as const;
        
        const finalWhistle = {
          id: `com_fw_${Date.now()}`,
          minute: 90,
          type: 'whistle-end' as const,
          detail: `Full-time whistle blows! The high-intensity match has officially ended. Final score: ${match.homeTeam.name} ${match.score.home} - ${match.score.away} ${match.awayTeam.name}.`,
        };
        
        return {
          ...match,
          status,
          minute: nextMinute,
          commentary: [finalWhistle, ...match.commentary]
        };
      }

      // Deep copy to simulate changes
      let score = { ...match.score };
      let timeline = [...match.timeline];
      let commentary = [...match.commentary];
      let stats = match.stats.map(s => ({ ...s }));
      let homeCards = match.homeTeam.redCards;
      let homeYellows = match.homeTeam.yellowCards;
      let awayCards = match.awayTeam.redCards;
      let awayYellows = match.awayTeam.yellowCards;

      // Random triggers
      const eventChance = Math.random();
      
      // 25% chance of an event happening this match minute
      if (eventChance < 0.25) {
        const isHome = Math.random() < 0.50;
        const actingTeam = isHome ? match.homeTeam : match.awayTeam;
        const defendingTeam = isHome ? match.awayTeam : match.homeTeam;

        const actionRoll = Math.random();
        
        if (actionRoll < 0.15) {
          // 1. Goal!
          if (isHome) {
            score.home += 1;
          } else {
            score.away += 1;
          }

          // Scorers pool
          const squadPool: Record<string, string[]> = {
            mci: ['Erling Haaland', 'Kevin De Bruyne', 'Phil Foden', 'Bernardo Silva', 'Jack Grealish', 'Jérémy Doku'],
            rma: ['Kylian Mbappé', 'Vinícius Júnior', 'Jude Bellingham', 'Rodrygo', 'Federico Valverde', 'Luka Modrić'],
            ars: ['Bukayo Saka', 'Martin Ødegaard', 'Kai Havertz', 'Leandro Trossard', 'Declan Rice'],
            che: ['Cole Palmer', 'Nicolas Jackson', 'Noni Madueke', 'Christopher Nkunku', 'Enzo Fernández']
          };

          const pool = squadPool[actingTeam.id] || ['A world-class striker'];
          const scorer = pool[Math.floor(Math.random() * pool.length)];
          const remainder = pool.filter(p => p !== scorer);
          const assister = remainder[Math.floor(Math.random() * remainder.length)] || 'Solo play';

          timeline.push({
            minute: nextMinute,
            teamId: actingTeam.id,
            type: 'goal',
            playerName: scorer,
            subbedPlayerName: assister === 'Solo play' ? 'Solo effort' : `Assist: ${assister}`
          });

          commentary.unshift({
            id: `com_g_${Date.now()}`,
            minute: nextMinute,
            type: 'goal',
            detail: `GOAL!!! ${actingTeam.name} finds the back of the net! ${scorer} converts with absolute clinical composure from 18 yards, set up perfectly by ${assister}!`,
            playerName: scorer
          });

          // Increase shots and xG
          stats = stats.map(s => {
            if (s.label === 'Total shots' || s.label === 'Shots on target') {
              return { ...s, home: isHome ? s.home + 1 : s.home, away: !isHome ? s.away + 1 : s.away };
            }
            if (s.label === 'Expected Goals (xG)') {
              return {
                ...s,
                home: isHome ? parseFloat((s.home + 0.45).toFixed(2)) : s.home,
                away: !isHome ? parseFloat((s.away + 0.45).toFixed(2)) : s.away
              };
            }
            return s;
          });

        } else if (actionRoll < 0.35) {
          // 2. Yellow Card
          const roster: Record<string, string[]> = {
            mci: ['Rodri', 'Josko Gvardiol', 'Manuel Akanji', 'Kyle Walker', 'Bernardo Silva'],
            rma: ['Antonio Rüdiger', 'Ferland Mendy', 'Dani Carvajal', 'Éder Militão'],
            ars: ['William Saliba', 'Declan Rice', 'Thomas Partey', 'Ben White'],
            che: ['Moisés Caicedo', 'Enzo Fernández', 'Marc Cucurella', 'Levi Colwill']
          };
          const players = roster[actingTeam.id] || ['A player'];
          const player = players[Math.floor(Math.random() * players.length)];

          if (isHome) homeYellows += 1;
          else awayYellows += 1;

          timeline.push({
            minute: nextMinute,
            teamId: actingTeam.id,
            type: 'yellow',
            playerName: player
          });

          commentary.unshift({
            id: `com_yc_${Date.now()}`,
            minute: nextMinute,
            type: 'card-yellow',
            detail: `Yellow Card! ${player} of ${actingTeam.name} is yellow-carded by the referee for blocking a fast transition attack.`,
            playerName: player
          });

        } else if (actionRoll < 0.40) {
          // 3. Red Card (Rare!)
          const roster: Record<string, string[]> = {
            mci: ['Rodri', 'Josko Gvardiol', 'Manuel Akanji'],
            rma: ['Antonio Rüdiger', 'Ferland Mendy', 'Éder Militão'],
            ars: ['William Saliba', 'Declan Rice', 'Gabriel Magalhães'],
            che: ['Moisés Caicedo', 'Enzo Fernández', 'Marc Cucurella']
          };
          const players = roster[actingTeam.id] || ['A defender'];
          const player = players[Math.floor(Math.random() * players.length)];

          if (isHome) homeCards += 1;
          else awayCards += 1;

          timeline.push({
            minute: nextMinute,
            teamId: actingTeam.id,
            type: 'red',
            playerName: player
          });

          commentary.unshift({
            id: `com_rc_${Date.now()}`,
            minute: nextMinute,
            type: 'card-red',
            detail: `RED CARD!!! ${player} is sent off the pitch immediately for a high boot challenge! Dramatic turn of events!`,
            playerName: player
          });

        } else if (actionRoll < 0.55) {
          // 4. Substitution
          const subs: Record<string, [string, string][]> = {
            mci: [['Mateo Kovacic', 'Bernardo Silva'], ['John Stones', 'Manuel Akanji'], ['Matheus Nunes', 'Kevin De Bruyne']],
            rma: [['Luka Modrić', 'Federico Valverde'], ['Eduardo Camavinga', 'Aurélien Tchouaméni'], ['Brahim Díaz', 'Rodrygo']],
            ars: [['Gabriel Jesus', 'Leandro Trossard'], ['Jorginho', 'Thomas Partey']],
            che: [['Mykhailo Mudryk', 'Noni Madueke'], ['Christopher Nkunku', 'Nicolas Jackson']]
          };
          const options = subs[actingTeam.id] || [['Substitute In', 'Substitute Out']];
          const [subIn, subOut] = options[Math.floor(Math.random() * options.length)];

          timeline.push({
            minute: nextMinute,
            teamId: actingTeam.id,
            type: 'sub',
            playerName: subIn,
            subbedPlayerName: subOut
          });

          commentary.unshift({
            id: `com_sub_${Date.now()}`,
            minute: nextMinute,
            type: 'substitution',
            detail: `Tactical substitution for ${actingTeam.name}: ${subIn} enters the pitch, replacing ${subOut}.`,
            playerName: subIn,
            playerNameOut: subOut
          });

        } else if (actionRoll < 0.75) {
          // 5. Shot Missed / Saved
          stats = stats.map(s => {
            if (s.label === 'Total shots') {
              return { ...s, home: isHome ? s.home + 1 : s.home, away: !isHome ? s.away + 1 : s.away };
            }
            if (s.label === 'Saves' && !isHome) {
              return { ...s, home: s.home, away: s.away + 1 };
            }
            if (s.label === 'Saves' && isHome) {
              return { ...s, home: s.home + 1, away: s.away };
            }
            if (s.label === 'Expected Goals (xG)') {
              return {
                ...s,
                home: isHome ? parseFloat((s.home + 0.15).toFixed(2)) : s.home,
                away: !isHome ? parseFloat((s.away + 0.15).toFixed(2)) : s.away
              };
            }
            return s;
          });

          commentary.unshift({
            id: `com_s_${Date.now()}`,
            minute: nextMinute,
            type: 'info',
            detail: `Terrific effort! ${actingTeam.name} pulls off a blazing strike from outside the box, but the goalkeeper leaps and parries it away!`
          });

        } else {
          // 6. Corner Kick / Foul
          const isCorner = Math.random() < 0.5;
          if (isCorner) {
            stats = stats.map(s => {
              if (s.label === 'Corners') {
                return { ...s, home: isHome ? s.home + 1 : s.home, away: !isHome ? s.away + 1 : s.away };
              }
              return s;
            });
            commentary.unshift({
              id: `com_corn_${Date.now()}`,
              minute: nextMinute,
              type: 'info',
              detail: `Corner kick awarded to ${actingTeam.name} after a deflection.`
            });
          } else {
            stats = stats.map(s => {
              if (s.label === 'Fouls') {
                return { ...s, home: !isHome ? s.home + 1 : s.home, away: isHome ? s.away + 1 : s.away };
              }
              return s;
            });
          }
        }
      }

      // Always vary possession slightly
      const possIndex = stats.findIndex(s => s.label === 'Ball possession');
      if (possIndex !== -1) {
        const homePoss = stats[possIndex].home;
        const variation = Math.floor((Math.random() - 0.5) * 6);
        const nextHomePoss = Math.max(35, Math.min(65, homePoss + variation));
        stats[possIndex].home = nextHomePoss;
        stats[possIndex].away = 100 - nextHomePoss;
      }

      return {
        ...match,
        minute: nextMinute,
        score,
        status,
        timeline,
        commentary,
        stats,
        homeTeam: {
          ...match.homeTeam,
          yellowCards: homeYellows,
          redCards: homeCards
        },
        awayTeam: {
          ...match.awayTeam,
          yellowCards: awayYellows,
          redCards: awayCards
        }
      };
    });

    if (stateChanged) {
      broadcast('match-update', ServerMatches);
    }
  }, simulationIntervalMs);
}

// Start simulation on server startup
startSimulationTimer();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route 1: Retrieve all matches
  app.get("/api/matches", (req, res) => {
    res.json(ServerMatches);
  });

  // API Route 2: Server-Sent Events for real-time live match updates
  app.get("/api/live-matches", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Send initial matches list immediately on connection
    res.write(`event: matches\ndata: ${JSON.stringify(ServerMatches)}\n\n`);

    // Add this client to active connections
    clients.push(res);

    // Connected log log (internal)
    req.on("close", () => {
      clients = clients.filter(c => c !== res);
    });
  });

  // API Route 3: Reset all live matches back to pre-seeded baseline
  app.post("/api/reset", (req, res) => {
    ServerMatches = [
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
        possessionIndicator: 56,
        winProbability: { home: 35, draw: 18, away: 47 },
        headToHead: {
          winsHome: 4,
          draws: 5,
          winsAway: 5,
          recentResults: [
            { date: '17 Apr 2024', score: '1 - 1 (Real win on pens)', winner: 'draw' },
            { date: '09 Apr 2024', score: '3 - 3', winner: 'draw' }
          ]
        },
        lineups: {
          home: { formation: '4-3-3', startingXI: homeStartingXI, bench: [], coach: 'Pep Guardiola' },
          away: { formation: '4-3-1-2', startingXI: awayStartingXI, bench: [], coach: 'Carlo Ancelotti' },
          injured: [],
          suspended: []
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
          { label: 'Pass accuracy', home: 91, away: 84, type: 'percentage' }
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
          { id: 'com9', minute: 1, type: 'whistle-start', detail: 'Match starts under beautiful night sky!' }
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
          home: { formation: '4-3-3', startingXI: [], bench: [], coach: 'Mikel Arteta' },
          away: { formation: '4-2-3-1', startingXI: [], bench: [], coach: 'Enzo Maresca' },
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
        awayTeam: { id: 'int', name: 'Inter Milan', logo: '🔵⚫', redCards: 0, yellowCards: 0 },
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
    broadcast('matches', ServerMatches);
    res.json({ success: true, message: "Reset match simulator authoritative states." });
  });

  // API Route 4: Direct admin-level match event injector
  app.post("/api/simulate-event", (req, res) => {
    const { matchId, type, team, playerName, detail, secondaryName } = req.body;
    
    // Find matching match model
    let matchIdx = ServerMatches.findIndex(m => m.id === matchId);
    if (matchIdx === -1) {
      return res.status(404).json({ error: "Match not found" });
    }

    let match = ServerMatches[matchIdx];
    let score = { ...match.score };
    let timeline = [...match.timeline];
    let commentary = [...match.commentary];
    let stats = match.stats.map(s => ({ ...s }));
    let homeCards = match.homeTeam.redCards;
    let homeYellows = match.homeTeam.yellowCards;
    let awayCards = match.awayTeam.redCards;
    let awayYellows = match.awayTeam.yellowCards;

    // Simulate different action structures
    const isHome = team === 'home';
    const actingTeam = isHome ? match.homeTeam : match.awayTeam;

    if (type === 'goal') {
      if (isHome) score.home += 1;
      else score.away += 1;

      timeline.push({
        minute: match.minute,
        teamId: actingTeam.id,
        type: 'goal',
        playerName: playerName || 'Player Name',
        subbedPlayerName: secondaryName ? `Assist: ${secondaryName}` : "Solo effort"
      });

      commentary.unshift({
        id: `com_manual_${Date.now()}`,
        minute: match.minute,
        type: 'goal',
        detail: detail || `GOAL!!! ${actingTeam.name} scores! ${playerName || 'The player'} blasts it beautifully past the keeper!`,
        playerName: playerName
      });

      // boost stats
      stats = stats.map(s => {
        if (s.label === 'Total shots' || s.label === 'Shots on target') {
          return { ...s, home: isHome ? s.home + 1 : s.home, away: !isHome ? s.away + 1 : s.away };
        }
        return s;
      });

    } else if (type === 'yellow') {
      if (isHome) homeYellows += 1;
      else awayYellows += 1;

      timeline.push({
        minute: match.minute,
        teamId: actingTeam.id,
        type: 'yellow',
        playerName: playerName
      });

      commentary.unshift({
        id: `com_manual_${Date.now()}`,
        minute: match.minute,
        type: 'card-yellow',
        detail: detail || `Yellow Card! Booked by referee: ${playerName} of ${actingTeam.name}.`,
        playerName: playerName
      });

    } else if (type === 'red') {
      if (isHome) homeCards += 1;
      else awayCards += 1;

      timeline.push({
        minute: match.minute,
        teamId: actingTeam.id,
        type: 'red',
        playerName: playerName
      });

      commentary.unshift({
        id: `com_manual_${Date.now()}`,
        minute: match.minute,
        type: 'card-red',
        detail: detail || `RED CARD!!! ${playerName} of ${actingTeam.name} is given a direct red card!`,
        playerName: playerName
      });

    } else if (type === 'sub') {
      timeline.push({
        minute: match.minute,
        teamId: actingTeam.id,
        type: 'sub',
        playerName: playerName, // subbed in
        subbedPlayerName: secondaryName // subbed out
      });

      commentary.unshift({
        id: `com_manual_${Date.now()}`,
        minute: match.minute,
        type: 'substitution',
        detail: detail || `Substitution for ${actingTeam.name}: ${playerName} replaces ${secondaryName}.`,
        playerName: playerName,
        playerNameOut: secondaryName
      });
    }

    ServerMatches[matchIdx] = {
      ...match,
      score,
      timeline,
      commentary,
      stats,
      homeTeam: { ...match.homeTeam, yellowCards: homeYellows, redCards: homeCards },
      awayTeam: { ...match.awayTeam, yellowCards: awayYellows, redCards: awayCards }
    };

    broadcast('match-update', ServerMatches);
    res.json({ success: true, match: ServerMatches[matchIdx] });
  });

  // API Route 5: Toggle simulation state / control parameter updates
  app.post("/api/simulation-settings", (req, res) => {
    const { enabled, interval } = req.body;
    if (typeof enabled === 'boolean') {
      simulationEnabled = enabled;
    }
    if (typeof interval === 'number' && interval >= 2000) {
      simulationIntervalMs = interval;
      startSimulationTimer();
    }
    res.json({ success: true, simulationEnabled, simulationIntervalMs });
  });

  // Serve Vite in development, otherwise serve built static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FootballHub Full-Stack Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
