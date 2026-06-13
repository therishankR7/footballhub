import React, { useState } from 'react';
import { 
  Trophy, ArrowUpDown, ShieldCheck, HelpCircle, 
  Search, ArrowRight, ExternalLink, Calendar
} from 'lucide-react';
import { League, StandingsRow, Match } from '../types';

interface StandingsGridProps {
  leagues: League[];
  matches: Match[];
  onSelectTeam: (teamId: string) => void;
  onSelectMatch: (matchId: string) => void;
  activeLeagueId: string;
  setActiveLeagueId: (leagueId: string) => void;
}

type SortField = 'position' | 'played' | 'wins' | 'points' | 'goalDifference';

export default function StandingsGrid({
  leagues,
  matches,
  onSelectTeam,
  onSelectMatch,
  activeLeagueId,
  setActiveLeagueId
}: StandingsGridProps) {
  const [sortField, setSortField] = useState<SortField>('position');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  // Active League selection
  const activeLeague = leagues.find(l => l.id === activeLeagueId) || leagues[0];

  // Specific fixtures and results for this active league
  const leagueMatches = matches.filter(m => m.leagueId === activeLeague.id);

  // Sorting stands rows logically
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(field === 'position'); // Default ascending for position, descending for metrics
    }
  };

  const getSortedStandings = (rows: StandingsRow[]) => {
    const sorted = [...rows];
    sorted.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortAscending) {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
    return sorted;
  };

  const sortedStandings = getSortedStandings(activeLeague.standings);

  // Form circular badge styling
  const getFormBadge = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W':
        return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 font-sans text-[10px] font-bold text-white">W</span>;
      case 'D':
        return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 font-sans text-[10px] font-bold text-white">D</span>;
      case 'L':
        return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 font-sans text-[10px] font-bold text-white">L</span>;
    }
  };

  // Border zone formatting
  const getZoneBorder = (zone?: StandingsRow['zone']) => {
    switch (zone) {
      case 'ucl': return 'border-l-4 border-emerald-500';
      case 'uel': return 'border-l-4 border-blue-500';
      case 'relegation': return 'border-l-4 border-rose-500';
      default: return '';
    }
  };

  return (
    <div className="space-y-6" id="standings-grid-view">
      
      {/* League Selection Tabs Header */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="league-tab-select">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => {
              setActiveLeagueId(league.id);
              setSortField('position');
              setSortAscending(true);
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeLeagueId === league.id
                ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-550/15 border border-indigo-505/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-350 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <span>{league.logo}</span>
            <span>{league.name}</span>
          </button>
        ))}
      </div>

      {/* Hero Competition Details Summary Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="competition-details-banners">
        {/* League Bio card */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/25 text-white p-5 space-y-1 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-7xl select-none opacity-5">{activeLeague.logo}</div>
          <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase">Active Competition</span>
          <h2 className="text-xl font-display font-medium">{activeLeague.name}</h2>
          <p className="text-xs text-slate-400">{activeLeague.country} • Season {activeLeague.season}</p>
        </div>

        {/* Top Scorer leader */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Top Goal Scorer</span>
          <p className="text-sm font-bold text-slate-850 dark:text-white line-clamp-1">{activeLeague.topScorer.split('(')[0]}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Goals Tally</span>
            <span className="font-mono font-bold text-indigo-400">
              {activeLeague.topScorer.includes('(') ? activeLeague.topScorer.slice(activeLeague.topScorer.indexOf('(')) : ''}
            </span>
          </div>
        </div>

        {/* Top Assists list */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Playmaking King</span>
          <p className="text-sm font-bold text-slate-850 dark:text-white line-clamp-1">{activeLeague.topAssists.split('(')[0]}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Assists Stat</span>
            <span className="font-mono font-bold text-blue-400">
              {activeLeague.topAssists.includes('(') ? activeLeague.topAssists.slice(activeLeague.topAssists.indexOf('(')) : ''}
            </span>
          </div>
        </div>

        {/* Top Clean Sheet list */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Clean Sheet Keeper</span>
          <p className="text-sm font-bold text-slate-850 dark:text-white line-clamp-1">{activeLeague.cleanSheetsLeader.split('(')[0]}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Shutouts</span>
            <span className="font-mono font-semibold text-amber-500">
              {activeLeague.cleanSheetsLeader.includes('(') ? activeLeague.cleanSheetsLeader.slice(activeLeague.cleanSheetsLeader.indexOf('(')) : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Standings Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table list main */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-1">
              <Trophy className="h-4.5 w-4.5 text-yellow-500" />
              <span>Standings Table</span>
            </h3>
            <span className="text-xs text-slate-400">Click column headers to sort metrics</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-gray-400 dark:border-slate-800/80 dark:bg-slate-900/50">
                  <th onClick={() => handleSort('position')} className="cursor-pointer py-3.5 pr-2 pl-4 text-[10px] font-bold uppercase hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                    <div className="flex items-center gap-1 leading-none select-none">
                      # <ArrowUpDown className="h-3 w-3 inline text-gray-400" />
                    </div>
                  </th>
                  <th className="py-3.5 pr-2 pl-2 text-[10px] font-bold uppercase">Club Team</th>
                  <th onClick={() => handleSort('played')} className="cursor-pointer py-3.5 px-2 text-[10px] font-bold uppercase text-center hover:bg-gray-100/50">
                    <div className="flex items-center justify-center gap-0.5 leading-none select-none">
                      P <ArrowUpDown className="h-2.5 w-2.5 inline" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('wins')} className="cursor-pointer py-3.5 px-2 text-[10px] font-bold uppercase text-center hover:bg-gray-100/50">W</th>
                  <th className="py-3.5 px-2 text-[10px] font-bold uppercase text-center">D</th>
                  <th className="py-3.5 px-2 text-[10px] font-bold uppercase text-center">L</th>
                  <th className="py-3.5 px-2 text-[10px] font-bold uppercase text-center">G</th>
                  <th onClick={() => handleSort('goalDifference')} className="cursor-pointer py-3.5 px-2 text-[10px] font-bold uppercase text-center hover:bg-gray-100/50">
                    <div className="flex items-center justify-center gap-0.5 leading-none select-none">
                      GD <ArrowUpDown className="h-2.5 w-2.5 inline" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('points')} className="cursor-pointer py-3.5 pr-4 pl-2 text-[10px] font-bold uppercase text-center hover:bg-gray-100/50 font-mono">
                    <div className="flex items-center justify-center gap-0.5 leading-none text-indigo-400 select-none">
                      PTS <ArrowUpDown className="h-2.5 w-2.5 inline" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 text-[10px] font-bold uppercase text-center hidden md:table-cell">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-850">
                {sortedStandings.map((row) => (
                  <tr 
                    key={row.teamId}
                    className="hover:bg-gray-50/50 transition-colors group dark:hover:bg-gray-905"
                  >
                    {/* Position and qualification marker */}
                    <td className={`py-3.5 pr-2 pl-4 font-bold font-mono text-center ${getZoneBorder(row.zone)}`}>
                      <span className="text-gray-800 dark:text-gray-100">{row.position}</span>
                    </td>

                    {/* Logo & Club Clickable */}
                    <td className="py-3 px-2">
                      <div 
                        onClick={() => onSelectTeam(row.teamId)}
                        className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 group-hover:text-indigo-400 dark:text-white dark:group-hover:text-indigo-400"
                      >
                        <span className="text-lg shrink-0">{row.teamLogo}</span>
                        <span className="line-clamp-1">{row.teamName}</span>
                      </div>
                    </td>

                    {/* Stats cells */}
                    <td className="py-3 px-2 text-center text-gray-500 font-mono font-bold">{row.played}</td>
                    <td className="py-3 px-2 text-center text-gray-800 font-mono dark:text-gray-200">{row.wins}</td>
                    <td className="py-3 px-2 text-center text-gray-500 font-mono">{row.draws}</td>
                    <td className="py-3 px-2 text-center text-gray-500 font-mono">{row.losses}</td>
                    <td className="py-3 px-2 text-center text-gray-400 font-mono text-[11px] whitespace-nowrap">
                      {row.goalsFor}:{row.goalsAgainst}
                    </td>
                    <td className={`py-3 px-2 text-center font-bold font-mono ${row.goalDifference > 0 ? 'text-emerald-500' : row.goalDifference < 0 ? 'text-rose-500' : 'text-gray-400'}`}>
                      {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                    </td>
                    
                    {/* Points cells */}
                    <td className="py-3 pr-4 pl-2 text-center font-extrabold font-mono text-sm text-slate-800 dark:text-slate-100 bg-gray-50/40 dark:bg-gray-900/20">
                      {row.points}
                    </td>

                    {/* Form row */}
                    <td className="py-3 px-3 hidden md:table-cell">
                      <div className="flex gap-1 justify-center">
                        {row.form.map((res, index) => (
                          <span key={index}>{getFormBadge(res)}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Qualification legend description labels */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/20 p-3 text-[10px] space-y-1.5 text-gray-500 dark:text-gray-400 leading-relaxed">
            <p className="font-bold uppercase text-gray-400 tracking-wider">Qualification Spots Legend</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1"><span className="h-2 w-1.5 bg-emerald-500 rounded-full" /> Champions League Qualifiers (Group Stage)</span>
              <span className="flex items-center gap-1"><span className="h-2 w-1.5 bg-blue-500 rounded-full" /> Europa League Group Stage</span>
              <span className="flex items-center gap-1"><span className="h-2 w-1.5 bg-rose-500 rounded-full" /> Relegation Relegated Zone</span>
            </div>
          </div>
        </div>

        {/* Right Pane inside standings: Competition lists / matches specifically */}
        <div className="space-y-4" id="competition-fixtures-sidebar">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
            <Calendar className="h-4.5 w-4.5 text-emerald-500" />
            <span>Fixtures / Results</span>
          </h3>

          <div className="space-y-3.5">
            {leagueMatches.length === 0 ? (
              <p className="py-12 bg-white rounded-2xl text-center text-xs text-gray-400 border border-gray-100 dark:border-gray-800 dark:bg-gray-900">
                No scheduled league fixtures entered. See the general calendar tab.
              </p>
            ) : (
              leagueMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => onSelectMatch(match.id)}
                  className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all dark:border-gray-850 dark:bg-gray-900"
                >
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold mb-2">
                    <span>{match.stadium.split(',')[0]}</span>
                    {match.status === 'live' ? (
                      <span className="text-rose-500 font-bold animate-pulse">LIVE • {match.minute}'</span>
                    ) : match.status === 'finished' ? (
                      <span className="text-gray-400">FINISHED (FT)</span>
                    ) : (
                      <span className="text-blue-500">{match.date} {match.time}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">{match.homeTeam.logo}</span>
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{match.homeTeam.name}</span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/80 rounded px-2.5 py-0.5 font-mono text-xs font-extrabold text-slate-900 dark:text-white">
                      {match.status === 'scheduled' ? 'vs' : `${match.score.home} - ${match.score.away}`}
                    </div>

                    <div className="flex items-center gap-1.5 text-right justify-end">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{match.awayTeam.name}</span>
                      <span className="text-lg">{match.awayTeam.logo}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-gray-400 flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-800">
                    <span>Referee: {match.referee.split(' ')[0]}</span>
                    <button className="text-emerald-500 hover:underline font-bold flex items-center gap-0.5">
                      Open <ExternalLink className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
