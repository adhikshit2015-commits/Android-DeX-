import React, { useState } from 'react';
import { WindowState, FileItem } from '../../types/dex';

interface FilesWindowProps {
  windowState: WindowState;
  files: FileItem[];
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onOpenFile: (file: FileItem) => void;
}

export const FilesWindow: React.FC<FilesWindowProps> = ({
  windowState,
  files,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onOpenFile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'recent' | 'images' | 'documents'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState('/Internal/DeX_Work');

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

  // Filter files by category & search
  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory === 'images') {
      return f.type === 'image';
    }
    if (selectedCategory === 'documents') {
      return f.type === 'pdf' || f.type === 'sheet' || f.type === 'script' || f.type === 'document';
    }
    return true; // recent shows all
  });

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
      className="pointer-events-auto bg-[#191b23]/85 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#424654]/30 select-none transition-shadow"
    >
      {/* Window Chrome / Header */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 px-3 bg-[#32353c]/50 flex items-center justify-between cursor-move select-none border-b border-[#424654]/30"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#2c6bed] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#fbf9ff] text-[14px]">folder</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-[#e0e2ec] text-sm">My Files</span>
          <span className="font-label-code text-label-code text-[#c3c6d7] ml-2 opacity-60">
            {currentPath}
          </span>
        </div>

        <div className="flex items-center gap-1">
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
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#93000a] hover:text-[#690005] text-[#c3c6d7] transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        </div>
      </div>

      {/* Window Toolbar */}
      <div className="h-9 px-3 bg-[#272a31]/30 flex items-center justify-between border-b border-[#32353c]/30 shrink-0">
        <div className="flex items-center gap-2 text-[#c3c6d7] font-body-sm text-body-sm">
          <button
            onClick={() => setCurrentPath('/Internal')}
            className="p-1 rounded-md hover:bg-[#272a31] text-[#e0e2ec] transition-colors"
            title="Back to /Internal"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </button>
          <button
            onClick={() => setCurrentPath('/Internal/DeX_Work')}
            className="p-1 rounded-md hover:bg-[#272a31] text-[#8d90a0] transition-colors"
            title="Forward to DeX_Work"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <span className="ml-2 font-medium text-[#e0e2ec]">Storage</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#32353c]/60 rounded-full px-2.5 py-0.5">
            <span className="material-symbols-outlined text-[14px] text-[#8d90a0]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search storage..."
              className="bg-transparent text-xs text-[#e0e2ec] placeholder-[#8d90a0] focus:outline-none w-28 font-body-sm"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className={`p-1 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-[#272a31] text-[#b2c5ff]' : 'hover:bg-[#272a31] text-[#c3c6d7]'
            }`}
            title="Toggle Grid / List view"
          >
            <span className="material-symbols-outlined text-[16px]">
              {viewMode === 'grid' ? 'grid_view' : 'view_list'}
            </span>
          </button>
        </div>
      </div>

      {/* Window Body (Split Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 bg-[#0b0e15]/60 p-2.5 flex flex-col gap-1 text-[#e0e2ec] font-body-sm text-body-sm border-r border-[#32353c]/30 shrink-0">
          <span className="px-2 py-1 text-[#c3c6d7] font-label-code text-[10px] uppercase font-semibold">
            Categories
          </span>

          <button
            onClick={() => setSelectedCategory('recent')}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${
              selectedCategory === 'recent'
                ? 'bg-[#272a31]/70 text-[#b2c5ff] font-medium'
                : 'hover:bg-[#272a31] text-[#c3c6d7]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span>Recent Files</span>
          </button>

          <button
            onClick={() => setSelectedCategory('images')}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${
              selectedCategory === 'images'
                ? 'bg-[#272a31]/70 text-[#b2c5ff] font-medium'
                : 'hover:bg-[#272a31] text-[#c3c6d7]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">image</span>
            <span>Images</span>
          </button>

          <button
            onClick={() => setSelectedCategory('documents')}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${
              selectedCategory === 'documents'
                ? 'bg-[#272a31]/70 text-[#b2c5ff] font-medium'
                : 'hover:bg-[#272a31] text-[#c3c6d7]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Documents</span>
          </button>

          <span className="px-2 pt-3 pb-1 text-[#c3c6d7] font-label-code text-[10px] uppercase font-semibold">
            Storage Devices
          </span>

          <div className="p-2 rounded-xl bg-[#272a31]/40 border border-[#424654]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#e0e2ec]">Internal Storage</span>
              <span className="font-label-code text-[10px] text-[#4cd6ff]">57%</span>
            </div>
            <div className="w-full bg-[#32353c] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#b2c5ff] h-full rounded-full" style={{ width: '57.5%' }}></div>
            </div>
            <span className="block mt-1 font-label-code text-[10px] text-[#c3c6d7]">
              18.4 GB / 32 GB
            </span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#272a31] text-[#c3c6d7] cursor-pointer transition-colors">
            <span className="material-symbols-outlined text-[16px]">sd_card</span>
            <span>SD Card (128GB)</span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#272a31] text-[#c3c6d7] cursor-pointer transition-colors">
            <span className="material-symbols-outlined text-[16px]">cloud</span>
            <span>OneDrive</span>
          </div>
        </div>

        {/* File Content Area */}
        <div className="flex-1 p-3 bg-[#191b23]/40 overflow-y-auto">
          {filteredFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#c3c6d7]">
              <span className="material-symbols-outlined text-[36px] text-[#8d90a0] mb-2">folder_open</span>
              <p className="text-xs">No files match your filter</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 content-start">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onOpenFile(file)}
                  className="p-2 rounded-xl bg-[#272a31]/50 hover:bg-[#32353c] cursor-pointer flex flex-col items-center text-center transition-all group border border-transparent hover:border-[#b2c5ff]/20 active:scale-95"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${file.bg} flex items-center justify-center mb-1 ${file.color} group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-[26px]">{file.icon}</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-[#e0e2ec] font-medium truncate w-full">
                    {file.name}
                  </span>
                  <span className="font-label-code text-[9px] text-[#8d90a0]">{file.size}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onOpenFile(file)}
                  className="p-2 rounded-lg bg-[#272a31]/30 hover:bg-[#32353c] cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`material-symbols-outlined text-[20px] ${file.color}`}>
                      {file.icon}
                    </span>
                    <span className="text-[#e0e2ec] font-medium truncate">{file.name}</span>
                  </div>
                  <span className="font-label-code text-[10px] text-[#8d90a0] shrink-0">
                    {file.size}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
