import React, { useState } from 'react';
import { Award, Trophy, ShieldCheck, Compass, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { Player } from '../types';

interface LeaderboardsProps {
  players: Player[];
  onSelectPlayer: (playerId: string) => void;
}

type MetricCategory = 'goals' | 'assists' | 'passAccuracy' | 'expectedGoals';

export default function Leaderboards({
  players,
  onSelectPlayer
}: LeaderboardsProps) {
  const [metricTab, setMetricTab] = useState<MetricCategory>('goals');

  // Logic to sort players based on metric tab selection
  const sortedPlayers = [...players].sort((a, b) => {
    return b.stats[metricTab] - a.stats[metricTab];
  }).slice(0, 5); // top 5

  const getMetricLabel = (metric: MetricCategory, value: number) => {
    switch (metric) {
      case 'goals': return `${value} Goals`;
      case 'assists': return `${value} Assists`;
      case 'passAccuracy': return `${value}% Accuracy`;
      case 'expectedGoals': return `${value} xG`;
    }
  };

  const getMetricTitle = (metric: MetricCategory) => {
    switch (metric) {
      case 'goals': return 'Golden Boot (Top Goal Scorers)';
      case 'assists': return 'Playmaking Leaders (Most Assists)';
      case 'passAccuracy': return 'Passing Precision (Accuracy %)';
      case 'expectedGoals': return 'Expected Goals (xG Leaders)';
    }
  };

  const maxVal = Math.max(...sortedPlayers.map(p => p.stats[metricTab]));

  return (
    <div className="space-y-6" id="leaderboards-dashboard">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="h-5.5 w-5.5 text-indigo-400" />
          <span>Global Leaderboard Analytics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Exhaustive ratings data sourced directly from our opta live sports engine.</p>
      </div>

      {/* Metric Selector header tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" id="leaderboard-tabs-toggle">
        {(['goals', 'assists', 'passAccuracy', 'expectedGoals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMetricTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap border ${
              metricTab === tab
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-55 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350'
            }`}
          >
            {tab === 'passAccuracy' ? 'Pass Precision' : tab === 'expectedGoals' ? 'Expected Goals (xG)' : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top rankings bar graph visual progress list */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-6">
          <div>
            <h3 className="font-display font-medium text-slate-905 dark:text-white">
              {getMetricTitle(metricTab)}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Season performance ratings based on overall appearances so far.</p>
          </div>

          <div className="space-y-4.5">
            {sortedPlayers.map((player, index) => {
              const currentVal = player.stats[metricTab];
              const ratio = maxVal > 0 ? (currentVal / maxVal) * 100 : 0;
              return (
                <div 
                  key={player.id}
                  onClick={() => onSelectPlayer(player.id)}
                  className="group flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/20 p-2.5 rounded-xl transition-all"
                >
                  {/* Rank badge */}
                  <span className={`h-6 w-6 font-mono text-xs font-bold flex items-center justify-center rounded-full ${
                    index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>

                  {/* Player info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-800 dark:text-gray-100 group-hover:text-indigo-400 transition-colors">
                        {player.name}
                      </span>
                      <span className="font-mono text-indigo-400 font-bold">
                        {getMetricLabel(metricTab, player.stats[metricTab])}
                      </span>
                    </div>

                    {/* Bar length */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-indigo-650 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${ratio}%` }} 
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {player.teamName} • Position: {player.position}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactical facts / context sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-805 text-white p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-300" />
              <h3 className="font-display text-sm font-medium">Playmaker Insights</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Erling Haaland continues to redefine finishing parameters. Across 31 appearances, his tally sits at 28 actual goals against an expected rating output (26.4xG), reflecting world-class striker instincts.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">How is xG Calculated?</h4>
            <p className="leading-relaxed font-sans">
              Expected Goals (xG) is a statistical metric measuring the likelihood that an attempt ends in a goal, assessing factors like position angle, distance, defense pressure, pass origin, and preferred foot ratio.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
