export type DocumentCategory = 
  | 'Prescription' 
  | 'Blood Report' 
  | 'Medical Report' 
  | 'Discharge Summary' 
  | 'Imaging' 
  | 'Insurance' 
  | 'Vaccination' 
  | 'Other';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: 'Before Meals' | 'After Meals' | 'Bedtime' | 'As Needed';
  startDate: string;
  prescribedBy?: string;
  active: boolean;
}

export interface MedicalTimelineItem {
  id: string;
  memberId: string;
  year: string;
  date: string;
  title: string;
  category: 'Consultation' | 'Lab Report' | 'Hospitalization' | 'Prescription' | 'Surgery' | 'Vaccine';
  doctorName?: string;
  facilityName?: string;
  summary: string;
  documentId?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Father' | 'Mother' | 'Me' | 'Spouse' | 'Child' | 'Grandmother' | 'Grandfather' | 'Other';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  avatar: string;
  bloodGroup: string;
  conditions: string[];
  allergies: string[];
  currentMedications: Medication[];
  emergencyNotes: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  upcomingAppointment?: {
    date: string;
    doctorName: string;
    specialty: string;
    facility: string;
  };
  documentCount?: number;
  lastCheckupDate?: string;
}

export interface DocumentAISummary {
  reasonForVisit: string;
  importantFindings: string[];
  medicinesMentioned: {
    name: string;
    dosage?: string;
    instructions?: string;
  }[];
  followUpDate?: string;
  importantInstructions: string[];
  questionsToAskDoctor: string[];
  disclaimer: string;
}

export interface MedicalDocument {
  id: string;
  memberId: string;
  memberName: string;
  title: string;
  category: DocumentCategory;
  date: string;
  doctorName?: string;
  hospitalName?: string;
  fileType: 'PDF' | 'JPG' | 'PNG';
  fileSize: string;
  status: 'Analyzed' | 'Processing' | 'Ready';
  tags: string[];
  extractedSummary: DocumentAISummary;
  rawNotes?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: {
    documentId?: string;
    documentTitle: string;
    memberName?: string;
    date?: string;
  }[];
  suggestedQuestions?: string[];
}

export interface Hospital {
  id: string;
  name: string;
  specialty: string[];
  distanceKm: number;
  costTier: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  estimatedCostRange: string;
  emergencyAvailable: boolean;
  services: string[];
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  matchScore: number;
  matchReasons: string[];
  icuBedsAvailable: number;
  averageWaitTimeMin: number;
  insuranceAccepted: string[];
  accreditation: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  experienceYears: number;
  clinicOrHospital: string;
  consultationFee: number;
  location: string;
  rating: number;
  reviewCount: number;
  availability: 'Available Today' | 'Next Available: Tomorrow' | 'Mon - Fri' | 'Weekends Only';
  nextAvailableSlot: string;
  isVerified: boolean;
  isOnline: boolean;
  languages: string[];
  education: string;
  avatar: string;
}

export interface InsurancePolicy {
  id: string;
  policyName: string;
  provider: string;
  annualPremium: number;
  coverageAmount: number;
  networkHospitalsCount: number;
  waitingPeriod: string;
  coPay: string;
  roomRentLimit: string;
  exclusions: string[];
  matchReasons: string[];
  warnings: string[];
  rating: number;
  planType: 'Family Floater' | 'Individual Comprehensive' | 'Senior Citizen Special' | 'Critical Illness';
}

export interface HealthcareCostEstimate {
  id: string;
  procedureName: string;
  specialty: string;
  consultationRange: string;
  diagnosticRange: string;
  hospitalizationRange: string;
  totalEstimatedRange: string;
  typicalInsuranceCoverage: string;
  outOfPocketRange: string;
  recoveryTime: string;
  notes: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  distanceKm: number;
  isOpen: boolean;
  openingHours: string;
  phone: string;
  hasDelivery: boolean;
  deliveryTimeMin?: number;
  address: string;
  medicineStockStatus: 'In Stock' | 'Limited Stock' | 'Order on Request';
  rating: number;
  reviewCount: number;
}

export interface DoctorVisitSummary {
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  dateGenerated: string;
  mainConcerns: string[];
  existingConditions: string[];
  currentMedications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  recentReports: {
    title: string;
    date: string;
    keyResult: string;
  }[];
  recentSymptoms: string[];
  allergies: string[];
  questionsForDoctor: string[];
}
