import React, { useState, useEffect } from 'react';
import { NavigationTab, WindowState, CheckItem, FileItem } from './types/dex';
import { INITIAL_WINDOWS, INITIAL_FILES, INITIAL_CHECKLIST } from './data/mockData';
import { Header } from './components/Header';
import { Taskbar } from './components/Taskbar';
import { Workstation } from './components/Workstation';
import { AppDrawer } from './components/AppDrawer';
import { DeXLabsScreen } from './components/DeXLabsScreen';
import { DisplaySnapScreen } from './components/DisplaySnapScreen';
import { QuickSettingsPanel } from './components/modals/QuickSettingsPanel';
import { MemoryCareModal } from './components/modals/MemoryCareModal';
import { UniversalSearchModal } from './components/modals/UniversalSearchModal';
import { RecentAppsModal } from './components/modals/RecentAppsModal';
import { HelpModal } from './components/modals/HelpModal';
import { CalendarDrawer } from './components/modals/CalendarDrawer';
import { ProfileModal } from './components/modals/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dex-workstation');
  const [windows, setWindows] = useState<Record<string, WindowState>>(INITIAL_WINDOWS);
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [checklist, setChecklist] = useState<CheckItem[]>(INITIAL_CHECKLIST);
  const [topZIndex, setTopZIndex] = useState(35);

  // System Diagnostics State
  const [ramUsage, setRamUsage] = useState(2.4);
  const maxRam = 3.0;
  const [resolution, setResolution] = useState('2000x1200');

  // Modals & Panels State
  const [isRamCareOpen, setIsRamCareOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isUniversalSearchOpen, setIsUniversalSearchOpen] = useState(false);
  const [isRecentAppsOpen, setIsRecentAppsOpen] = useState(false);
  const [isScreenshotFlashing, setIsScreenshotFlashing] = useState(false);

  // Focus a window
  const handleFocusWindow = (id: string) => {
    setTopZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((wPrev) => ({
        ...wPrev,
        [id]: {
          ...wPrev[id],
          zIndex: nextZ,
          isMinimized: false,
        },
      }));
      return nextZ;
    });
  };

  // Close a window
  const handleCloseWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  };

  // Minimize a window
  const handleMinimizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
  };

  // Maximize or restore
  const handleMaximizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  // Update window position
  const handleUpdatePosition = (id: string, x: number, y: number) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x,
        y,
      },
    }));
  };

  // Toggle dock item (focus if open, restore if minimized, open if closed)
  const handleToggleWindow = (id: string) => {
    const win = windows[id];
    if (!win) {
      handleOpenApp(id);
      return;
    }

    if (!win.isOpen) {
      setTopZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((wPrev) => ({
          ...wPrev,
          [id]: {
            ...wPrev[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        }));
        return nextZ;
      });
      if (activeTab !== 'dex-workstation') {
        setActiveTab('dex-workstation');
      }
      return;
    }

    if (win.isMinimized) {
      handleFocusWindow(id);
      if (activeTab !== 'dex-workstation') {
        setActiveTab('dex-workstation');
      }
    } else {
      // If already open and not minimized, minimize it
      handleMinimizeWindow(id);
    }
  };

  // Open any app by ID
  const handleOpenApp = (appId: string) => {
    if (appId === 'dexlabs') {
      setActiveTab('dex-labs-settings');
      return;
    }

    if (windows[appId]) {
      setTopZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((wPrev) => ({
          ...wPrev,
          [appId]: {
            ...wPrev[appId],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        }));
        return nextZ;
      });
      setActiveTab('dex-workstation');
    } else if (appId === 'device_care') {
      setIsRamCareOpen(true);
    } else {
      // Default to opening Notes or Files or notification
      alert(`Opening ${appId} in Samsung DeX multi-window.`);
    }
  };

  // Minimize all windows to show desktop
  const handleMinimizeAll = () => {
    setWindows((prev) => {
      const updated: Record<string, WindowState> = {};
      Object.keys(prev).forEach((key) => {
        updated[key] = {
          ...prev[key],
          isMinimized: true,
        };
      });
      return updated;
    });
    setActiveTab('dex-workstation');
  };

  // Close all apps
  const handleCloseAll = () => {
    setWindows((prev) => {
      const updated: Record<string, WindowState> = {};
      Object.keys(prev).forEach((key) => {
        updated[key] = {
          ...prev[key],
          isOpen: false,
          isMinimized: false,
        };
      });
      return updated;
    });
  };

  // Toggle checklist item
  const handleToggleCheckItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Add custom checklist item
  const handleAddCheckItem = (label: string) => {
    const newItem: CheckItem = {
      id: `custom-${Date.now()}`,
      label,
      status: 'ACTIVE',
      checked: true,
    };
    setChecklist((prev) => [...prev, newItem]);
  };

  // Apply layout presets
  const handleApplyLayoutPreset = (preset: 'reference' | 'dual' | 'triple' | 'quad') => {
    setActiveTab('dex-workstation');

    if (preset === 'reference') {
      setWindows((prev) => ({
        ...prev,
        files: { ...prev.files, isOpen: true, isMinimized: false, isMaximized: false, x: 120, y: 20, width: 520, height: 400, zIndex: 20 },
        notes: { ...prev.notes, isOpen: true, isMinimized: false, isMaximized: false, x: 580, y: 48, width: 640, height: 480, zIndex: 30 },
        internet: { ...prev.internet, isOpen: true, isMinimized: false, isMaximized: false, x: 100, y: 350, width: 440, height: 250, zIndex: 25 },
        gallery: { ...prev.gallery, isOpen: false },
      }));
    } else if (preset === 'dual') {
      setWindows((prev) => ({
        ...prev,
        files: { ...prev.files, isOpen: true, isMinimized: false, isMaximized: false, x: 20, y: 16, width: 540, height: 560, zIndex: 20 },
        notes: { ...prev.notes, isOpen: true, isMinimized: false, isMaximized: false, x: 580, y: 16, width: 640, height: 560, zIndex: 25 },
        internet: { ...prev.internet, isOpen: false },
        gallery: { ...prev.gallery, isOpen: false },
      }));
    } else if (preset === 'triple') {
      setWindows((prev) => ({
        ...prev,
        files: { ...prev.files, isOpen: true, isMinimized: false, isMaximized: false, x: 10, y: 16, width: 380, height: 560, zIndex: 20 },
        internet: { ...prev.internet, isOpen: true, isMinimized: false, isMaximized: false, x: 400, y: 16, width: 400, height: 560, zIndex: 22 },
        notes: { ...prev.notes, isOpen: true, isMinimized: false, isMaximized: false, x: 810, y: 16, width: 440, height: 560, zIndex: 25 },
        gallery: { ...prev.gallery, isOpen: false },
      }));
    } else if (preset === 'quad') {
      setWindows((prev) => ({
        ...prev,
        files: { ...prev.files, isOpen: true, isMinimized: false, isMaximized: false, x: 20, y: 10, width: 520, height: 280, zIndex: 20 },
        notes: { ...prev.notes, isOpen: true, isMinimized: false, isMaximized: false, x: 560, y: 10, width: 580, height: 280, zIndex: 25 },
        internet: { ...prev.internet, isOpen: true, isMinimized: false, isMaximized: false, x: 20, y: 300, width: 520, height: 270, zIndex: 22 },
        gallery: { ...prev.gallery, isOpen: true, isMinimized: false, isMaximized: false, x: 560, y: 300, width: 580, height: 270, zIndex: 24 },
      }));
    }
  };

  // Trigger screenshot flash
  const handleTriggerScreenshot = () => {
    setIsScreenshotFlashing(true);
    setTimeout(() => {
      setIsScreenshotFlashing(false);
      // Add screenshot to files
      const newScreenFile: FileItem = {
        id: `scr-${Date.now()}`,
        name: `Screenshot_DeX_${new Date().toISOString().slice(11, 19).replace(/:/g, '')}.png`,
        type: 'image',
        size: 'PNG • 2.8 MB',
        date: 'Just now',
        icon: 'screenshot_region',
        color: 'text-[#4cd6ff]',
        bg: 'bg-[#007e9b]/30',
        content: 'High-resolution snapshot of active Samsung DeX desktop workstation canvas.',
      };
      setFiles((prev) => [newScreenFile, ...prev]);
    }, 280);
  };

  // RAM cleaner
  const handleCleanRam = () => {
    setRamUsage(1.95);
  };

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuickSettingsOpen(false);
        setIsCalendarOpen(false);
        setIsUniversalSearchOpen(false);
        setIsRecentAppsOpen(false);
        setIsRamCareOpen(false);
        setIsHelpOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#10131a] text-[#e0e2ec] font-body-md min-h-screen relative overflow-hidden select-none">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        ramUsage={ramUsage}
        maxRam={maxRam}
        onOpenRamCare={() => setIsRamCareOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-14 pb-14 min-h-screen relative flex flex-col bg-gradient-to-b from-[#10131a] via-[#10131a] to-[#0b0e15]">
        {activeTab === 'dex-workstation' && (
          <Workstation
            windows={windows}
            files={files}
            checklist={checklist}
            onFocusWindow={handleFocusWindow}
            onCloseWindow={handleCloseWindow}
            onMinimizeWindow={handleMinimizeWindow}
            onMaximizeWindow={handleMaximizeWindow}
            onUpdatePosition={handleUpdatePosition}
            onToggleCheckItem={handleToggleCheckItem}
            onAddCheckItem={handleAddCheckItem}
            onOpenApp={handleOpenApp}
          />
        )}

        {activeTab === 'app-drawer' && (
          <AppDrawer
            onOpenApp={handleOpenApp}
            onClose={() => setActiveTab('dex-workstation')}
          />
        )}

        {activeTab === 'dex-labs-settings' && (
          <DeXLabsScreen
            onBackToWorkstation={() => setActiveTab('dex-workstation')}
          />
        )}

        {activeTab === 'display-multitasking' && (
          <DisplaySnapScreen
            onApplyLayoutPreset={handleApplyLayoutPreset}
            onBackToWorkstation={() => setActiveTab('dex-workstation')}
            activeResolution={resolution}
            onChangeResolution={(r) => setResolution(r)}
          />
        )}
      </main>

      {/* Bottom Taskbar */}
      <Taskbar
        windows={windows}
        onToggleWindow={handleToggleWindow}
        onOpenAppDrawer={() =>
          setActiveTab(activeTab === 'app-drawer' ? 'dex-workstation' : 'app-drawer')
        }
        onOpenUniversalSearch={() => setIsUniversalSearchOpen(true)}
        onOpenRecentApps={() => setIsRecentAppsOpen(true)}
        onMinimizeAll={handleMinimizeAll}
        onToggleQuickSettings={() => setIsQuickSettingsOpen(!isQuickSettingsOpen)}
        onToggleCalendar={() => setIsCalendarOpen(!isCalendarOpen)}
        onTriggerScreenshot={handleTriggerScreenshot}
      />

      {/* Modals & Flyouts */}
      <QuickSettingsPanel
        isOpen={isQuickSettingsOpen}
        onClose={() => setIsQuickSettingsOpen(false)}
        onOpenDeXLabs={() => setActiveTab('dex-labs-settings')}
        onTriggerScreenshot={handleTriggerScreenshot}
      />

      <MemoryCareModal
        isOpen={isRamCareOpen}
        onClose={() => setIsRamCareOpen(false)}
        ramUsage={ramUsage}
        maxRam={maxRam}
        onCleanRam={handleCleanRam}
      />

      <UniversalSearchModal
        isOpen={isUniversalSearchOpen}
        onClose={() => setIsUniversalSearchOpen(false)}
        onOpenApp={handleOpenApp}
      />

      <RecentAppsModal
        isOpen={isRecentAppsOpen}
        onClose={() => setIsRecentAppsOpen(false)}
        windows={windows}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        onCloseAll={handleCloseAll}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <CalendarDrawer
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Screenshot Flash Overlay */}
      {isScreenshotFlashing && (
        <div className="fixed inset-0 z-50 bg-white/70 pointer-events-none animate-out fade-out duration-300" />
      )}
    </div>
  );
}
