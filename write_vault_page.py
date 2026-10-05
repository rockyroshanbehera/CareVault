import os

vault_page = """import React, { useState, useMemo } from 'react';
import {
  FolderLock,
  Upload,
  Search,
  Filter,
  FileText,
  Sparkles,
  Calendar,
  User,
  Eye,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileUp,
  X
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { MedicalDocument, DocumentCategory } from '../../types';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';
import { AISummaryModal } from './AISummaryModal';
import { DocumentModal } from './DocumentModal';

const CATEGORIES: DocumentCategory[] = [
  'Prescription',
  'Blood Report',
  'Medical Report',
  'Discharge Summary',
  'Imaging',
  'Insurance',
  'Vaccination',
  'Other'
];

export const HealthVaultPage: React.FC = () => {
  const {
    documents,
    familyMembers,
    selectedDocForSummary,
    setSelectedDocForSummary,
    addDocument
  } = useCareVault();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string>('All');
  const [viewingDoc, setViewingDoc] = useState<MedicalDocument | null>(null);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('Prescription');
  const [uploadMemberId, setUploadMemberId] = useState(familyMembers[0]?.id || 'fam-father');
  const [uploadDoctor, setUploadDoctor] = useState('');
  const [uploadFacility, setUploadFacility] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesMember = selectedMemberFilter === 'All' || doc.memberId === selectedMemberFilter;

      return matchesSearch && matchesCategory && matchesMember;
    });
  }, [documents, searchQuery, selectedCategory, selectedMemberFilter]);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMember = familyMembers.find((m) => m.id === uploadMemberId) || familyMembers[0];

    addDocument({
      memberId: targetMember.id,
      memberName: targetMember.name,
      title: uploadTitle || `${uploadCategory} Document - ${new Date().toLocaleDateString('en-GB')}`,
      category: uploadCategory,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      doctorName: uploadDoctor || 'Dr. Vivek Sharma',
      hospitalName: uploadFacility || 'Apollo Hospitals',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      tags: [uploadCategory, targetMember.name.split(' ')[0]],
      extractedSummary: {
        reasonForVisit: `Clinical consultation regarding ${uploadCategory.toLowerCase()} management.`,
        importantFindings: [
          'Diagnostic parameters and vital signs reviewed by practitioner.',
          'Medication regimen adjusted as per clinical baseline.'
        ],
        medicinesMentioned: [
          { name: 'Prescribed Medication', dosage: 'As directed', instructions: 'Take post-meal with water' }
        ],
        followUpDate: 'In 3 weeks',
        importantInstructions: [
          'Maintain regular hydration and scheduled intake.',
          'Report any hypersensitivity symptoms immediately.'
        ],
        questionsToAskDoctor: [
          'When should I repeat this test or review the prescription?'
        ],
        disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
      }
    });

    setIsUploadOpen(false);
    setUploadTitle('');
    setUploadDoctor('');
    setUploadFacility('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Health Vault
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold">
              {documents.length} Records
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            &ldquo;One secure place for your family&apos;s medical history.&rdquo;
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Medical Document</span>
        </button>
      </div>

      <SafetyNotice />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          setIsUploadOpen(true);
        }}
        onClick={() => setIsUploadOpen(true)}
        className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-brand-500 bg-brand-50/80 scale-[1.01]'
            : 'border-slate-300 bg-white hover:bg-slate-50/80 shadow-soft'
        }`}
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-3">
          <FileUp className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Drag & drop your medical document here, or <span className="text-brand-600 underline">Browse</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Supports PDF, JPG, PNG • Prescriptions, Lab Reports, Discharge Summaries, MRI/X-Rays, Insurance Cards
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-teal-700 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>AI automatically extracts medicines, diagnosis, follow-ups, and questions</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find Dad's prescriptions, blood reports, discharge summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Member:</span>
            <select
              value={selectedMemberFilter}
              onChange={(e) => setSelectedMemberFilter(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="All">All Family Members</option>
              {familyMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relationship})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing {filteredDocs.length} Document{filteredDocs.length === 1 ? '' : 's'}
          </span>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-slate-700">No documents match your filter criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or uploading a new record.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card hover:border-brand-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="brand">{doc.category}</Badge>
                    <span className="text-[11px] font-medium text-slate-400">{doc.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {doc.title}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800">{doc.memberName}</span>
                    </div>
                    {doc.doctorName && (
                      <p className="truncate pl-5 text-[11px] text-slate-500">
                        Dr: {doc.doctorName}
                      </p>
                    )}
                    {doc.hospitalName && (
                      <p className="truncate pl-5 text-[11px] text-slate-400">
                        {doc.hospitalName}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {doc.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="flex-1 py-1.5 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => setSelectedDocForSummary(doc)}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>AI Summary</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewingDoc && (
        <DocumentModal
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
          onOpenSummary={() => {
            setSelectedDocForSummary(viewingDoc);
            setViewingDoc(null);
          }}
        />
      )}

      {selectedDocForSummary && (
        <AISummaryModal
          document={selectedDocForSummary}
          onClose={() => setSelectedDocForSummary(null)}
        />
      )}

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-modal border border-slate-100 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upload & Digitize Medical Record</h3>
                <p className="text-xs text-slate-500">CareVault will parse and extract clinical actions</p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Vivek Sharma Cardiology Prescription"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Family Member
                  </label>
                  <select
                    value={uploadMemberId}
                    onChange={(e) => setUploadMemberId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.relationship})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Doctor Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Vivek Sharma"
                    value={uploadDoctor}
                    onChange={(e) => setUploadDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hospital / Lab
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Hospitals"
                    value={uploadFacility}
                    onChange={(e) => setUploadFacility(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-brand-50/70 border border-brand-200 rounded-xl text-xs text-brand-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                <span>AI will extract medicines, instructions, and next appointment date immediately.</span>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload & Analyze</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};"""

os.makedirs('src/components/vault', exist_ok=True)
with open('src/components/vault/HealthVaultPage.tsx', 'w', encoding='utf-8') as f:
    f.write(vault_page)
print('Wrote HealthVaultPage.tsx')
