import React, { useState } from 'react';
import {
  FamilyMember,
  MedicalDocument,
  MedicalTimelineItem
} from '../../types';
import { useCareVault } from '../../context/CareVaultContext';
import {
  Calendar,
  FileText,
  Pill,
  ShieldAlert,
  Clock,
  Sparkles,
  Phone,
  AlertTriangle,
  Stethoscope,
  Building2,
  ChevronRight,
  FileCheck2,
  Share2,
  Printer
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface MemberDetailProps {
  member: FamilyMember;
}

export const MemberDetail: React.FC<MemberDetailProps> = ({ member }) => {
  const {
    documents,
    timeline,
    setActiveTab,
    setSelectedDocForSummary
  } = useCareVault();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'timeline' | 'docs'>('overview');

  const memberDocs = documents.filter((d) => d.memberId === member.id);
  const memberTimeline = timeline.filter((t) => t.memberId === member.id);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
      {/* Member Profile Hero Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-extrabold">{member.name}</h2>
              <Badge variant="teal">{member.relationship}</Badge>
              <Badge variant="neutral">{member.bloodGroup}</Badge>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {member.age} Years Old • Gender: {member.gender} • Emergency Contact: {member.emergencyContact.phone}
            </p>
            {member.upcomingAppointment && (
              <div className="mt-2.5 inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Follow-up: {member.upcomingAppointment.date} ({member.upcomingAppointment.doctorName})</span>
              </div>
            )}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('doctorPrep')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Prepare for Doctor</span>
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Ask CareVault</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 px-6 flex items-center gap-6 bg-slate-50/50">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`py-4 text-xs font-bold border-b-2 transition-all ${
            activeSubTab === 'overview'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Health Overview & Medicines
        </button>
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`py-4 text-xs font-bold border-b-2 transition-all ${
            activeSubTab === 'timeline'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Medical Timeline ({memberTimeline.length})
        </button>
        <button
          onClick={() => setActiveSubTab('docs')}
          className={`py-4 text-xs font-bold border-b-2 transition-all ${
            activeSubTab === 'docs'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Stored Documents ({memberDocs.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {/* 1. Health Overview */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Grid: Conditions & Allergies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Conditions */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Diagnosed Chronic Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.conditions.map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* Known Allergies & Alerts */}
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200">
                <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Known Allergies & Contraindications
                </h3>
                <div className="space-y-2">
                  {member.allergies.map((allergy, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-900 text-xs font-bold shadow-2xs"
                    >
                      ⚠️ {allergy}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Medications Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-brand-600" />
                  Active Medications ({member.currentMedications.length})
                </h3>
                <span className="text-xs text-slate-400">Prescribed dosage & timing</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200/80">
                    <tr>
                      <th className="py-3 px-4">Medicine & Strength</th>
                      <th className="py-3 px-4">Dosage</th>
                      <th className="py-3 px-4">Frequency</th>
                      <th className="py-3 px-4">Timing</th>
                      <th className="py-3 px-4">Prescribed By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {member.currentMedications.map((med) => (
                      <tr key={med.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{med.name}</td>
                        <td className="py-3.5 px-4 text-slate-700">{med.dosage}</td>
                        <td className="py-3.5 px-4 font-medium text-brand-700">{med.frequency}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant="neutral">{med.timing}</Badge>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{med.prescribedBy || 'Primary Physician'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Emergency Clinical Notes */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold mr-1">Emergency Protocols & Care Notes:</span>
              <span>{member.emergencyNotes}</span>
            </div>
          </div>
        )}

        {/* 2. Medical Timeline */}
        {activeSubTab === 'timeline' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-500">
              Chronological lifetime record of doctor consultations, hospitalizations, and diagnostic reports.
            </p>

            <div className="relative pl-6 border-l-2 border-brand-200 space-y-8">
              {memberTimeline.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-brand-600 shadow-sm group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-50/80 hover:bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-soft transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="brand">{item.year}</Badge>
                        <span className="text-xs font-semibold text-slate-400">{item.date}</span>
                        <Badge variant="teal">{item.category}</Badge>
                      </div>
                      {item.facilityName && (
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {item.facilityName}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.summary}</p>
                    {item.doctorName && (
                      <p className="text-[11px] text-brand-700 font-medium mt-2">
                        Consultant: {item.doctorName}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Stored Documents */}
        {activeSubTab === 'docs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memberDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-brand-300 bg-white shadow-2xs hover:shadow-soft transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="brand">{doc.category}</Badge>
                      <span className="text-xs text-slate-400">{doc.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">{doc.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {doc.hospitalName || doc.doctorName || 'Medical Facility'} • {doc.fileSize}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-600 font-semibold">✓ AI Analyzed</span>
                    <button
                      onClick={() => {
                        setSelectedDocForSummary(doc);
                        setActiveTab('vault');
                      }}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View AI Summary</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};