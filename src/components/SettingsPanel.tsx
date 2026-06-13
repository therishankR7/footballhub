import React from 'react';
import { 
  Settings, Sun, Moon, Sparkles, Bell, Shield, 
  Activity, Play, Pause, RefreshCw, Zap, AlertTriangle 
} from 'lucide-react';
import { UserSettings, Match } from '../types';

interface SettingsPanelProps {
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  matches: Match[];
  sseConnected: boolean;
}

export default function SettingsPanel({
  settings,
  setSettings,
  matches,
  sseConnected
}: SettingsPanelProps) {
  
  // Interactive Simulation states
  const [selectedMatchId, setSelectedMatchId] = React.useState<string>(matches[0]?.id || 'm1_live');
  const [eventType, setEventType] = React.useState<'goal' | 'yellow' | 'red' | 'sub'>('goal');
  const [team, setTeam] = React.useState<'home' | 'away'>('home');
  const [playerName, setPlayerName] = React.useState<string>('');
  const [secondaryName, setSecondaryName] = React.useState<string>('');
  const [customDetail, setCustomDetail] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [statusMessage, setStatusMessage] = React.useState<{ text: string, error?: boolean } | null>(null);

  // Global background clocks simulator state
  const [simEnabled, setSimEnabled] = React.useState<boolean>(true);
  const [simInterval, setSimInterval] = React.useState<number>(12000);

  // Handlers
  const handleToggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const handleAccentChange = (color: UserSettings['accentColor']) => {
    setSettings(prev => ({ ...prev, accentColor: color }));
  };

  const handleNotificationToggle = (key: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  // Handler for custom active incident injections
  const handleInjectEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const activeMatch = matches.find(m => m.id === selectedMatchId);
    if (!activeMatch) {
      setStatusMessage({ text: 'Please select a valid match fixture first.', error: true });
      setSubmitting(false);
      return;
    }

    const isHome = team === 'home';
    const actingName = isHome ? activeMatch.homeTeam.name : activeMatch.awayTeam.name;

    let defaultMsg = '';
    if (eventType === 'goal') {
      defaultMsg = `GOAL!!! Extraordinary push-button score for ${actingName}! ${playerName || 'Squad Member'} converts gracefully!`;
    } else if (eventType === 'yellow') {
      defaultMsg = `Yellow Card! Match official cautions ${playerName || 'Player'} (${actingName}) after checking VAR footage.`;
    } else if (eventType === 'red') {
      defaultMsg = `RED CARD!!! ${playerName || 'Player'} (${actingName}) receives an immediate dismissal following a risky collision!`;
    } else if (eventType === 'sub') {
      defaultMsg = `Substitution for ${actingName}: ${playerName || 'Fresh Legs'} replaces ${secondaryName || 'Starter'}.`;
    }

    try {
      const response = await fetch('/api/simulate-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: selectedMatchId,
          type: eventType,
          team,
          playerName: playerName || (eventType === 'goal' ? 'Luka Modrić' : 'Rúben Dias'),
          secondaryName: secondaryName || (eventType === 'sub' ? 'Kevin De Bruyne' : undefined),
          detail: customDetail || defaultMsg
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatusMessage({ text: 'Telemetry Event successfully injected & broadcasted via SSE!' });
        setPlayerName('');
        setSecondaryName('');
        setCustomDetail('');
      } else {
        setStatusMessage({ text: `Failed to inject: ${data.error || 'Server error'}`, error: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Failed to dispatch: check API server logs.', error: true });
    } finally {
      setSubmitting(false);
    }
  };

  // Full in-memory restart back to kick-off
  const handleResetSimulator = async () => {
    setSubmitting(true);
    setStatusMessage(null);
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setStatusMessage({ text: 'All live and final scores reset to raw baselines!' });
      } else {
        setStatusMessage({ text: 'Failed to reset.', error: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Network lost while resetting authoritative engines.', error: true });
    } finally {
      setSubmitting(false);
    }
  };

  // Simulated clocks interval updating
  const handleSimSpeedChange = async (enabled: boolean, interval: number) => {
    setSimEnabled(enabled);
    setSimInterval(interval);
    try {
      await fetch('/api/simulation-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled, interval })
      });
    } catch (e) {
      console.error('Failed to save simulation settings:', e);
    }
  };

  const accentColorsList: { id: UserSettings['accentColor']; label: string; class: string }[] = [
    { id: 'emerald', label: 'Emerald Green', class: 'bg-emerald-500' },
    { id: 'rose', label: 'Coral Rose', class: 'bg-rose-500' },
    { id: 'blue', label: 'Electric Blue', class: 'bg-blue-500' },
    { id: 'violet', label: 'Deep Violet', class: 'bg-violet-500' },
    { id: 'amber', label: 'Cyber Gold', class: 'bg-amber-400' },
  ];

  return (
    <div className="space-y-6" id="settings-panel-view">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-5.5 w-5.5 text-slate-500" />
          <span>Hub Control and Incident Simulator</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-450">Manage local layout components, toggle dynamic sound levels, or inject manual match incidents inside real-time SSE lanes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main controls column */}
        <div className="md:col-span-2 space-y-6">

          {/* REAL-TIME EVENT SIMULATOR COCKPIT CARD */}
          <div className="rounded-2xl border border-slate-150 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex gap-2.5 items-center">
                <div className="h-9 w-9 rounded-xl bg-indigo-550/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-indigo-550 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Authoritative SSE Incident Injector</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Push custom goals, bookings, and lineups swaps straight onto the live dashboard</p>
                </div>
              </div>
              <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                sseConnected 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-550 border border-rose-500/20'
              }`}>
                {sseConnected ? 'Link Online' : 'Syncing...'}
              </span>
            </div>

            {/* Simulated feedback notification banner */}
            {statusMessage && (
              <div className={`p-3 text-xs rounded-xl border flex gap-2 items-center tracking-tight ${
                statusMessage.error 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-550' 
                  : 'bg-emerald-500/5 border-emerald-500/15 text-emerald-500'
              }`}>
                {statusMessage.error ? <AlertTriangle className="h-4.5 w-4.5 text-rose-500 shrink-0" /> : <Zap className="h-4.5 w-4.5 text-emerald-550 shrink-0" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Inject Event Form */}
            <form onSubmit={handleInjectEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Target Match Frame</label>
                  <select
                    value={selectedMatchId}
                    onChange={(e) => setSelectedMatchId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 bg-white text-xs outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                  >
                    {matches.map(m => (
                      <option key={m.id} value={m.id}>
                        [{m.leagueName}] {m.homeTeam.name} vs {m.awayTeam.name} ({m.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Incident Action Category</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 bg-white text-xs outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                  >
                    <option value="goal">Goal Scored! (Increments Scoreboard)</option>
                    <option value="yellow">Yellow Booking (Appends Card)</option>
                    <option value="red">RED Card Outbreak (Direct Dismissal)</option>
                    <option value="sub">Team Substitution (Swaps Lineup)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 font-mono">Acting Team</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTeam('home')}
                      className={`flex-1 py-2.5 rounded-xl border font-bold cursor-pointer transition-all ${
                        team === 'home'
                          ? 'bg-slate-900 border-slate-900 text-white dark:bg-indigo-600/15 dark:border-indigo-500/40 dark:text-indigo-400'
                          : 'bg-transparent border-slate-150 text-slate-400 hover:bg-slate-50/50 dark:border-slate-800'
                      }`}
                    >
                      Home Squad
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeam('away')}
                      className={`flex-1 py-2.5 rounded-xl border font-bold cursor-pointer transition-all ${
                        team === 'away'
                          ? 'bg-slate-900 border-slate-900 text-white dark:bg-indigo-600/15 dark:border-indigo-500/40 dark:text-indigo-400'
                          : 'bg-transparent border-slate-150 text-slate-400 hover:bg-slate-50/50 dark:border-slate-800'
                      }`}
                    >
                      Away Squad
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                    {eventType === 'sub' ? 'Player Entering (Substitute In)' : 'Target Athlete Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      eventType === 'goal' ? 'e.g. Phil Foden' :
                      eventType === 'yellow' ? 'e.g. Antonio Rüdiger' :
                      eventType === 'red' ? 'e.g. William Saliba' : 'e.g. Luka Modrić'
                    }
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 bg-white outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {eventType === 'sub' && (
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Player Leaving (Substitute Out)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kevin De Bruyne"
                    value={secondaryName}
                    onChange={(e) => setSecondaryName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 bg-white outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Custom Live Play-by-Play Commentary Detail (Optional)</label>
                <textarea
                  placeholder="Insert custom commentary sentence. Leaving empty auto-generates professional Opta-style transcripts."
                  rows={2}
                  value={customDetail}
                  onChange={(e) => setCustomDetail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-2 px-3 bg-white outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-xl shadow-xs transition-colors cursor-pointer flex gap-1.5 items-center justify-center disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                <span>Inject Immediate Real-Time Event</span>
              </button>
            </form>

            {/* BACKGROUND SIMULATOR CONSOLE OPTIONS */}
            <div className="border-t border-slate-150 pt-4.5 dark:border-slate-800 space-y-4">
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Autorun Simulation Engines</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Let matches simulate regular minutes, score counters, and event triggers automatically over SSE back-lanes.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                
                {/* Active Toggle Switch */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleSimSpeedChange(!simEnabled, simInterval)}
                    className={`flex-1 sm:px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      simEnabled
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25 shadow-xs'
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/25 shadow-xs'
                    }`}
                  >
                    {simEnabled ? <Play className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" /> : <Pause className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />}
                    <span>{simEnabled ? 'Sim Clocks Running' : 'Sim Clocks Paused'}</span>
                  </button>
                </div>

                {/* Simulated Ticks Rate Choices */}
                <div className="flex gap-1.5 w-full sm:w-auto flex-1 justify-between bg-slate-50 border border-slate-150 dark:bg-slate-900/60 dark:border-slate-850 p-1 rounded-xl">
                  <button
                    onClick={() => handleSimSpeedChange(simEnabled, 5000)}
                    className={`flex-1 py-1 px-2.5 font-bold rounded-lg text-[10px] transition-all cursor-pointer text-center ${
                      simInterval === 5000 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-200'
                    }`}
                  >
                    ⚡ Fast (5s)
                  </button>
                  <button
                    onClick={() => handleSimSpeedChange(simEnabled, 12000)}
                    className={`flex-1 py-1 px-2.5 font-bold rounded-lg text-[10px] transition-all cursor-pointer text-center ${
                      simInterval === 12000 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-200'
                    }`}
                  >
                    🟢 Normal (12s)
                  </button>
                  <button
                    onClick={() => handleSimSpeedChange(simEnabled, 30000)}
                    className={`flex-1 py-1 px-2.5 font-bold rounded-lg text-[10px] transition-all cursor-pointer text-center ${
                      simInterval === 30000 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-200'
                    }`}
                  >
                    💤 Slow (30s)
                  </button>
                </div>

                {/* Reset Authorization Engine and restore scoreboard */}
                <button
                  type="button"
                  onClick={handleResetSimulator}
                  disabled={submitting}
                  className="w-full sm:w-auto px-4.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
                  title="Reset scoreboards back to kickoff minutes and delete manual logs"
                >
                  <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${submitting ? 'animate-spin' : ''}`} />
                  <span>Reset Scores</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* 1. Theme Configuration */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-extrabold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Sun className="h-4.5 w-4.5 text-amber-500" />
              <span>Visual Mode Style Choice</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border font-bold cursor-pointer transition-all ${
                  settings.theme === 'light'
                    ? 'bg-slate-100 border-slate-900 text-slate-900 shadow-xs'
                    : 'bg-transparent border-slate-150 text-slate-400 hover:bg-slate-50/50 dark:border-slate-800'
                }`}
              >
                <Sun className="h-4.5 w-4.5 text-amber-500" />
                <span>Light Clean Theme</span>
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border font-bold cursor-pointer transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-slate-850 border-indigo-550 text-indigo-400 shadow-sm'
                    : 'bg-transparent border-slate-150 text-slate-400 hover:bg-slate-50/50 dark:border-slate-800'
                }`}
              >
                <Moon className="h-4.5 w-4.5 text-indigo-450" />
                <span>Midnight Dark Theme</span>
              </button>
            </div>
          </div>

          {/* 2. Accent Color Choice */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-extrabold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-450" />
              <span>Theme Accent Color Spectrum</span>
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {accentColorsList.map((color) => {
                const isSelected = settings.accentColor === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => handleAccentChange(color.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-500/30'
                        : 'bg-transparent border-slate-150 text-slate-750 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <span className={`h-3.5 w-3.5 rounded-full ${color.id === 'violet' ? 'bg-indigo-450' : color.class}`} />
                    <span>{color.id === 'violet' ? 'Indigo Blue' : color.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Notification triggers */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-extrabold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-rose-500" />
              <span>Live Notification Transmitters</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-850 dark:text-slate-200">Goal Scored Alerts</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Push sound alert when goals successfully scored.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.goals}
                  onChange={() => handleNotificationToggle('goals')}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-550"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 dark:border-slate-800 pt-3.5">
                <div>
                  <p className="font-semibold text-slate-850 dark:text-slate-200">Match Kickoff Banner</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Flash reminder 5 minutes before game commences.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.matchStart}
                  onChange={() => handleNotificationToggle('matchStart')}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-550"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 dark:border-slate-800 pt-3.5">
                <div>
                  <p className="font-semibold text-slate-850 dark:text-slate-200">Red Card Outbreak</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Immediate push notification when red cards given.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.redCards}
                  onChange={() => handleNotificationToggle('redCards')}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-550"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Informative regional settings sidebar info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
            <h3 className="font-display font-medium text-slate-850 dark:text-white text-sm">Timezone & Language Options</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5">Primary Watch Timezone</label>
                <select
                  value={settings.timeZone}
                  onChange={(e) => setSettings(prev => ({ ...prev, timeZone: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 bg-white text-xs outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                >
                  <option value="Europe/London (GMT+1)">London (GMT+1)</option>
                  <option value="Europe/Paris (CET)">Paris (CET)</option>
                  <option value="America/New_York (EST)">New York (EST)</option>
                  <option value="Asia/Tokyo (JST)">Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5">Default Feed Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full rounded-xl border text-slate-300 border-slate-200 py-2.5 px-3 bg-white text-xs outline-hidden dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                >
                  <option value="English">English (United Kingdom)</option>
                  <option value="Spanish">Español (La Liga Edition)</option>
                  <option value="German">Deutsch (Bundesliga Edition)</option>
                  <option value="Italian">Italiano (Serie A Edition)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-600/10 border border-indigo-500/20 p-5 text-xs text-indigo-400 space-y-2">
            <p className="font-bold flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Privacy Shield Active
            </p>
            <p className="leading-relaxed">
              Settings and configurations are persisted locally in client-side secure store, fully private to you.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
