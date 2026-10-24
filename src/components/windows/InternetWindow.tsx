import React, { useState } from 'react';
import { WindowState } from '../../types/dex';

interface InternetWindowProps {
  windowState: WindowState;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
}

export const InternetWindow: React.FC<InternetWindowProps> = ({
  windowState,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
}) => {
  const [url, setUrl] = useState('https://xda-developers.com/dex-tab-a7-mod');
  const [isReadingFull, setIsReadingFull] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
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
      }
    : {
        position: 'absolute',
        top: `${windowState.y}px`,
        left: `${windowState.x}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      style={windowStyle}
      onClick={onFocus}
      className="pointer-events-auto bg-[#272a31]/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col border border-[#424654]/30 select-none transition-shadow"
    >
      {/* Title & URL bar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-9 px-3 bg-[#32353c]/60 flex items-center justify-between cursor-move select-none border-b border-[#424654]/30"
      >
        <div className="flex items-center gap-2 flex-1 mr-2">
          <button
            onClick={() => setIsReadingFull(false)}
            className="text-[#4cd6ff] hover:opacity-80 transition-opacity"
            title="Samsung Internet"
          >
            <span className="material-symbols-outlined text-[16px]">public</span>
          </button>
          <div className="flex-1 bg-[#191b23] rounded-md px-2 py-0.5 flex items-center justify-between text-xs">
            <span className="font-label-code text-[#c3c6d7] truncate max-w-[260px] sm:max-w-none">
              {url}
            </span>
            <div className="flex items-center gap-1.5 text-[#4cd6ff]">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                title="Bookmark"
                className="hover:text-white transition-colors"
              >
                <span className={`material-symbols-outlined text-[13px] ${isBookmarked ? 'fill-1 text-[#ffb4ab]' : ''}`}>
                  star
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1d2027] text-[#c3c6d7] transition-colors"
            title="Minimize"
          >
            <span className="material-symbols-outlined text-[14px]">remove</span>
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1d2027] text-[#c3c6d7] transition-colors"
            title={windowState.isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="material-symbols-outlined text-[13px]">crop_square</span>
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#93000a] hover:text-[#ffdad6] text-[#c3c6d7] transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      </div>

      {/* Article Preview or Full Reader Body */}
      {!isReadingFull ? (
        <div className="p-3.5 bg-[#191b23]/50 flex-1 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#007e9b]/30 text-[#4cd6ff] font-label-code text-[10px]">
                COMMUNITY MOD
              </span>
              <span className="font-body-sm text-[11px] text-[#c3c6d7]">4 min read</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#e0e2ec] text-sm line-clamp-1">
              Running Samsung DeX on Tab A7: Workstation Optimization Guide
            </h3>
            <p className="font-body-sm text-body-sm text-[#c3c6d7] mt-1 line-clamp-3">
              Through targeted system UI overrides and swap partition tuning, the Galaxy Tab A7
              delivers a surprisingly smooth desktop experience for multi-window productivity,
              cloud document editing, and keyboard navigation.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#32353c]/30">
            <span className="font-label-code text-[10px] text-[#8d90a0]">
              Author: @galaxy_tinkerer
            </span>
            <button
              onClick={() => setIsReadingFull(true)}
              className="font-body-sm text-body-sm text-[#b2c5ff] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              <span>Read article</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#191b23]/70 flex-1 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#32353c]/40">
            <button
              onClick={() => setIsReadingFull(false)}
              className="flex items-center gap-1 text-xs text-[#b2c5ff] hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Back to Overview
            </button>
            <span className="font-label-code text-[10px] text-[#4cd6ff]">XDA Portal Featured</span>
          </div>

          <h2 className="text-base font-bold text-[#e0e2ec]">
            Running Samsung DeX on Tab A7: Complete Hardware Tuning Guide
          </h2>

          <div className="text-xs text-[#c3c6d7] space-y-2 leading-relaxed">
            <p>
              The <strong>Samsung Galaxy Tab A7 (SM-T500)</strong> with its Qualcomm Snapdragon 662
              and 3GB of RAM wasn&apos;t officially equipped with native HDMI DeX, but its landscape
              workstation potential can be fully unlocked.
            </p>

            <div className="p-2.5 bg-[#272a31]/70 rounded-xl space-y-1.5 border border-[#424654]/20">
              <span className="font-semibold text-[#4cd6ff] block">Key Tuning Parameters:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li><strong>ZRAM Swap Pool:</strong> Configured at 1,536 MB (compression LZ4)</li>
                <li><strong>Window Edge Snapping:</strong> 50/50 dual split or 3-pane tile layout</li>
                <li><strong>Pointer Acceleration:</strong> Raw Bluetooth mouse HID with zero smoothing</li>
                <li><strong>Display Output:</strong> 2000×1200 native resolution at 60 FPS</li>
              </ul>
            </div>

            <p>
              With these tweaks, switching between Samsung Notes, office documents, and web browsing
              is remarkably snappy and responsive.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
