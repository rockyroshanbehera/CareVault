import React from 'react';
import { useCareVault } from '../../context/CareVaultContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Check, X, Building2, Star, Sparkles, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface HospitalCompareModalProps {
  selectedIds: string[];
  onClose: () => void;
}

export const HospitalCompareModal: React.FC<HospitalCompareModalProps> = ({
  selectedIds,
  onClose
}) => {
  const { hospitals } = useCareVault();
  const compareHospitals = hospitals.filter((h) => selectedIds.includes(h.id));

  if (compareHospitals.length === 0) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Hospital Comparison Matrix"
      subtitle="Objective side-by-side analysis. No overall single winner is declared — prioritize by your specific family needs."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-500 uppercase tracking-wider w-40">
                  Feature
                </th>
                {compareHospitals.map((h) => (
                  <th key={h.id} className="p-4 font-bold text-slate-900 border-l border-slate-200 min-w-[220px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-extrabold">{h.name}</span>
                      <Badge variant="teal">{h.matchScore}% Match</Badge>
                    </div>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{h.accreditation}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Distance */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Distance from Home</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 font-semibold text-slate-800 border-l border-slate-100">
                    📍 {h.distanceKm} km away
                  </td>
                ))}
              </tr>

              {/* Specialty */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Core Specialties</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 text-slate-700 border-l border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {h.specialty.map((s, i) => (
                        <Badge key={i} variant="brand" size="sm">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Emergency */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Emergency & Trauma</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 text-slate-800 border-l border-slate-100">
                    {h.emergencyAvailable ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        ✓ 24/7 Level 1 Active
                      </span>
                    ) : (
                      <span className="text-slate-400">Regular OPD Only</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Estimated Cost */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Cost Tier & Range</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 border-l border-slate-100">
                    <span className="font-extrabold text-slate-900">{h.costTier}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{h.estimatedCostRange}</p>
                  </td>
                ))}
              </tr>

              {/* Wait Time & ICU */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Avg Wait / ICU Beds</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 text-slate-700 border-l border-slate-100">
                    <p className="font-semibold">{h.averageWaitTimeMin} mins average triage</p>
                    <p className="text-slate-500 text-[11px]">{h.icuBedsAvailable} ICU beds vacant</p>
                  </td>
                ))}
              </tr>

              {/* Services */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Available Services</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 text-slate-600 border-l border-slate-100">
                    <ul className="space-y-1 list-disc pl-4 text-[11px]">
                      {h.services.map((srv, i) => (
                        <li key={i}>{srv}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Patient Rating</td>
                {compareHospitals.map((h) => (
                  <td key={h.id} className="p-3.5 font-bold text-amber-600 border-l border-slate-100">
                    ★ {h.rating} / 5.0 ({h.reviewCount} ratings)
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </Modal>
  );
};