import React, { useState } from 'react';
import { ALL_APPS_LIST } from '../data/mockData';
import { AppShortcut } from '../types/dex';

interface AppDrawerProps {
  onOpenApp: (appId: string) => void;
  onClose: () => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ onOpenApp, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'samsung' | 'productivity' | 'media' | 'system'>('all');

  const filteredApps = ALL_APPS_LIST.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-start p-6 max-w-5xl mx-auto min-h-[calc(100vh-7rem)] select-none animate-in fade-in zoom-in-95 duration-150">
      {/* Top Search bar */}
      <div className="w-full max-w-md flex items-center gap-2 bg-[#272a31]/80 backdrop-blur-xl border border-[#424654]/40 rounded-full px-4 py-2.5 shadow-xl mb-6">
        <span className="material-symbols-outlined text-[#8d90a0] text-[20px]">search</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search apps, files, and settings..."
          className="bg-transparent text-sm text-[#e0e2ec] placeholder-[#8d90a0] focus:outline-none w-full"
          autoFocus
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-[#8d90a0] hover:text-[#e0e2ec]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-[#191b23]/80 rounded-xl mb-8 border border-[#32353c]/40">
        {(['all', 'samsung', 'productivity', 'media', 'system'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            {cat === 'all' ? 'All Apps' : cat}
          </button>
        ))}
      </div>

      {/* App Grid */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
        {filteredApps.map((app: AppShortcut) => (
          <button
            key={app.id}
            onClick={() => {
              onOpenApp(app.id);
              onClose();
            }}
            className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-[#272a31]/50 active:scale-95 transition-all text-center w-28 cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.iconGradient} flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 group-hover:shadow-[#b2c5ff]/25 transition-all border border-white/5`}
            >
              <span className={`material-symbols-outlined text-[28px] ${app.iconColor || 'text-white'}`}>
                {app.icon}
              </span>
            </div>
            <span className="mt-2 font-headline-sm text-xs text-[#e0e2ec] truncate w-full tracking-tight">
              {app.name}
            </span>
            <span className="text-[10px] text-[#8d90a0] truncate w-full mt-0.5">
              {app.category}
            </span>
          </button>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="py-16 text-center text-[#8d90a0] space-y-2">
          <span className="material-symbols-outlined text-[40px]">apps_outage</span>
          <p className="text-sm">No applications found matching &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
};
