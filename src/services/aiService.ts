import { MedicalDocument, DocumentAISummary, AIChatMessage, FamilyMember, DoctorVisitSummary } from '../types';

export class AIService {
  private static apiKey: string | null = null;

  public static setApiKey(key: string) {
    this.apiKey = key;
  }

  public static async summarizeMedicalDocument(doc: MedicalDocument): Promise<DocumentAISummary> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (doc.extractedSummary) {
      return doc.extractedSummary;
    }

    return {
      reasonForVisit: `Clinical consultation and evaluation for ${doc.category.toLowerCase()} record.`,
      importantFindings: [
        'Vitals and primary diagnostic markers within normal baseline.',
        'No acute red flags observed on primary review.',
        'Follow-up scheduled as per standard medical protocol.'
      ],
      medicinesMentioned: [],
      followUpDate: 'In 2 weeks',
      importantInstructions: [
        'Continue prescribed baseline medication.',
        'Report any unexpected symptoms immediately.'
      ],
      questionsToAskDoctor: [
        'What specific symptoms should I watch for?',
        'Do I need any repeat diagnostic scans?'
      ],
      disclaimer: 'CareVault summarizes information from your medical documents. It does not diagnose conditions or replace professional medical advice.'
    };
  }

  public static async answerHealthVaultQuestion(
    query: string,
    documents: MedicalDocument[],
    familyMembers: FamilyMember[]
  ): Promise<AIChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('dad') || lowerQuery.includes('father') || lowerQuery.includes('rajesh')) {
      if (lowerQuery.includes('prescription') || lowerQuery.includes('medicine') || lowerQuery.includes('medication')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `According to Dad's (Rajesh Sharma) prescription from 12 September 2026 by Dr. Vivek Sharma (Cardiologist), here is his active medication regimen:\n\n• **Telmisartan 40mg**: 1 tablet once daily in the morning (take 30 mins before breakfast)\n• **Atorvastatin 10mg**: 1 tablet nightly at bedtime for plaque stability\n• **Metformin 500mg SR**: 1 tablet twice daily after meals for glycemic control\n\n**Next Scheduled Follow-up:** 24 September 2026 at Apollo Hospitals.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: [
            {
              documentId: 'doc-1',
              documentTitle: 'Dr. Vivek Sharma Cardiology Prescription',
              memberName: 'Rajesh Sharma (Father)',
              date: '12 Sep 2026'
            },
            {
              documentId: 'doc-2',
              documentTitle: 'Hospital Discharge Summary — Apollo Cardiology',
              memberName: 'Rajesh Sharma (Father)',
              date: '12 Sep 2026'
            }
          ],
          suggestedQuestions: [
            "Prepare a summary for Dad's upcoming appointment",
            "Are there any penicillin allergy warnings for Dad?",
            "What was Dad's last blood pressure reading?"
          ]
        };
      }

      if (lowerQuery.includes('report') || lowerQuery.includes('blood') || lowerQuery.includes('sugar') || lowerQuery.includes('hba1c')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `Dad's most recent comprehensive blood profile (10 Aug 2026, Thyrocare) shows stable glycemic control:\n\n• **HbA1c**: 6.8% (Well controlled for diabetic seniors, target < 7.0%)\n• **Fasting Blood Sugar**: 118 mg/dL (Normal baseline)\n• **Post-Prandial Sugar (PPBS)**: 152 mg/dL\n• **Triglycerides**: 165 mg/dL (Borderline elevated — Dr. Desai recommended low refined carbs).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: [
            {
              documentId: 'doc-3',
              documentTitle: 'Comprehensive Lipid & Diabetic Blood Profile',
              memberName: 'Rajesh Sharma (Father)',
              date: '10 Aug 2026'
            }
          ],
          suggestedQuestions: [
            "Show Dad's upcoming appointments",
            "Find cardiology hospitals near me"
          ]
        };
      }
    }

    if (lowerQuery.includes('mom') || lowerQuery.includes('mother') || lowerQuery.includes('sunita') || lowerQuery.includes('thyroid')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `According to Mom's (Sunita Sharma) Thyroid Function & Ultrasound report from 18 July 2026:\n\n• **Serum TSH**: 4.85 µIU/mL (Slightly elevated above normal 3.5 target)\n• **Free T4**: 1.15 ng/dL (Normal)\n• **Current Medication**: Levothyroxine 75mcg daily on an empty stomach with warm water.\n• **Key Instruction**: Do not take calcium or iron supplements within 4 hours of taking Thyroxine.\n• **Follow-up**: Retest TSH and consult Dr. Anita Desai on 5 October 2026.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          {
            documentId: 'doc-4',
            documentTitle: 'Thyroid Function Test & Ultrasound Neck',
            memberName: 'Sunita Sharma (Mother)',
            date: '18 Jul 2026'
          }
        ],
        suggestedQuestions: [
          "Show Mom's active medications",
          "Find endocrinologists near me"
        ]
      };
    }

    if (lowerQuery.includes('appointment') || lowerQuery.includes('follow-up') || lowerQuery.includes('doctor visit')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `Here are your family's upcoming medical appointments:\n\n1. **Father (Rajesh)**: Dr. Vivek Sharma (Cardiology) — **24 Sep 2026** at Apollo Hospitals\n2. **Grandmother (Kamala)**: Dr. Sudhir Roy (Ophthalmology) — **28 Sep 2026** at Max Eye Institute\n3. **Mother (Sunita)**: Dr. Anita Desai (Endocrinology) — **05 Oct 2026** at Care Hospitals\n4. **Roshan (Me)**: Dr. K. N. Rao (Pulmonology) — **15 Nov 2026** at AIIMS Bhubaneswar`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          {
            documentId: 'doc-1',
            documentTitle: 'Family Appointment Records',
            memberName: 'All Family Members',
            date: 'September 2026'
          }
        ],
        suggestedQuestions: [
          "Prepare a summary for Dad's doctor visit",
          "Find nearby pharmacies open 24/7"
        ]
      };
    }

    if (lowerQuery.includes('hospital') || lowerQuery.includes('cardiology') || lowerQuery.includes('heart')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `Based on your family's health profile and location in Bhubaneswar, here are top matching cardiology hospitals:\n\n1. **Apollo Hospitals** (4.2 km away) — **94% Match**\n   • 24/7 Level-1 Trauma & Cath Lab\n   • Covered by your Star Health cashless insurance\n\n2. **Care Hospitals** (6.8 km away) — **89% Match**\n   • Excellent multi-specialty cardiac & endocrine care with moderate cost tiers\n\n3. **AIIMS Bhubaneswar** (9.5 km away) — **84% Match**\n   • Premier tertiary super-specialty center with subsidized treatments.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          {
            documentId: 'hosp-1',
            documentTitle: 'CareVault Hospital Directory',
            memberName: 'Bhubaneswar Care Network',
            date: 'Live Data'
          }
        ],
        suggestedQuestions: [
          'Compare Apollo vs Care Hospitals',
          'What is the estimated cost for coronary stent?'
        ]
      };
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `I searched across your family's **${documents.length} stored documents** and health records. You have comprehensive medical history for Rajesh (Father), Sunita (Mother), Kamala (Grandmother), and Roshan (Me).\n\nWould you like me to:\n1. Summarize recent prescriptions or blood tests\n2. Prepare a 1-page visit briefing for an upcoming doctor appointment\n3. Check nearby hospital facilities and insurance coverage`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        {
          documentId: 'doc-1',
          documentTitle: 'CareVault Family Health Index',
          memberName: 'Family Vault',
          date: 'Synced 2026'
        }
      ],
      suggestedQuestions: [
        "Show Dad's latest prescription",
        "Summarize Mom's recent report",
        "Show our upcoming appointments",
        "Prepare a summary for my doctor"
      ]
    };
  }

  public static generateDoctorVisitSummary(member: FamilyMember, docs: MedicalDocument[]): DoctorVisitSummary {
    const memberDocs = docs.filter((d) => d.memberId === member.id);

    const concernsMap: Record<string, string[]> = {
      'fam-father': [
        'Blood pressure evaluation following exertion-related chest tightness on Sep 12',
        'Periodic review of lipid control and diabetic medication dosage',
        'Review exercise tolerance and clearance for brisk morning walks'
      ],
      'fam-mother': [
        'Evaluate persistent morning tiredness and titrate Levothyroxine',
        'Review bone density and calcium supplementation schedule'
      ],
      'fam-grandmother': [
        'Severe bilateral knee pain on weight bearing and stair climbing',
        'Glaucoma eye pressure monitoring and NSAID avoidance check'
      ],
      'fam-me': [
        'Annual asthma review and exercise-induced bronchospasm prevention',
        'Seasonal pollen allergy management'
      ]
    };

    const questionsMap: Record<string, string[]> = {
      'fam-father': [
        'Is the current blood pressure target (138/86) satisfactory or should Telmisartan be adjusted?',
        'Do we need to repeat the treadmill stress test (TMT) in 6 months?',
        'Are there specific dietary precautions regarding sodium and cooking oils?'
      ],
      'fam-mother': [
        'Should we adjust Levothyroxine dose from 75mcg to 88mcg based on TSH 4.85?',
        'Are there any goitrogenic foods I should strictly limit in my diet?'
      ],
      'fam-grandmother': [
        'Would intra-articular knee injections offer significant pain relief?',
        'Is total knee replacement indicated given her current age and cardiac status?'
      ],
      'fam-me': [
        'Should I use a preventive inhaled corticosteroid during peak pollen season?'
      ]
    };

    const recentReports = memberDocs.map((d) => ({
      title: d.title,
      date: d.date,
      keyResult: d.extractedSummary?.importantFindings?.[0] || 'Report reviewed and within baseline.'
    }));

    return {
      patientId: member.id,
      patientName: member.name,
      age: member.age,
      gender: member.gender,
      bloodGroup: member.bloodGroup,
      dateGenerated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      mainConcerns: concernsMap[member.id] || ['Routine general wellness consultation and medical record review.'],
      existingConditions: member.conditions,
      currentMedications: member.currentMedications.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency
      })),
      recentReports: recentReports.slice(0, 3),
      recentSymptoms: [
        'No acute fever or palpitations in the last 72 hours',
        'Sleep patterns normal; appetite consistent'
      ],
      allergies: member.allergies,
      questionsForDoctor: questionsMap[member.id] || [
        'What should I monitor between now and the next visit?',
        'Are there any medication side effects or interactions I should be mindful of?'
      ]
    };
  }

  public static explainMedicalTerm(term: string): { simpleMeaning: string; context: string } {
    const termMap: Record<string, { simpleMeaning: string; context: string }> = {
      'hba1c': {
        simpleMeaning: 'A 3-month average of your blood sugar levels.',
        context: 'A score under 5.7% is normal; 5.7%–6.4% indicates pre-diabetes; 6.5% or above indicates diabetes.'
      },
      'troponin-i': {
        simpleMeaning: 'A heart protein released into the bloodstream when the heart muscle is injured.',
        context: 'A negative test means no recent heart attack or acute cardiac muscle damage.'
      },
      'lvef': {
        simpleMeaning: 'Left Ventricular Ejection Fraction — percentage of blood pumped out of the heart with each beat.',
        context: "Normal range is 55% to 70%. Rajesh Sharma's 58% is healthy."
      },
      'tsh': {
        simpleMeaning: 'Thyroid Stimulating Hormone — tells your thyroid how much hormone to produce.',
        context: 'High TSH usually indicates an underactive thyroid (hypothyroidism), meaning more hormone is needed.'
      }
    };

    const clean = term.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const [k, v] of Object.entries(termMap)) {
      if (clean.includes(k) || k.includes(clean)) {
        return v;
      }
    }

    return {
      simpleMeaning: 'A clinical diagnostic parameter evaluated by your healthcare practitioner.',
      context: 'Always consult your prescribing physician for specific interpretations regarding your health profile.'
    };
  }
}
