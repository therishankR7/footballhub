import React, { useState } from 'react';
import { 
  Users, MapPin, Eye, Trophy, Calendar, 
  ArrowRightLeft, Medal, Sparkles, Search, TrendingUp, Heart
} from 'lucide-react';
import { Team, Player, FavoriteItems } from '../types';

interface TeamsPageProps {
  teams: Record<string, Team>;
  onSelectPlayer: (playerId: string) => void;
  favorites: FavoriteItems;
  onToggleFavorite: (type: 'teams' | 'players' | 'competitions', id: string) => void;
}

export default function TeamsPage({
  teams,
  onSelectPlayer,
  favorites,
  onToggleFavorite
}: TeamsPageProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('mci');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  
  // States for comparative tool
  const [compareTeamA, setCompareTeamA] = useState<string>('mci');
  const [compareTeamB, setCompareTeamB] = useState<string>('rma');

  const teamKeys = Object.keys(teams);

  // Filter keys for autocomplete search
  const filteredTeamKeys = teamKeys.filter(key => 
    teams[key].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teams[key].coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teams[key].leagueName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTeam = teams[selectedTeamId] || teams['mci'];

  // Form circular badge styling
  const getResultBadge = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W': return <span className="h-5.5 w-5.5 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[11px] font-bold">W</span>;
      case 'D': return <span className="h-5.5 w-5.5 flex items-center justify-center rounded-full bg-gray-400 text-white text-[11px] font-bold">D</span>;
      case 'L': return <span className="h-5.5 w-5.5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[11px] font-bold">L</span>;
    }
  };

  const isFavorite = favorites.teams.includes(activeTeam.id);

  // Comparative helper
  const teamAData = teams[compareTeamA];
  const teamBData = teams[compareTeamB];

  return (
    <div className="space-y-6" id="teams-page-view">
      
      {/* Sub Header tabs for general toggle vs Compare Hub */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-5.5 w-5.5 text-indigo-450" />
            <span>Clubs & Analytics Comparison</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-450">Search profiles or use the Comparison Tool of footballing metrics.</p>
        </div>

        {/* Compare Mode toggler button */}
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
            compareMode 
              ? 'bg-indigo-650 border-indigo-650 text-white shadow-md shadow-indigo-550/10' 
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
          }`}
          id="compare-mode-toggle-btn"
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span>{compareMode ? "Profile Insights" : "Squad Comparer Hub"}</span>
        </button>
      </div>

      {/* RENDER MODE A: COMPARATIVE HUB METRICS */}
      {compareMode ? (
        <div className="space-y-6" id="team-comparator-tool">
          {/* Select dropdown selectors for comparing */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4.5 rounded-2xl border border-slate-100 dark:bg-slate-900/10 dark:border-slate-800">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 font-mono">First Competitor</label>
              <select
                value={compareTeamA}
                onChange={(e) => setCompareTeamA(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 text-xs text-slate-800 focus:ring-indigo-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              >
                {teamKeys.map(key => (
                  <option key={key} value={key}>{teams[key].logo} {teams[key].name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 font-mono">Second Competitor</label>
              <select
                value={compareTeamB}
                onChange={(e) => setCompareTeamB(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 text-xs text-slate-800 focus:ring-indigo-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              >
                {teamKeys.map(key => (
                  <option key={key} value={key} disabled={key === compareTeamA}>{teams[key].logo} {teams[key].name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Graphical Side by Side metrics table */}
          {teamAData && teamBData && (
            <div className="rounded-2xl border border-slate-100 bg-white shadow-xl p-5 sm:p-6 dark:border-slate-850 dark:bg-slate-905 space-y-6">
              
              {/* Header comparative cards */}
              <div className="grid grid-cols-3 gap-2 text-center items-center pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <span className="text-4xl block">{teamAData.logo}</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">{teamAData.name}</h3>
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-400 px-2 py-0.5 rounded font-bold">{teamAData.leagueName}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500 dark:bg-slate-800/60">VS</span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-2">Comparison</span>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl block">{teamBData.logo}</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">{teamBData.name}</h3>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-950/30 text-blue-400 px-2 py-0.5 rounded font-bold">{teamBData.leagueName}</span>
                </div>
              </div>

              {/* Comparing progress bars */}
              <div className="space-y-5.5 max-w-2xl mx-auto text-xs">
                {/* 1. Goals scored */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-400">{teamAData.stats.goalsScored}</span>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Goals Scored This Season</span>
                    <span className="font-mono text-blue-400">{teamBData.stats.goalsScored}</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-indigo-500" style={{ width: `${(teamAData.stats.goalsScored / (teamAData.stats.goalsScored + teamBData.stats.goalsScored)) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(teamBData.stats.goalsScored / (teamAData.stats.goalsScored + teamBData.stats.goalsScored)) * 100}%` }} />
                  </div>
                </div>

                {/* 2. Ball possession average */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-400">{teamAData.stats.possessionAverage}%</span>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Avg Possession Percentage</span>
                    <span className="font-mono text-blue-400">{teamBData.stats.possessionAverage}%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-indigo-500" style={{ width: `${teamAData.stats.possessionAverage}%` }} />
                    <div className="bg-blue-500" style={{ width: `${teamBData.stats.possessionAverage}%` }} />
                  </div>
                </div>

                {/* 3. Pass accuracy */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-400">{teamAData.stats.passAccuracy}%</span>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Passing Accuracy Coefficient</span>
                    <span className="font-mono text-blue-400">{teamBData.stats.passAccuracy}%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-indigo-500" style={{ width: `${teamAData.stats.passAccuracy}%` }} />
                    <div className="bg-blue-500" style={{ width: `${teamBData.stats.passAccuracy}%` }} />
                  </div>
                </div>

                {/* 4. Clean Sheets */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-400">{teamAData.stats.cleanSheets} Match Shutouts</span>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Clean Sheets Total</span>
                    <span className="font-mono text-blue-400">{teamBData.stats.cleanSheets} Match Shutouts</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-indigo-500" style={{ width: `${(teamAData.stats.cleanSheets / (teamAData.stats.cleanSheets + teamBData.stats.cleanSheets)) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(teamBData.stats.cleanSheets / (teamAData.stats.cleanSheets + teamBData.stats.cleanSheets)) * 100}%` }} />
                  </div>
                </div>

                {/* 5. Shots per match */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-400">{teamAData.stats.shotsPerMatch} Shots</span>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Avg Shots Executed Per Match</span>
                    <span className="font-mono text-blue-400">{teamBData.stats.shotsPerMatch} Shots</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-indigo-500" style={{ width: `${(teamAData.stats.shotsPerMatch / (teamAData.stats.shotsPerMatch + teamBData.stats.shotsPerMatch)) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(teamBData.stats.shotsPerMatch / (teamAData.stats.shotsPerMatch + teamBData.stats.shotsPerMatch)) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Meta comparative tables */}
              <div className="grid grid-cols-2 gap-4 text-xs max-w-xl mx-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="rounded-xl bg-slate-50/50 p-3.5 space-y-2 dark:bg-slate-900/30">
                  <p className="font-bold underline text-slate-850 dark:text-slate-200">{teamAData.name} Summary</p>
                  <p className="text-slate-400">Stadium Arena: <span className="font-semibold text-slate-700 dark:text-slate-350">{teamAData.stadium}</span></p>
                  <p className="text-slate-400">Coach Manager: <span className="font-semibold text-slate-700 dark:text-slate-350">{teamAData.coach}</span></p>
                  <p className="text-slate-400">Club Founded: <span className="font-mono font-bold text-slate-700 dark:text-slate-350">{teamAData.founded}</span></p>
                  <p className="text-slate-400">Squad Net Value: <span className="font-bold text-indigo-400">{teamAData.squadValue}</span></p>
                </div>
                <div className="rounded-xl bg-slate-50/50 p-3.5 space-y-2 dark:bg-slate-900/30">
                  <p className="font-bold underline text-slate-850 dark:text-slate-200">{teamBData.name} Summary</p>
                  <p className="text-slate-400">Stadium Arena: <span className="font-semibold text-slate-700 dark:text-slate-350">{teamBData.stadium}</span></p>
                  <p className="text-slate-400">Coach Manager: <span className="font-semibold text-slate-700 dark:text-slate-350">{teamBData.coach}</span></p>
                  <p className="text-slate-400">Club Founded: <span className="font-mono font-bold text-slate-700 dark:text-slate-350">{teamBData.founded}</span></p>
                  <p className="text-slate-400">Squad Net Value: <span className="font-bold text-blue-400">{teamBData.squadValue}</span></p>
                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* RENDER MODE B: SEARCHABLE LISTS & DETAILED TEAM PROFILE */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="team-profiles-page-container">
          
          {/* Left search picker sidebar */}
          <div className="space-y-4 lg:col-span-1 border-r border-gray-50 dark:border-gray-850 pr-2">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs..."
                className="w-full rounded-xl border border-gray-100 bg-white py-2 pr-4 pl-9 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="club-profile-search"
              />
            </div>

            <div className="flex flex-col gap-1.5 max-h-96 overflow-y-auto">
              {filteredTeamKeys.map((key) => {
                const teamItem = teams[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTeamId(key)}
                    className={`flex items-center gap-3 w-full rounded-xl p-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                      selectedTeamId === key
                        ? 'bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-500/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{teamItem.logo}</span>
                    <div className="flex-1">
                      <p className="line-clamp-1">{teamItem.name}</p>
                      <span className="text-[9.5px] text-gray-400 font-medium">{teamItem.leagueName}</span>
                    </div>
                  </button>
                );
              })}
              {filteredTeamKeys.length === 0 && (
                <p className="py-8 text-center text-xs text-gray-400">No clubs match "{searchQuery}"</p>
              )}
            </div>
          </div>

          {/* Right main Profile dashboard container */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header Profile Info banner */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40 relative">
              <div 
                className="absolute top-4 right-4 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => onToggleFavorite('teams', activeTeam.id)}
                title={isFavorite ? "Remove favorite team" : "Add to favorites!"}
              >
                <Heart className={`h-6 w-6 transition-all ${isFavorite ? 'text-rose-500 fill-rose-500 animate-bounce' : 'text-slate-400'}`} />
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                <span className="text-6xl p-3 bg-slate-50 rounded-2xl dark:bg-slate-800/40">{activeTeam.logo}</span>
                <div className="space-y-1.5 flex-1">
                  <h1 className="text-2xl font-display font-medium text-slate-805 dark:text-white">{activeTeam.name}</h1>
                  <p className="text-xs font-bold tracking-wide uppercase text-indigo-400">{activeTeam.leagueName}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2.5 text-xs text-slate-550 dark:text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-indigo-400" /> {activeTeam.stadium}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-blue-400" /> Est. {activeTeam.founded}</span>
                    <span className="flex items-center gap-1"><Medal className="h-3.5 w-3.5 text-amber-500" /> Market Value: {activeTeam.squadValue}</span>
                  </div>
                </div>
              </div>

              {/* Form last 5 row display */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase">Season Form:</span>
                <div className="flex gap-1">
                  {activeTeam.form.map((res, index) => (
                    <span key={index}>{getResultBadge(res)}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Club Season detailed statistics Grid & Recent matches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Season Statistics */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-805 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-850 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Season Statistics Context</span>
                </h3>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl bg-slate-50/55 p-3 text-center dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-450 block uppercase font-bold">Goals Scored</span>
                    <span className="text-xl font-extrabold mt-1 block font-mono text-indigo-400">{activeTeam.stats.goalsScored}</span>
                  </div>
                  <div className="rounded-xl bg-slate-55/65 p-3 text-center dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-450 block uppercase font-bold">Clean Sheets</span>
                    <span className="text-xl font-extrabold mt-1 block font-mono text-amber-500">{activeTeam.stats.cleanSheets}</span>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 p-3 text-center dark:bg-slate-800/20 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Possession Avg</span>
                    <span className="text-sm font-extrabold mt-0.5 block font-mono text-slate-800 dark:text-white">{activeTeam.stats.possessionAverage}%</span>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 p-3 text-center dark:bg-slate-800/20 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Pass Accuracy</span>
                    <span className="text-sm font-extrabold mt-0.5 block font-mono text-slate-800 dark:text-white">{activeTeam.stats.passAccuracy}%</span>
                  </div>
                </div>
              </div>

              {/* Recent matches logs */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-850 dark:text-white mb-4">Recent Match Logs</h3>
                <div className="flex flex-col gap-2">
                  {activeTeam.recentMatches.map((match, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/40 text-xs dark:bg-slate-800/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{match.opponentLogo}</span>
                        <div>
                          <p className="font-semibold text-slate-850 dark:text-gray-200">vs {match.opponent}</p>
                          <span className="text-[9.5px] text-slate-400">{match.wasHome ? 'Home Venue' : 'Away Venue'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-950 px-2 py-0.5 rounded shadow-2xs">
                          {match.score}
                        </span>
                        {getResultBadge(match.result)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Squad list */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40">
              <h3 className="font-bold text-slate-855 dark:text-white mb-4">Player Roster - Active Squad ({activeTeam.squad.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeTeam.squad.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/50 hover:border-indigo-500/20 border border-slate-100 cursor-pointer transition-all dark:bg-slate-900/35 dark:hover:bg-slate-800/20 dark:border-slate-800 dark:hover:border-indigo-500/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-indigo-400 dark:bg-slate-805">
                      {player.photoUrl}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{player.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{player.position} • {player.nationality}</p>
                      <span className="text-[9px] font-mono text-indigo-400 font-semibold">{player.marketValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
