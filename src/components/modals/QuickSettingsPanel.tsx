import React, { useState } from 'react';

interface QuickSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeXLabs: () => void;
  onTriggerScreenshot: () => void;
}

export const QuickSettingsPanel: React.FC<QuickSettingsPanelProps> = ({
  isOpen,
  onClose,
  onOpenDeXLabs,
  onTriggerScreenshot,
}) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [soundMode, setSoundMode] = useState<'sound' | 'vibrate' | 'mute'>('sound');
  const [nightMode, setNightMode] = useState(true);
  const [hotspot, setHotspot] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [brightness, setBrightness] = useState(82);
  const [volume, setVolume] = useState(70);

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Samsung Device Care',
      text: 'High performance profile active for Snapdragon 662.',
      time: '12:40 PM',
      icon: 'verified',
      color: 'text-[#4cd6ff]',
    },
    {
      id: 'n2',
      title: 'DeX Edge Snapping',
      text: 'Keyboard shortcuts enabled. Press Win + Left/Right to tile.',
      time: '12:35 PM',
      icon: 'keyboard',
      color: 'text-[#b2c5ff]',
    },
  ]);

  if (!isOpen) return null;

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-end p-4 pb-16 pointer-events-auto bg-black/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#111621]/95 backdrop-blur-3xl rounded-2xl p-4 border border-[#424654]/40 shadow-[0_24px_60px_rgba(0,0,0,0.75)] select-none animate-in slide-in-from-bottom-4 fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#32353c]/40">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-sm text-[#e0e2ec] font-bold">Quick Settings</span>
            <span className="font-label-code text-[10px] text-[#4cd6ff] bg-[#007e9b]/20 px-2 py-0.5 rounded-full">
              Tab A7
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#272a31] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* 3-Column Pill Toggles */}
        <div className="grid grid-cols-3 gap-2.5 my-3.5">
          {/* Wi-Fi */}
          <button
            onClick={() => setWifiEnabled(!wifiEnabled)}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              wifiEnabled
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'bg-[#272a31]/60 text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {wifiEnabled ? 'wifi' : 'wifi_off'}
            </span>
            <span className="text-[11px] font-medium truncate w-full text-center">Wi-Fi</span>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              bluetoothEnabled
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'bg-[#272a31]/60 text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {bluetoothEnabled ? 'bluetooth' : 'bluetooth_disabled'}
            </span>
            <span className="text-[11px] font-medium truncate w-full text-center">Bluetooth</span>
          </button>

          {/* Sound */}
          <button
            onClick={() =>
              setSoundMode(soundMode === 'sound' ? 'vibrate' : soundMode === 'vibrate' ? 'mute' : 'sound')
            }
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              soundMode === 'sound'
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'bg-[#272a31]/60 text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {soundMode === 'sound' ? 'volume_up' : soundMode === 'vibrate' ? 'vibration' : 'volume_off'}
            </span>
            <span className="text-[11px] font-medium capitalize truncate w-full text-center">
              {soundMode}
            </span>
          </button>

          {/* DeX Labs */}
          <button
            onClick={() => {
              onOpenDeXLabs();
              onClose();
            }}
            className="p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 bg-[#4a0fce]/80 text-[#cbbeff] hover:bg-[#4a0fce] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span className="text-[11px] font-medium truncate w-full text-center">DeX Labs</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setNightMode(!nightMode)}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              nightMode
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'bg-[#272a31]/60 text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            <span className="text-[11px] font-medium truncate w-full text-center">Dark Mode</span>
          </button>

          {/* Mobile Hotspot */}
          <button
            onClick={() => setHotspot(!hotspot)}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              hotspot
                ? 'bg-[#2c6bed] text-[#fbf9ff] shadow-sm'
                : 'bg-[#272a31]/60 text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">wifi_tethering</span>
            <span className="text-[11px] font-medium truncate w-full text-center">Hotspot</span>
          </button>
        </div>

        {/* Sliders: Brightness & Volume */}
        <div className="space-y-3 p-3 bg-[#191b23]/70 rounded-xl border border-[#32353c]/30">
          <div className="flex items-center gap-2 text-xs">
            <span className="material-symbols-outlined text-[#4cd6ff] text-[18px]">brightness_medium</span>
            <input
              type="range"
              min={10}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-[#2c6bed] h-1.5 rounded-lg cursor-pointer bg-[#32353c]"
            />
            <span className="font-label-code text-[10px] text-[#c3c6d7] w-7 text-right">
              {brightness}%
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="material-symbols-outlined text-[#cbbeff] text-[18px]">volume_up</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#2c6bed] h-1.5 rounded-lg cursor-pointer bg-[#32353c]"
            />
            <span className="font-label-code text-[10px] text-[#c3c6d7] w-7 text-right">
              {volume}%
            </span>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#c3c6d7]">
            <span className="font-semibold text-[#e0e2ec]">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-[10px] text-[#4cd6ff] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-3 text-center text-xs text-[#8d90a0] bg-[#191b23]/40 rounded-xl">
              No new notifications
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-[#1d2027]/80 border border-[#32353c]/30 flex items-start justify-between gap-2 text-xs"
              >
                <div className="flex items-start gap-2">
                  <span className={`material-symbols-outlined text-[16px] ${item.color} mt-0.5`}>
                    {item.icon}
                  </span>
                  <div>
                    <span className="font-semibold text-[#e0e2ec] block">{item.title}</span>
                    <span className="text-[11px] text-[#c3c6d7] block">{item.text}</span>
                    <span className="font-label-code text-[9px] text-[#8d90a0] block mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => dismissNotification(item.id)}
                  className="text-[#8d90a0] hover:text-[#e0e2ec]"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
