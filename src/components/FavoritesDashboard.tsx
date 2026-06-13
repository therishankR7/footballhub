import React from 'react';
import { Star, Trophy, Users, User, ArrowRight, Heart, HeartOff } from 'lucide-react';
import { Team, Player, League, FavoriteItems } from '../types';

interface FavoritesDashboardProps {
  favorites: FavoriteItems;
  teams: Record<string, Team>;
  players: Player[];
  leagues: League[];
  onSelectTeam: (teamId: string) => void;
  onSelectPlayer: (playerId: string) => void;
  onSelectLeague: (leagueId: string) => void;
  onToggleFavorite: (type: 'teams' | 'players' | 'competitions', id: string) => void;
}

export default function FavoritesDashboard({
  favorites,
  teams,
  players,
  leagues,
  onSelectTeam,
  onSelectPlayer,
  onSelectLeague,
  onToggleFavorite
}: FavoritesDashboardProps) {

  // Resolve matching lists from IDs
  const favoriteTeamsList = Object.keys(teams)
    .filter(id => favorites.teams.includes(id))
    .map(id => teams[id]);

  const favoritePlayersList = players.filter(p => favorites.players.includes(p.id));

  const favoriteLeaguesList = leagues.filter(l => favorites.competitions.includes(l.id));

  const hasAnyFavorites = favoriteTeamsList.length > 0 || favoritePlayersList.length > 0 || favoriteLeaguesList.length > 0;

  return (
    <div className="space-y-6" id="favorites-dashboard-view">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="h-5.5 w-5.5 text-rose-500 fill-rose-500 z-10 animate-pulse" />
          <span>My Personalized Watchlist</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Instantly monitor pinned teams, players, and match rankings inside your personalized widget.</p>
      </div>

      {!hasAnyFavorites ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center dark:bg-slate-900/40 dark:border-slate-800">
          <Star className="h-8 w-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Your Watchlist is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Toggle the heart icons on team profiles, player details, or competition summary screens to start curating your dream football watchlist!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="favorites-columns-grid">
          
          {/* Favorite Teams Col */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-display font-medium text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <Users className="h-4.5 w-4.5 text-indigo-400" />
              <span>Watched Teams</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-655 px-2.5 py-0.5 rounded-full font-bold ml-auto">{favoriteTeamsList.length}</span>
            </h3>

            {favoriteTeamsList.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No favorited teams pinned</p>
            ) : (
              <div className="flex flex-col gap-2">
                {favoriteTeamsList.map(team => (
                  <div 
                    key={team.id}
                    onClick={() => onSelectTeam(team.id)}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 hover:bg-indigo-50/10 cursor-pointer transition-colors dark:bg-slate-800/15"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{team.logo}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-205">{team.name}</p>
                        <span className="text-[9.5px] text-slate-400 font-medium">{team.leagueName}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite('teams', team.id);
                      }}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title="Unfavorite"
                    >
                      <HeartOff className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Players Col */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-display font-medium text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <User className="h-4.5 w-4.5 text-blue-400" />
              <span>Watched Players</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-655 px-2.5 py-0.5 rounded-full font-bold ml-auto">{favoritePlayersList.length}</span>
            </h3>

            {favoritePlayersList.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No players pinned</p>
            ) : (
              <div className="flex flex-col gap-2">
                {favoritePlayersList.map(player => (
                  <div 
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 hover:bg-indigo-50/10 cursor-pointer transition-colors dark:bg-slate-800/15"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-xs font-bold text-indigo-400 flex items-center justify-center dark:bg-slate-800">
                        {player.photoUrl}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-205 line-clamp-1">{player.name}</p>
                        <span className="text-[9.5px] text-slate-400 font-medium">{player.teamName}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite('players', player.id);
                      }}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title="Unfavorite"
                    >
                      <HeartOff className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Leagues Col */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-850 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-display font-medium text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <Trophy className="h-4.5 w-4.5 text-amber-500" />
              <span>Watched Competitions</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-655 px-2.5 py-0.5 rounded-full font-bold ml-auto">{favoriteLeaguesList.length}</span>
            </h3>

            {favoriteLeaguesList.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No leagues pinned</p>
            ) : (
              <div className="flex flex-col gap-2">
                {favoriteLeaguesList.map(league => (
                  <div 
                    key={league.id}
                    onClick={() => onSelectLeague(league.id)}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 hover:bg-indigo-50/10 cursor-pointer transition-colors dark:bg-slate-800/15"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{league.logo}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-205">{league.name}</p>
                        <span className="text-[9.5px] text-slate-400 font-medium">{league.country}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite('competitions', league.id);
                      }}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title="Unfavorite"
                    >
                      <HeartOff className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
