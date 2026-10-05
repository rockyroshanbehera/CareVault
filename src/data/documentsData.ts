import { MedicalDocument } from '../types';

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-1',
    memberId: 'fam-father',
    memberName: 'Rajesh Sharma',
    title: 'Dr. Vivek Sharma Cardiology Prescription',
    category: 'Prescription',
    date: '2026-09-12',
    doctorName: 'Dr. Vivek Sharma',
    hospitalName: 'Apollo Hospitals, Bhubaneswar',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    status: 'Analyzed',
    tags: ['Cardiology', 'Hypertension', 'Follow-up'],
    extractedSummary: {
      reasonForVisit: 'Routine quarterly cardiovascular follow-up and blood pressure monitoring.',
      importantFindings: [
        'Resting Blood Pressure: 138/86 mmHg (improved from 146/92).',
        'Heart sounds normal, regular rhythm, no peripheral edema.',
        'HbA1c steady at 6.8% under current Metformin dosage.'
      ],
      medicinesMentioned: [
        {
          name: 'Telmisartan 40mg',
          dosage: '1 tablet once daily morning',
          instructions: 'Take 30 minutes before breakfast with water'
        },
        {
          name: 'Atorvastatin 10mg',
          dosage: '1 tablet nightly',
          instructions: 'Continue lipid regulation regimen before bed'
        },
        {
          name: 'Metformin 500mg SR',
          dosage: '1 tablet twice daily after meals',
          instructions: 'Maintain post-meal glycemic stability'
        }
      ],
      followUpDate: '2026-09-24',
      importantInstructions: [
        'Maintain low sodium diet (< 4g table salt daily).',
        'Continue 30-minute brisk morning walks on level ground.',
        'Log daily home BP readings morning and evening for 7 days before next visit.'
      ],
      questionsToAskDoctor: [
        'Is my BP target reaching optimal levels or do we need a combination pill?',
        'Can I gradually resume light resistance exercises?',
        'When should I schedule the next lipid profile blood test?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-2',
    memberId: 'fam-father',
    memberName: 'Rajesh Sharma',
    title: 'Hospital Discharge Summary — Apollo Cardiology',
    category: 'Discharge Summary',
    date: '2026-09-12',
    doctorName: 'Dr. Vivek Sharma & Team',
    hospitalName: 'Apollo Hospitals, Bhubaneswar',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    status: 'Analyzed',
    tags: ['Discharge', 'Cardiology', 'ECG', 'Observation'],
    extractedSummary: {
      reasonForVisit: '24-hour observation for transient exertion-related chest heaviness and rhythm evaluation.',
      importantFindings: [
        'Troponin-I test negative at 0h, 6h, and 12h (No acute myocardial infarction).',
        '2D Echo showed normal Left Ventricular Ejection Fraction (LVEF 58%) with mild diastolic dysfunction.',
        'ECG demonstrated sinus rhythm without acute ST-T changes.'
      ],
      medicinesMentioned: [
        {
          name: 'Telmisartan 40mg',
          dosage: '1 tab OD',
          instructions: 'Maintain baseline antihypertensive therapy'
        },
        {
          name: 'Atorvastatin 10mg',
          dosage: '1 tab HS',
          instructions: 'Nightly plaque stabilizer'
        },
        {
          name: 'Sorbitrate 5mg (Sublingual)',
          dosage: 'SOS only',
          instructions: 'Place under tongue ONLY if severe retrosternal chest pain occurs and seek immediate ER'
        }
      ],
      followUpDate: '2026-09-24',
      importantInstructions: [
        'Avoid heavy lifting (> 10 kg) and strenuous climbing.',
        'Seek immediate emergency department care if chest pain lasts > 10 minutes.'
      ],
      questionsToAskDoctor: [
        'What should I monitor during morning walks?',
        'When should we repeat the treadmill stress test (TMT)?',
        'Are there any dietary restrictions regarding dairy or fats?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-3',
    memberId: 'fam-father',
    memberName: 'Rajesh Sharma',
    title: 'Comprehensive Lipid & Diabetic Blood Profile',
    category: 'Blood Report',
    date: '2026-08-10',
    doctorName: 'Dr. Anita Desai',
    hospitalName: 'Thyrocare Diagnostics',
    fileType: 'PDF',
    fileSize: '890 KB',
    status: 'Analyzed',
    tags: ['Lab Report', 'Lipid Profile', 'HbA1c', 'Glucose'],
    extractedSummary: {
      reasonForVisit: 'Periodic 3-month glycemic and lipid checkup.',
      importantFindings: [
        'Fasting Blood Sugar: 118 mg/dL (Target: < 120).',
        'Post Prandial Sugar (PPBS): 152 mg/dL (Good control).',
        'HbA1c: 6.8% (Target < 7.0% for diabetic seniors).',
        'Total Cholesterol: 182 mg/dL, Triglycerides: 165 mg/dL (Borderline elevated).'
      ],
      medicinesMentioned: [
        {
          name: 'Metformin 500mg SR',
          instructions: 'Continue regular dosage after dinner'
        }
      ],
      followUpDate: '2026-11-10',
      importantInstructions: [
        'Maintain low refined carbohydrate intake; avoid sugary sweets.',
        'Hydrate with minimum 2.5 liters of water daily.'
      ],
      questionsToAskDoctor: [
        'Do the borderline triglycerides require dietary tweaks or medication adjustment?',
        'When should we repeat serum creatinine tests?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-4',
    memberId: 'fam-mother',
    memberName: 'Sunita Sharma',
    title: 'Thyroid Function Test & Ultrasound Neck',
    category: 'Medical Report',
    date: '2026-07-18',
    doctorName: 'Dr. Anita Desai',
    hospitalName: 'Care Diagnostic Center',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    status: 'Analyzed',
    tags: ['Endocrinology', 'Thyroid', 'TSH', 'Ultrasound'],
    extractedSummary: {
      reasonForVisit: 'Evaluation of persistent morning lethargy and Levothyroxine dose titration.',
      importantFindings: [
        'Serum TSH: 4.85 µIU/mL (Target: 0.5 - 3.5 µIU/mL - slightly elevated).',
        'Free T4: 1.15 ng/dL (Normal).',
        'Neck Ultrasound showed normal thyroid gland volume with mild heterogeneous echotexture.'
      ],
      medicinesMentioned: [
        {
          name: 'Levothyroxine 75mcg',
          dosage: '1 tablet early morning',
          instructions: 'Strictly on empty stomach with warm water, 45 mins before tea/coffee'
        }
      ],
      followUpDate: '2026-10-05',
      importantInstructions: [
        'Do not take calcium or iron supplements within 4 hours of Levothyroxine.',
        'Repeat TSH after 8 weeks of compliant dosage.'
      ],
      questionsToAskDoctor: [
        'Should we increase Levothyroxine to 88mcg or retest in 8 weeks?',
        'Are there specific foods like soy or cabbage that I should limit?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-5',
    memberId: 'fam-grandmother',
    memberName: 'Kamala Sharma',
    title: 'Bilateral Knee Digital X-Ray & Orthopedic Report',
    category: 'Imaging',
    date: '2026-08-01',
    doctorName: 'Dr. Sameer Sen',
    hospitalName: 'Kalinga Institute of Medical Sciences (KIMS)',
    fileType: 'JPG',
    fileSize: '4.1 MB',
    status: 'Analyzed',
    tags: ['Orthopedics', 'X-Ray', 'Osteoarthritis', 'Joint'],
    extractedSummary: {
      reasonForVisit: 'Progressive pain and crepitus in bilateral knees upon standing and climbing.',
      importantFindings: [
        'X-ray reveals Grade 3 Kellgren-Lawrence Osteoarthritis in medial compartments of both knees.',
        'Narrowed joint space and marginal osteophytes noted.',
        'No active fracture or periosteal reaction.'
      ],
      medicinesMentioned: [
        {
          name: 'Paracetamol 650mg ER',
          dosage: '1 tab SOS (Max 2/day)',
          instructions: 'Safe analgesic without gastrointestinal ulceration'
        },
        {
          name: 'Calcium Citrate Malate + Vit D3',
          dosage: '1 tab daily after lunch'
        }
      ],
      followUpDate: '2026-09-28',
      importantInstructions: [
        'Avoid squatting and cross-legged sitting.',
        'Use western commode and knee brace while walking outside.',
        'Gentle quadriceps strengthening exercises under physiotherapist guidance.'
      ],
      questionsToAskDoctor: [
        'Would intra-articular hyaluronic acid or PRP injections provide relief?',
        'Is total knee replacement (TKR) recommended at her current age and mobility?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-6',
    memberId: 'fam-me',
    memberName: 'Roshan Sharma',
    title: 'Pulmonary Function Test (Spirometry) Report',
    category: 'Medical Report',
    date: '2026-06-10',
    doctorName: 'Dr. K. N. Rao',
    hospitalName: 'AIIMS Bhubaneswar',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    status: 'Analyzed',
    tags: ['Pulmonology', 'Spirometry', 'Asthma', 'FEV1'],
    extractedSummary: {
      reasonForVisit: 'Annual respiratory fitness review for sports & seasonal allergies.',
      importantFindings: [
        'FEV1 / FVC ratio: 82% (Normal lung volumes).',
        'Bronchodilator reversibility showed 8% improvement post-salbutamol (mild hyperreactivity).',
        'No active wheezing or bronchospasm at rest.'
      ],
      medicinesMentioned: [
        {
          name: 'Salbutamol Inhaler (100mcg)',
          dosage: '1-2 puffs 15 mins prior to heavy cardio or SOS'
        }
      ],
      followUpDate: '2026-11-15',
      importantInstructions: [
        'Carry inhaler during outdoor jogging and pollen peaks.',
        'Rinse mouth with water after using any aerosol inhaler.'
      ],
      questionsToAskDoctor: [
        'Do I need a prophylactic maintenance steroid inhaler for winter season?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  },
  {
    id: 'doc-7',
    memberId: 'fam-father',
    memberName: 'Rajesh Sharma',
    title: 'Star Health Family Optima Policy Document',
    category: 'Insurance',
    date: '2026-01-05',
    doctorName: 'Star Health Allied Insurance',
    hospitalName: 'Star Health Portal',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    status: 'Analyzed',
    tags: ['Insurance', 'Cashless', 'Coverage', 'Policy'],
    extractedSummary: {
      reasonForVisit: 'Annual health insurance policy renewal documentation.',
      importantFindings: [
        'Sum Insured: ₹10,00,000 (Family Floater).',
        'Pre-existing conditions (Hypertension, Diabetes) covered after 24-month waiting period (completed).',
        'Cashless network covers Apollo, Fortis, Max, and Care Hospitals.'
      ],
      medicinesMentioned: [],
      followUpDate: '2027-01-04',
      importantInstructions: [
        'Intimate insurer at least 48 hours prior to planned hospitalizations.',
        'In emergency admissions, report within 24 hours to hospital TPA desk.'
      ],
      questionsToAskDoctor: [
        'Are pre-hospitalization tests (within 60 days) eligible for full cashless claim?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    }
  }
];
