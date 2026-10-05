import os

CAREVAULT_CONTEXT = """import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FamilyMember,
  MedicalDocument,
  MedicalTimelineItem,
  Hospital,
  Doctor,
  InsurancePolicy,
  HealthcareCostEstimate,
  Pharmacy
} from '../types';
import {
  INITIAL_FAMILY_MEMBERS,
  INITIAL_DOCUMENTS,
  INITIAL_TIMELINE,
  INITIAL_HOSPITALS,
  INITIAL_DOCTORS,
  INITIAL_INSURANCE_POLICIES,
  INITIAL_COST_ESTIMATES,
  INITIAL_PHARMACIES,
  INITIAL_ACTIVITY_LOG
} from '../data/mockData';

export type NavTab =
  | 'overview'
  | 'family'
  | 'vault'
  | 'assistant'
  | 'doctorPrep'
  | 'hospitals'
  | 'doctors'
  | 'insurance'
  | 'costPlanner'
  | 'pharmacies'
  | 'emergency';

interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
  type: string;
  member: string;
}

interface CareVaultContextType {
  familyMembers: FamilyMember[];
  activeMemberId: string;
  activeMember: FamilyMember;
  setActiveMemberId: (id: string) => void;
  documents: MedicalDocument[];
  timeline: MedicalTimelineItem[];
  hospitals: Hospital[];
  doctors: Doctor[];
  insurancePolicies: InsurancePolicy[];
  pharmacies: Pharmacy[];
  costEstimates: HealthcareCostEstimate[];
  activityLog: ActivityItem[];
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedDocForSummary: MedicalDocument | null;
  setSelectedDocForSummary: (doc: MedicalDocument | null) => void;
  selectedHospitalIdsForCompare: string[];
  toggleHospitalCompare: (id: string) => void;
  clearHospitalCompare: () => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isDemoMode: boolean;
  setIsDemoMode: (enabled: boolean) => void;
  resetToDemoData: () => void;
  addDocument: (doc: Omit<MedicalDocument, 'id' | 'status'>) => void;
  bookAppointment: (doctor: Doctor, member: FamilyMember, slot: string) => void;
}

const CareVaultContext = createContext<CareVaultContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MEMBERS: 'carevault_members_v1',
  DOCS: 'carevault_docs_v1',
  TIMELINE: 'carevault_timeline_v1',
  ACTIVITY: 'carevault_activity_v1'
};

export const CareVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      return saved ? JSON.parse(saved) : INITIAL_FAMILY_MEMBERS;
    } catch {
      return INITIAL_FAMILY_MEMBERS;
    }
  });

  const [documents, setDocuments] = useState<MedicalDocument[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCS);
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [timeline, setTimeline] = useState<MedicalTimelineItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      return saved ? JSON.parse(saved) : INITIAL_TIMELINE;
    } catch {
      return INITIAL_TIMELINE;
    }
  });

  const [activityLog, setActivityLog] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOG;
    } catch {
      return INITIAL_ACTIVITY_LOG;
    }
  });

  const [activeMemberId, setActiveMemberId] = useState<string>('fam-father');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedDocForSummary, setSelectedDocForSummary] = useState<MedicalDocument | null>(null);
  const [selectedHospitalIdsForCompare, setSelectedHospitalIdsForCompare] = useState<string[]>(['hosp-1', 'hosp-2']);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timeline));
  }, [timeline]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLog));
  }, [activityLog]);

  const activeMember = familyMembers.find((m) => m.id === activeMemberId) || familyMembers[0];

  const resetToDemoData = () => {
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    setDocuments(INITIAL_DOCUMENTS);
    setTimeline(INITIAL_TIMELINE);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setActiveMemberId('fam-father');
    setSelectedHospitalIdsForCompare(['hosp-1', 'hosp-2']);
    localStorage.clear();
  };

  const toggleHospitalCompare = (id: string) => {
    setSelectedHospitalIdsForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const clearHospitalCompare = () => {
    setSelectedHospitalIdsForCompare([]);
  };

  const addDocument = (docData: Omit<MedicalDocument, 'id' | 'status'>) => {
    const newDoc: MedicalDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
      status: 'Analyzed'
    };

    setDocuments((prev) => [newDoc, ...prev]);

    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === docData.memberId ? { ...m, documentCount: (m.documentCount || 0) + 1 } : m
      )
    );

    setActivityLog((prev) => [
      {
        id: `act-${Date.now()}`,
        text: `New ${newDoc.category} "${newDoc.title}" uploaded and summarized for ${newDoc.memberName}`,
        timestamp: 'Just now',
        type: 'upload',
        member: newDoc.memberName
      },
      ...prev
    ]);
  };

  const bookAppointment = (doctor: Doctor, member: FamilyMember, slot: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === member.id
          ? {
              ...m,
              upcomingAppointment: {
                date: '2026-09-24',
                doctorName: doctor.name,
                specialty: doctor.specialty,
                facility: doctor.clinicOrHospital
              }
            }
          : m
      )
    );

    setActivityLog((prev) => [
      {
        id: `act-${Date.now()}`,
        text: `Appointment confirmed with ${doctor.name} for ${member.name} (${slot})`,
        timestamp: 'Just now',
        type: 'appointment',
        member: member.name
      },
      ...prev
    ]);
  };

  return (
    <CareVaultContext.Provider
      value={{
        familyMembers,
        activeMemberId,
        activeMember,
        setActiveMemberId,
        documents,
        timeline,
        hospitals: INITIAL_HOSPITALS,
        doctors: INITIAL_DOCTORS,
        insurancePolicies: INITIAL_INSURANCE_POLICIES,
        pharmacies: INITIAL_PHARMACIES,
        costEstimates: INITIAL_COST_ESTIMATES,
        activityLog,
        activeTab,
        setActiveTab,
        selectedDocForSummary,
        setSelectedDocForSummary,
        selectedHospitalIdsForCompare,
        toggleHospitalCompare,
        clearHospitalCompare,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        isDemoMode,
        setIsDemoMode,
        resetToDemoData,
        addDocument,
        bookAppointment
      }}
    >
      {children}
    </CareVaultContext.Provider>
  );
};

export const useCareVault = () => {
  const context = useContext(CareVaultContext);
  if (!context) {
    throw new Error('useCareVault must be used within a CareVaultProvider');
  }
  return context;
};"""

with open('src/context/CareVaultContext.tsx', 'w', encoding='utf-8') as f:
    f.write(CAREVAULT_CONTEXT.strip() + '\n')
print("Fixed CareVaultContext.tsx")
