import os

doctor_prep_page = """import React, { useState } from 'react';
import { useCareVault } from '../../context/CareVaultContext';
import { AIService } from '../../services/aiService';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';
import {
  FileCheck2,
  Copy,
  Printer,
  Check,
  User,
  Heart,
  Pill,
  ShieldAlert,
  HelpCircle,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

export const PrepareDoctorPage: React.FC = () => {
  const { familyMembers, documents, activeMemberId, setActiveMemberId } = useCareVault();

  const [selectedId, setSelectedId] = useState(activeMemberId || 'fam-father');
  const [copied, setCopied] = useState(false);

  const selectedMember = familyMembers.find((m) => m.id === selectedId) || familyMembers[0];
  const summary = AIService.generateDoctorVisitSummary(selectedMember, documents);

  const handleCopy = () => {
    const text = `PREPARE FOR DOCTOR SUMMARY — CAREVAULT
Patient: ${summary.patientName} (${summary.age}y, ${summary.gender})
Blood Group: ${summary.bloodGroup}
Date: ${summary.dateGenerated}

MAIN CONCERNS:
${summary.mainConcerns.map((c) => `- ${c}`).join('\\n')}

EXISTING CONDITIONS:
${summary.existingConditions.map((c) => `- ${c}`).join('\\n')}

KNOWN ALLERGIES:
${summary.allergies.map((a) => `- ${a}`).join('\\n')}

ACTIVE MEDICATIONS:
${summary.currentMedications.map((m) => `- ${m.name} (${m.dosage}) [${m.frequency}]`).join('\\n')}

RECENT REPORTS:
${summary.recentReports.map((r) => `- ${r.title} (${r.date}): ${r.keyResult}`).join('\\n')}

QUESTIONS FOR DOCTOR:
${summary.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-600/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Prepare for Doctor
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Generate a concise, 1-page clinical briefing to take to your upcoming consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold shadow-soft transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      <SafetyNotice />

      {/* Select Patient Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Select Patient Profile:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {familyMembers.map((m) => {
            const isSelected = selectedId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedId(m.id);
                  setActiveMemberId(m.id);
                }}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold ring-1 ring-brand-500 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold truncate">{m.name}</p>
                  <p className="text-[10px] text-slate-500">{m.relationship} ({m.age}y)</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Printable Clinical Brief Document */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 space-y-6 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b-2 border-slate-900 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900 uppercase tracking-wider">Patient Visit Summary</span>
              <Badge variant="brand">CareVault Health Brief</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Generated on {summary.dateGenerated} • For clinical consultation support
            </p>
          </div>

          <div className="text-right sm:text-right text-xs">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">Patient Profile</span>
            <span className="text-sm font-extrabold text-slate-900">{summary.patientName}</span>
            <span className="block text-slate-600 font-medium">{summary.age} yrs • {summary.gender} • Blood Group: {summary.bloodGroup}</span>
          </div>
        </div>

        {/* 1. Main Concerns / Reasons for Consultation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            1. Primary Reasons for Consultation
          </h3>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-1.5">
            {summary.mainConcerns.map((c, i) => (
              <div key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                <span className="font-bold text-brand-600">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Existing Conditions & Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-brand-600" />
              Diagnosed Chronic Conditions
            </h3>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
              {summary.existingConditions.map((cond, i) => (
                <div key={i} className="text-xs text-slate-800 font-medium">
                  • {cond}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Known Drug Allergies & Precautions
            </h3>
            <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-200 space-y-1">
              {summary.allergies.map((allergy, i) => (
                <div key={i} className="text-xs text-rose-900 font-bold">
                  ⚠️ {allergy}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Current Active Medications */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-brand-600" />
            Current Active Medications ({summary.currentMedications.length})
          </h3>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5">Medicine Name</th>
                  <th className="py-2.5 px-3.5">Dosage</th>
                  <th className="py-2.5 px-3.5">Frequency / Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.currentMedications.map((med, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3.5 font-bold text-slate-900">{med.name}</td>
                    <td className="py-2.5 px-3.5 text-slate-700">{med.dosage}</td>
                    <td className="py-2.5 px-3.5 font-medium text-brand-700">{med.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Recent Reports & Diagnostics */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            Recent Diagnostic Lab & Imaging Reports
          </h3>
          <div className="space-y-2">
            {summary.recentReports.map((rep, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs flex justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900">{rep.title}</span>
                  <p className="text-slate-600 mt-0.5">{rep.keyResult}</p>
                </div>
                <span className="text-slate-400 text-[11px] font-semibold shrink-0">{rep.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Specific Questions for Doctor */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            Specific Questions Prepared for the Physician
          </h3>
          <ol className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 text-xs sm:text-sm text-teal-950 font-medium">
            {summary.questionsForDoctor.map((q, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold text-teal-700">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Safety notice in brief */}
        <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 italic">
          This patient briefing was generated by CareVault for doctor visit facilitation based on stored medical documents. It is not an automated diagnosis or prescription.
        </div>
      </div>
    </div>
  );
};"""

os.makedirs('src/components/doctorPrep', exist_ok=True)
with open('src/components/doctorPrep/PrepareDoctorPage.tsx', 'w', encoding='utf-8') as f:
    f.write(doctor_prep_page)
print('Wrote PrepareDoctorPage.tsx')
