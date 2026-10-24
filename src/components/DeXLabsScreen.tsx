import React, { useState } from 'react';

interface DeXLabsScreenProps {
  onBackToWorkstation: () => void;
}

export const DeXLabsScreen: React.FC<DeXLabsScreenProps> = ({ onBackToWorkstation }) => {
  const [forceMultiWindow, setForceMultiWindow] = useState(true);
  const [autoHideTaskbar, setAutoHideTaskbar] = useState(false);
  const [zramSize, setZramSize] = useState<'1.5G' | '2.0G' | '3.0G'>('1.5G');
  const [cpuGovernor, setCpuGovernor] = useState<'schedutil' | 'performance'>('schedutil');
  const [pointerSpeed, setPointerSpeed] = useState(65);
  const [refreshRate, setRefreshRate] = useState<'60' | '90'>('60');
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleApply = () => {
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-start p-6 max-w-4xl mx-auto min-h-[calc(100vh-7rem)] select-none animate-in fade-in zoom-in-95 duration-150">
      {/* Title */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#32353c]/40 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#32353c] flex items-center justify-center text-[#b2c5ff]">
            <span className="material-symbols-outlined text-[24px]">science</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-xl text-[#e0e2ec] font-bold">
              Samsung DeX Labs
            </h1>
            <p className="text-xs text-[#c3c6d7]">
              Experimental features and Snapdragon 662 workstation kernel optimizations.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToWorkstation}
          className="px-3.5 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-xs font-medium text-[#e0e2ec] transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
          Return to Desktop
        </button>
      </div>

      {/* Grid of Settings */}
      <div className="w-full space-y-4">
        {/* Card 1: Multi-Window Behavior */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-[#e0e2ec] block">
                Multi-window for all apps
              </span>
              <span className="text-xs text-[#c3c6d7]">
                Force apps that don&apos;t officially support multi-window to open in freeform resizable windows.
              </span>
            </div>
            <button
              onClick={() => setForceMultiWindow(!forceMultiWindow)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                forceMultiWindow ? 'bg-[#2c6bed]' : 'bg-[#32353c]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  forceMultiWindow ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-[#32353c]/40 my-2"></div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-[#e0e2ec] block">
                Auto-hide taskbar in fullscreen
              </span>
              <span className="text-xs text-[#c3c6d7]">
                Gain maximum vertical canvas area when running maximized workstation windows.
              </span>
            </div>
            <button
              onClick={() => setAutoHideTaskbar(!autoHideTaskbar)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                autoHideTaskbar ? 'bg-[#2c6bed]' : 'bg-[#32353c]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  autoHideTaskbar ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Card 2: Memory & Hardware Swap Partition */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-4">
          <div>
            <span className="font-semibold text-sm text-[#e0e2ec] block flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd6ff] text-[18px]">memory</span>
              Qualcomm Snapdragon 662 Memory &amp; Swap Governor
            </span>
            <span className="text-xs text-[#c3c6d7]">
              Configure RAM Plus / ZRAM swap partition to prevent out-of-memory app kills.
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['1.5G', '2.0G', '3.0G'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setZramSize(size)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  zramSize === size
                    ? 'border-[#2c6bed] bg-[#2c6bed]/20 text-[#dae2ff]'
                    : 'border-[#424654]/30 bg-[#272a31]/40 text-[#c3c6d7] hover:bg-[#272a31]'
                }`}
              >
                <div className="font-bold text-sm text-[#e0e2ec]">+{size} ZRAM</div>
                <div className="text-[10px] text-[#8d90a0] mt-0.5">
                  {size === '1.5G'
                    ? 'Default Balanced'
                    : size === '2.0G'
                    ? 'Heavy Multitasking'
                    : 'Maximum Headroom'}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-medium text-[#e0e2ec]">CPU Governor Policy</span>
              <span className="block text-[11px] text-[#8d90a0]">
                Balance energy efficiency vs instant UI responsiveness
              </span>
            </div>
            <div className="flex bg-[#272a31] p-0.5 rounded-lg border border-[#424654]/30">
              <button
                onClick={() => setCpuGovernor('schedutil')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  cpuGovernor === 'schedutil'
                    ? 'bg-[#2c6bed] text-white'
                    : 'text-[#c3c6d7] hover:text-[#e0e2ec]'
                }`}
              >
                Schedutil
              </button>
              <button
                onClick={() => setCpuGovernor('performance')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  cpuGovernor === 'performance'
                    ? 'bg-[#2c6bed] text-white'
                    : 'text-[#c3c6d7] hover:text-[#e0e2ec]'
                }`}
              >
                Performance
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Display & Pointer Precision */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-4">
          <div>
            <span className="font-semibold text-sm text-[#e0e2ec] block flex items-center gap-2">
              <span className="material-symbols-outlined text-[#cbbeff] text-[18px]">mouse</span>
              Mouse Pointer &amp; Display Smoothing
            </span>
            <span className="text-xs text-[#c3c6d7]">
              Tweak physical mouse tracking latency and refresh rate simulation.
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#e0e2ec]">
              <span>Pointer Speed</span>
              <span className="font-label-code text-[#4cd6ff]">{pointerSpeed}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={pointerSpeed}
              onChange={(e) => setPointerSpeed(Number(e.target.value))}
              className="w-full accent-[#2c6bed] bg-[#32353c] h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-medium text-[#e0e2ec]">Display Refresh Simulation</span>
              <span className="block text-[11px] text-[#8d90a0]">
                Emulate ultra-smooth 90Hz UI motion profiles
              </span>
            </div>
            <div className="flex bg-[#272a31] p-0.5 rounded-lg border border-[#424654]/30">
              <button
                onClick={() => setRefreshRate('60')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  refreshRate === '60'
                    ? 'bg-[#2c6bed] text-white'
                    : 'text-[#c3c6d7] hover:text-[#e0e2ec]'
                }`}
              >
                60 Hz (Default)
              </button>
              <button
                onClick={() => setRefreshRate('90')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  refreshRate === '90'
                    ? 'bg-[#2c6bed] text-white'
                    : 'text-[#c3c6d7] hover:text-[#e0e2ec]'
                }`}
              >
                90 Hz Smooth
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3">
          {appliedNotice ? (
            <span className="text-xs font-label-code text-[#4cd6ff] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Parameters synced to /system/etc/dex_profile.conf
            </span>
          ) : (
            <span className="text-xs text-[#8d90a0]">
              Changes apply instantly across running workstation windows.
            </span>
          )}

          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-[#2c6bed] hover:bg-[#0055d4] text-white font-medium text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            Save Labs Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
