import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, Activity, Calendar, Trophy, Users, User, 
  BarChart3, Star, Settings, Search, Bell, Sun, Moon, 
  Menu, X, AlertCircle, Trash2, Heart
} from 'lucide-react';
import { FavoriteItems, UserSettings } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  onSearchSelect: (type: 'team' | 'player' | 'league', id: string) => void;
  favorites: FavoriteItems;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sseConnected: boolean;
}

// Map for tab labels to icons
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'live', label: 'Live Matches', icon: Activity },
  { id: 'fixtures', label: 'Fixtures', icon: Calendar },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'players', label: 'Players', icon: User },
  { id: 'standings', label: 'Standings', icon: BarChart3 },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Navigation({
  activeTab,
  setActiveTab,
  settings,
  setSettings,
  onSearchSelect,
  favorites,
  searchQuery,
  setSearchQuery,
  sseConnected
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock list of global system notifications
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Match Started', message: 'Man City vs Real Madrid is now LIVE!', time: '14:00', read: false },
    { id: '2', title: 'GOAL scored!', message: 'Kylian Mbappé scored! MCI 0 - [1] RMA', time: '14:15', read: false },
    { id: '3', title: 'Yellow Card', message: 'Antonio Rüdiger booked (Real Madrid)', time: '14:28', read: true },
  ]);

  const activeNotificationsCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Mock Autocomplete database
  const autocompleteList = [
    { type: 'team' as const, id: 'mci', name: 'Manchester City', info: 'Premier League', icon: '🔵' },
    { type: 'team' as const, id: 'rma', name: 'Real Madrid', info: 'La Liga', icon: '👑' },
    { type: 'team' as const, id: 'ars', name: 'Arsenal', info: 'Premier League', icon: '🔴' },
    { type: 'team' as const, id: 'fcb', name: 'FC Barcelona', info: 'La Liga', icon: '🔵🔴' },
    { type: 'team' as const, id: 'bay', name: 'Bayern Munich', info: 'Bundesliga', icon: '🔴⚽' },
    { type: 'team' as const, id: 'int', name: 'Inter Milan', info: 'Serie A', icon: '🔵⚫' },
    { type: 'player' as const, id: 'p_haaland', name: 'Erling Haaland', info: 'Manchester City', icon: '⚽' },
    { type: 'player' as const, id: 'p_mbappe', name: 'Kylian Mbappé', info: 'Real Madrid', icon: '⚽' },
    { type: 'player' as const, id: 'p_vini', name: 'Vinícius Júnior', info: 'Real Madrid', icon: '⚽' },
    { type: 'player' as const, id: 'p_bellingham', name: 'Jude Bellingham', info: 'Real Madrid', icon: '⚽' },
    { type: 'player' as const, id: 'p_kane', name: 'Harry Kane', info: 'Bayern Munich', icon: '⚽' },
    { type: 'league' as const, id: 'pl', name: 'Premier League', info: 'England', icon: '🦁' },
    { type: 'league' as const, id: 'laliga', name: 'La Liga', info: 'Spain', icon: '🏆' },
    { type: 'league' as const, id: 'ucl', name: 'UEFA Champions League', info: 'Europe', icon: '🏆' },
  ];

  const filteredSearch = searchQuery
    ? autocompleteList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.info.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (item: typeof autocompleteList[0]) => {
    onSearchSelect(item.type, item.id);
    setSearchQuery('');
    setSearchFocused(false);
  };

  // Handle click outside of search dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const accentColorClasses = {
    rose: 'text-rose-500 bg-rose-500',
    emerald: 'text-emerald-500 bg-emerald-500',
    blue: 'text-blue-500 bg-blue-500',
    violet: 'text-violet-500 bg-violet-500',
    amber: 'text-amber-500 bg-amber-500',
  };

  const activeAccent = settings.accentColor;

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-slate-600 dark:text-slate-300" /> : <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />}
          </button>

          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex cursor-pointer items-center gap-2 select-none"
            id="nav-brand-logo"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md ${
              activeAccent === 'rose' ? 'bg-rose-600 shadow-rose-500/20' :
              activeAccent === 'emerald' ? 'bg-emerald-600 shadow-emerald-500/20' :
              activeAccent === 'blue' ? 'bg-blue-600 shadow-blue-500/20' :
              activeAccent === 'violet' ? 'bg-indigo-600 shadow-indigo-500/20' :
              'bg-amber-600 shadow-amber-500/20'
            }`}>
              <Trophy className="h-5 w-5" />
            </div>
            <span className="text-xl font-display font-medium tracking-tight text-slate-900 dark:text-white">
              Football<span className={
                activeAccent === 'rose' ? 'text-rose-500' :
                activeAccent === 'emerald' ? 'text-emerald-500' :
                activeAccent === 'blue' ? 'text-blue-500' :
                activeAccent === 'violet' ? 'text-indigo-400' :
                'text-amber-500'
              }>Hub</span>
            </span>
          </div>
        </div>

        {/* Live connected badge */}
        <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg border transition-all ${
          sseConnected 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-500 animate-pulse'
        }`}>
          <span className="relative flex h-2 w-2">
            {sseConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${sseConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-tight">
            {sseConnected ? 'Live API Connected' : 'Syncing Live Engine...'}
          </span>
        </div>

        {/* Global Search and Tools */}
        <div className="flex items-center gap-4">
          {/* Autocomplete Search Bar */}
          <div ref={searchRef} className="relative hidden w-64 sm:block md:w-80" id="global-search-container">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams, players, leagues..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 outline-hidden transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-gray-900"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                id="search-input-field"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute top-2.5 right-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {searchFocused && (searchQuery.length > 0 || filteredSearch.length > 0) && (
              <div className="absolute top-12 left-0 z-50 w-full rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-950">
                {filteredSearch.length === 0 ? (
                  <p className="py-4 text-center text-xs text-gray-500">No suggestions match "{searchQuery}"</p>
                ) : (
                  <div className="flex flex-col gap-1">
                    <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Search Results
                    </p>
                    {filteredSearch.map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => handleSearchItemClick(item)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.info} • {item.type}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }))}
            className="rounded-full p-2.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            title="Toggle theme"
            id="theme-toggler"
          >
            {settings.theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title="Notifications"
              id="notifications-bell-btn"
            >
              <Bell className="h-5 w-5" />
              {activeNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  {activeNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div 
                className="absolute top-12 right-0 z-50 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
                id="notifications-panel-dropdown"
              >
                <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Live Match Alerts</h3>
                  <button 
                    onClick={markAllRead} 
                    className="text-xs text-emerald-500 hover:underline font-medium"
                  >
                    Clear New
                  </button>
                </div>
                
                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-xs text-gray-500">No recent alerts</p>
                ) : (
                  <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`group relative rounded-xl p-2.5 transition-colors ${n.read ? 'bg-transparent' : 'bg-emerald-50/50 dark:bg-emerald-950/20'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5"><AlertCircle className="h-3.5 w-3.5 text-emerald-500" /></span>
                            <div>
                              <p className="text-xs font-semibold text-gray-900 dark:text-white">{n.title}</p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
                              <span className="text-[9px] font-mono text-gray-400 mt-1 block">{n.time}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => clearNotification(n.id)}
                            className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile avatar */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4 dark:border-gray-800" id="user-profile-badge">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              FC
            </div>
            <div className="hidden text-left xl:block">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Fan Club</p>
              <p className="text-[10px] text-gray-400">Pro Analyst</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main navigation layouts - Sidebar on Desktop */}
      <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex">
        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-250 group relative ${
                  isActive
                    ? (activeAccent === 'rose' ? 'bg-rose-600/10 text-rose-400 border border-rose-500/20 shadow-xs' :
                       activeAccent === 'emerald' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-xs' :
                       activeAccent === 'blue' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-xs' :
                       activeAccent === 'violet' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-xs' :
                       'bg-amber-600/10 text-amber-400 border border-amber-500/20 shadow-xs')
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white border border-transparent'
                }`}
                id={`sidebar-item-${item.id}`}
              >
                <Icon className={`h-4.5 w-4.5 transition-transform group-hover:scale-105 ${
                  isActive 
                    ? (activeAccent === 'rose' ? 'text-rose-400' :
                       activeAccent === 'emerald' ? 'text-emerald-400' :
                       activeAccent === 'blue' ? 'text-blue-400' :
                       activeAccent === 'violet' ? 'text-indigo-400' :
                       'text-amber-400')
                    : 'text-slate-400 group-hover:text-slate-200'
                }`} />
                <span>{item.label}</span>
                {item.id === 'favorites' && (favorites.teams.length + favorites.players.length + favorites.competitions.length > 0) && (
                  <span className={`ml-auto flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                    isActive 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' 
                      : 'bg-rose-500 text-white'
                  }`}>
                    {favorites.teams.length + favorites.players.length + favorites.competitions.length}
                  </span>
                )}
                {item.id === 'live' && (
                  <span className="ml-auto inline-flex h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick footer with system credits */}
        <div className="mt-8 border-t border-slate-150 pt-4 dark:border-slate-800">
          <div className="rounded-xl bg-indigo-600/10 border border-indigo-500/20 p-3 text-xs text-indigo-400">
            <span className="font-bold block mb-1">PRO Analytics enabled</span>
            Custom stats visualization, heatmaps, live comment feeds.
          </div>
        </div>
      </aside>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-drawer-overlay">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white p-5 dark:bg-gray-950">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">FootballHub Mobile</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile search bar */}
            <div className="relative mb-5">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-xl border border-gray-100 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search-mobile-bar"
              />
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
