import React, { useState } from 'react';
import { WindowState, CheckItem } from '../../types/dex';

interface NotesWindowProps {
  windowState: WindowState;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  checklist: CheckItem[];
  onToggleCheckItem: (id: string) => void;
  onAddCheckItem: (label: string) => void;
}

export const NotesWindow: React.FC<NotesWindowProps> = ({
  windowState,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  checklist,
  onToggleCheckItem,
  onAddCheckItem,
}) => {
  const [activeTool, setActiveTool] = useState<'text' | 'pen' | 'highlighter' | 'eraser'>('text');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [opacity, setOpacity] = useState(windowState.opacity || 0.95);
  const [isPinned, setIsPinned] = useState(windowState.isPinned || false);
  const [noteText, setNoteText] = useState(
    'Additional engineering notes:\n- DeX desktop mode uses 600MB baseline RAM.\n- Hardware video decoding handles 1080p60 smoothly.\n- Bluetooth pointer lag reduced to < 8ms with low-latency hidraw tuning.'
  );
  const [newCheckLabel, setNewCheckLabel] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    // Don't drag if clicking buttons
    if ((e.target as HTMLElement).closest('button, input, textarea')) return;
    if (windowState.isMaximized) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragStart.x));
      const newY = Math.max(56, Math.min(window.innerHeight - 100, e.clientY - dragStart.y));
      onUpdatePosition(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, onUpdatePosition]);

  const toggleOpacity = () => {
    setOpacity((prev) => (prev >= 0.95 ? 0.75 : prev === 0.75 ? 0.55 : 0.95));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice('Exported to /Internal/DeX_Work/Tab_A7_Specs.pdf');
      setTimeout(() => setExportNotice(null), 3500);
    }, 600);
  };

  const handleAddCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCheckLabel.trim()) {
      onAddCheckItem(newCheckLabel.trim());
      setNewCheckLabel('');
    }
  };

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: '56px',
        left: '0px',
        right: '0px',
        bottom: '56px',
        zIndex: windowState.zIndex,
        opacity,
      }
    : {
        position: 'absolute',
        top: `${windowState.y}px`,
        left: `${windowState.x}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: windowState.zIndex,
        opacity,
      };

  return (
    <div
      style={windowStyle}
      onClick={onFocus}
      className={`pointer-events-auto bg-[#272a31]/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.7)] flex flex-col transition-shadow border ${
        isPinned ? 'border-[#00D1FF]/70' : 'border-[#b2c5ff]/30'
      } overflow-hidden select-none`}
    >
      {/* Title Bar / Window Chrome */}
      <div
        onMouseDown={handleMouseDown}
        className="h-11 px-4 bg-gradient-to-r from-[#32353c] via-[#272a31] to-[#32353c] flex items-center justify-between cursor-move select-none border-b border-[#424654]/40"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ffb4ab] to-[#93000a] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[15px]">edit_note</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] text-sm">
              Tab A7 Project Specs.note
            </span>
            <span className="bg-[#b2c5ff]/20 text-[#b2c5ff] font-label-code text-[10px] px-2 py-0.5 rounded-full font-medium">
              Active Canvas
            </span>
            {isPinned && (
              <span className="bg-[#4cd6ff]/20 text-[#4cd6ff] font-label-code text-[10px] px-1.5 py-0.5 rounded-full">
                PINNED
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleOpacity}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              opacity < 0.95 ? 'bg-[#2c6bed] text-white' : 'hover:bg-[#32353c] text-[#c3c6d7]'
            }`}
            title={`Adjust Opacity (Current: ${Math.round(opacity * 100)}%)`}
          >
            <span className="material-symbols-outlined text-[16px]">opacity</span>
          </button>

          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isPinned ? 'bg-[#2c6bed] text-white' : 'hover:bg-[#32353c] text-[#c3c6d7]'
            }`}
            title={isPinned ? 'Unpin from Top' : 'Pin on Top'}
          >
            <span className="material-symbols-outlined text-[16px]">push_pin</span>
          </button>

          <div className="h-4 w-px bg-[#424654]/40 mx-0.5"></div>

          <button
            onClick={onMinimize}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
            title="Minimize"
          >
            <span className="material-symbols-outlined text-[15px]">remove</span>
          </button>

          <button
            onClick={onMaximize}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
            title={windowState.isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="material-symbols-outlined text-[14px]">crop_square</span>
          </button>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#ffb4ab] hover:text-[#690005] text-[#c3c6d7] transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        </div>
      </div>

      {/* Formatting & Drawing Ribbon */}
      <div className="h-10 px-4 bg-[#0b0e15]/80 flex items-center justify-between border-b border-[#32353c]/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#272a31]/60 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTool('text')}
              className={`p-1.5 rounded-md transition-colors ${
                activeTool === 'text' ? 'bg-[#2c6bed] text-[#fbf9ff]' : 'hover:bg-[#32353c] text-[#c3c6d7]'
              }`}
              title="Text Mode"
            >
              <span className="material-symbols-outlined text-[15px]">title</span>
            </button>
            <button
              onClick={() => setActiveTool('pen')}
              className={`p-1.5 rounded-md transition-colors ${
                activeTool === 'pen' ? 'bg-[#2c6bed] text-[#fbf9ff]' : 'hover:bg-[#32353c] text-[#c3c6d7]'
              }`}
              title="S Pen Mode"
            >
              <span className="material-symbols-outlined text-[15px]">stylus</span>
            </button>
            <button
              onClick={() => setActiveTool('highlighter')}
              className={`p-1.5 rounded-md transition-colors ${
                activeTool === 'highlighter' ? 'bg-[#2c6bed] text-[#fbf9ff]' : 'hover:bg-[#32353c] text-[#c3c6d7]'
              }`}
              title="Highlighter"
            >
              <span className="material-symbols-outlined text-[15px]">brush</span>
            </button>
            <button
              onClick={() => setActiveTool('eraser')}
              className={`p-1.5 rounded-md transition-colors ${
                activeTool === 'eraser' ? 'bg-[#2c6bed] text-[#fbf9ff]' : 'hover:bg-[#32353c] text-[#c3c6d7]'
              }`}
              title="Eraser"
            >
              <span className="material-symbols-outlined text-[15px]">ink_eraser</span>
            </button>
          </div>

          <div className="h-4 w-px bg-[#424654]/30"></div>

          <div className="flex items-center gap-1 text-[#c3c6d7]">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`p-1.5 rounded-md transition-colors ${
                isBold ? 'bg-[#2c6bed]/30 text-[#b2c5ff]' : 'hover:bg-[#272a31]'
              }`}
              title="Bold"
            >
              <span className="material-symbols-outlined text-[16px]">format_bold</span>
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`p-1.5 rounded-md transition-colors ${
                isItalic ? 'bg-[#2c6bed]/30 text-[#b2c5ff]' : 'hover:bg-[#272a31]'
              }`}
              title="Italic"
            >
              <span className="material-symbols-outlined text-[16px]">format_italic</span>
            </button>
            <button
              onClick={() => {
                setNoteText((prev) => prev + '\n• ');
              }}
              className="p-1.5 rounded-md hover:bg-[#272a31] transition-colors"
              title="Bulleted List"
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
            </button>
            <button
              onClick={() => {
                setNoteText((prev) => prev + '\n[ ] ');
              }}
              className="p-1.5 rounded-md hover:bg-[#272a31] transition-colors"
              title="Checkbox"
            >
              <span className="material-symbols-outlined text-[16px]">check_box</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {exportNotice ? (
            <span className="font-label-code text-[11px] text-[#4cd6ff] animate-pulse">
              {exportNotice}
            </span>
          ) : (
            <span className="font-label-code text-[11px] text-[#4cd6ff]">Saved 12:44 PM</span>
          )}

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-2.5 py-1 bg-[#272a31] hover:bg-[#32353c] rounded-lg font-body-sm text-body-sm text-[#e0e2ec] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isExporting ? 'hourglass_top' : 'share'}
            </span>
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* Note Canvas Content */}
      <div className="flex-1 p-5 overflow-y-auto bg-[#191b23]/70 space-y-4">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#32353c]/50">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-[#e0e2ec] tracking-tight">
              Galaxy Tab A7 (SM-T500) DeX Mode Simulation
            </h2>
            <p className="font-body-md text-body-md text-[#c3c6d7] mt-0.5">
              Optimized desktop runtime profile for budget Snapdragon hardware.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#4a0fce]/60 text-[#cbbeff] font-label-code text-label-code shrink-0">
            Rev 2.4.2
          </span>
        </div>

        {/* Specs Bento Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-[#272a31]/60 border border-[#424654]/20">
            <span className="font-label-code text-[10px] text-[#c3c6d7] uppercase tracking-wider block">
              Processor
            </span>
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] block mt-0.5">
              Snapdragon 662
            </span>
            <span className="font-body-sm text-body-sm text-[#4cd6ff] mt-1 block">
              8 Cores (4x2.0 + 4x1.8 GHz)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#272a31]/60 border border-[#424654]/20">
            <span className="font-label-code text-[10px] text-[#c3c6d7] uppercase tracking-wider block">
              Memory Pool
            </span>
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] block mt-0.5">
              3.0 GB LPDDR4x
            </span>
            <span className="font-body-sm text-body-sm text-[#b2c5ff] mt-1 block">
              ZRAM swap enabled (+1.5G)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#272a31]/60 border border-[#424654]/20">
            <span className="font-label-code text-[10px] text-[#c3c6d7] uppercase tracking-wider block">
              Display Canvas
            </span>
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] block mt-0.5">
              10.4&quot; WUXGA+
            </span>
            <span className="font-body-sm text-body-sm text-[#cbbeff] mt-1 block">
              2000 × 1200 • 224 PPI
            </span>
          </div>
        </div>

        {/* Feature Optimization Status Checklist */}
        <div className="p-4 rounded-xl bg-[#1d2027]/70 border border-[#424654]/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-[#e0e2ec] text-sm block">
              Desktop Optimization Verification
            </span>
            <span className="text-xs text-[#c3c6d7] font-label-code">Click item to verify</span>
          </div>

          <div className="space-y-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleCheckItem(item.id)}
                className="flex items-center justify-between text-body-md font-body-md p-1.5 rounded-lg hover:bg-[#272a31]/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[18px] transition-colors ${
                      item.checked ? 'text-[#4cd6ff]' : 'text-[#8d90a0]'
                    }`}
                  >
                    {item.checked ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className={item.checked ? 'text-[#e0e2ec]' : 'text-[#c3c6d7] line-through opacity-70'}>
                    {item.label}
                  </span>
                </div>
                <span
                  className={`font-label-code text-label-code px-2 py-0.5 rounded ${
                    item.status === 'STABLE'
                      ? 'text-[#4cd6ff] bg-[#007e9b]/20'
                      : item.status === 'ACTIVE'
                      ? 'text-[#b2c5ff] bg-[#2c6bed]/20'
                      : 'text-[#cbbeff] bg-[#4a0fce]/20'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Add custom verification invariant */}
          <form onSubmit={handleAddCheck} className="flex gap-2 pt-2 border-t border-[#32353c]/40">
            <input
              type="text"
              value={newCheckLabel}
              onChange={(e) => setNewCheckLabel(e.target.value)}
              placeholder="Add benchmark checkpoint (e.g. Vulkan API 1.1 support)..."
              className="flex-1 bg-[#10131a] border border-[#424654]/40 rounded-lg px-2.5 py-1 text-xs text-[#e0e2ec] placeholder-[#8d90a0] focus:outline-none focus:border-[#2c6bed]"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#2c6bed] hover:bg-[#0055d4] text-[#fbf9ff] rounded-lg text-xs font-medium transition-colors"
            >
              Add
            </button>
          </form>
        </div>

        {/* Interactive Scratchpad Notes */}
        <div className="p-3 rounded-xl bg-[#272a31]/40 border border-[#424654]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#c3c6d7]">
            <span className="font-semibold text-[#e0e2ec] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#b2c5ff]">edit</span>
              Active Engineer Scratchpad (Live)
            </span>
            <span className="font-label-code text-[10px] text-[#4cd6ff]">Auto-saved locally</span>
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={4}
            className={`w-full bg-[#10131a]/80 text-[#e0e2ec] font-body-md text-xs p-2.5 rounded-lg border border-[#424654]/40 focus:outline-none focus:border-[#2c6bed] resize-none ${
              isBold ? 'font-bold' : ''
            } ${isItalic ? 'italic' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};
