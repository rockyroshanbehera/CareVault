import React, { useState } from 'react';
import {
  Users,
  Plus,
  ArrowRight,
  ShieldAlert,
  FileText,
  Calendar,
  Pill,
  Heart,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { MemberDetail } from './MemberDetail';

export const FamilyPage: React.FC = () => {
  const {
    familyMembers,
    activeMemberId,
    setActiveMemberId
  } = useCareVault();

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(activeMemberId || 'fam-father');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member form state for demo
  const [newMemberName, setNewMemberName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Child');
  const [newAge, setNewAge] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState('O+');

  const selectedMember = familyMembers.find((m) => m.id === selectedMemberId) || familyMembers[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Family Health Management
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Maintain independent health profiles, medical timelines, and emergency info for each family member.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Member Selection Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {familyMembers.map((member) => {
          const isSelected = selectedMemberId === member.id;
          return (
            <div
              key={member.id}
              onClick={() => {
                setSelectedMemberId(member.id);
                setActiveMemberId(member.id);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-brand-50/70 border-brand-500 shadow-md ring-1 ring-brand-500'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-soft'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={`w-11 h-11 rounded-full object-cover ring-2 ${
                    isSelected ? 'ring-brand-500' : 'ring-slate-100'
                  }`}
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-500">
                    {member.relationship} • {member.age}y
                  </p>
                </div>
              </div>
              <Badge variant={isSelected ? 'brand' : 'neutral'}>{member.bloodGroup}</Badge>
            </div>
          );
        })}
      </div>

      {/* Selected Member Detail View */}
      {selectedMember && (
        <div className="mt-8">
          <MemberDetail member={selectedMember} />
        </div>
      )}

      {/* Add Family Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Family Member"
        subtitle="Create an isolated health vault for a dependent or parent"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arjun Sharma"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Relationship
              </label>
              <select
                value={newRelationship}
                onChange={(e) => setNewRelationship(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
              >
                <option>Child</option>
                <option>Spouse</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Grandparent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Age
              </label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Blood Group
            </label>
            <select
              value={newBloodGroup}
              onChange={(e) => setNewBloodGroup(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
            >
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Added ${newMemberName || 'New Family Member'} to CareVault!`);
                setIsAddModalOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs"
            >
              Create Profile
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};