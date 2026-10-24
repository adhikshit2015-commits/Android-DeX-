import React, { useState } from 'react';

interface CalendarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarDrawer: React.FC<CalendarDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState(24);

  if (!isOpen) return null;

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-end p-4 pb-16 pointer-events-auto bg-black/20 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#111621]/95 backdrop-blur-3xl rounded-2xl p-4 border border-[#424654]/40 shadow-[0_24px_60px_rgba(0,0,0,0.75)] animate-in slide-in-from-bottom-4 duration-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#32353c]/40">
          <div>
            <span className="font-headline-sm text-sm text-[#e0e2ec] font-bold block">
              October 2026
            </span>
            <span className="text-[11px] text-[#4cd6ff] font-label-code">
              Thursday, Oct 24
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#272a31] text-[#c3c6d7]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center font-label-code text-[10px] text-[#8d90a0] my-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-body-sm text-xs">
          {/* Offset for Thursday (4 dummy slots) */}
          <div /><div /><div /><div />
          {daysInMonth.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-7 w-7 rounded-lg mx-auto flex items-center justify-center transition-colors ${
                day === selectedDay
                  ? 'bg-[#2c6bed] text-white font-bold'
                  : day === 24
                  ? 'bg-[#007e9b]/30 text-[#4cd6ff] font-semibold'
                  : 'text-[#c3c6d7] hover:bg-[#272a31]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Today's Agenda */}
        <div className="mt-4 pt-3 border-t border-[#32353c]/40 space-y-2">
          <span className="text-[11px] font-semibold text-[#e0e2ec] block">
            Scheduled for Oct {selectedDay}
          </span>
          <div className="p-2 rounded-xl bg-[#1d2027] border border-[#32353c]/30 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#dae2ff]">Samsung DeX Benchmark Sync</span>
              <span className="text-[10px] font-label-code text-[#4cd6ff]">2:00 PM</span>
            </div>
            <p className="text-[11px] text-[#8d90a0] mt-0.5">
              Review memory swap governor and dual 50/50 window tiling on Galaxy Tab A7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
