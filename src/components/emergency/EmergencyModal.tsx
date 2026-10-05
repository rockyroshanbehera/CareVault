import React, { useState } from 'react';
import { useCareVault } from '../../context/CareVaultContext';
import {
  Siren,
  Phone,
  MapPin,
  Building2,
  ShieldAlert,
  Pill,
  Heart,
  X,
  Clock,
  AlertTriangle,
  User,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const EmergencyModal: React.FC = () => {
  const {
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    familyMembers,
    hospitals
  } = useCareVault();

  const [selectedPatientId, setSelectedPatientId] = useState<string>('fam-father');

  if (!isEmergencyModalOpen) return null;

  const currentPatient =
    familyMembers.find((m) => m.id === selectedPatientId) || familyMembers[0];

  const emergencyHospitals = hospitals.filter((h) => h.emergencyAvailable).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsEmergencyModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border-2 border-rose-500 overflow-hidden z-10 animate-fade-in">
        {/* Urgent Emergency Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Siren className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">EMERGENCY SOS MODE</h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-rose-700 text-[10px] font-black uppercase">
                  Critical Care
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                Current Location: Chandrasekharpur, Bhubaneswar • Fast Emergency Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-100px)]">
          {/* Top 3 Instant Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:108"
              className="p-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-2xl flex items-center justify-between shadow-lg shadow-red-500/25 transition-transform hover:scale-[1.02]"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-200 block">Ambulance SOS</span>
                <span className="text-lg font-black">Call 108 / 112</span>
              </div>
              <Phone className="w-6 h-6 animate-bounce" />
            </a>

            <a
              href={`tel:${currentPatient.emergencyContact.phone}`}
              className="p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-between shadow-md transition-transform hover:scale-[1.02]"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Family Contact</span>
                <span className="text-sm font-extrabold truncate block max-w-[150px]">
                  {currentPatient.emergencyContact.name}
                </span>
                <span className="text-xs text-teal-400 font-mono">{currentPatient.emergencyContact.phone}</span>
              </div>
              <Phone className="w-6 h-6 text-teal-400" />
            </a>

            <a
              href="tel:+916746661066"
              className="p-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl flex items-center justify-between shadow-md transition-transform hover:scale-[1.02]"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-200 block">Apollo 24/7 Trauma</span>
                <span className="text-sm font-extrabold">Call Emergency ER</span>
                <span className="text-[11px] text-brand-100">4.2 km away • 8 ICU beds</span>
              </div>
              <Building2 className="w-6 h-6 text-brand-200" />
            </a>
          </div>

          {/* Patient Switcher */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Affected Patient:</span>
            <div className="flex flex-wrap gap-1.5">
              {familyMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedPatientId(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    selectedPatientId === m.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
                  <span>{m.name} ({m.relationship})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Critical Medical Parameters Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={currentPatient.avatar} alt={currentPatient.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-500" />
                <div>
                  <h3 className="text-lg font-black text-slate-900">{currentPatient.name}</h3>
                  <p className="text-xs text-slate-500">
                    {currentPatient.age} Years Old • Gender: {currentPatient.gender}
                  </p>
                </div>
              </div>

              {/* Huge Blood Group Badge */}
              <div className="p-3 bg-rose-50 border-2 border-rose-400 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-rose-600 uppercase block">Blood Group</span>
                <span className="text-2xl font-black text-rose-700">{currentPatient.bloodGroup}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Critical Drug Allergies */}
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Severe Drug Allergies
                </h4>
                {currentPatient.allergies.map((a, i) => (
                  <div key={i} className="text-xs font-bold text-rose-900 bg-white p-2 rounded-xl border border-rose-200">
                    ⚠️ {a}
                  </div>
                ))}
              </div>

              {/* Key Medical Conditions */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-brand-600" />
                  Diagnosed Chronic History
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentPatient.conditions.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Medications & Emergency Instructions */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-amber-700" />
                Active Daily Medications & Emergency Care Protocol
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {currentPatient.emergencyNotes}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentPatient.currentMedications.map((m) => (
                  <span key={m.id} className="text-xs bg-white px-2.5 py-1 rounded-lg border border-amber-200 font-bold text-amber-950">
                    • {m.name} ({m.dosage})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Nearest 24/7 Emergency Hospitals */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Nearest 24/7 Level-1 Trauma & Cath Labs
            </h3>
            <div className="space-y-3">
              {emergencyHospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{hosp.name}</h4>
                      <Badge variant="teal">{hosp.distanceKm} km away</Badge>
                      <Badge variant="brand">{hosp.icuBedsAvailable} ICU beds free</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{hosp.address}</p>
                  </div>

                  <a
                    href={`tel:${hosp.phone}`}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Dial Emergency Desk</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};