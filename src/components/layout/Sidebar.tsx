import React from 'react';
import {
  LayoutDashboard,
  Users,
  FolderLock,
  MessageSquareHeart,
  Building2,
  Stethoscope,
  ShieldCheck,
  Calculator,
  Pill,
  Siren,
  Sparkles,
  Activity,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import { useCareVault, NavTab } from '../../context/CareVaultContext';

interface SidebarProps {
  onOpenEmergency: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenEmergency }) => {
  const { activeTab, setActiveTab, resetToDemoData } = useCareVault();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'vault', label: 'Health Vault', icon: FolderLock },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquareHeart, badge: 'AI' },
    { id: 'doctorPrep', label: 'Prepare for Doctor', icon: FileCheck2 },
    { id: 'hospitals', label: 'Hospitals', icon: Building2 },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'costPlanner', label: 'Cost Planner', icon: Calculator },
    { id: 'pharmacies', label: 'Pharmacies', icon: Pill },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 shrink-0 h-screen sticky top-0 select-none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-sm font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">Care<span className="text-brand-600">Vault</span></span>
              <span className="block text-[10px] font-medium text-slate-400 -mt-1">Family Health Platform</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-100 text-teal-700 border border-teal-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <button
            onClick={onOpenEmergency}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-500/20 transition-all"
          >
            <Siren className="w-4 h-4 animate-bounce" />
            <span>Emergency SOS</span>
          </button>

          <button
            onClick={resetToDemoData}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
            title="Reset all demo family records to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'overview' ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'family' ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Family</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'vault' ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <FolderLock className="w-5 h-5 mb-0.5" />
          <span>Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'assistant' ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <MessageSquareHeart className="w-5 h-5 mb-0.5" />
          <span>Assistant</span>
        </button>

        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold text-rose-600"
        >
          <Siren className="w-5 h-5 mb-0.5" />
          <span>SOS</span>
        </button>
      </nav>
    </>
  );
};
