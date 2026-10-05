import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  Siren,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Hospital } from '../../types';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';
import { HospitalCompareModal } from './HospitalCompareModal';

const SPECIALTIES = [
  'All Specialties',
  'Cardiology',
  'Emergency Care',
  'Endocrinology',
  'Orthopedics',
  'Pulmonology',
  'Neurology',
  'Geriatrics'
];

export const HospitalFinderPage: React.FC = () => {
  const {
    hospitals,
    selectedHospitalIdsForCompare,
    toggleHospitalCompare,
    clearHospitalCompare
  } = useCareVault();

  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.specialty.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        h.specialty.includes(selectedSpecialty);

      const matchesBudget =
        selectedBudget === 'All' || h.costTier === selectedBudget;

      const matchesEmergency = !onlyEmergency || h.emergencyAvailable;

      return matchesSearch && matchesSpecialty && matchesBudget && matchesEmergency;
    });
  }, [hospitals, searchQuery, selectedSpecialty, selectedBudget, onlyEmergency]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Find the Right Care
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Discover and compare nearby hospitals based on specialty, distance, emergency readiness, and budget.
              </p>
            </div>
          </div>
        </div>

        {/* Compare Toolbar Trigger */}
        {selectedHospitalIdsForCompare.length > 0 && (
          <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 p-2 sm:px-4 sm:py-2 rounded-2xl shadow-soft">
            <span className="text-xs font-bold text-indigo-900">
              {selectedHospitalIdsForCompare.length} Hospital{selectedHospitalIdsForCompare.length > 1 ? 's' : ''} Selected
            </span>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={clearHospitalCompare}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <SafetyNotice />

      {/* Filter and Criteria Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hospital or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Specialty */}
          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Tier */}
          <div>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="All">All Cost Tiers</option>
              <option value="₹">₹ Subsidized / Government (AIIMS)</option>
              <option value="₹₹">₹₹ Moderate (Care, KIMS)</option>
              <option value="₹₹₹">₹₹₹ Premium Tertiary (Apollo, AMRI)</option>
            </select>
          </div>

          {/* 24/7 Emergency Toggle */}
          <button
            onClick={() => setOnlyEmergency(!onlyEmergency)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              onlyEmergency
                ? 'bg-rose-50 border-rose-400 text-rose-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Siren className={`w-4 h-4 ${onlyEmergency ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
            <span>24/7 Emergency Active</span>
          </button>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filteredHospitals.length} Matching Hospitals in Bhubaneswar Network
          </span>
          <span className="text-xs text-slate-400">Match score based on family specialty & location</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hosp) => {
            const isCompared = selectedHospitalIdsForCompare.includes(hosp.id);
            return (
              <div
                key={hosp.id}
                className={`bg-white rounded-3xl border p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between ${
                  isCompared ? 'border-indigo-400 ring-2 ring-indigo-400/20' : 'border-slate-200/80'
                }`}
              >
                <div>
                  {/* Top Bar: Name, Rating, Match Score */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{hosp.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          {hosp.rating}
                        </span>
                        <span>({hosp.reviewCount} reviews)</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{hosp.distanceKm} km away</span>
                        <span>•</span>
                        <span className="font-bold text-slate-900">{hosp.costTier}</span>
                      </div>
                    </div>

                    {/* Criteria Match Badge */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>{hosp.matchScore}% Match</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5">for your criteria</span>
                    </div>
                  </div>

                  {/* Why this matches breakdown */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Criteria Match Factors:
                    </span>
                    {hosp.matchReasons.map((reason, idx) => (
                      <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specialties & Services */}
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {hosp.specialty.map((s, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{hosp.address}, {hosp.city}</span>
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Estimated range:</span>{' '}
                    <span className="font-bold text-slate-900">{hosp.estimatedCostRange}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleHospitalCompare(hosp.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isCompared
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isCompared ? '✓ Added' : '+ Compare'}
                    </button>

                    <a
                      href={`tel:${hosp.phone}`}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hospital Comparison Modal */}
      {isCompareModalOpen && (
        <HospitalCompareModal
          selectedIds={selectedHospitalIdsForCompare}
          onClose={() => setIsCompareModalOpen(false)}
        />
      )}
    </div>
  );
};