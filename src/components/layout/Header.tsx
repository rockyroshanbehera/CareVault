import React, { useState } from 'react';
import {
  Search,
  Bell,
  Siren,
  Sparkles,
  ChevronDown,
  User,
  Heart,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency }) => {
  const {
    familyMembers,
    activeMember,
    setActiveMemberId,
    setIsGlobalSearchOpen,
    isDemoMode,
    setIsDemoMode
  } = useCareVault();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      <div className="flex-1 max-w-lg">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-xl text-xs sm:text-sm border border-slate-200/60 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            <span className="truncate">Search Dad records, prescriptions, hospitals, doctors...</span>
          </div>
          <kbd className="hidden sm:inline-block text-[10px] font-semibold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => setShowMemberDropdown(!showMemberDropdown)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors"
          >
            <img
              src={activeMember.avatar}
              alt={activeMember.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-500"
            />
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                {activeMember.name}
              </span>
              <span className="block text-[10px] text-slate-500 leading-none">
                {activeMember.relationship} ({activeMember.age}y)
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showMemberDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-slate-100 py-2 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Family Member
              </div>
              {familyMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMemberId(m.id);
                    setShowMemberDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-brand-50/60 transition-colors ${
                    activeMember.id === m.id ? 'bg-brand-50/40 text-brand-700 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{m.name}</p>
                    <p className="text-[10px] text-slate-500">{m.relationship} • {m.bloodGroup}</p>
                  </div>
                  {activeMember.id === m.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Demo Mode Active</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-slate-100 p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Health Notifications</span>
                <span className="text-[11px] text-brand-600 font-semibold cursor-pointer">Mark read</span>
              </div>
              <div className="space-y-3 pt-3">
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Dad Cardiology Follow-up</p>
                    <p className="text-slate-500 text-[11px]">Appointment with Dr. Vivek Sharma on 24 Sep at Apollo Hospitals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Thyroid Retest Reminder</p>
                    <p className="text-slate-500 text-[11px]">Mom TSH repeat lab check scheduled in 2 weeks.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onOpenEmergency}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
        >
          <Siren className="w-4 h-4 text-rose-600" />
          <span className="hidden sm:inline">Emergency</span>
        </button>
      </div>
    </header>
  );
};
