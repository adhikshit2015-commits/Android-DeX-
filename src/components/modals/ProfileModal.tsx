import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 pointer-events-auto bg-black/20 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs bg-[#191b23] border border-[#424654]/40 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-2 duration-150 text-xs"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-[#32353c]/40">
          <div className="w-10 h-10 rounded-full bg-[#b2c5ff] flex items-center justify-center text-[#002b74] font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-bold text-sm text-[#e0e2ec] block truncate">
              Galaxy Workstation User
            </span>
            <span className="text-[11px] text-[#4cd6ff] font-label-code truncate block">
              adhikshit2015@gmail.com
            </span>
          </div>
        </div>

        <div className="py-3 space-y-2 text-[#c3c6d7]">
          <div className="flex justify-between items-center py-1">
            <span>Hardware Model</span>
            <span className="font-label-code text-[#e0e2ec]">SM-T500 (Tab A7)</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Samsung One UI</span>
            <span className="font-label-code text-[#4cd6ff]">v6.1 DeX Slate</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Cloud Sync</span>
            <span className="font-label-code text-[#b2c5ff]">Active • OneDrive</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#32353c]/40 flex justify-between gap-2">
          <button
            onClick={() => {
              alert('Samsung Account settings opened.');
              onClose();
            }}
            className="flex-1 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-center font-medium text-[#e0e2ec] transition-colors"
          >
            Account
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#2c6bed] hover:bg-[#0055d4] text-center font-medium text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
