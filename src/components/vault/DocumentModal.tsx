import React from 'react';
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
};