import { MedicalTimelineItem } from '../types';

export const INITIAL_TIMELINE: MedicalTimelineItem[] = [
  {
    id: 'time-1',
    memberId: 'fam-father',
    year: '2026',
    date: '12 Sep 2026',
    title: 'Hospital Observation & Discharge',
    category: 'Hospitalization',
    doctorName: 'Dr. Vivek Sharma',
    facilityName: 'Apollo Hospitals, Bhubaneswar',
    summary: '24-hour observation for chest heaviness. Normal ECG and cardiac enzymes. BP stabilized to 138/86.',
    documentId: 'doc-2'
  },
  {
    id: 'time-2',
    memberId: 'fam-father',
    year: '2026',
    date: '12 Sep 2026',
    title: 'Cardiology Follow-up Prescription',
    category: 'Prescription',
    doctorName: 'Dr. Vivek Sharma',
    facilityName: 'Apollo Hospitals',
    summary: 'Continued Telmisartan and Metformin. Scheduled follow-up for 24 Sep.',
    documentId: 'doc-1'
  },
  {
    id: 'time-3',
    memberId: 'fam-father',
    year: '2026',
    date: '10 Aug 2026',
    title: 'Quarterly Lipid & Diabetic Lab Panel',
    category: 'Lab Report',
    doctorName: 'Dr. Anita Desai',
    facilityName: 'Thyrocare Diagnostics',
    summary: 'HbA1c at 6.8%, Fasting Blood Sugar 118 mg/dL. Good glycemic control.',
    documentId: 'doc-3'
  },
  {
    id: 'time-4',
    memberId: 'fam-father',
    year: '2025',
    date: '15 Nov 2025',
    title: 'Treadmill Stress Test (TMT)',
    category: 'Consultation',
    doctorName: 'Dr. Vivek Sharma',
    facilityName: 'Apollo Hospitals',
    summary: 'TMT test completed up to Stage 3 Bruce Protocol. Good functional exercise capacity.'
  },
  {
    id: 'time-5',
    memberId: 'fam-father',
    year: '2024',
    date: '18 Apr 2024',
    title: 'Annual Comprehensive Health Checkup',
    category: 'Consultation',
    doctorName: 'Dr. Rajesh Mohapatra',
    facilityName: 'Care Hospitals',
    summary: 'Routine geriatric wellness screen. Initiated lifestyle and dietary salt restrictions.'
  },
  {
    id: 'time-6',
    memberId: 'fam-mother',
    year: '2026',
    date: '18 Jul 2026',
    title: 'Thyroid Ultrasound & TSH Evaluation',
    category: 'Lab Report',
    doctorName: 'Dr. Anita Desai',
    facilityName: 'Care Diagnostic Center',
    summary: 'TSH slightly elevated at 4.85. Continued Levothyroxine 75mcg.',
    documentId: 'doc-4'
  },
  {
    id: 'time-7',
    memberId: 'fam-grandmother',
    year: '2026',
    date: '01 Aug 2026',
    title: 'Knee Digital Radiography',
    category: 'Surgery',
    doctorName: 'Dr. Sameer Sen',
    facilityName: 'KIMS Hospital',
    summary: 'Grade 3 knee osteoarthritis confirmed. Advised physiotherapy and Western commode.',
    documentId: 'doc-5'
  },
  {
    id: 'time-8',
    memberId: 'fam-me',
    year: '2026',
    date: '10 Jun 2026',
    title: 'Spirometry Lung Function Assessment',
    category: 'Consultation',
    doctorName: 'Dr. K. N. Rao',
    facilityName: 'AIIMS Bhubaneswar',
    summary: 'FEV1/FVC 82%. Asthma well-controlled with SOS Salbutamol.',
    documentId: 'doc-6'
  }
];
