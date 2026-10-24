import React, { useState, useEffect } from 'react';
import { WindowState } from '../types/dex';

interface TaskbarProps {
  windows: Record<string, WindowState>;
  onToggleWindow: (id: string) => void;
  onOpenAppDrawer: () => void;
  onOpenUniversalSearch: () => void;
  onOpenRecentApps: () => void;
  onMinimizeAll: () => void;
  onToggleQuickSettings: () => void;
  onToggleCalendar: () => void;
  onTriggerScreenshot: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onToggleWindow,
  onOpenAppDrawer,
  onOpenUniversalSearch,
  onOpenRecentApps,
  onMinimizeAll,
  onToggleQuickSettings,
  onToggleCalendar,
  onTriggerScreenshot,
}) => {
  const [timeStr, setTimeStr] = useState('12:45 PM');
  const [dateStr, setDateStr] = useState('Thu, Oct 24');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTimeStr(`${hours}:${minutes} ${ampm}`);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const dockApps = [
    {
      id: 'internet',
      icon: 'public',
      color: 'text-[#4cd6ff]',
      indicatorColor: 'bg-[#4cd6ff]',
      name: 'Samsung Internet',
    },
    {
      id: 'files',
      icon: 'folder',
      color: 'text-[#dae2ff]',
      indicatorColor: 'bg-[#b2c5ff]',
      name: 'My Files',
    },
    {
      id: 'notes',
      icon: 'edit_note',
      color: 'text-[#cbbeff]',
      indicatorColor: 'bg-[#cbbeff]',
      name: 'Samsung Notes',
    },
    {
      id: 'gallery',
      icon: 'photo_library',
      color: 'text-[#b2c5ff]',
      indicatorColor: 'bg-[#b2c5ff]',
      name: 'Gallery',
    },
    {
      id: 'dexlabs',
      icon: 'settings',
      color: 'text-[#c3c6d7]',
      indicatorColor: 'bg-[#8d90a0]',
      name: 'DeX Settings',
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-[#0b0e15]/80 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.45)] border-t border-[#424654]/20 select-none">
      <div className="w-full h-full px-2 sm:px-4 flex items-center justify-between">
        {/* Left: Apps, Nav Buttons, Universal Search */}
        <div className="flex items-center gap-1.5">
          {/* App Drawer Launcher */}
          <button
            onClick={onOpenAppDrawer}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#272a31]/40 hover:bg-[#2c6bed] hover:text-[#fbf9ff] text-[#e0e2ec] transition-all active:scale-95 cursor-pointer shadow-sm"
            title="App Drawer (All Apps)"
          >
            <span className="material-symbols-outlined text-[20px]">apps</span>
          </button>

          {/* Android Navigation Trio */}
          <div className="flex items-center gap-0.5 bg-[#272a31]/30 rounded-xl px-1 py-0.5 border border-[#424654]/10">
            <button
              onClick={onOpenRecentApps}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#272a31] transition-colors"
              title="Recent Apps (Task Switcher)"
            >
              <span className="material-symbols-outlined text-[18px]">view_sidebar</span>
            </button>
            <button
              onClick={onMinimizeAll}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#272a31] transition-colors"
              title="Home (Minimize all to Desktop)"
            >
              <span className="material-symbols-outlined text-[18px]">circle</span>
            </button>
            <button
              onClick={() => window.history.back?.()}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#272a31] transition-colors"
              title="Back"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
            </button>
          </div>

          {/* Universal Search */}
          <button
            onClick={onOpenUniversalSearch}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#272a31] transition-colors cursor-pointer"
            title="Universal Finder Search"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
        </div>

        {/* Center: Running / Pinned Dock Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {dockApps.map((app) => {
            const w = windows[app.id];
            const isOpen = w && w.isOpen;
            const isMin = w && w.isMinimized;
            const isFront = isOpen && !isMin;

            return (
              <button
                key={app.id}
                onClick={() => onToggleWindow(app.id)}
                className={`relative group flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all cursor-pointer ${
                  isFront
                    ? 'bg-[#272a31]/80 shadow-md'
                    : 'hover:bg-[#272a31]/50'
                }`}
                title={app.name}
              >
                <span className={`material-symbols-outlined text-[22px] ${app.color}`}>
                  {app.icon}
                </span>

                {/* Status Indicator Pill */}
                {isOpen && (
                  <span
                    className={`absolute bottom-1 rounded-full transition-all duration-200 ${
                      isFront
                        ? `w-3.5 h-0.5 ${app.indicatorColor} shadow-[0_0_8px_currentColor]`
                        : 'w-1 h-0.5 bg-[#8d90a0]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Capture, System Tray, Time/Date */}
        <div className="flex items-center gap-1.5">
          {/* Quick Capture / Screenshot */}
          <button
            onClick={onTriggerScreenshot}
            className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#272a31] transition-colors cursor-pointer"
            title="Quick Screen Capture"
          >
            <span className="material-symbols-outlined text-[18px]">screenshot_region</span>
          </button>

          {/* System Status Cluster (Volume, WiFi, Battery) */}
          <div
            onClick={onToggleQuickSettings}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#272a31]/40 hover:bg-[#272a31] transition-colors cursor-pointer border border-[#424654]/10"
            title="Open Quick Settings &amp; Notifications"
          >
            <span className="material-symbols-outlined text-[16px] text-[#c3c6d7]">volume_up</span>
            <span className="material-symbols-outlined text-[16px] text-[#4cd6ff]">wifi</span>
            <span className="material-symbols-outlined text-[16px] text-[#c3c6d7]">signal_cellular_alt</span>
            <div className="flex items-center gap-0.5 text-[#e0e2ec] font-label-code text-label-code">
              <span className="material-symbols-outlined text-[16px] text-[#b2c5ff]">
                battery_charging_80
              </span>
              <span>84%</span>
            </div>
          </div>

          {/* Date & Time Capsule */}
          <div
            onClick={onToggleCalendar}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl hover:bg-[#272a31] transition-colors cursor-pointer"
            title="Open Calendar &amp; Time"
          >
            <div className="text-right">
              <div className="font-label-tray text-label-tray text-[#e0e2ec] font-medium leading-none">
                {timeStr}
              </div>
              <div className="font-body-sm text-[10px] text-[#c3c6d7] leading-none mt-0.5">
                {dateStr}
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#c3c6d7]">expand_less</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
