import React from 'react';
import { WindowState } from '../../types/dex';

interface RecentAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  windows: Record<string, WindowState>;
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onCloseAll: () => void;
}

export const RecentAppsModal: React.FC<RecentAppsModalProps> = ({
  isOpen,
  onClose,
  windows,
  onFocusWindow,
  onCloseWindow,
  onCloseAll,
}) => {
  if (!isOpen) return null;

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex flex-col items-center gap-6"
      >
        <div className="flex items-center justify-between w-full">
          <span className="font-headline-sm text-sm text-[#e0e2ec] font-bold">
            Recent Workstation Tasks ({openWindows.length})
          </span>
          {openWindows.length > 0 && (
            <button
              onClick={() => {
                onCloseAll();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#93000a] text-xs font-medium text-[#ffdad6] transition-colors"
            >
              Close All Apps
            </button>
          )}
        </div>

        {openWindows.length === 0 ? (
          <div className="py-20 text-center text-[#8d90a0]">
            <span className="material-symbols-outlined text-[48px] mb-2">tab_unselected</span>
            <p className="text-sm">No recent apps running</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto w-full py-4 px-2 items-center justify-start">
            {openWindows.map((win) => (
              <div
                key={win.id}
                onClick={() => {
                  onFocusWindow(win.id);
                  onClose();
                }}
                className="w-64 h-80 rounded-2xl bg-[#191b23] border border-[#424654]/40 hover:border-[#b2c5ff]/50 shadow-2xl flex flex-col overflow-hidden shrink-0 cursor-pointer group hover:scale-[1.02] transition-all"
              >
                {/* Header */}
                <div className="h-10 px-3 bg-[#272a31] flex items-center justify-between border-b border-[#32353c]/40">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#4cd6ff]">
                      {win.icon}
                    </span>
                    <span className="text-xs font-semibold text-[#e0e2ec] truncate max-w-[140px]">
                      {win.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseWindow(win.id);
                    }}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#93000a] text-[#c3c6d7] hover:text-white transition-colors"
                    title="Close"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>

                {/* Card preview representation */}
                <div className="flex-1 p-4 bg-[#10131a] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#272a31] flex items-center justify-center text-[#b2c5ff] mb-3 shadow-inner group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">{win.icon}</span>
                  </div>
                  <span className="font-bold text-sm text-[#e0e2ec]">{win.title}</span>
                  <span className="text-[10px] text-[#8d90a0] mt-1 font-label-code">
                    {win.subPath || 'Active instance'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
