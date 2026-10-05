import { Hospital, Doctor, InsurancePolicy, HealthcareCostEstimate, Pharmacy } from '../types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Apollo Hospitals',
    specialty: ['Cardiology', 'Emergency Care', 'Neurology', 'Oncology', 'Orthopedics'],
    distanceKm: 4.2,
    costTier: '₹₹₹',
    estimatedCostRange: '₹3,500 – ₹1,20,000',
    emergencyAvailable: true,
    services: ['24/7 Level 1 Trauma Center', 'Cath Lab', 'Advanced ICU (45 Beds)', 'Cashless TPA Desk', 'Robotic Surgery'],
    rating: 4.8,
    reviewCount: 1420,
    address: 'Plot No. 251, Old Sainik School Road, Unit 15',
    city: 'Bhubaneswar',
    phone: '+91 674 666 1066',
    matchScore: 94,
    matchReasons: [
      'Top rated Cardiology & Interventional Heart Center',
      'Within 15 minutes drive (4.2 km)',
      '24/7 active emergency department & Cath Lab'
    ],
    icuBedsAvailable: 8,
    averageWaitTimeMin: 12,
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'ICICI Lombard', 'Niva Bupa'],
    accreditation: 'JCI & NABH Accredited'
  },
  {
    id: 'hosp-2',
    name: 'Care Hospitals',
    specialty: ['Cardiology', 'Endocrinology', 'Gastroenterology', 'General Surgery', 'Nephrology'],
    distanceKm: 6.8,
    costTier: '₹₹',
    estimatedCostRange: '₹2,000 – ₹75,000',
    emergencyAvailable: true,
    services: ['24/7 Emergency & Ambulance', 'Dialysis Center', 'Modular OT', 'In-house Pharmacy', 'TPA Cashless Desk'],
    rating: 4.6,
    reviewCount: 980,
    address: 'Unit No. 42, Chandrasekharpur, Infocity Road',
    city: 'Bhubaneswar',
    phone: '+91 674 304 7777',
    matchScore: 89,
    matchReasons: [
      'Balanced cost tier with extensive cardiology & endocrinology care',
      'Comprehensive cashless insurance support',
      'Lower waiting times for scheduled consultations'
    ],
    icuBedsAvailable: 12,
    averageWaitTimeMin: 18,
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'Tata AIG', 'Universal Sompo'],
    accreditation: 'NABH Accredited'
  },
  {
    id: 'hosp-3',
    name: 'AIIMS Bhubaneswar',
    specialty: ['Cardiology', 'Pulmonology', 'Emergency Care', 'Pediatrics', 'Rheumatology', 'Oncology'],
    distanceKm: 9.5,
    costTier: '₹',
    estimatedCostRange: '₹100 – ₹15,000 (Subsidized)',
    emergencyAvailable: true,
    services: ['Apex Tertiary Care', 'Government Subsidized Treatments', 'Specialized Super-specialty OPDs', '24/7 Trauma Service'],
    rating: 4.7,
    reviewCount: 2850,
    address: 'Sijua, Patrapada, Near Khandagiri',
    city: 'Bhubaneswar',
    phone: '+91 674 247 6789',
    matchScore: 84,
    matchReasons: [
      'Premier tertiary research institute with highly affordable pricing',
      'Exceptional multi-specialty faculty for complex diagnostics',
      '24/7 Level-1 Emergency & Trauma resuscitation'
    ],
    icuBedsAvailable: 4,
    averageWaitTimeMin: 45,
    insuranceAccepted: ['PMJAY / Ayushman Bharat', 'BSKY', 'CGHS', 'All Major TPAs'],
    accreditation: 'National Apex Medical Institute'
  },
  {
    id: 'hosp-4',
    name: 'Kalinga Institute of Medical Sciences (KIMS)',
    specialty: ['Orthopedics', 'Cardiology', 'Geriatrics', 'General Medicine', 'Ophthalmology'],
    distanceKm: 7.1,
    costTier: '₹₹',
    estimatedCostRange: '₹1,500 – ₹60,000',
    emergencyAvailable: true,
    services: ['Joint Replacement Specialty Unit', '24/7 Blood Bank', 'Day Care Surgery Unit', 'Advanced Physical Therapy'],
    rating: 4.5,
    reviewCount: 860,
    address: 'KIIT Campus 5, Patia',
    city: 'Bhubaneswar',
    phone: '+91 674 272 5700',
    matchScore: 87,
    matchReasons: [
      'Specialized Geriatric and Orthopedic Joint Center',
      'Affordable transparent package pricing',
      'Modern digital diagnostics and fast lab turnaround'
    ],
    icuBedsAvailable: 15,
    averageWaitTimeMin: 20,
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'Bajaj Allianz'],
    accreditation: 'NABH & NABL Accredited'
  },
  {
    id: 'hosp-5',
    name: 'AMRI Hospitals',
    specialty: ['Cardiology', 'Neurology', 'Critical Care', 'Internal Medicine'],
    distanceKm: 5.4,
    costTier: '₹₹₹',
    estimatedCostRange: '₹3,000 – ₹95,000',
    emergencyAvailable: true,
    services: ['24/7 Cardiac Emergency', 'Neuro ICU', 'Sleep Lab', 'Home Care Services', 'Express Health Checks'],
    rating: 4.4,
    reviewCount: 710,
    address: 'Plot No. 1, Khandagiri Square',
    city: 'Bhubaneswar',
    phone: '+91 674 666 5000',
    matchScore: 82,
    matchReasons: [
      'Rapid emergency triage and acute cardiac response',
      'Modern ICU infrastructure with dedicated intensivist coverage'
    ],
    icuBedsAvailable: 6,
    averageWaitTimeMin: 15,
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Max Bupa', 'ICICI Lombard'],
    accreditation: 'NABH Accredited'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-dr-sharma',
    name: 'Dr. Vivek Sharma',
    specialty: 'Cardiology',
    subSpecialty: 'Interventional Cardiology & Preventive Heart Health',
    experienceYears: 18,
    clinicOrHospital: 'Apollo Hospitals, Bhubaneswar',
    consultationFee: 1000,
    location: 'Unit 15, Bhubaneswar (4.2 km)',
    rating: 4.9,
    reviewCount: 380,
    availability: 'Available Today',
    nextAvailableSlot: 'Today at 5:30 PM',
    isVerified: true,
    isOnline: true,
    languages: ['English', 'Hindi', 'Odia'],
    education: 'MBBS, MD (General Medicine), DM (Cardiology) - AIIMS',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-dr-desai',
    name: 'Dr. Anita Desai',
    specialty: 'Endocrinology',
    subSpecialty: 'Diabetology & Thyroid Disorders',
    experienceYears: 14,
    clinicOrHospital: 'Care Hospitals & Thyroid Clinic',
    consultationFee: 800,
    location: 'Chandrasekharpur, Bhubaneswar (6.8 km)',
    rating: 4.8,
    reviewCount: 290,
    availability: 'Next Available: Tomorrow',
    nextAvailableSlot: 'Tomorrow at 10:00 AM',
    isVerified: true,
    isOnline: true,
    languages: ['English', 'Hindi'],
    education: 'MBBS, MD, DNB (Endocrinology) - CMC Vellore',
    avatar: 'https://images.unsplash.com/photo-1594824813689-f004af529a6b?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-dr-sen',
    name: 'Dr. Sameer Sen',
    specialty: 'Orthopedics',
    subSpecialty: 'Geriatric Joint Replacement & Arthroscopy',
    experienceYears: 22,
    clinicOrHospital: 'KIMS Orthopedic Center',
    consultationFee: 900,
    location: 'Patia, Bhubaneswar (7.1 km)',
    rating: 4.7,
    reviewCount: 420,
    availability: 'Mon - Fri',
    nextAvailableSlot: 'Wed at 2:00 PM',
    isVerified: true,
    isOnline: false,
    languages: ['English', 'Hindi', 'Bengali', 'Odia'],
    education: 'MBBS, MS (Orthopedics), M.Ch (UK)',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-dr-rao',
    name: 'Dr. K. N. Rao',
    specialty: 'Pulmonology',
    subSpecialty: 'Asthma, Allergy & Sleep Medicine',
    experienceYears: 16,
    clinicOrHospital: 'AIIMS Bhubaneswar',
    consultationFee: 500,
    location: 'Patrapada, Bhubaneswar (9.5 km)',
    rating: 4.8,
    reviewCount: 240,
    availability: 'Mon - Fri',
    nextAvailableSlot: 'Thursday at 11:30 AM',
    isVerified: true,
    isOnline: true,
    languages: ['English', 'Hindi', 'Telugu'],
    education: 'MBBS, MD (Pulmonary Medicine), FCCP',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-dr-roy',
    name: 'Dr. Sudhir Roy',
    specialty: 'Ophthalmology',
    subSpecialty: 'Glaucoma & Cataract Micro-Surgery',
    experienceYears: 19,
    clinicOrHospital: 'Max Eye Institute',
    consultationFee: 700,
    location: 'Saheed Nagar, Bhubaneswar (5.1 km)',
    rating: 4.9,
    reviewCount: 310,
    availability: 'Available Today',
    nextAvailableSlot: 'Today at 6:45 PM',
    isVerified: true,
    isOnline: false,
    languages: ['English', 'Hindi', 'Odia'],
    education: 'MBBS, MS (Ophthalmology), Fellow Glaucoma Society',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-dr-patel',
    name: 'Dr. Preeti Patel',
    specialty: 'General Medicine',
    subSpecialty: 'Geriatric Medicine & Preventive Healthcare',
    experienceYears: 11,
    clinicOrHospital: 'Family Wellness Clinic',
    consultationFee: 600,
    location: 'Jayadev Vihar, Bhubaneswar (3.8 km)',
    rating: 4.6,
    reviewCount: 195,
    availability: 'Available Today',
    nextAvailableSlot: 'Today at 4:00 PM',
    isVerified: true,
    isOnline: true,
    languages: ['English', 'Hindi', 'Gujarati'],
    education: 'MBBS, DNB (Family Medicine)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_INSURANCE_POLICIES: InsurancePolicy[] = [
  {
    id: 'ins-1',
    policyName: 'Family Health Optima Comprehensive',
    provider: 'Star Health Allied Insurance',
    annualPremium: 28500,
    coverageAmount: 1000000,
    networkHospitalsCount: 14200,
    waitingPeriod: '24 months for Pre-existing Conditions',
    coPay: '0% (Below 60 yrs), 10% (Above 60 yrs)',
    roomRentLimit: 'Single Private A/C Room (No Sub-limits)',
    exclusions: ['Cosmetic procedures', 'Self-inflicted injuries', 'Unproven experimental therapies'],
    matchReasons: [
      'Fits your selected family budget range (₹25k - ₹35k/year)',
      '10 Lakh floater cover covers parents and yourself',
      'Direct cashless settlement at Apollo, Care, and AMRI hospitals in Bhubaneswar',
      'Automatic recharge of sum insured up to 3 times per year'
    ],
    warnings: [
      '2-year waiting period applies for pre-existing Diabetes and Hypertension',
      'Pre-policy health checkup mandatory for members above 60 years'
    ],
    rating: 4.6,
    planType: 'Family Floater'
  },
  {
    id: 'ins-2',
    policyName: 'Optima Secure 2X Unlimited',
    provider: 'HDFC ERGO Health Insurance',
    annualPremium: 34200,
    coverageAmount: 1500000,
    networkHospitalsCount: 13800,
    waitingPeriod: '36 months for Pre-existing Conditions (reducible with rider)',
    coPay: 'Zero Co-pay across all age groups',
    roomRentLimit: 'No Room Rent Capping',
    exclusions: ['Dental treatments unless hospitalized', 'Weight loss surgery without morbid obesity'],
    matchReasons: [
      'Instant 2X coverage on day 1 (₹15 Lakh base becomes ₹30 Lakh protection)',
      'Zero deduction on non-medical consumable items (gloves, syringes, PPE)',
      'Protects accumulated bonus even with minor claims'
    ],
    warnings: [
      'Slightly higher premium tier',
      'Standard 3-year waiting window on chronic pre-existing ailments'
    ],
    rating: 4.8,
    planType: 'Family Floater'
  },
  {
    id: 'ins-3',
    policyName: 'Care Senior Health Shield',
    provider: 'Care Health Insurance',
    annualPremium: 22400,
    coverageAmount: 750000,
    networkHospitalsCount: 11500,
    waitingPeriod: '12 months with pre-existing reduction rider',
    coPay: '20% standard co-pay on claims',
    roomRentLimit: 'Up to 1% of Sum Insured / day',
    exclusions: ['Hearing aid devices', 'Routine refractive eye checkups'],
    matchReasons: [
      'Designed specifically for seniors above 60 with prior conditions',
      'Shorter 1-year waiting period option for hypertension/diabetes',
      'Includes annual preventive geriatric health checkup'
    ],
    warnings: [
      'Mandatory 20% co-pay on all hospitalization claims',
      'Room rent capped at ₹7,500/day'
    ],
    rating: 4.3,
    planType: 'Senior Citizen Special'
  },
  {
    id: 'ins-4',
    policyName: 'ReAssure 2.0 Titanium Lock',
    provider: 'Niva Bupa Health Insurance',
    annualPremium: 31000,
    coverageAmount: 1000000,
    networkHospitalsCount: 10200,
    waitingPeriod: '24 months for named pre-existing conditions',
    coPay: 'Zero Co-pay',
    roomRentLimit: 'Any room category including Deluxe Suites',
    exclusions: ['External congenital defects', 'Stem cell therapy'],
    matchReasons: [
      'Lock-the-clock feature: Premium does not increase with age until first claim',
      'Unlimited restoration of sum insured for same or different illness',
      'Live Health App reward discounts for daily 10,000 steps'
    ],
    warnings: [
      'Policy terms and cashless claim limits must be verified prior to admission',
      'Hospital tier restrictions apply for Tier-1 metro packages'
    ],
    rating: 4.7,
    planType: 'Individual Comprehensive'
  }
];

export const INITIAL_COST_ESTIMATES: HealthcareCostEstimate[] = [
  {
    id: 'cost-1',
    procedureName: 'Coronary Angiography & Drug-Eluting Stent (DES)',
    specialty: 'Cardiology',
    consultationRange: '₹800 – ₹1,500',
    diagnosticRange: '₹12,000 – ₹25,000 (Angiography + Echo + Bloods)',
    hospitalizationRange: '₹1,10,000 – ₹2,40,000 (1-2 Stents + 2 days ICU/Ward)',
    totalEstimatedRange: '₹1,25,000 – ₹2,65,000',
    typicalInsuranceCoverage: '85% – 95% (Subject to policy room rent & stent capping guidelines)',
    outOfPocketRange: '₹10,000 – ₹35,000 (Consumables, registration, non-medical items)',
    recoveryTime: '3 – 5 days discharge; 2 weeks light duty',
    notes: 'Costs vary based on single vs double vessel stent choice and whether performed during emergency vs planned admission.'
  },
  {
    id: 'cost-2',
    procedureName: 'Total Knee Replacement (Unilateral TKR)',
    specialty: 'Orthopedics',
    consultationRange: '₹700 – ₹1,200',
    diagnosticRange: '₹4,000 – ₹9,000 (Digital X-Rays, MRI knee, Pre-op Blood Panel)',
    hospitalizationRange: '₹1,40,000 – ₹2,20,000 (Imported Implant + 4 days Hospitalization)',
    totalEstimatedRange: '₹1,50,000 – ₹2,35,000',
    typicalInsuranceCoverage: '80% – 90% (Implant price capped as per NPPA guidelines)',
    outOfPocketRange: '₹20,000 – ₹45,000 (Physiotherapy package, walker, non-payable pharmacy items)',
    recoveryTime: '4 days in hospital; 4-6 weeks assisted walking with physiotherapy',
    notes: 'Bilateral (both knees) typically costs 1.6x of unilateral package.'
  },
  {
    id: 'cost-3',
    procedureName: 'Micro-Incision Cataract Surgery (Phacoemulsification + Monofocal IOL)',
    specialty: 'Ophthalmology',
    consultationRange: '₹500 – ₹1,000',
    diagnosticRange: '₹1,500 – ₹3,500 (A-Scan, Biometry, Slit Lamp Examination)',
    hospitalizationRange: '₹25,000 – ₹65,000 (Daycare procedure / Premium foldable lens)',
    totalEstimatedRange: '₹28,000 – ₹70,000 per eye',
    typicalInsuranceCoverage: '75% – 90% (Standard day-care cashless claim)',
    outOfPocketRange: '₹5,000 – ₹15,000 (If upgrading to Toric or Multifocal lenses)',
    recoveryTime: 'Daycare discharge within 4 hours; full visual clarity in 7-10 days',
    notes: 'Premium Multifocal or Trifocal lenses add ₹20k - ₹35k per eye.'
  },
  {
    id: 'cost-4',
    procedureName: 'Comprehensive Senior Diabetic & Cardiac Checkup Package',
    specialty: 'Preventive Healthcare',
    consultationRange: 'Included in package (Physician + Cardiologist + Dietitian)',
    diagnosticRange: '₹4,500 – ₹9,500 (ECG, TMT, 2D Echo, Lipid, HbA1c, Kidney/Liver Panel, Urine Microalbumin)',
    hospitalizationRange: '₹0 (Outpatient Day Service)',
    totalEstimatedRange: '₹4,500 – ₹9,500',
    typicalInsuranceCoverage: '100% reimbursed under Annual Wellness Health Check benefit of most policies',
    outOfPocketRange: '₹0 – ₹1,500',
    recoveryTime: 'No recovery needed (4 hours morning outpatient)',
    notes: 'Recommended annually for family members above age 50.'
  }
];

export const INITIAL_PHARMACIES: Pharmacy[] = [
  {
    id: 'pharm-1',
    name: 'Apollo Pharmacy 24/7 & Emergency Medicines',
    distanceKm: 0.8,
    isOpen: true,
    openingHours: 'Open 24 Hours (Day & Night)',
    phone: '+91 674 254 1122',
    hasDelivery: true,
    deliveryTimeMin: 30,
    address: 'Shop 4, Ground Floor, District Centre, Chandrasekharpur',
    medicineStockStatus: 'In Stock',
    rating: 4.7,
    reviewCount: 310
  },
  {
    id: 'pharm-2',
    name: 'MedPlus Express Pharmacy',
    distanceKm: 1.4,
    isOpen: true,
    openingHours: '7:00 AM – 11:30 PM',
    phone: '+91 674 230 4455',
    hasDelivery: true,
    deliveryTimeMin: 45,
    address: 'Plot 18, Near KIIT Square, Patia',
    medicineStockStatus: 'In Stock',
    rating: 4.5,
    reviewCount: 180
  },
  {
    id: 'pharm-3',
    name: 'Care Wellness Chemist & Surgical Store',
    distanceKm: 2.1,
    isOpen: true,
    openingHours: '8:00 AM – 10:30 PM',
    phone: '+91 674 274 8899',
    hasDelivery: true,
    deliveryTimeMin: 40,
    address: 'Near Care Hospitals Main Gate, Infocity Road',
    medicineStockStatus: 'In Stock',
    rating: 4.6,
    reviewCount: 140
  },
  {
    id: 'pharm-4',
    name: 'Jan Aushadhi Kendra (Generic Medicine Store)',
    distanceKm: 3.2,
    isOpen: true,
    openingHours: '9:00 AM – 9:00 PM (Closed Sundays)',
    phone: '+91 674 258 3344',
    hasDelivery: false,
    address: 'Opposite Government Hospital, Saheed Nagar',
    medicineStockStatus: 'Limited Stock',
    rating: 4.4,
    reviewCount: 95
  },
  {
    id: 'pharm-5',
    name: 'Sanjivani 24x7 Medical Superstore',
    distanceKm: 4.0,
    isOpen: true,
    openingHours: 'Open 24 Hours',
    phone: '+91 674 256 7788',
    hasDelivery: true,
    deliveryTimeMin: 35,
    address: 'Master Canteen Square, Station Road',
    medicineStockStatus: 'In Stock',
    rating: 4.8,
    reviewCount: 420
  }
];

export const INITIAL_ACTIVITY_LOG = [
  {
    id: 'act-1',
    text: 'Dr. Vivek Sharma Cardiology Prescription uploaded and analyzed for Father (Rajesh)',
    timestamp: 'Today, 2:15 PM',
    type: 'upload',
    member: 'Rajesh Sharma'
  },
  {
    id: 'act-2',
    text: 'Hospital Discharge Summary processed with AI medication extraction',
    timestamp: 'Today, 11:30 AM',
    type: 'ai_summary',
    member: 'Rajesh Sharma'
  },
  {
    id: 'act-3',
    text: 'Upcoming appointment booked with Dr. Vivek Sharma for Sep 24 at Apollo Hospitals',
    timestamp: 'Yesterday, 4:45 PM',
    type: 'appointment',
    member: 'Rajesh Sharma'
  },
  {
    id: 'act-4',
    text: 'Thyroid Function Test results added to Mother\'s (Sunita) Health Vault',
    timestamp: '3 days ago',
    type: 'upload',
    member: 'Sunita Sharma'
  },
  {
    id: 'act-5',
    text: 'Bilateral Knee X-Ray imaging added for Grandmother (Kamala)',
    timestamp: '5 days ago',
    type: 'upload',
    member: 'Kamala Sharma'
  }
];
