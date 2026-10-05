import os

code = """import React from 'react';
import {
  Users,
  FileText,
  Calendar,
  Pill,
  Upload,
  Building2,
  Stethoscope,
  MessageSquareHeart,
  Siren,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Clock,
  ChevronRight,
  Heart,
  AlertCircle
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';

export const OverviewDashboard: React.FC = () => {
  const {
    familyMembers,
    documents,
    activityLog,
    setActiveMemberId,
    setActiveTab,
    setIsEmergencyModalOpen
  } = useCareVault();

  const totalMeds = familyMembers.reduce((acc, m) => acc + m.currentMedications.length, 0);
  const totalUpcoming = familyMembers.filter((m) => m.upcomingAppointment).length;

  const openMemberDetail = (id: string) => {
    setActiveMemberId(id);
    setActiveTab('family');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good evening, Roshan
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            &ldquo;Here&apos;s what&apos;s happening with your family&apos;s health.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Ask CareVault AI</span>
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/20 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <SafetyNotice />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Family Members"
          value={familyMembers.length}
          subtitle="4 active profiles"
          icon={Users}
          color="brand"
          onClick={() => setActiveTab('family')}
        />
        <StatCard
          label="Medical Records"
          value={documents.length + 27}
          subtitle="All lifelong documents indexed"
          icon={FileText}
          color="teal"
          onClick={() => setActiveTab('vault')}
        />
        <StatCard
          label="Upcoming Visits"
          value={totalUpcoming}
          subtitle="Next: Sep 24 (Father)"
          icon={Calendar}
          color="amber"
          onClick={() => setActiveTab('doctorPrep')}
        />
        <StatCard
          label="Active Medicines"
          value={totalMeds}
          subtitle="Across 4 family profiles"
          icon={Pill}
          color="emerald"
          onClick={() => setActiveTab('family')}
        />
      </div>

      {/* Family Members Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Family Health Spaces</h2>
            <p className="text-xs text-slate-500">Click any member to open their personal health dashboard</p>
          </div>
          <button
            onClick={() => setActiveTab('family')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View all details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {familyMembers.map((member) => {
            const hasAppointment = Boolean(member.upcomingAppointment);
            return (
              <div
                key={member.id}
                onClick={() => openMemberDetail(member.id)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card hover:border-brand-300 transition-all cursor-pointer group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {member.relationship} • {member.age} yrs
                        </p>
                      </div>
                    </div>
                    <Badge variant="neutral">{member.bloodGroup}</Badge>
                  </div>

                  {/* Conditions & Allergies */}
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {member.conditions.slice(0, 2).map((c, i) => (
                        <Badge key={i} variant="brand" size="sm">
                          {c}
                        </Badge>
                      ))}
                      {member.conditions.length > 2 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{member.conditions.length - 2} more
                        </span>
                      )}
                    </div>

                    {member.allergies.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-rose-700 bg-rose-50/80 px-2 py-1 rounded-lg border border-rose-100">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">Allergy: {member.allergies[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Vault Documents:</span>
                    <span className="font-semibold text-slate-800">{member.documentCount || 6} records</span>
                  </div>

                  {hasAppointment ? (
                    <div className="flex items-center justify-between text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium text-[11px]">
                      <span>Next Follow-up:</span>
                      <span className="font-bold">{member.upcomingAppointment?.date.slice(5)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Next Appointment:</span>
                      <span>None scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Quick Healthcare Actions</h2>
          <p className="text-xs text-slate-500 mb-5">Common shortcuts for fast health navigation</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <button
              onClick={() => setActiveTab('vault')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-brand-50 hover:border-brand-200 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-brand-700">Upload Prescription</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Extract & digitize rx</p>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-teal-50 hover:border-teal-200 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-teal-700">Upload Lab Report</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">AI blood test summary</p>
            </button>

            <button
              onClick={() => setActiveTab('hospitals')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-indigo-50 hover:border-indigo-200 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Find Hospital</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Match specialty & budget</p>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Find Doctor</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Top verified specialists</p>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-purple-50 hover:border-purple-200 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">Ask CareVault</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Q&A on family records</p>
            </button>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Siren className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-rose-900">Emergency SOS</h3>
              <p className="text-[11px] text-rose-700 mt-0.5">1-tap hospital dial</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
              <span className="text-[11px] font-semibold text-slate-400">Live feed</span>
            </div>

            <div className="space-y-4">
              {activityLog.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0 ring-4 ring-brand-50" />
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium leading-snug">{act.text}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{act.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('vault')}
            className="w-full mt-6 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/60 transition-colors flex items-center justify-center gap-1"
          >
            <span>Open Health Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};"""

os.makedirs('src/components/dashboard', exist_ok=True)
with open('src/components/dashboard/OverviewDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Wrote OverviewDashboard.tsx')
