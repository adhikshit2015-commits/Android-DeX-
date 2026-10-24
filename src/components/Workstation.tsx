import React, { useState, useEffect } from 'react';
import { WindowState, FileItem, CheckItem, AppShortcut } from '../types/dex';
import { DESKTOP_SHORTCUTS } from '../data/mockData';
import { NotesWindow } from './windows/NotesWindow';
import { FilesWindow } from './windows/FilesWindow';
import { InternetWindow } from './windows/InternetWindow';
import { GalleryWindow } from './windows/GalleryWindow';
import { FilePreviewModal } from './modals/FilePreviewModal';

interface WorkstationProps {
  windows: Record<string, WindowState>;
  files: FileItem[];
  checklist: CheckItem[];
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onToggleCheckItem: (id: string) => void;
  onAddCheckItem: (label: string) => void;
  onOpenApp: (appId: string) => void;
}

export const Workstation: React.FC<WorkstationProps> = ({
  windows,
  files,
  checklist,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onUpdatePosition,
  onToggleCheckItem,
  onAddCheckItem,
  onOpenApp,
}) => {
  const [showToast, setShowToast] = useState(true);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<FileItem | null>(null);

  // Live Clock & Time
  const [currentTime, setCurrentTime] = useState({
    timeStr: '12:45',
    dateStr: 'Thursday, Oct 24 • Suwon HQ',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or standard
      const timeStr = `${hours}:${minutes}`;
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
      const dateFormatted = now.toLocaleDateString('en-US', options);
      setCurrentTime({
        timeStr,
        dateStr: `${dateFormatted} • Suwon HQ`,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const openWindowsCount = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized).length;

  return (
    <div className="relative w-full flex-1 flex flex-col justify-between select-none overflow-hidden min-h-[calc(100vh-3.5rem)] pb-16">
      {/* Desktop Surface Ambient Glows (Strictly local) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#2c6bed]/10 blur-[120px]"></div>
        <div className="absolute bottom-16 right-1/3 w-80 h-80 rounded-full bg-[#4a0fce]/15 blur-[100px]"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-[#007e9b]/10 blur-[90px]"></div>
      </div>

      {/* Main Canvas Layer */}
      <div className="relative w-full flex-1 p-5 flex flex-col justify-between">
        {/* Top Floating Header Row: Desktop Grid vs Desktop Widget */}
        <div className="w-full flex items-start justify-between relative z-10 pointer-events-none">
          {/* Left: Column of Desktop App Icons */}
          <div className="grid grid-cols-1 gap-y-3 pointer-events-auto w-24">
            {DESKTOP_SHORTCUTS.map((app: AppShortcut) => (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#272a31]/40 active:scale-95 transition-all text-center cursor-pointer"
                title={`Open ${app.name}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.iconGradient} flex items-center justify-center shadow-lg shadow-black/40 group-hover:shadow-[#b2c5ff]/20 transition-all`}
                >
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      app.iconColor || 'text-white'
                    }`}
                  >
                    {app.icon}
                  </span>
                </div>
                <span className="mt-1.5 font-body-sm text-body-sm text-[#e0e2ec] truncate w-20 tracking-tight drop-shadow-md">
                  {app.name}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Samsung Galaxy Tab A7 Desktop Station Widget */}
          <div className="pointer-events-auto flex flex-col items-end gap-2 text-right">
            {/* Digital Clock & Atmospheric Weather */}
            <div className="bg-[#0b0e15]/60 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl flex items-center gap-5 border border-[#32353c]/30">
              <div className="flex flex-col text-right">
                <span className="font-display-clock text-display-clock text-[#dae2ff] tracking-tight leading-none">
                  {currentTime.timeStr}
                </span>
                <span className="font-body-md text-body-md text-[#c3c6d7] mt-1">
                  {currentTime.dateStr}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center pl-4 border-l border-[#424654]/30">
                <span className="material-symbols-outlined text-[#4cd6ff] text-[28px]">
                  partly_cloudy_day
                </span>
                <span className="font-headline-sm text-headline-sm text-[#e0e2ec] mt-0.5 font-bold">
                  72°F
                </span>
                <span className="font-label-code text-label-code text-[#c3c6d7]">
                  Optimal Air
                </span>
              </div>
            </div>

            {/* Hardware Identity Tag */}
            <div className="inline-flex items-center gap-2 bg-[#272a31]/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-[#424654]/20">
              <span className="w-2 h-2 rounded-full bg-[#4cd6ff] animate-pulse"></span>
              <span className="font-label-code text-label-code text-[#c3c6d7] tracking-wider uppercase font-semibold">
                Galaxy Tab A7 (SM-T500) • Octa 2.0 GHz
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Window Floating Workspace Area */}
        <div className="relative w-full flex-1 min-h-[580px] pointer-events-none mt-2">
          {/* My Files Window */}
          {windows.files && (
            <FilesWindow
              windowState={windows.files}
              files={files}
              onFocus={() => onFocusWindow('files')}
              onClose={() => onCloseWindow('files')}
              onMinimize={() => onMinimizeWindow('files')}
              onMaximize={() => onMaximizeWindow('files')}
              onUpdatePosition={(x, y) => onUpdatePosition('files', x, y)}
              onOpenFile={(file) => setSelectedPreviewFile(file)}
            />
          )}

          {/* Samsung Notes Window */}
          {windows.notes && (
            <NotesWindow
              windowState={windows.notes}
              checklist={checklist}
              onFocus={() => onFocusWindow('notes')}
              onClose={() => onCloseWindow('notes')}
              onMinimize={() => onMinimizeWindow('notes')}
              onMaximize={() => onMaximizeWindow('notes')}
              onUpdatePosition={(x, y) => onUpdatePosition('notes', x, y)}
              onToggleCheckItem={onToggleCheckItem}
              onAddCheckItem={onAddCheckItem}
            />
          )}

          {/* Samsung Internet Window */}
          {windows.internet && (
            <InternetWindow
              windowState={windows.internet}
              onFocus={() => onFocusWindow('internet')}
              onClose={() => onCloseWindow('internet')}
              onMinimize={() => onMinimizeWindow('internet')}
              onMaximize={() => onMaximizeWindow('internet')}
              onUpdatePosition={(x, y) => onUpdatePosition('internet', x, y)}
            />
          )}

          {/* Gallery Window */}
          {windows.gallery && (
            <GalleryWindow
              windowState={windows.gallery}
              onFocus={() => onFocusWindow('gallery')}
              onClose={() => onCloseWindow('gallery')}
              onMinimize={() => onMinimizeWindow('gallery')}
              onMaximize={() => onMaximizeWindow('gallery')}
              onUpdatePosition={(x, y) => onUpdatePosition('gallery', x, y)}
            />
          )}
        </div>

        {/* Bottom Floating Toast Notification (DeX Status Pill - Bottom Right) */}
        {showToast && (
          <div className="fixed bottom-16 right-4 z-40 max-w-sm pointer-events-auto">
            <div className="p-3 bg-[#272a31]/90 backdrop-blur-2xl rounded-2xl shadow-2xl flex items-center gap-3 border border-[#424654]/20 animate-in fade-in duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#2c6bed] flex items-center justify-center flex-shrink-0 text-[#fbf9ff] shadow-md">
                <span className="material-symbols-outlined text-[20px]">speed</span>
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-[13px] text-[#e0e2ec] font-semibold">
                    DeX Workstation Active
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd6ff]"></span>
                </div>
                <span className="font-body-sm text-body-sm text-[#c3c6d7] truncate">
                  Snapdragon 662 • {openWindowsCount} Active Windows • Optimal
                </span>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-[#c3c6d7] hover:text-[#e0e2ec] p-1 rounded-lg hover:bg-[#32353c] transition-colors"
                title="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File Detail Modal */}
      <FilePreviewModal
        file={selectedPreviewFile}
        onClose={() => setSelectedPreviewFile(null)}
      />
    </div>
  );
};
