import React, { useState } from 'react';
import { 
  User, ShieldAlert, Sparkles, Award, Star, Search, 
  MapPin, Compass, Briefcase, Heart, BookOpen
} from 'lucide-react';
import { Player, FavoriteItems } from '../types';

interface PlayersPageProps {
  players: Player[];
  onSelectTeam: (teamId: string) => void;
  favorites: FavoriteItems;
  onToggleFavorite: (type: 'teams' | 'players' | 'competitions', id: string) => void;
}

export default function PlayersPage({
  players,
  onSelectTeam,
  favorites,
  onToggleFavorite
}: PlayersPageProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('p_haaland');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activePlayer = players.find(p => p.id === selectedPlayerId) || players[0];

  // Filtering players list
  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nationality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFavorite = favorites.players.includes(activePlayer.id);

  // Generate heatmap coordinates depending on position
  const getHeatmapHotspots = (pos: Player['position']) => {
    switch (pos) {
      case 'Goalkeeper':
        return [
          { x: 50, y: 15, size: 45, opacity: 0.8 },
          { x: 50, y: 25, size: 25, opacity: 0.5 }
        ];
      case 'Defender':
        return [
          { x: 50, y: 30, size: 55, opacity: 0.7 },
          { x: 25, y: 35, size: 35, opacity: 0.5 },
          { x: 75, y: 35, size: 35, opacity: 0.5 }
        ];
      case 'Midfielder':
        return [
          { x: 50, y: 50, size: 75, opacity: 0.7 },
          { x: 40, y: 65, size: 45, opacity: 0.6 },
          { x: 60, y: 35, size: 45, opacity: 0.5 }
        ];
      case 'Forward':
        return [
          { x: 50, y: 78, size: 55, opacity: 0.8 },
          { x: 20, y: 80, size: 35, opacity: 0.5 },
          { x: 80, y: 80, size: 35, opacity: 0.5 },
          { x: 50, y: 65, size: 25, opacity: 0.4 }
        ];
    }
  };

  const hotSpots = getHeatmapHotspots(activePlayer.position);

  return (
    <div className="space-y-6" id="players-page-view">
      
      {/* Search Header and quick desc */}
      <div>
        <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
          <User className="h-5.5 w-5.5 text-indigo-400" />
          <span>Player Profiles & Statistics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">View market values, key output stats, and spatial heatmaps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="players-page-grid-container">
        
        {/* Sidebar searchable selections */}
        <div className="space-y-4 lg:col-span-1 border-r border-slate-100 dark:border-slate-850 pr-2">
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search players..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-9 text-xs text-slate-900 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="player-search-bar"
            />
          </div>

          <div className="flex flex-col gap-1.5 max-h-[460px] overflow-y-auto">
            {filteredPlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`flex items-center gap-3 w-full rounded-xl p-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                  selectedPlayerId === player.id
                    ? 'bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-500/10'
                    : 'hover:bg-slate-55 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-indigo-400 dark:bg-slate-850">
                  {player.photoUrl}
                </div>
                <div className="flex-1">
                  <p className="line-clamp-1">{player.name}</p>
                  <span className="text-[9.5px] text-slate-400 font-medium">{player.teamName} • {player.position}</span>
                </div>
              </button>
            ))}
            {filteredPlayers.length === 0 && (
              <p className="py-8 text-center text-xs text-slate-450">No players match "{searchQuery}"</p>
            )}
          </div>
        </div>

        {/* Main profile layout content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Main Info Card Banner */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40 relative">
            <div 
              className="absolute top-4 right-4 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => onToggleFavorite('players', activePlayer.id)}
              title={isFavorite ? "Remove favorite player" : "Add player to favorites!"}
            >
              <Heart className={`h-6 w-6 transition-all ${isFavorite ? 'text-rose-500 fill-rose-500 animate-bounce' : 'text-slate-400'}`} />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              {/* Photo placeholder initial circle */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-xl">
                {activePlayer.photoUrl}
              </div>

              <div className="space-y-1.5 flex-1 animate-fade-in">
                <h1 className="text-2xl font-display font-medium text-slate-900 dark:text-white">{activePlayer.name}</h1>
                
                <div 
                  onClick={() => onSelectTeam(activePlayer.teamId)} 
                  className="text-xs text-indigo-400 font-bold hover:underline cursor-pointer inline-block"
                >
                  {activePlayer.teamName}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold font-mono">Nationality</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200 mt-0.5 block">{activePlayer.nationality}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold font-mono">Position / Foot</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200 mt-0.5 block">{activePlayer.position} ({activePlayer.preferredFoot})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold font-mono">Age / Height</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200 mt-0.5 block">{activePlayer.age} yrs • {activePlayer.height}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold font-mono">Market Valuation</span>
                    <span className="font-bold text-indigo-400 mt-0.5 block">{activePlayer.marketValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Player Performance stats blocks & heatmap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Player output metrics stats items */}
            <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-805 dark:bg-slate-900/40 space-y-4">
              <h3 className="font-bold text-slate-850 dark:text-white flex items-center gap-1.5 text-sm">
                <Award className="h-4 w-4 text-indigo-400" />
                <span>Season Output Statistics</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="rounded-xl bg-slate-50/50 p-3 text-center dark:bg-slate-800/30">
                  <span className="text-[10px] text-slate-450 block uppercase font-bold">Goals scored</span>
                  <span className="text-2xl font-black text-indigo-400 font-mono mt-0.5 block">{activePlayer.stats.goals}</span>
                </div>
                <div className="rounded-xl bg-slate-50/50 p-3 text-center dark:bg-slate-800/30">
                  <span className="text-[10px] text-slate-450 block uppercase font-bold">Assists tally</span>
                  <span className="text-2xl font-black text-blue-400 font-mono mt-0.5 block">{activePlayer.stats.assists}</span>
                </div>
                <div className="rounded-xl bg-slate-50/50 p-3 text-center dark:bg-slate-800/30">
                  <span className="text-[10px] text-slate-450 block uppercase font-bold">Appearances</span>
                  <span className="text-xl font-bold text-slate-850 dark:text-slate-200 font-mono mt-0.5 block">{activePlayer.stats.appearances}</span>
                </div>
                <div className="rounded-xl bg-slate-50/20 p-3 text-center text-xs dark:bg-slate-800/10">
                  <span className="text-slate-400 block font-mono">Pass accuracy</span>
                  <span className="font-mono font-bold text-sm block mt-0.5 text-slate-800 dark:text-slate-100">{activePlayer.stats.passAccuracy}%</span>
                </div>
                <div className="rounded-xl bg-slate-50/20 p-3 text-center text-xs dark:bg-slate-800/10">
                  <span className="text-slate-400 block font-mono">Expected Goals (xG)</span>
                  <span className="font-mono font-bold text-sm block mt-0.5 text-cyan-500">{activePlayer.stats.expectedGoals}</span>
                </div>
                <div className="rounded-xl bg-slate-50/20 p-3 text-center text-xs dark:bg-slate-800/10">
                  <span className="text-slate-400 block font-mono">Card offenses</span>
                  <span className="font-mono text-sm block mt-0.5">
                    🟨 <span className="font-bold mr-2 text-yellow-500">{activePlayer.stats.yellowCards}</span>
                    🟥 <span className="font-bold text-rose-500">{activePlayer.stats.redCards}</span>
                  </span>
                </div>
              </div>

              {/* Progress visual indicators for accuracy/rating */}
              <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500">
                {/* Visual match rating */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-slate-450">Opta Performance Rating Index</span>
                    <span className="font-mono text-indigo-400 font-bold">{activePlayer.stats.rating} / 10</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full" style={{ width: `${activePlayer.stats.rating * 10}%` }} />
                  </div>
                </div>

                {/* Minutes played context */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium font-mono">
                  <span>Minutes Played This Season:</span>
                  <span className="text-slate-800 dark:text-slate-200">{activePlayer.stats.minutesPlayed} mins</span>
                </div>
              </div>
            </div>

            {/* Heat map visual canvas overlay */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-3">
              <h3 className="font-bold text-slate-850 dark:text-white text-sm">Spatial Heatmap Plot</h3>
              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                Indicates primary tactical activity zones on the pitch over the trailing season.
              </p>

              {/* Soccer field boundary map box */}
              <div className="h-48 rounded-xl bg-gradient-to-b from-emerald-950 to-emerald-900 border-2 border-white/20 relative overflow-hidden" id="heatmap-pitch">
                <div className="absolute inset-1 border border-white/10 pointer-events-none" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 h-8 w-8 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                {/* Render hot zone gradient overlay bulbs */}
                {hotSpots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full bg-radial from-red-500 via-yellow-400 to-transparent blur-md"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      width: `${spot.size}px`,
                      height: `${spot.size}px`,
                      opacity: spot.opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}

                <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-wider text-white bg-slate-950/80 px-2 py-0.5 rounded shadow">
                  {activePlayer.position}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
