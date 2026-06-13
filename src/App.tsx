import React, { useState, useEffect } from 'react';
import { 
  listMatches, 
  teamsDatabase, 
  allPlayers, 
  listLeagues, 
  defaultSettings, 
  defaultFavorites 
} from './data';
import { FavoriteItems, UserSettings, Match } from './types';

// Importing Custom Views
import Navigation from './components/Navigation';
import HomeDashboard from './components/HomeDashboard';
import MatchDetailsPage from './components/MatchDetailsPage';
import StandingsGrid from './components/StandingsGrid';
import TeamsPage from './components/TeamsPage';
import PlayersPage from './components/PlayersPage';
import FixturesPage from './components/FixturesPage';
import Leaderboards from './components/Leaderboards';
import FavoritesDashboard from './components/FavoritesDashboard';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  // Page states routing
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [activePlayerId, setActivePlayerId] = useState<string | null>('p_haaland');
  const [activeTeamId, setActiveTeamId] = useState<string | null>('mci');
  const [activeLeagueId, setActiveLeagueId] = useState<string>('pl');

  // Search input state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic real-time matches synchronized with local pre-seeded values as fallback
  const [matches, setMatches] = useState<Match[]>(listMatches);
  const [sseConnected, setSseConnected] = useState<boolean>(false);

  // Connect to the server-authoritative live match SSE data pipe
  useEffect(() => {
    let active = true;
    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    function connectSSE() {
      if (!active) return;

      // Close pre-existing stream if any
      if (eventSource) {
        eventSource.close();
      }

      eventSource = new EventSource('/api/live-matches');

      // Initial loading payload
      eventSource.addEventListener('matches', (e: MessageEvent) => {
        try {
          const fresh = JSON.parse(e.data);
          if (Array.isArray(fresh)) {
            setMatches(fresh);
            setSseConnected(true);
          }
        } catch (err) {
          console.error('SSE failed to parse matches:', err);
        }
      });

      // Incremental match state and tick updates
      eventSource.addEventListener('match-update', (e: MessageEvent) => {
        try {
          const updated = JSON.parse(e.data);
          if (Array.isArray(updated)) {
            setMatches(updated);
            setSseConnected(true);
          }
        } catch (err) {
          console.error('SSE failed to parse match-update:', err);
        }
      });

      eventSource.onopen = () => {
        setSseConnected(true);
      };

      eventSource.onerror = () => {
        setSseConnected(false);
        if (eventSource) {
          eventSource.close();
        }
        // Safety self-healing loop
        if (active) {
          reconnectTimeout = setTimeout(connectSSE, 4000);
        }
      };
    }

    connectSSE();

    return () => {
      active = false;
      if (eventSource) eventSource.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  // Favorites state loaded from local storage for offline state
  const [favorites, setFavorites] = useState<FavoriteItems>(() => {
    const saved = localStorage.getItem('footballhub_favorites');
    return saved ? JSON.parse(saved) : defaultFavorites;
  });

  // Settings state loaded from local storage for theme persistence
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('footballhub_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Save favorites to store
  useEffect(() => {
    localStorage.setItem('footballhub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save settings to store
  useEffect(() => {
    localStorage.setItem('footballhub_settings', JSON.stringify(settings));
    
    // Add/remove dark class on the underlying html index body for global tailwind support
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Toggling favorite elements handler
  const handleToggleFavorite = (type: 'teams' | 'players' | 'competitions', id: string) => {
    setFavorites((prev) => {
      const arr = prev[type];
      const isAlreadyFav = arr.includes(id);
      const nextArr = isAlreadyFav ? arr.filter((x) => x !== id) : [...arr, id];
      return {
        ...prev,
        [type]: nextArr,
      };
    });
  };

  // Global callback for autocomplete clicks inside nav query
  const handleSearchSelect = (type: 'team' | 'player' | 'league', id: string) => {
    if (type === 'team') {
      setActiveTeamId(id);
      setActiveTab('teams');
    } else if (type === 'player') {
      setActivePlayerId(id);
      setActiveTab('players');
    } else if (type === 'league') {
      setActiveLeagueId(id);
      setActiveTab('standings');
    }
    setActiveMatchId(null); // clear overlay if present
  };

  // Custom navigation state jumpers
  const handleSelectPlayer = (playerId: string) => {
    setActivePlayerId(playerId);
    setActiveTab('players');
    setActiveMatchId(null);
  };

  const handleSelectTeam = (teamId: string) => {
    setActiveTeamId(teamId);
    setActiveTab('teams');
    setActiveMatchId(null);
  };

  const handleSelectLeague = (leagueId: string) => {
    setActiveLeagueId(leagueId);
    setActiveTab('standings');
    setActiveMatchId(null);
  };

  const currentMatchModel = activeMatchId ? matches.find(m => m.id === activeMatchId) : null;

  // Primary active view content selector
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeDashboard
            matches={matches}
            onSelectMatch={setActiveMatchId}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'live':
        return (
          <HomeDashboard
            matches={matches.filter(m => m.status === 'live')}
            onSelectMatch={setActiveMatchId}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'fixtures':
        return (
          <FixturesPage
            matches={matches}
            onSelectMatch={setActiveMatchId}
          />
        );

      case 'competitions':
      case 'standings':
        return (
          <StandingsGrid
            leagues={listLeagues}
            matches={matches}
            onSelectTeam={handleSelectTeam}
            onSelectMatch={setActiveMatchId}
            activeLeagueId={activeLeagueId}
            setActiveLeagueId={setActiveLeagueId}
          />
        );

      case 'teams':
        return (
          <TeamsPage
            teams={teamsDatabase}
            onSelectPlayer={handleSelectPlayer}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'players':
        return (
          <PlayersPage
            players={allPlayers}
            onSelectTeam={handleSelectTeam}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'statistics':
        return (
          <Leaderboards
            players={allPlayers}
            onSelectPlayer={handleSelectPlayer}
          />
        );

      case 'favorites':
        return (
          <FavoritesDashboard
            favorites={favorites}
            teams={teamsDatabase}
            players={allPlayers}
            leagues={listLeagues}
            onSelectTeam={handleSelectTeam}
            onSelectPlayer={handleSelectPlayer}
            onSelectLeague={handleSelectLeague}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'settings':
        return (
          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            matches={matches}
            sseConnected={sseConnected}
          />
        );

      default:
        return (
          <p className="text-center py-10 uppercase text-xs font-mono text-gray-400">
            View under construction
          </p>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-slate-200 ${settings.theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Top and sidebar navigators */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveMatchId(null); // Return out of details overlay when switching tabs
        }}
        settings={settings}
        setSettings={setSettings}
        onSearchSelect={handleSearchSelect}
        favorites={favorites}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sseConnected={sseConnected}
      />

      {/* Main Body Layout content container */}
      <main className="md:pl-64 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 space-y-6">
          
          {/* Main conditional overlay render if user is checking match details */}
          {activeMatchId && currentMatchModel ? (
            <MatchDetailsPage
              match={currentMatchModel}
              onBack={() => setActiveMatchId(null)}
              onSelectPlayer={handleSelectPlayer}
              onSelectTeam={handleSelectTeam}
            />
          ) : (
            // Tabs views
            renderTabContent()
          )}

        </div>
      </main>

    </div>
  );
}
