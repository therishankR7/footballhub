import React, { useState, useEffect } from 'react';
import { 
  Activity, MapPin, Eye, Star, AlertCircle, Wind, Trophy, Users, 
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { Match, FavoriteItems } from '../types';

interface HomeDashboardProps {
  matches: Match[];
  onSelectMatch: (matchId: string) => void;
  favorites: FavoriteItems;
  onToggleFavorite: (type: 'teams' | 'players' | 'competitions', id: string) => void;
}

export default function HomeDashboard({
  matches,
  onSelectMatch,
  favorites,
  onToggleFavorite
}: HomeDashboardProps) {
  // Let's find one featured match that's live (or find m1_live)
  const featuredMatch = matches.find(m => m.id === 'm1_live') || matches[0];
  const liveMatches = matches.filter(m => m.status === 'live');
  const finishedMatches = matches.filter(m => m.status === 'finished');
  const scheduledMatches = matches.filter(m => m.status === 'scheduled');

  // Timer simulation to update live match minutes and scores of live games dynamically!
  const [liveMinutes, setLiveMinutes] = useState<Record<string, number>>({});
  const [liveScores, setLiveScores] = useState<Record<string, { home: number; away: number }>>({});

  useEffect(() => {
    // Set initial minutes and scores from database
    const initialMins: Record<string, number> = {};
    const initialScores: Record<string, { home: number; away: number }> = {};
    matches.forEach(m => {
      if (m.status === 'live') {
        initialMins[m.id] = m.minute;
        initialScores[m.id] = { ...m.score };
      }
    });
    setLiveMinutes(initialMins);
    setLiveScores(initialScores);

    // Increment minutes every 15 seconds to simulate real-time progress while online!
    const timer = setInterval(() => {
      setLiveMinutes(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          if (next[id] < 90) {
            next[id] += 1;
            
            // Random chance of goal scored!
            if (Math.random() > 0.85) {
              setLiveScores(currentScores => {
                const updated = { ...currentScores };
                if (updated[id]) {
                  if (Math.random() > 0.5) {
                    updated[id].home += 1;
                  } else {
                    updated[id].away += 1;
                  }
                }
                return updated;
              });
            }
          }
        });
        return next;
      });
    }, 15000);

    return () => clearInterval(timer);
  }, [matches]);

  const activeAccent = 'emerald';

  return (
    <div className="space-y-6" id="home-dashboard-view">
      {/* Hero Section - Featured Live Match */}
      {featuredMatch && (
        <div 
          onClick={() => onSelectMatch(featuredMatch.id)}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/25 text-white shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10 hover:scale-[1.005] cursor-pointer"
          id="featured-hero-match-card"
        >
          {/* Subtle patterns overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-rose-450 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 block" />
            <span>Featured Live</span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
              <span className="text-xl">{featuredMatch.leagueLogo}</span>
              <span className="font-semibold tracking-wider text-indigo-350">{featuredMatch.leagueName}</span>
              <span className="opacity-50">•</span>
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white text-[11px]">
                {liveMinutes[featuredMatch.id] || featuredMatch.minute}'
              </span>
            </div>

            {/* Main Score & Teams Arena */}
            <div className="my-6 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              {/* Home Team */}
              <div className="flex flex-col items-center text-center md:items-end md:text-right">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 p-3 text-4xl shadow-inner group-hover:scale-105 transition-transform">
                  {featuredMatch.homeTeam.logo}
                </div>
                <h3 className="mt-3 text-lg font-bold sm:text-xl">{featuredMatch.homeTeam.name}</h3>
                <div className="mt-1 flex items-center gap-1.5">
                  {featuredMatch.homeTeam.yellowCards > 0 && (
                    <span className="h-4 w-3 rounded-xs bg-amber-400 block" title={`${featuredMatch.homeTeam.yellowCards} Yellow Cards`} />
                  )}
                  {featuredMatch.homeTeam.redCards > 0 && (
                    <span className="h-4 w-3 rounded-xs bg-rose-500 block animate-pulse" title="Red Card Offense" />
                  )}
                </div>
              </div>

              {/* Scoreline Centred */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4 text-4xl font-extrabold sm:text-5xl tracking-tight">
                  <span className="tabular-nums text-slate-100">{liveScores[featuredMatch.id]?.home ?? featuredMatch.score.home}</span>
                  <span className="text-slate-500">:</span>
                  <span className="tabular-nums text-slate-100">{liveScores[featuredMatch.id]?.away ?? featuredMatch.score.away}</span>
                </div>
                {/* Possession simple comparative visual */}
                <div className="mt-4 w-full max-w-[160px] space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                    <span>{featuredMatch.possessionIndicator}%</span>
                    <span>POSS</span>
                    <span>{100 - featuredMatch.possessionIndicator}%</span>
                  </div>
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div 
                      className="bg-emerald-500" 
                      style={{ width: `${featuredMatch.possessionIndicator}%` }} 
                    />
                    <div 
                      className="bg-blue-400" 
                      style={{ width: `${100 - featuredMatch.possessionIndicator}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 p-3 text-4xl shadow-inner group-hover:scale-105 transition-transform">
                  {featuredMatch.awayTeam.logo}
                </div>
                <h3 className="mt-3 text-lg font-bold sm:text-xl">{featuredMatch.awayTeam.name}</h3>
                <div className="mt-1 flex items-center gap-1.5">
                  {featuredMatch.awayTeam.yellowCards > 0 && (
                    <span className="h-4 w-3 rounded-xs bg-amber-400 block" title={`${featuredMatch.awayTeam.yellowCards} Yellow Cards`} />
                  )}
                  {featuredMatch.awayTeam.redCards > 0 && (
                    <span className="h-4 w-3 rounded-xs bg-rose-500 block animate-pulse" title="Red Card Offense" />
                  )}
                </div>
              </div>
            </div>

            {/* Stadium / Weather Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/5 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 justify-center md:justify-start">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>{featuredMatch.stadium}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <Wind className="h-3.5 w-3.5 text-blue-400" />
                <span>{featuredMatch.weather}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center md:justify-end">
                <Eye className="h-3.5 w-3.5 text-amber-400" />
                <span>Referee: {featuredMatch.referee}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Content - Live matches feed & Scheduled lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Matches List */}
        <div className="lg:col-span-2 space-y-4" id="home-live-section">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-rose-500 animate-pulse" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Matches Now</h2>
            </div>
            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              {liveMatches.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {liveMatches.map((match) => {
              const currentMin = liveMinutes[match.id] || match.minute;
              const scoreHome = liveScores[match.id]?.home ?? match.score.home;
              const scoreAway = liveScores[match.id]?.away ?? match.score.away;

              return (
                <div
                  key={match.id}
                  onClick={() => onSelectMatch(match.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-4.5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-500/20 dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <div className="flex items-center justify-between text-[11px] mb-3 text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {match.leagueName}
                    </span>
                    <span className="animate-pulse bg-rose-500 rounded px-1.5 py-0.5 text-white font-bold font-mono">
                      {currentMin}'
                    </span>
                  </div>

                  <div className="flex justify-between items-center my-3.5">
                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-1.5 w-1/3 text-center">
                      <span className="text-3xl">{match.homeTeam.logo}</span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{match.homeTeam.name}</span>
                      {match.homeTeam.redCards > 0 && (
                        <span className="text-[10px] bg-rose-500 text-white rounded px-1 font-bold animate-pulse">RED {match.homeTeam.redCards}</span>
                      )}
                    </div>

                    {/* Scores */}
                    <div className="flex flex-col items-center w-1/3">
                      <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-widest tabular-nums">
                        {scoreHome} - {scoreAway}
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1">Possession</span>
                      <div className="w-16 h-1 mt-1 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: `${match.possessionIndicator}%` }} />
                        <div className="bg-blue-400 h-full" style={{ width: `${100 - match.possessionIndicator}%` }} />
                      </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-1.5 w-1/3 text-center">
                      <span className="text-3xl">{match.awayTeam.logo}</span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{match.awayTeam.name}</span>
                      {match.awayTeam.redCards > 0 && (
                        <span className="text-[10px] bg-rose-500 text-white rounded px-1 font-bold animate-pulse">RED {match.awayTeam.redCards}</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2 text-[10px] text-gray-400 flex justify-between items-center dark:border-slate-800/80">
                    <span>{match.stadium.split(',')[0]}</span>
                    <button className="text-indigo-400 hover:underline font-bold flex items-center gap-1">
                      Live Stats <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Previous Results Tab section */}
          <div className="pt-4 border-t border-slate-150 dark:border-slate-800">
            <h3 className="text-lg font-display font-medium text-slate-900 dark:text-slate-100 mb-3">Previous Match Results</h3>
            <div className="flex flex-col gap-3">
              {finishedMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => onSelectMatch(match.id)}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white shadow-xs p-3 hover:border-slate-200 cursor-pointer dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-500/25 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{match.leagueLogo}</span>
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400">{match.leagueName}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-semibold">{match.homeTeam.name}</span>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200 font-mono">
                          {match.score.home} - {match.score.away}
                        </span>
                        <span className="text-sm font-semibold">{match.awayTeam.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-mono font-medium block">FT</span>
                    <span className="text-[10px] font-semibold text-indigo-400 hover:underline">View Statistics</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar right inside Dashboard: Fixtures List & Win Odds */}
        <div className="space-y-6" id="home-sidebar-section">
          
          {/* Quick Stats Highlights */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-850 p-5 text-white shadow-lg border border-indigo-550/30">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-300" />
              <h3 className="font-display font-medium">Did you know?</h3>
            </div>
            <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
              Harry Kane leads the Bundesliga top scorers list with 36 goals (expectedGoals: 31.2xG), showing incredible efficiency of +4.8 goals over rating!
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-indigo-400/20 pt-3">
              <span className="text-[10px] tracking-wide uppercase text-indigo-300">Stats engine provided by Opta</span>
              <span className="text-[10px] font-bold bg-white/10 rounded px-1.5 py-0.5">Live</span>
            </div>
          </div>

          {/* Upcoming Fixtures list */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Fixtures</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase uppercase">Tomorrow</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {scheduledMatches.map((match) => (
                <div 
                  key={match.id}
                  onClick={() => onSelectMatch(match.id)}
                  className="group rounded-xl bg-gray-50/50 p-3 hover:bg-emerald-50/20 dark:bg-gray-800/20 dark:hover:bg-emerald-950/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5 font-semibold">
                    <span>{match.leagueName}</span>
                    <span className="font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                      {match.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{match.homeTeam.logo}</span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{match.homeTeam.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{match.awayTeam.name}</span>
                      <span className="text-lg">{match.awayTeam.logo}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-[10px] text-gray-400">
                    <span className="flex items-center gap-1 origin-left group-hover:scale-105 transition-transform">
                      <MapPin className="h-3 w-3" />
                      {match.stadium.split(',')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Pinned Favorites banner */}
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/20">
            <h3 className="font-display font-medium text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-indigo-400 fill-indigo-400" />
              Pinned Favorites
            </h3>
            <p className="text-xs text-slate-450 leading-relaxed">
              Track your favorite teams and matches instantly. Toggle the star badge on any team profile to display them on your custom favorites pane!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
