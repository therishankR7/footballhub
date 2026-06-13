import React, { useState } from 'react';
import { CalendarDays, Filter, ChevronRight, Video, BarChart2, X, Play } from 'lucide-react';
import { Match } from '../types';

interface FixturesPageProps {
  matches: Match[];
  onSelectMatch: (matchId: string) => void;
}

export default function FixturesPage({
  matches,
  onSelectMatch
}: FixturesPageProps) {
  const [dateFilter, setDateFilter] = useState<'today' | 'tomorrow' | 'week' | 'month'>('today');
  const [leagueFilter, setLeagueFilter] = useState<string>('all');
  const [showHighlightsModal, setShowHighlightsModal] = useState<string | null>(null);

  // Filter logic based on dates selection
  const getFilteredMatches = () => {
    return matches.filter(match => {
      // Date filter
      if (dateFilter === 'today' && match.date !== 'Today') return false;
      if (dateFilter === 'tomorrow' && match.date !== 'Tomorrow') return false;
      if (dateFilter === 'week' && match.date !== 'Yesterday' && match.date !== 'Today' && match.date !== 'Tomorrow') return false;
      
      // League filter
      if (leagueFilter !== 'all' && match.leagueId !== leagueFilter) return false;

      return true;
    });
  };

  const filteredMatches = getFilteredMatches();

  return (
    <div className="space-y-6" id="fixtures-calendar-view">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarDays className="h-5.5 w-5.5 text-indigo-400" />
          <span>Matches Schedule & Calendar</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track current scores, view planned fixture maps, and highlights.</p>
      </div>

      {/* Date filter row switch buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 border border-slate-100 p-3 rounded-2xl dark:bg-slate-900/40 dark:border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['today', 'tomorrow', 'week', 'month'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                dateFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-550/15'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'
              }`}
            >
              {filter === 'week' ? 'This Week' : filter === 'month' ? 'This Month' : filter}
            </button>
          ))}
        </div>

        {/* League Selector filter dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-1.5 px-3 text-xs outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300"
            id="fixture-league-dropdown"
          >
            <option value="all">Check All Leagues</option>
            <option value="pl">Premier League</option>
            <option value="laliga">La Liga</option>
            <option value="bundesliga">Bundesliga</option>
            <option value="ucl">UEFA Champions League</option>
          </select>
        </div>
      </div>

      {/* Matches lists items */}
      <div className="space-y-4" id="fixtures-list-rows-container">
        {filteredMatches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-450 dark:bg-slate-900/45 dark:border-slate-800">
            No matches scheduled matching the filters. Check "This Week" or "This Month" lists.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                onClick={() => onSelectMatch(match.id)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-850 dark:bg-slate-900/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  
                  {/* Left Column info */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{match.leagueLogo}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-850 dark:text-gray-200">{match.leagueName}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{match.stadium.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Core Matchup info */}
                  <div className="md:col-span-2 flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{match.homeTeam.logo}</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{match.homeTeam.name}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-mono bg-slate-50 text-xs font-bold text-slate-800 dark:bg-slate-950 dark:text-white px-3 py-1 rounded">
                        {match.status === 'scheduled' ? match.time : `${match.score.home} - ${match.score.away}`}
                      </span>
                      {match.status === 'live' && (
                        <span className="text-[9px] font-bold text-rose-500 animate-pulse mt-1">LIVE {match.minute}'</span>
                      )}
                      {match.status === 'finished' && (
                        <span className="text-[9px] font-bold text-slate-400 mt-1">FT</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{match.awayTeam.name}</span>
                      <span className="text-2xl">{match.awayTeam.logo}</span>
                    </div>
                  </div>

                  {/* Operational details and CTAs */}
                  <div className="flex items-center justify-end gap-2.5">
                    {match.status === 'finished' ? (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHighlightsModal(`${match.homeTeam.name} vs ${match.awayTeam.name}`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-xl text-[10px] bg-red-50 text-red-655 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 cursor-pointer transition-all"
                        >
                          <Video className="h-3 w-3" />
                          <span>Highlights</span>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMatch(match.id);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] bg-slate-50 hover:bg-slate-100 text-slate-655 dark:bg-slate-800 dark:text-slate-350 cursor-pointer transition-all"
                        >
                          <BarChart2 className="h-3 w-3" />
                          <span>Stats</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                        View Details <ChevronRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Highlights Modal Overlay */}
      {showHighlightsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-xs">
          <div className="bg-slate-950 text-white rounded-3xl max-w-xl w-full border border-slate-800 shadow-2xl relative overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
            <button 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 object-cover cursor-pointer z-10"
              onClick={() => setShowHighlightsModal(null)}
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Visual Screen placeholder */}
            <div className="aspect-video bg-slate-900 relative flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-600 shadow-lg text-white animate-pulse">
                <Play className="h-8 w-8 fill-white ml-1" />
              </div>
              <p className="text-xs font-mono text-indigo-400 mt-4 uppercase tracking-widest">Playing Broadcaster Broadcast Feed</p>
              <p className="text-sm font-semibold mt-2">{showHighlightsModal} Match Goals & Highlight Reels</p>
            </div>
            
            <div className="p-5 space-y-2 bg-slate-900">
              <h4 className="font-display font-medium text-sm">Official Media partnership broadcaster stream</h4>
              <p className="text-xs text-slate-400 leading-normal">
                This simulated video interface displays full HD high-definition action points dynamically compiled by our live match sports tracker engine.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
