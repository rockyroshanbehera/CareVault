import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  FileText,
  User,
  Building2,
  Stethoscope,
  ShieldCheck,
  Pill,
  ArrowRight
} from 'lucide-react';
import { useCareVault, NavTab } from '../../context/CareVaultContext';
import { Badge } from '../common/Badge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    familyMembers,
    documents,
    hospitals,
    doctors,
    insurancePolicies,
    pharmacies,
    setActiveTab,
    setActiveMemberId,
    setSelectedDocForSummary
  } = useCareVault();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedMembers = familyMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.relationship.toLowerCase().includes(q) ||
        m.conditions.some((c) => c.toLowerCase().includes(q))
    );

    const matchedDocs = documents.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.memberName.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedHospitals = hospitals.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.specialty.some((s) => s.toLowerCase().includes(q)) ||
        h.city.toLowerCase().includes(q)
    );

    const matchedDoctors = doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.clinicOrHospital.toLowerCase().includes(q)
    );

    const matchedInsurance = insurancePolicies.filter(
      (i) =>
        i.policyName.toLowerCase().includes(q) ||
        i.provider.toLowerCase().includes(q)
    );

    const matchedPharmacies = pharmacies.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
    );

    return {
      members: matchedMembers,
      docs: matchedDocs,
      hospitals: matchedHospitals,
      doctors: matchedDoctors,
      insurance: matchedInsurance,
      pharmacies: matchedPharmacies,
      totalCount:
        matchedMembers.length +
        matchedDocs.length +
        matchedHospitals.length +
        matchedDoctors.length +
        matchedInsurance.length +
        matchedPharmacies.length
    };
  }, [query, familyMembers, documents, hospitals, doctors, insurancePolicies, pharmacies]);

  if (!isGlobalSearchOpen) return null;

  const navigateTo = (tab: NavTab, action?: () => void) => {
    if (action) action();
    setActiveTab(tab);
    setIsGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsGlobalSearchOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-modal border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Dad records, prescriptions, hospitals, doctors, insurance..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {!query.trim() && (
            <div className="py-6 text-center">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Suggested Searches</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Dad', 'Dr. Vivek Sharma', 'Prescription', 'Cardiology', 'Thyroid report', 'Star Health'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults && searchResults.totalCount === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm">
              No health records or services found matching "{query}".
            </div>
          )}

          {searchResults && searchResults.totalCount > 0 && (
            <>
              {searchResults.members.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-600" /> Family Profiles
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.members.map((m) => (
                      <div
                        key={m.id}
                        onClick={() =>
                          navigateTo('family', () => setActiveMemberId(m.id))
                        }
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.relationship} • {m.age} yrs • Blood Group: {m.bloodGroup}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.docs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-600" /> Medical Documents
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.docs.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() =>
                          navigateTo('vault', () => setSelectedDocForSummary(doc))
                        }
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{doc.title}</p>
                            <Badge variant="brand">{doc.category}</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Patient: {doc.memberName} • {doc.date}</p>
                        </div>
                        <span className="text-xs font-semibold text-brand-600">Summarize →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.hospitals.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Hospitals
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.hospitals.map((hosp) => (
                      <div
                        key={hosp.id}
                        onClick={() => navigateTo('hospitals')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 cursor-pointer group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{hosp.name}</p>
                          <p className="text-xs text-slate-500">{hosp.distanceKm} km away • Rating: ★ {hosp.rating} • {hosp.specialty.slice(0, 3).join(', ')}</p>
                        </div>
                        <Badge variant="teal">{hosp.matchScore}% Match</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.doctors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" /> Doctors
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.doctors.map((dr) => (
                      <div
                        key={dr.id}
                        onClick={() => navigateTo('doctors')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={dr.avatar} alt={dr.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">{dr.name}</p>
                            <p className="text-xs text-slate-500">{dr.specialty} • Fee: ₹{dr.consultationFee} • {dr.clinicOrHospital}</p>
                          </div>
                        </div>
                        <Badge variant="success">{dr.availability}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.insurance.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Insurance Policies
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.insurance.map((ins) => (
                      <div
                        key={ins.id}
                        onClick={() => navigateTo('insurance')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 cursor-pointer group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-purple-700">{ins.policyName}</p>
                          <p className="text-xs text-slate-500">{ins.provider} • ₹{(ins.coverageAmount / 100000).toFixed(0)} Lakh Coverage</p>
                        </div>
                        <span className="text-xs font-bold text-slate-700">₹{ins.annualPremium.toLocaleString('en-IN')}/yr</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.pharmacies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-amber-600" /> Nearby Pharmacies
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.pharmacies.map((pharm) => (
                      <div
                        key={pharm.id}
                        onClick={() => navigateTo('pharmacies')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/60 cursor-pointer group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-amber-700">{pharm.name}</p>
                          <p className="text-xs text-slate-500">{pharm.distanceKm} km away • {pharm.openingHours}</p>
                        </div>
                        <Badge variant={pharm.isOpen ? 'success' : 'neutral'}>
                          {pharm.isOpen ? 'Open Now' : 'Closed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
