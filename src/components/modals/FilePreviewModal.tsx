import React from 'react';
import { FileItem } from '../../types/dex';

interface FilePreviewModalProps {
  file: FileItem | null;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#191b23] border border-[#424654]/40 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-11 px-4 bg-[#272a31] flex items-center justify-between border-b border-[#32353c]/40">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[20px] ${file.color}`}>
              {file.icon}
            </span>
            <span className="font-semibold text-sm text-[#e0e2ec] truncate">{file.name}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#32353c] text-[#c3c6d7] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#10131a] border border-[#32353c]/40 space-y-2">
            <div className="flex justify-between text-xs text-[#c3c6d7]">
              <span>Format: <strong className="text-[#e0e2ec] uppercase">{file.type}</strong></span>
              <span>Size: <strong className="text-[#e0e2ec]">{file.size}</strong></span>
              <span>Modified: <strong className="text-[#e0e2ec]">{file.date}</strong></span>
            </div>
            {file.content && (
              <div className="mt-2 pt-2 border-t border-[#32353c]/40 text-xs font-label-code text-[#4cd6ff] bg-[#0b0e15] p-2.5 rounded-lg whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {file.content}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-xs font-medium text-[#e0e2ec] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`File ${file.name} opened in associated DeX viewer.`);
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-[#2c6bed] hover:bg-[#0055d4] text-xs font-medium text-white transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              Open File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
