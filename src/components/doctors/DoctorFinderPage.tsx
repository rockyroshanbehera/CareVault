import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  Phone
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Doctor } from '../../types';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';
import { BookAppointmentModal } from './BookAppointmentModal';

const SPECIALTIES = [
  'All Specialties',
  'Cardiology',
  'Endocrinology',
  'Orthopedics',
  'Pulmonology',
  'Ophthalmology',
  'General Medicine'
];

export const DoctorFinderPage: React.FC = () => {
  const { doctors, familyMembers } = useCareVault();

  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedMaxFee, setSelectedMaxFee] = useState<number>(2000);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.clinicOrHospital.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' || doc.specialty === selectedSpecialty;

      const matchesFee = doc.consultationFee <= selectedMaxFee;
      const matchesOnline = !onlyOnline || doc.isOnline;

      return matchesSearch && matchesSpecialty && matchesFee && matchesOnline;
    });
  }, [doctors, searchQuery, selectedSpecialty, selectedMaxFee, onlyOnline]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Find a Doctor
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Discover verified specialists and request appointments across Bhubaneswar clinics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SafetyNotice />

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Max Fee:</span>
            <input
              type="range"
              min="500"
              max="2000"
              step="100"
              value={selectedMaxFee}
              onChange={(e) => setSelectedMaxFee(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <span className="text-xs font-bold text-slate-900">₹{selectedMaxFee}</span>
          </div>

          <button
            onClick={() => setOnlyOnline(!onlyOnline)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              onlyOnline
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Video className={`w-4 h-4 ${onlyOnline ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Online Teleconsult Available</span>
          </button>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filteredDoctors.length} Verified Doctors Found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-100 group-hover:ring-emerald-400 transition-all shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {doc.name}
                      </h3>
                      {doc.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-label="Verified Practitioner" />
                      )}
                    </div>

                    <p className="text-xs font-bold text-emerald-700 mt-0.5">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500">{doc.education}</p>

                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {doc.rating}
                      </span>
                      <span>({doc.reviewCount})</span>
                      <span>•</span>
                      <span className="font-semibold">{doc.experienceYears} yrs exp</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <p className="text-slate-600 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.clinicOrHospital} ({doc.location})</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Availability:</span>
                    <span className="font-bold text-emerald-700">{doc.availability}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Consultation Fee:</span>
                    <span className="font-extrabold text-slate-900 text-sm">₹{doc.consultationFee}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setBookingDoctor(doc)}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingDoctor && (
        <BookAppointmentModal
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
        />
      )}
    </div>
  );
};