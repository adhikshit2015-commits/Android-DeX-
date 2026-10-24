import React from 'react';
import { NavigationTab } from '../types/dex';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  ramUsage: number;
  maxRam: number;
  onOpenRamCare: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  ramUsage,
  maxRam,
  onOpenRamCare,
  onOpenHelp,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0b0e15]/40 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.15)]">
      <div className="h-14 w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onTabChange('dex-workstation')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#272a31]/60 backdrop-blur-xl cursor-pointer hover:bg-[#32353c]/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[#b2c5ff] text-[18px]">laptop_windows</span>
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] tracking-tight font-semibold">Samsung DeX</span>
          </div>

          <div className="h-4 w-px bg-[#424654]/30"></div>

          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => onTabChange('dex-workstation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'dex-workstation'
                  ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm font-semibold'
                  : 'text-[#c3c6d7] hover:bg-[#272a31] hover:text-[#e0e2ec]'
              }`}
            >
              Workstation
            </button>

            <button
              onClick={() => onTabChange('app-drawer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'app-drawer'
                  ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm font-semibold'
                  : 'text-[#c3c6d7] hover:bg-[#272a31] hover:text-[#e0e2ec]'
              }`}
            >
              All Apps
            </button>

            <button
              onClick={() => onTabChange('dex-labs-settings')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'dex-labs-settings'
                  ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm font-semibold'
                  : 'text-[#c3c6d7] hover:bg-[#272a31] hover:text-[#e0e2ec]'
              }`}
            >
              DeX Labs
            </button>

            <button
              onClick={() => onTabChange('display-multitasking')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'display-multitasking'
                  ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm font-semibold'
                  : 'text-[#c3c6d7] hover:bg-[#272a31] hover:text-[#e0e2ec]'
              }`}
            >
              Display &amp; Snap
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* RAM Gauge */}
          <button
            onClick={onOpenRamCare}
            className="hidden sm:flex items-center gap-1.5 bg-[#272a31]/50 hover:bg-[#272a31] px-3 py-1.5 rounded-full transition-colors cursor-pointer group"
            title="Open Device Care RAM optimization"
          >
            <span className="material-symbols-outlined text-[#b2c5ff] text-[16px] group-hover:rotate-45 transition-transform">
              memory
            </span>
            <span className="font-label-code text-label-code text-[#c3c6d7] group-hover:text-[#e0e2ec]">
              RAM {ramUsage.toFixed(1)}/{maxRam.toFixed(1)} GB
            </span>
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#272a31] text-[#c3c6d7] hover:text-[#e0e2ec] hover:bg-[#32353c] transition-colors"
            title="Samsung DeX Guide &amp; Shortcuts"
          >
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#b2c5ff] flex items-center justify-center hover:ring-2 hover:ring-[#b2c5ff]/50 transition-all cursor-pointer"
            title="Samsung Account Profile"
          >
            <span className="material-symbols-outlined text-[#002b74] text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
