import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MapPin, Eye, Trophy, 
  Tv, Compass, TrendingUp, HelpCircle, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Match, MatchStat, CommentaryEvent, LineupPlayer } from '../types';

interface MatchDetailsPageProps {
  match: Match;
  onBack: () => void;
  onSelectPlayer: (playerId: string) => void;
  onSelectTeam: (teamId: string) => void;
}

export default function MatchDetailsPage({
  match,
  onBack,
  onSelectPlayer,
  onSelectTeam
}: MatchDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'lineups' | 'commentary' | 'h2h'>('overview');

  const liveMinutes = match.minute;

  // Commentary badge generator based on category type
  const getCommentaryBadge = (type: CommentaryEvent['type']) => {
    switch (type) {
      case 'goal':
        return <span className="bg-indigo-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-lg font-mono">GOAL</span>;
      case 'card-yellow':
        return <span className="bg-amber-400 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded-sm">YELLOW CARD</span>;
      case 'card-red':
        return <span className="bg-rose-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-sm">RED CARD</span>;
      case 'substitution':
        return <span className="bg-blue-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-lg">SUB</span>;
      case 'var':
        return <span className="bg-purple-750 text-purple-200 font-bold text-[9px] px-2 py-0.5 rounded-lg">VAR REVIEW</span>;
      default:
        return <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] px-2 py-0.5 rounded-lg font-mono">INFO</span>;
    }
  };

  const getTimelineEventBadge = (type: 'goal' | 'yellow' | 'red' | 'sub') => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      case 'sub': return '🔄';
    }
  };

  return (
    <div className="space-y-6" id="match-details-view">
      
      {/* Return Navigation */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-400 font-semibold cursor-pointer dark:text-slate-300 dark:hover:text-white"
        id="match-details-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Matches</span>
      </button>

      {/* Hero Scoreboard Header Panel */}
      <div className="rounded-3xl bg-slate-900 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
        
        {/* Banner with Status */}
        <div className="relative px-6 py-3 flex items-center justify-between border-b border-white/5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Trophy className="h-3.5 w-3.5" />
            {match.leagueName} • Final Stages
          </span>
          {match.status === 'live' ? (
            <span className="bg-rose-500 text-white font-extrabold px-2.5 py-0.5 rounded-sm animate-pulse tracking-widest font-mono">
              LIVE • {liveMinutes}'
            </span>
          ) : match.status === 'finished' ? (
            <span className="bg-slate-750 text-slate-350 font-semibold px-2 py-0.5 rounded">
              FULL TIME (FT)
            </span>
          ) : (
            <span className="bg-indigo-650 text-white font-semibold px-2 py-0.5 rounded">
              UPCOMING • {match.date}
            </span>
          )}
        </div>

        {/* Score and Core Competitor Information Area */}
        <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Home Team */}
          <div 
            onClick={() => onSelectTeam(match.homeTeam.id)}
            className="flex flex-col items-center text-center cursor-pointer group w-full md:w-1/3"
            id={`team-details-header-${match.homeTeam.id}`}
          >
            <div className="bg-white/5 rounded-2xl p-4.5 text-5xl shadow-inner group-hover:scale-105 transition-transform">
              {match.homeTeam.logo}
            </div>
            <h1 className="text-xl font-display font-medium mt-4 group-hover:text-indigo-400 transition-colors">{match.homeTeam.name}</h1>
            <p className="text-xs text-slate-400 mt-1">Manager: {match.lineups.home.coach}</p>
          </div>

          {/* Current Score Core Grid */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3">
            {match.status === 'scheduled' ? (
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-slate-400">Match Starts</p>
                <p className="text-3xl font-extrabold tracking-tight text-white font-mono">{match.time}</p>
                <span className="text-[10px] text-slate-500 block font-mono">{match.date}</span>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 text-5xl font-extrabold">
                  <span className="font-mono tracking-tight text-white">{match.score.home}</span>
                  <span className="text-slate-600">:</span>
                  <span className="font-mono tracking-tight text-white">{match.score.away}</span>
                </div>
                <div className="mt-3 text-[11px] text-slate-450 bg-white/5 py-1 px-3 rounded-full inline-block font-mono">
                  Possession: <span className="font-semibold text-indigo-300">{match.possessionIndicator}%</span> vs <span className="font-semibold text-blue-300">{100 - match.possessionIndicator}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div 
            onClick={() => onSelectTeam(match.awayTeam.id)}
            className="flex flex-col items-center text-center cursor-pointer group w-full md:w-1/3"
            id={`team-details-header-${match.awayTeam.id}`}
          >
            <div className="bg-white/5 rounded-2xl p-4.5 text-5xl shadow-inner group-hover:scale-105 transition-transform">
              {match.awayTeam.logo}
            </div>
            <h1 className="text-xl font-display font-medium mt-4 group-hover:text-indigo-400 transition-colors">{match.awayTeam.name}</h1>
            <p className="text-xs text-slate-400 mt-1">Manager: {match.lineups.away.coach}</p>
          </div>

        </div>

        {/* Dynamic Win Probabilities Bars */}
        <div className="bg-slate-950 px-6 py-4 border-t border-white/5 text-xs">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 font-mono">
            <span>Win Probability: {match.homeTeam.name} ({match.winProbability.home}%)</span>
            <span>Draw ({match.winProbability.draw}%)</span>
            <span>{match.awayTeam.name} ({match.winProbability.away}%)</span>
          </div>
          <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-900">
            <div className="bg-indigo-500" style={{ width: `${match.winProbability.home}%` }} />
            <div className="bg-slate-700" style={{ width: `${match.winProbability.draw}%` }} />
            <div className="bg-blue-500" style={{ width: `${match.winProbability.away}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div 
        className="flex border-b border-slate-200 dark:border-slate-800"
        id="match-tabs-toggle-row"
      >
        {(['overview', 'stats', 'lineups', 'commentary', 'h2h'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tab === 'h2h' ? 'Head-to-Head' : tab}
          </button>
        ))}
      </div>

      {/* Tabs Contents render */}
      <div className="mt-4" id="match-tab-container-content">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="overview-tab-view">
            
            {/* Live match event timeline */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40">
              <h3 className="font-bold text-slate-850 dark:text-white mb-4">Event Timeline</h3>
              
              {match.timeline.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">Match has not started yet. No recorded timeline events.</p>
              ) : (
                <div className="relative border-l border-slate-100 pl-4.5 ml-3 space-y-5.5 dark:border-slate-850">
                  {match.timeline.map((event, idx) => {
                    const isHomeEvent = event.teamId === match.homeTeam.id;
                    return (
                      <div key={idx} className="relative flex items-start gap-3 border-transparent">
                        {/* Dot marker */}
                        <div className={`absolute -left-7 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs shadow-xs ring-4 ring-transparent dark:bg-slate-950 ${isHomeEvent ? 'ring-indigo-100/50' : 'ring-blue-100/50'}`}>
                          {getTimelineEventBadge(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              {event.minute}'
                            </span>
                            <span className="text-[10px] text-slate-450 uppercase font-semibold">
                              {isHomeEvent ? match.homeTeam.name : match.awayTeam.name}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 mt-1.5 dark:text-white">
                            {event.playerName}
                          </p>
                          {event.subbedPlayerName && (
                            <p className="text-[10px] text-slate-400 italic mt-0.5">{event.subbedPlayerName}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Stadium Details Card */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Venue Context</h3>
                <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-205">Stadium Arena</p>
                      <p className="text-slate-400 mt-0.5">{match.stadium}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <Compass className="h-4 w-4 text-blue-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-205">Referee Official</p>
                      <p className="text-slate-400 mt-0.5">{match.referee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <TrendingUp className="h-4 w-4 text-amber-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-205">Weather & Condition</p>
                      <p className="text-slate-400 mt-0.5">{match.weather}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Head to Head record snapshot */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2.5 text-sm">H2H Historical Record</h3>
                <p className="text-xs text-slate-450 leading-relaxed mb-3">
                  Summary stats based on previous matches in domestic league and continental leagues:
                </p>
                <div className="grid grid-cols-3 gap-2.5 text-center bg-slate-50 dark:bg-slate-800/20 p-2.5 rounded-xl text-xs font-mono">
                  <div>
                    <span className="font-bold text-indigo-400 block">{match.headToHead.winsHome}</span>
                    <span className="text-[10px] text-slate-400">Wins Home</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-550 block">{match.headToHead.draws}</span>
                    <span className="text-[10px] text-slate-400">Draws</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-400 block">{match.headToHead.winsAway}</span>
                    <span className="text-[10px] text-slate-400">Wins Away</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE STATS */}
        {activeTab === 'stats' && (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-850 dark:bg-slate-900/40" id="stats-tab-view">
            <h3 className="font-bold text-slate-805 dark:text-white mb-6 flex items-center justify-between">
              <span>Match Analytics</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 animate-pulse">Live Feed</span>
            </h3>

            {match.stats.length === 0 ? (
              <p className="py-12 text-center text-xs text-slate-400">No match statistics available. Stats will populate live when match commences.</p>
            ) : (
              <div className="space-y-5.5 max-w-2xl mx-auto">
                {match.stats.map((stat, idx) => {
                  // Calculate percentage width of the relative bars
                  let homePercentage = 50;
                  let awayPercentage = 50;
                  const total = stat.home + stat.away;
                  if (total > 0) {
                    homePercentage = (stat.home / total) * 100;
                    awayPercentage = (stat.away / total) * 100;
                  }

                  if (stat.type === 'percentage') {
                    homePercentage = stat.home;
                    awayPercentage = stat.away;
                  }

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                        <span className="font-mono text-indigo-400">{stat.home}{stat.type === 'percentage' ? '%' : ''}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] font-mono uppercase">{stat.label}</span>
                        <span className="font-mono text-blue-400">{stat.away}{stat.type === 'percentage' ? '%' : ''}</span>
                      </div>
                      
                      <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        {/* Home percentage bar */}
                        <div 
                          className="bg-indigo-500 rounded-l-full" 
                          style={{ width: `${homePercentage}%` }} 
                        />
                        {/* Away percentage bar */}
                        <div 
                          className="bg-blue-400 rounded-r-full ml-[1px]" 
                          style={{ width: `${awayPercentage}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LINEUPS */}
        {activeTab === 'lineups' && (
          <div className="space-y-6" id="lineups-tab-view">
            
            {/* Visual tactical football field layout */}
            <div className="rounded-3xl bg-slate-900 border-4 border-slate-950 shadow-2xl p-4.5 text-white max-w-xl mx-auto relative overflow-hidden" id="soccer-pitch-tactics">
              {/* Grass gradient pitch style overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 opacity-95 pointer-events-none" />
              
              {/* Pitch layout standard markings */}
              <div className="absolute inset-3 border-2 border-white/5 pointer-events-none" />
              {/* Midline */}
              <div className="absolute left-3 right-3 top-1/2 h-0.5 bg-white/5 -translate-y-1/2 pointer-events-none" />
              {/* Center Circle */}
              <div className="absolute left-1/2 top-1/2 h-20 w-20 border-2 border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              {/* Home Goal Box */}
              <div className="absolute left-1/4 right-1/4 top-3 h-10 border-2 border-b-0 border-white/5 mx-auto pointer-events-none" />
              {/* Away Goal Box */}
              <div className="absolute left-1/4 right-1/4 bottom-3 h-10 border-2 border-t-0 border-white/5 mx-auto pointer-events-none" />

              <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#818cf8]/80 text-center mb-6 relative z-10">
                FootballHub 2D Tactical Lineup Plot
              </h4>

              {/* Plotted lineup players */}
              <div className="h-96 relative z-10">
                {/* Home starting visual list */}
                {match.lineups.home.startingXI.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="absolute cursor-pointer flex flex-col items-center group -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform text-center"
                    style={{ left: `${player.x}%`, top: `${player.y * 0.45}%` }} // upper half of pitch
                  >
                    <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-indigo-600 border border-white/20 font-mono text-[9px] font-bold text-white shadow-md relative">
                      {player.number}
                      {player.rating && (
                        <span className="absolute -top-1 -right-2 bg-yellow-450 text-[8px] font-sans font-bold text-slate-900 rounded px-0.5">
                          {player.rating}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold text-white bg-slate-900/80 px-1 py-0.5 rounded shadow-xs mt-1 line-clamp-1 group-hover:bg-slate-950">
                      {player.name.split(' ').pop()}
                    </span>
                  </div>
                ))}

                {/* Away starting visual list */}
                {match.lineups.away.startingXI.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="absolute cursor-pointer flex flex-col items-center group -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform text-center"
                    style={{ left: `${player.x}%`, top: `${(100 - (player.y * 0.45))}%` }} // lower half of pitch
                  >
                    <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-blue-605 border border-white/20 font-mono text-[9px] font-bold text-white shadow-md relative">
                      {player.number}
                      {player.rating && (
                        <span className="absolute -top-1 -right-2 bg-yellow-450 text-[8px] font-sans font-bold text-slate-900 rounded px-0.5">
                          {player.rating}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold text-white bg-slate-900/80 px-1 py-0.5 rounded shadow-xs mt-1 line-clamp-1 group-hover:bg-slate-950">
                      {player.name.split(' ').pop()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout representation - Bench details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Home Squad Bench List */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-850 dark:text-white mb-3 text-sm">{match.homeTeam.name} Bench</h3>
                {match.lineups.home.bench.length === 0 ? (
                  <p className="text-xs text-slate-400">Match has no lineup records.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {match.lineups.home.bench.map((p) => (
                      <div 
                        key={p.id}
                        className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-lg dark:bg-slate-800/45 cursor-pointer hover:bg-indigo-50/10"
                        onClick={() => onSelectPlayer(p.id)}
                      >
                        <span className="text-slate-400 text-[10px]">#{p.number}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-205 line-clamp-1">{p.name}</span>
                        <span className="text-[9px] text-slate-400 ml-auto font-sans">{p.position}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Away Squad Bench List */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40">
                <h3 className="font-bold text-slate-850 dark:text-white mb-3 text-sm">{match.awayTeam.name} Bench</h3>
                {match.lineups.away.bench.length === 0 ? (
                   <p className="text-xs text-slate-400">Match has no lineup records.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {match.lineups.away.bench.map((p) => (
                      <div 
                        key={p.id}
                        className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-lg dark:bg-slate-800/45 cursor-pointer hover:bg-indigo-50/10"
                        onClick={() => onSelectPlayer(p.id)}
                      >
                        <span className="text-slate-400 text-[10px]">#{p.number}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-205 line-clamp-1">{p.name}</span>
                        <span className="text-[9px] text-slate-400 ml-auto font-sans">{p.position}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rostered Injuries and Suspensions */}
            {(match.lineups.injured.length > 0 || match.lineups.suspended.length > 0) && (
              <div className="rounded-2xl border border-red-100 bg-red-50/20 p-5 dark:border-red-950/20">
                <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Absences and Disciplinary Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Injured list */}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1.5">Disabled List (Injury Report)</h4>
                    {match.lineups.injured.length === 0 ? (
                      <p className="text-gray-400 italic">No recorded injuries</p>
                    ) : (
                      <ul className="space-y-1 list-disc list-inside text-gray-500 dark:text-gray-400">
                        {match.lineups.injured.map((p, index) => (
                          <li key={index}>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{p.name}</span> ({p.reason})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Suspended list */}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1.5">Suspension Report</h4>
                    {match.lineups.suspended.length === 0 ? (
                      <p className="text-gray-400 italic">No suspensions reported</p>
                    ) : (
                      <ul className="space-y-1 list-disc list-inside text-gray-500 dark:text-gray-400">
                        {match.lineups.suspended.map((p, index) => (
                          <li key={index}>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{p.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COMMENTARY */}
        {activeTab === 'commentary' && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40" id="commentary-tab-view">
            <h3 className="font-bold text-slate-850 dark:text-white mb-4 flex items-center justify-between text-sm">
              <span>Opta live play-by-play commentary feed</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Newest events first</span>
            </h3>

            {match.commentary.length === 0 ? (
              <p className="py-10 text-center text-xs text-slate-400">No commentary transcripts recorded yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {match.commentary.map((c) => (
                  <div key={c.id} className="flex gap-4 p-3 rounded-xl bg-slate-50/45 hover:bg-slate-50 transition-colors dark:bg-slate-850 dark:hover:bg-slate-800/40">
                    <span className="font-mono text-sm font-bold text-indigo-400 block h-fit bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded">
                      {c.minute}'
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getCommentaryBadge(c.type)}
                        {c.playerName && <span className="text-xs font-bold text-slate-800 dark:text-white">{c.playerName}</span>}
                      </div>
                      <p className="text-xs text-slate-655 leading-relaxed dark:text-slate-300 font-sans">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: H2H STATISTICS */}
        {activeTab === 'h2h' && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-6" id="h2h-tab-view">
            <div>
              <h3 className="font-bold text-slate-850 dark:text-white">Historical Head-to-Head</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Comparative results for previous meetings. Real Madrid and Manchester City have a rich history of fixtures in the top-flight European tournaments.
              </p>
            </div>

            {/* Historical list */}
            <div className="space-y-3">
              {match.headToHead.recentResults.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No historical matches tracked under this fixture yet.
                </div>
              ) : (
                match.headToHead.recentResults.map((result, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 text-xs text-slate-700 dark:text-slate-350 font-mono">
                    <span className="font-medium text-slate-400">{result.date}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-sans">{match.homeTeam.name}</span>
                      <span className="font-mono bg-white dark:bg-slate-950 px-2 py-0.5 rounded font-extrabold text-slate-900 dark:text-white">
                        {result.score}
                      </span>
                      <span className="font-bold font-sans">{match.awayTeam.name}</span>
                    </div>
                    <span className={`capitalize font-semibold font-sans ${result.winner === 'draw' ? 'text-slate-400' : 'text-indigo-400'}`}>
                      {result.winner === 'draw' ? 'Draw' : `${result.winner} victory`}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Win Probability Analysis</h4>
              <p className="text-slate-400 leading-relaxed font-sans">
                Win probabilities are calculated in real-time leveraging Opta power rankings, team form over the last five weeks, historic goal rates, home venue performance coefficients, and injury parameters.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
