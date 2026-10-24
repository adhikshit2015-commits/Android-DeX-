import React, { useState } from 'react';
import { WindowState } from '../../types/dex';

interface GalleryWindowProps {
  windowState: WindowState;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
}

interface PhotoItem {
  id: string;
  title: string;
  date: string;
  category: 'wallpaper' | 'screenshot' | 'camera';
  gradient: string;
  icon: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    title: 'DeX Cosmic Slate 4K',
    date: 'Oct 24, 2026',
    category: 'wallpaper',
    gradient: 'from-[#10131a] via-[#2c6bed]/30 to-[#4a0fce]/40',
    icon: 'wallpaper',
  },
  {
    id: 'p2',
    title: 'Tab A7 Hardware Render',
    date: 'Oct 23, 2026',
    category: 'camera',
    gradient: 'from-[#1d2027] via-[#007e9b]/30 to-[#10131a]',
    icon: 'tablet_android',
  },
  {
    id: 'p3',
    title: 'Geekbench 5 Multi-Core 1390',
    date: 'Oct 22, 2026',
    category: 'screenshot',
    gradient: 'from-[#272a31] via-[#93000a]/20 to-[#32353c]',
    icon: 'speed',
  },
  {
    id: 'p4',
    title: 'Dual Window 50-50 Split',
    date: 'Oct 21, 2026',
    category: 'screenshot',
    gradient: 'from-[#0b0e15] via-[#2c6bed]/40 to-[#007e9b]/20',
    icon: 'splitscreen',
  },
  {
    id: 'p5',
    title: 'Samsung Notes Stylus Sketch',
    date: 'Oct 20, 2026',
    category: 'camera',
    gradient: 'from-[#32353c] via-[#4a0fce]/30 to-[#191b23]',
    icon: 'draw',
  },
  {
    id: 'p6',
    title: 'Suwon Campus Aerial Shot',
    date: 'Oct 19, 2026',
    category: 'camera',
    gradient: 'from-[#191b23] via-[#0055d4]/30 to-[#272a31]',
    icon: 'photo_camera',
  },
];

export const GalleryWindow: React.FC<GalleryWindowProps> = ({
  windowState,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'wallpaper' | 'screenshot' | 'camera'>('all');

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest('button, input')) return;
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

  const filteredPhotos = filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === filter);

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
      className="pointer-events-auto bg-[#191b23]/90 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#424654]/30 select-none transition-shadow"
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 px-3 bg-[#32353c]/50 flex items-center justify-between cursor-move select-none border-b border-[#424654]/30"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#93000a] to-[#2c6bed] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[14px]">photo_library</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-[#e0e2ec] text-sm">Gallery</span>
          <span className="font-label-code text-label-code text-[#c3c6d7] ml-2 opacity-60">
            Pictures &amp; Albums
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">remove</span>
          </button>
          <button
            onClick={onMaximize}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">crop_square</span>
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#93000a] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="h-9 px-3 bg-[#272a31]/40 flex items-center justify-between border-b border-[#32353c]/30 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-md transition-colors ${
              filter === 'all' ? 'bg-[#2c6bed] text-white font-medium' : 'text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('wallpaper')}
            className={`px-2 py-1 rounded-md transition-colors ${
              filter === 'wallpaper' ? 'bg-[#2c6bed] text-white font-medium' : 'text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            Wallpapers
          </button>
          <button
            onClick={() => setFilter('screenshot')}
            className={`px-2 py-1 rounded-md transition-colors ${
              filter === 'screenshot' ? 'bg-[#2c6bed] text-white font-medium' : 'text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            Screenshots
          </button>
          <button
            onClick={() => setFilter('camera')}
            className={`px-2 py-1 rounded-md transition-colors ${
              filter === 'camera' ? 'bg-[#2c6bed] text-white font-medium' : 'text-[#c3c6d7] hover:bg-[#272a31]'
            }`}
          >
            Camera
          </button>
        </div>

        <span className="text-[11px] text-[#8d90a0] font-label-code">
          {filteredPhotos.length} items
        </span>
      </div>

      {/* Grid or Lightbox */}
      <div className="flex-1 p-3 bg-[#0b0e15]/60 overflow-y-auto">
        {selectedPhoto ? (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="flex items-center gap-1 text-xs text-[#b2c5ff] hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Back to Gallery
              </button>
              <span className="font-label-code text-[11px] text-[#c3c6d7]">
                {selectedPhoto.date}
              </span>
            </div>

            <div
              className={`flex-1 rounded-2xl bg-gradient-to-br ${selectedPhoto.gradient} flex flex-col items-center justify-center p-6 border border-[#424654]/30 shadow-inner`}
            >
              <span className="material-symbols-outlined text-[64px] text-[#b2c5ff]/80 mb-3 animate-pulse">
                {selectedPhoto.icon}
              </span>
              <h3 className="text-base font-semibold text-[#e0e2ec]">{selectedPhoto.title}</h3>
              <p className="text-xs text-[#c3c6d7] mt-1">High-definition render • 2000 × 1200 pixels</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-xl overflow-hidden cursor-pointer border border-[#424654]/20 hover:border-[#b2c5ff]/40 transition-all aspect-[4/3] flex flex-col justify-end p-2.5 bg-gradient-to-br hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(39, 42, 49, 0.9), rgba(16, 19, 26, 0.95))`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity">
                  <span className="material-symbols-outlined text-[36px] text-[#b2c5ff]">
                    {photo.icon}
                  </span>
                </div>
                <div className="relative z-10 bg-[#0b0e15]/70 backdrop-blur-md p-1.5 rounded-lg">
                  <span className="block text-[11px] font-medium text-[#e0e2ec] truncate">
                    {photo.title}
                  </span>
                  <span className="block text-[9px] font-label-code text-[#8d90a0]">
                    {photo.date}
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
