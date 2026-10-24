import React, { useState } from 'react';

interface DisplaySnapScreenProps {
  onApplyLayoutPreset: (preset: 'reference' | 'dual' | 'triple' | 'quad') => void;
  onBackToWorkstation: () => void;
  activeResolution: string;
  onChangeResolution: (res: string) => void;
}

export const DisplaySnapScreen: React.FC<DisplaySnapScreenProps> = ({
  onApplyLayoutPreset,
  onBackToWorkstation,
  activeResolution,
  onChangeResolution,
}) => {
  const [wirelessDeXScanning, setWirelessDeXScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleScanWireless = () => {
    setWirelessDeXScanning(true);
    setTimeout(() => {
      setWirelessDeXScanning(false);
      setConnectedDevice('Samsung Neo QLED 65" (Suwon Meeting Room B)');
      setToastMessage('Wireless DeX connection established at 60 FPS');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectedDevice(null);
    setToastMessage('Disconnected from wireless display');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const applyPreset = (preset: 'reference' | 'dual' | 'triple' | 'quad', name: string) => {
    onApplyLayoutPreset(preset);
    setToastMessage(`Applied "${name}" window layout preset!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-start p-6 max-w-4xl mx-auto min-h-[calc(100vh-7rem)] select-none animate-in fade-in zoom-in-95 duration-150">
      {/* Title */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#32353c]/40 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#32353c] flex items-center justify-center text-[#4cd6ff]">
            <span className="material-symbols-outlined text-[24px]">splitscreen</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-xl text-[#e0e2ec] font-bold">
              Display &amp; Window Snapping
            </h1>
            <p className="text-xs text-[#c3c6d7]">
              Multi-window snapping presets, resolution scaling, and wireless DeX screen projection.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToWorkstation}
          className="px-3.5 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-xs font-medium text-[#e0e2ec] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
          Return to Desktop
        </button>
      </div>

      {toastMessage && (
        <div className="w-full mb-4 p-3 rounded-xl bg-[#2c6bed]/20 border border-[#2c6bed]/40 text-[#dae2ff] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#4cd6ff]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full space-y-5">
        {/* Section 1: Window Snapping Presets */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-4">
          <div>
            <span className="font-semibold text-sm text-[#e0e2ec] block">
              Workstation Snapping Presets
            </span>
            <span className="text-xs text-[#c3c6d7]">
              Instantly arrange running apps across your Galaxy Tab A7 landscape canvas.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Preset 1: Reference Cascade */}
            <button
              onClick={() => applyPreset('reference', 'Default Workstation')}
              className="p-3 rounded-xl bg-[#272a31]/50 hover:bg-[#272a31] border border-[#424654]/30 hover:border-[#b2c5ff]/40 text-left transition-all group cursor-pointer"
            >
              <div className="h-16 w-full bg-[#10131a] rounded-lg p-1.5 flex gap-1 relative overflow-hidden mb-2 border border-white/5">
                <div className="w-1/2 h-full bg-[#2c6bed]/30 rounded border border-[#2c6bed]/40 flex items-center justify-center text-[10px] text-[#b2c5ff]">
                  Files
                </div>
                <div className="w-1/2 h-full bg-[#4a0fce]/30 rounded border border-[#4a0fce]/40 flex items-center justify-center text-[10px] text-[#cbbeff]">
                  Notes
                </div>
                <div className="absolute bottom-1 left-2 w-2/5 h-1/2 bg-[#007e9b]/40 rounded border border-[#007e9b]/60 flex items-center justify-center text-[8px] text-[#4cd6ff]">
                  Web
                </div>
              </div>
              <span className="font-bold text-xs text-[#e0e2ec] block">3-Window Standard</span>
              <span className="text-[10px] text-[#8d90a0] block mt-0.5">
                Original reference screenshot layout
              </span>
            </button>

            {/* Preset 2: 50/50 Dual View */}
            <button
              onClick={() => applyPreset('dual', '50/50 Split')}
              className="p-3 rounded-xl bg-[#272a31]/50 hover:bg-[#272a31] border border-[#424654]/30 hover:border-[#b2c5ff]/40 text-left transition-all group cursor-pointer"
            >
              <div className="h-16 w-full bg-[#10131a] rounded-lg p-1.5 flex gap-1 mb-2 border border-white/5">
                <div className="w-1/2 h-full bg-[#2c6bed]/30 rounded border border-[#2c6bed]/40 flex items-center justify-center text-[10px] text-[#b2c5ff]">
                  50%
                </div>
                <div className="w-1/2 h-full bg-[#4a0fce]/30 rounded border border-[#4a0fce]/40 flex items-center justify-center text-[10px] text-[#cbbeff]">
                  50%
                </div>
              </div>
              <span className="font-bold text-xs text-[#e0e2ec] block">50/50 Dual Split</span>
              <span className="text-[10px] text-[#8d90a0] block mt-0.5">
                Side-by-side document &amp; files review
              </span>
            </button>

            {/* Preset 3: Triple Tile */}
            <button
              onClick={() => applyPreset('triple', 'Triple Columns')}
              className="p-3 rounded-xl bg-[#272a31]/50 hover:bg-[#272a31] border border-[#424654]/30 hover:border-[#b2c5ff]/40 text-left transition-all group cursor-pointer"
            >
              <div className="h-16 w-full bg-[#10131a] rounded-lg p-1.5 flex gap-1 mb-2 border border-white/5">
                <div className="w-1/3 h-full bg-[#2c6bed]/30 rounded border border-[#2c6bed]/40 flex items-center justify-center text-[8px] text-[#b2c5ff]">
                  Files
                </div>
                <div className="w-1/3 h-full bg-[#4a0fce]/30 rounded border border-[#4a0fce]/40 flex items-center justify-center text-[8px] text-[#cbbeff]">
                  Notes
                </div>
                <div className="w-1/3 h-full bg-[#007e9b]/30 rounded border border-[#007e9b]/40 flex items-center justify-center text-[8px] text-[#4cd6ff]">
                  Web
                </div>
              </div>
              <span className="font-bold text-xs text-[#e0e2ec] block">Triple Columns</span>
              <span className="text-[10px] text-[#8d90a0] block mt-0.5">
                Three equal vertical panes
              </span>
            </button>

            {/* Preset 4: Quad Grid */}
            <button
              onClick={() => applyPreset('quad', 'Quad 4-Pane Grid')}
              className="p-3 rounded-xl bg-[#272a31]/50 hover:bg-[#272a31] border border-[#424654]/30 hover:border-[#b2c5ff]/40 text-left transition-all group cursor-pointer"
            >
              <div className="h-16 w-full bg-[#10131a] rounded-lg p-1.5 grid grid-cols-2 gap-1 mb-2 border border-white/5">
                <div className="h-full bg-[#2c6bed]/30 rounded border border-[#2c6bed]/40 flex items-center justify-center text-[8px] text-[#b2c5ff]">
                  W1
                </div>
                <div className="h-full bg-[#4a0fce]/30 rounded border border-[#4a0fce]/40 flex items-center justify-center text-[8px] text-[#cbbeff]">
                  W2
                </div>
                <div className="h-full bg-[#007e9b]/30 rounded border border-[#007e9b]/40 flex items-center justify-center text-[8px] text-[#4cd6ff]">
                  W3
                </div>
                <div className="h-full bg-[#93000a]/30 rounded border border-[#ffb4ab]/40 flex items-center justify-center text-[8px] text-[#ffb4ab]">
                  W4
                </div>
              </div>
              <span className="font-bold text-xs text-[#e0e2ec] block">Quad Grid (4-Way)</span>
              <span className="text-[10px] text-[#8d90a0] block mt-0.5">
                4-Quadrant monitoring layout
              </span>
            </button>
          </div>
        </div>

        {/* Section 2: Display Canvas & Resolution */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-4">
          <div>
            <span className="font-semibold text-sm text-[#e0e2ec] block">
              Display Canvas &amp; Density
            </span>
            <span className="text-xs text-[#c3c6d7]">
              Configure hardware canvas viewport and DPI scaling.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: '2000x1200',
                title: '10.4" WUXGA+ (Native)',
                res: '2000 × 1200 • 224 PPI',
                badge: 'Recommended',
              },
              {
                id: '1920x1080',
                title: 'FHD External Monitor',
                res: '1920 × 1080 • 16:9 Standard',
                badge: '1080p',
              },
              {
                id: '2560x1440',
                title: 'QHD Ultrawide Simulation',
                res: '2560 × 1440 • High Productivity',
                badge: 'Expanded',
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeResolution(item.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeResolution === item.id
                    ? 'border-[#2c6bed] bg-[#2c6bed]/20 text-[#dae2ff]'
                    : 'border-[#424654]/30 bg-[#272a31]/40 text-[#c3c6d7] hover:bg-[#272a31]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#e0e2ec]">{item.title}</span>
                  <span className="font-label-code text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#4cd6ff]">
                    {item.badge}
                  </span>
                </div>
                <span className="font-label-code text-[10px] text-[#8d90a0] block mt-1">
                  {item.res}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Wireless DeX Projection Simulator */}
        <div className="p-4 rounded-2xl bg-[#191b23]/80 border border-[#424654]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-[#e0e2ec] block flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd6ff] text-[18px]">cast</span>
                Wireless DeX Projection (Miracast / Samsung Smart View)
              </span>
              <span className="text-xs text-[#c3c6d7]">
                Wirelessly project this Galaxy Tab A7 workspace to a compatible TV or PC monitor.
              </span>
            </div>

            {connectedDevice ? (
              <button
                onClick={handleDisconnect}
                className="px-3 py-1.5 rounded-lg bg-[#93000a]/60 hover:bg-[#93000a] text-xs font-medium text-[#ffdad6] transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleScanWireless}
                disabled={wirelessDeXScanning}
                className="px-4 py-1.5 rounded-lg bg-[#2c6bed] hover:bg-[#0055d4] text-xs font-medium text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {wirelessDeXScanning ? 'sync' : 'search'}
                </span>
                <span>{wirelessDeXScanning ? 'Scanning...' : 'Scan for Displays'}</span>
              </button>
            )}
          </div>

          {connectedDevice ? (
            <div className="p-3 bg-[#007e9b]/20 border border-[#007e9b]/40 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4cd6ff] text-[22px]">tv</span>
                <div>
                  <span className="text-xs font-semibold text-[#e0e2ec] block">{connectedDevice}</span>
                  <span className="text-[10px] text-[#4cd6ff] font-label-code">
                    Connected • Latency: 14ms • 60 FPS • Stereo Audio routed
                  </span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4cd6ff] animate-ping"></span>
            </div>
          ) : (
            <div className="text-xs text-[#8d90a0] p-2 rounded-lg bg-[#272a31]/30">
              No active wireless projection session. Make sure your Smart TV has &quot;Wireless DeX&quot; or Screen Mirroring enabled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
