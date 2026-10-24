import React, { useState } from 'react';
import { ALL_APPS_LIST, INITIAL_FILES } from '../../data/mockData';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenApp,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedApps = ALL_APPS_LIST.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const matchedFiles = INITIAL_FILES.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#191b23] border border-[#424654]/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-3 bg-[#272a31] flex items-center gap-2.5 border-b border-[#32353c]/40">
          <span className="material-symbols-outlined text-[#4cd6ff] text-[22px]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, files, Samsung Notes, settings..."
            className="flex-1 bg-transparent text-sm text-[#e0e2ec] placeholder-[#8d90a0] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Applications Section */}
          {matchedApps.length > 0 && (
            <div>
              <span className="font-semibold text-[#8d90a0] uppercase tracking-wider text-[10px] block mb-2 font-label-code">
                Applications
              </span>
              <div className="grid grid-cols-2 gap-2">
                {matchedApps.slice(0, 6).map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-[#272a31]/50 hover:bg-[#272a31] flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${app.iconGradient} flex items-center justify-center text-white shrink-0`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{app.icon}</span>
                    </div>
                    <span className="font-medium text-[#e0e2ec] truncate">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents & Files Section */}
          {matchedFiles.length > 0 && (
            <div>
              <span className="font-semibold text-[#8d90a0] uppercase tracking-wider text-[10px] block mb-2 font-label-code">
                Matching Files
              </span>
              <div className="space-y-1">
                {matchedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => {
                      onOpenApp('files');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-[#272a31]/40 hover:bg-[#272a31] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[18px] ${file.color}`}>
                        {file.icon}
                      </span>
                      <span className="text-[#e0e2ec] font-medium">{file.name}</span>
                    </div>
                    <span className="text-[10px] font-label-code text-[#8d90a0]">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedApps.length === 0 && matchedFiles.length === 0 && (
            <div className="py-8 text-center text-[#8d90a0]">
              <span className="material-symbols-outlined text-[32px] mb-1">search_off</span>
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
