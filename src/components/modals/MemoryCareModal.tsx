import React, { useState } from 'react';

interface MemoryCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ramUsage: number;
  maxRam: number;
  onCleanRam: () => void;
}

export const MemoryCareModal: React.FC<MemoryCareModalProps> = ({
  isOpen,
  onClose,
  ramUsage,
  maxRam,
  onCleanRam,
}) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanDone, setCleanDone] = useState(false);

  if (!isOpen) return null;

  const handleClean = () => {
    setIsCleaning(true);
    setTimeout(() => {
      onCleanRam();
      setIsCleaning(false);
      setCleanDone(true);
      setTimeout(() => setCleanDone(false), 3000);
    }, 1200);
  };

  const percentage = Math.round((ramUsage / maxRam) * 100);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#191b23] border border-[#424654]/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        <div className="h-11 px-4 bg-[#272a31] flex items-center justify-between border-b border-[#32353c]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd6ff] text-[20px]">memory</span>
            <span className="font-semibold text-sm text-[#e0e2ec]">Device Care: Memory &amp; RAM Plus</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5 text-center">
          {/* Radial Metric */}
          <div className="relative w-36 h-36 mx-auto flex flex-col items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke="#32353c"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke={percentage > 85 ? '#ffb4ab' : '#2c6bed'}
                strokeWidth="10"
                strokeDasharray={364}
                strokeDashoffset={364 - (364 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-display-clock text-[#e0e2ec]">
                {ramUsage.toFixed(1)} GB
              </span>
              <span className="font-label-code text-[11px] text-[#8d90a0]">
                of {maxRam.toFixed(1)} GB ({percentage}%)
              </span>
            </div>
          </div>

          {/* ZRAM Swap Badge */}
          <div className="p-3 rounded-xl bg-[#272a31]/60 border border-[#424654]/20 flex items-center justify-between text-xs text-left">
            <div>
              <span className="font-semibold text-[#e0e2ec] block">ZRAM Swap Partition (RAM Plus)</span>
              <span className="text-[#8d90a0] text-[11px]">+1.5 GB LZ4 Compressed Swap Active</span>
            </div>
            <span className="font-label-code text-[#4cd6ff] px-2 py-0.5 rounded bg-[#007e9b]/20 font-bold">
              NOMINAL
            </span>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-1.5 text-xs text-left">
            <div className="flex justify-between py-1 border-b border-[#32353c]/30 text-[#c3c6d7]">
              <span>System &amp; One UI Framework</span>
              <span className="font-label-code text-[#e0e2ec]">1.1 GB</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#32353c]/30 text-[#c3c6d7]">
              <span>Active DeX Windows (Notes, Files, Browser)</span>
              <span className="font-label-code text-[#e0e2ec]">0.9 GB</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#32353c]/30 text-[#c3c6d7]">
              <span>Background Cached Processes</span>
              <span className="font-label-code text-[#4cd6ff]">
                {(ramUsage - 2.0 > 0 ? (ramUsage - 2.0).toFixed(1) : '0.4')} GB (Reclaimable)
              </span>
            </div>
          </div>

          {/* Clean Action */}
          <div className="pt-2">
            <button
              onClick={handleClean}
              disabled={isCleaning}
              className={`w-full py-2.5 rounded-xl font-medium text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                cleanDone
                  ? 'bg-[#007e9b] text-white'
                  : 'bg-[#2c6bed] hover:bg-[#0055d4] text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${isCleaning ? 'animate-spin' : ''}`}>
                {isCleaning ? 'autorenew' : cleanDone ? 'check_circle' : 'cleaning_services'}
              </span>
              <span>
                {isCleaning
                  ? 'Clearing cached memory...'
                  : cleanDone
                  ? 'Memory Optimized (+420 MB freed)'
                  : 'Clean Now (Free up cached RAM)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
