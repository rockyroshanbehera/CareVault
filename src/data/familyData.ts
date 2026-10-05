import { FamilyMember } from '../types';

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-father',
    name: 'Rajesh Sharma',
    relationship: 'Father',
    age: 62,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'B+',
    conditions: ['Hypertension (Stage 1)', 'Type 2 Diabetes Mellitus', 'Mild Dyslipidemia'],
    allergies: ['Penicillin (causes hives)', 'Sulfonamides'],
    currentMedications: [
      {
        id: 'med-1',
        name: 'Telmisartan 40mg',
        dosage: '1 tablet once daily',
        frequency: 'Daily (Morning)',
        timing: 'Before Meals',
        startDate: '2023-04-10',
        prescribedBy: 'Dr. Vivek Sharma (Cardiologist)',
        active: true
      },
      {
        id: 'med-2',
        name: 'Metformin 500mg SR',
        dosage: '1 tablet twice daily',
        frequency: 'Twice daily',
        timing: 'After Meals',
        startDate: '2022-08-15',
        prescribedBy: 'Dr. Anita Desai (Endocrinologist)',
        active: true
      },
      {
        id: 'med-3',
        name: 'Atorvastatin 10mg',
        dosage: '1 tablet nightly',
        frequency: 'Daily (Night)',
        timing: 'Bedtime',
        startDate: '2024-01-20',
        prescribedBy: 'Dr. Vivek Sharma',
        active: true
      }
    ],
    emergencyNotes: 'History of transient ischemic episode in 2021. Stent placed in LAD (2022). Needs strict BP monitoring.',
    emergencyContact: {
      name: 'Roshan Sharma (Son)',
      relationship: 'Son',
      phone: '+91 98765 43210'
    },
    upcomingAppointment: {
      date: '2026-09-24',
      doctorName: 'Dr. Vivek Sharma',
      specialty: 'Cardiology',
      facility: 'Apollo Hospitals, Bhubaneswar'
    },
    documentCount: 12,
    lastCheckupDate: '2026-08-12'
  },
  {
    id: 'fam-mother',
    name: 'Sunita Sharma',
    relationship: 'Mother',
    age: 55,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    conditions: ['Primary Hypothyroidism', 'Mild Cervical Spondylosis'],
    allergies: ['Dust mites', 'Sulfa Antibiotics'],
    currentMedications: [
      {
        id: 'med-4',
        name: 'Levothyroxine 75mcg',
        dosage: '1 tablet empty stomach',
        frequency: 'Daily (Early morning)',
        timing: 'Before Meals',
        startDate: '2021-02-14',
        prescribedBy: 'Dr. Anita Desai',
        active: true
      },
      {
        id: 'med-5',
        name: 'Calcium + Vitamin D3 500mg',
        dosage: '1 tablet afternoon',
        frequency: 'Once daily',
        timing: 'After Meals',
        startDate: '2025-06-01',
        prescribedBy: 'Dr. Preeti Patel',
        active: true
      }
    ],
    emergencyNotes: 'No major cardiovascular issues. Strictly take Thyroxine on empty stomach with warm water.',
    emergencyContact: {
      name: 'Roshan Sharma (Son)',
      relationship: 'Son',
      phone: '+91 98765 43210'
    },
    upcomingAppointment: {
      date: '2026-10-05',
      doctorName: 'Dr. Anita Desai',
      specialty: 'Endocrinology',
      facility: 'Care Hospitals, Bhubaneswar'
    },
    documentCount: 8,
    lastCheckupDate: '2026-07-20'
  },
  {
    id: 'fam-me',
    name: 'Roshan Sharma',
    relationship: 'Me',
    age: 29,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'B+',
    conditions: ['Mild Exercise-Induced Asthma'],
    allergies: ['Seasonal Tree Pollen', 'Shellfish'],
    currentMedications: [
      {
        id: 'med-6',
        name: 'Salbutamol Inhaler (100mcg)',
        dosage: '1-2 puffs SOS',
        frequency: 'As needed',
        timing: 'As Needed',
        startDate: '2020-03-01',
        prescribedBy: 'Dr. K. N. Rao (Pulmonologist)',
        active: true
      }
    ],
    emergencyNotes: 'Carries rescue inhaler. Primary contact for parents and grandmother.',
    emergencyContact: {
      name: 'Sunita Sharma (Mother)',
      relationship: 'Mother',
      phone: '+91 98111 22334'
    },
    upcomingAppointment: {
      date: '2026-11-15',
      doctorName: 'Dr. K. N. Rao',
      specialty: 'Pulmonology',
      facility: 'AIIMS Bhubaneswar'
    },
    documentCount: 5,
    lastCheckupDate: '2026-06-10'
  },
  {
    id: 'fam-grandmother',
    name: 'Kamala Sharma',
    relationship: 'Grandmother',
    age: 84,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    conditions: ['Bilateral Knee Osteoarthritis (Grade 3)', 'Primary Open-Angle Glaucoma', 'Mild Memory Loss'],
    allergies: ['Aspirin / NSAIDs (causes gastric bleeding)'],
    currentMedications: [
      {
        id: 'med-7',
        name: 'Timolol 0.5% Eye Drops',
        dosage: '1 drop in both eyes',
        frequency: 'Twice daily (8 AM, 8 PM)',
        timing: 'As Needed',
        startDate: '2022-11-10',
        prescribedBy: 'Dr. Sudhir Roy (Ophthalmologist)',
        active: true
      },
      {
        id: 'med-8',
        name: 'Paracetamol 650mg ER',
        dosage: '1 tab when severe joint pain',
        frequency: 'SOS (Max 2 tabs/day)',
        timing: 'After Meals',
        startDate: '2024-05-12',
        prescribedBy: 'Dr. Sameer Sen (Orthopedic)',
        active: true
      }
    ],
    emergencyNotes: 'High fall risk. Requires walking stick. Strict avoidance of NSAIDs like Brufen/Diclofenac.',
    emergencyContact: {
      name: 'Roshan Sharma (Grandson)',
      relationship: 'Grandson',
      phone: '+91 98765 43210'
    },
    upcomingAppointment: {
      date: '2026-09-28',
      doctorName: 'Dr. Sudhir Roy',
      specialty: 'Ophthalmology',
      facility: 'Max Eye Institute, Bhubaneswar'
    },
    documentCount: 9,
    lastCheckupDate: '2026-08-01'
  }
];
