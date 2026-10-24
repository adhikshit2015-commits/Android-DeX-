import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#191b23] border border-[#424654]/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        <div className="h-11 px-4 bg-[#272a31] flex items-center justify-between border-b border-[#32353c]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd6ff] text-[20px]">help_outline</span>
            <span className="font-semibold text-sm text-[#e0e2ec]">Samsung DeX Workstation Guide</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-[#c3c6d7]">
          <div>
            <h4 className="font-bold text-[#e0e2ec] mb-1 text-sm">Keyboard Shortcuts Cheat Sheet</h4>
            <div className="space-y-1.5 mt-2 font-body-sm">
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Open App Drawer</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Win / Meta</kbd>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Show Desktop / Minimize All</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Win + D</kbd>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Open File Explorer (My Files)</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Win + E</kbd>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Universal Search</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Win + S</kbd>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Snap Window Left / Right</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Win + ← / →</kbd>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-[#10131a]">
                <span className="text-[#e0e2ec]">Switch Task</span>
                <kbd className="font-label-code px-1.5 py-0.5 rounded bg-[#272a31] text-[#4cd6ff]">Alt + Tab</kbd>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#272a31]/60 border border-[#424654]/20 space-y-1">
            <span className="font-bold text-[#e0e2ec] block">Galaxy Tab A7 Hardware Profile</span>
            <p className="text-[11px] leading-relaxed">
              Equipped with Qualcomm Snapdragon 662 (4x Kryo 260 Gold 2.0 GHz + 4x Kryo 260 Silver 1.8 GHz) and Adreno 610 GPU.
              Configured with 3.0 GB LPDDR4x physical memory and +1.5 GB ZRAM swap compression.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#2c6bed] hover:bg-[#0055d4] text-white font-medium transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
