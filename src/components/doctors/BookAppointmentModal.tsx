import React, { useState } from 'react';
import { Doctor, FamilyMember } from '../../types';
import { useCareVault } from '../../context/CareVaultContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Calendar, Clock, Video, CheckCircle2, User, Building2 } from 'lucide-react';

interface BookAppointmentModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  doctor,
  onClose
}) => {
  const { familyMembers, bookAppointment } = useCareVault();

  const [selectedMemberId, setSelectedMemberId] = useState(familyMembers[0]?.id || 'fam-father');
  const [selectedSlot, setSelectedSlot] = useState('Today at 5:30 PM');
  const [visitMode, setVisitMode] = useState<'In-Person' | 'Video'>('In-Person');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedMember = familyMembers.find((m) => m.id === selectedMemberId) || familyMembers[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment(doctor, selectedMember, `${selectedSlot} • ${visitMode}`);
    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isSuccess ? "Appointment Confirmed!" : "Request Appointment"}
      subtitle={isSuccess ? "Added to your family's health schedule" : `Booking with ${doctor.name}`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Consultation Scheduled!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Confirmed for <span className="font-bold text-slate-900">{selectedMember.name}</span> with {doctor.name}.
            </p>
            <p className="text-xs text-brand-600 font-semibold mt-1">
              {selectedSlot} • {visitMode} at {doctor.clinicOrHospital}
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            A confirmation reminder has been saved to your Overview Dashboard and Activity Timeline.
          </p>
          <div className="pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{doctor.name}</h4>
              <p className="text-xs text-emerald-700 font-medium">{doctor.specialty}</p>
              <p className="text-[11px] text-slate-500">Fee: ₹{doctor.consultationFee}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Patient
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm bg-white"
            >
              {familyMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relationship} • {m.age}y)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Available Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Today at 5:30 PM', 'Today at 6:15 PM', 'Tomorrow at 10:00 AM', 'Tomorrow at 11:30 AM'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl border font-medium text-left transition-all ${
                    selectedSlot === slot
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setVisitMode('In-Person')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                  visitMode === 'In-Person'
                    ? 'bg-brand-50 border-brand-500 text-brand-900'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>In-Person Clinic</span>
              </button>
              <button
                type="button"
                onClick={() => setVisitMode('Video')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                  visitMode === 'Video'
                    ? 'bg-teal-50 border-teal-500 text-teal-900'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Teleconsult</span>
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};