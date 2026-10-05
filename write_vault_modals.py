import os

doc_modal = """import React from 'react';
import { MedicalDocument } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Sparkles, Download, FileText, Calendar, Building2, User, CheckCircle2 } from 'lucide-react';

interface DocumentModalProps {
  document: MedicalDocument;
  onClose: () => void;
  onOpenSummary: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  onClose,
  onOpenSummary
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={document.title}
      subtitle={`Uploaded for ${document.memberName} • ${document.date}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2">
            <Badge variant="brand">{document.category}</Badge>
            <Badge variant="neutral">{document.fileType} • {document.fileSize}</Badge>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Indexed in Vault
            </span>
          </div>

          <button
            onClick={onOpenSummary}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Open AI Summary</span>
          </button>
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-inner space-y-4 font-mono text-xs text-slate-800 leading-relaxed">
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <div>
              <p className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {document.hospitalName || 'Care Diagnostic & Specialty Network'}
              </p>
              <p className="text-slate-500 font-sans text-[11px]">Bhubaneswar Healthcare Division</p>
            </div>
            <div className="text-right font-sans text-slate-500 text-[11px]">
              <p>Doc Ref: #CV-{document.id.slice(-6)}</p>
              <p>Date: {document.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2 font-sans text-xs bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name:</span>
              <span className="font-bold text-slate-900">{document.memberName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Consulting Physician:</span>
              <span className="font-bold text-slate-900">{document.doctorName || 'Dr. Vivek Sharma'}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="font-bold text-slate-900 uppercase font-sans text-xs">Clinical Evaluation Notes:</p>
            <p className="text-slate-700">
              {document.extractedSummary?.reasonForVisit}
            </p>
          </div>

          {document.extractedSummary?.importantFindings && (
            <div className="space-y-1.5 pt-2">
              <p className="font-bold text-slate-900 uppercase font-sans text-xs">Diagnostic Key Results:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                {document.extractedSummary.importantFindings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {document.extractedSummary?.medicinesMentioned && document.extractedSummary.medicinesMentioned.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <p className="font-bold text-slate-900 uppercase font-sans text-xs">Prescribed Regimen:</p>
              <div className="space-y-1 pl-2 font-sans">
                {document.extractedSummary.medicinesMentioned.map((m, i) => (
                  <div key={i} className="text-slate-800">
                    • <span className="font-bold">{m.name}</span> ({m.dosage}) — {m.instructions}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => alert('Downloading original document PDF...')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Original File</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};"""

ai_summary_modal = """import React, { useState } from 'react';
import { MedicalDocument } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';
import {
  Sparkles,
  Calendar,
  Pill,
  HelpCircle,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  Printer,
  FileText
} from 'lucide-react';

interface AISummaryModalProps {
  document: MedicalDocument;
  onClose: () => void;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({ document, onClose }) => {
  const [copied, setCopied] = useState(false);
  const summary = document.extractedSummary;

  const handleCopy = () => {
    const textToCopy = `CAREVAULT AI MEDICAL SUMMARY
Patient: ${document.memberName}
Document: ${document.title} (${document.date})

REASON FOR VISIT:
${summary.reasonForVisit}

IMPORTANT FINDINGS:
${summary.importantFindings.map((f) => `- ${f}`).join('\\n')}

MEDICINES MENTIONED:
${summary.medicinesMentioned.map((m) => `- ${m.name} (${m.dosage || ''}): ${m.instructions || ''}`).join('\\n')}

FOLLOW-UP:
${summary.followUpDate || 'None specified'}

IMPORTANT INSTRUCTIONS:
${summary.importantInstructions.map((i) => `- ${i}`).join('\\n')}

QUESTIONS TO ASK DOCTOR:
${summary.questionsToAskDoctor.map((q, idx) => `${idx + 1}. ${q}`).join('\\n')}

DISCLAIMER:
${summary.disclaimer}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>AI Medical Document Summary</span>
        </div>
      }
      subtitle={`Structured breakdown for ${document.memberName} • ${document.date}`}
      maxWidth="3xl"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient:</span>
              <span className="text-sm font-bold text-slate-900">{document.memberName}</span>
              <Badge variant="brand">{document.category}</Badge>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Document: <span className="font-medium text-slate-800">{document.title}</span> ({document.date})
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-brand-700 border border-brand-200 rounded-xl text-xs font-bold shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            Reason for Visit / Context
          </h4>
          <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
            {summary.reasonForVisit}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            Important Diagnostic Findings
          </h4>
          <div className="space-y-2">
            {summary.importantFindings.map((finding, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {summary.medicinesMentioned && summary.medicinesMentioned.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-brand-600" />
              Medicines Mentioned in Document
            </h4>
            <div className="rounded-xl border border-slate-200/80 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3.5">Medicine Name</th>
                    <th className="py-2.5 px-3.5">Dosage</th>
                    <th className="py-2.5 px-3.5">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summary.medicinesMentioned.map((med, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3.5 font-bold text-slate-900">{med.name}</td>
                      <td className="py-2.5 px-3.5 text-slate-700">{med.dosage || 'Standard'}</td>
                      <td className="py-2.5 px-3.5 text-slate-600">{med.instructions || 'As prescribed'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {summary.followUpDate && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Next Follow-up
              </span>
              <p className="text-sm font-bold text-amber-950">{summary.followUpDate}</p>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Important Instructions
            </span>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
              {summary.importantInstructions.map((ins, idx) => (
                <li key={idx}>{ins}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2.5">
          <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-teal-700" />
            Recommended Questions to Ask Your Doctor
          </h4>
          <ol className="space-y-1.5 text-xs sm:text-sm text-teal-950">
            {summary.questionsToAskDoctor.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-teal-100">
                <span className="font-bold text-teal-700 shrink-0">{idx + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>

        <SafetyNotice
          customText="CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice."
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};"""

with open('src/components/vault/DocumentModal.tsx', 'w', encoding='utf-8') as f:
    f.write(doc_modal)
with open('src/components/vault/AISummaryModal.tsx', 'w', encoding='utf-8') as f:
    f.write(ai_summary_modal)
print('Wrote DocumentModal.tsx and AISummaryModal.tsx')
