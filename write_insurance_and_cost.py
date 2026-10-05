import os

insurance_page = """import React, { useState } from 'react';
import {
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Building2,
  Percent,
  Coins,
  Shield,
  ExternalLink,
  Info
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { InsurancePolicy } from '../../types';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';

export const InsuranceNavigatorPage: React.FC = () => {
  const { insurancePolicies, familyMembers } = useCareVault();

  // Wizard requirement filters
  const [coverageGoal, setCoverageGoal] = useState('1000000');
  const [budgetTier, setBudgetTier] = useState('All');
  const [planTypeFilter, setPlanTypeFilter] = useState('All');
  const [coverSeniors, setCoverSeniors] = useState(true);

  const filteredPolicies = insurancePolicies.filter((policy) => {
    const matchesCoverage = Number(coverageGoal) <= policy.coverageAmount;
    const matchesPlanType = planTypeFilter === 'All' || policy.planType === planTypeFilter;
    return matchesCoverage && matchesPlanType;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Insurance Navigator
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                &ldquo;Compare coverage based on your family&apos;s needs.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <SafetyNotice />

      {/* Family Requirement Form / Wizard */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Family Requirements Calculator</h3>
            <p className="text-xs text-slate-500">Tailored for Rajesh (62y), Sunita (55y), Kamala (84y), and Roshan (29y)</p>
          </div>
          <Badge variant="purple">4 Family Members Covered</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Desired Sum Insured
            </label>
            <select
              value={coverageGoal}
              onChange={(e) => setCoverageGoal(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="500000">₹5,00,000 (5 Lakhs)</option>
              <option value="1000000">₹10,00,000 (10 Lakhs)</option>
              <option value="1500000">₹15,00,000 (15 Lakhs)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Plan Category
            </label>
            <select
              value={planTypeFilter}
              onChange={(e) => setPlanTypeFilter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="All">All Plan Types</option>
              <option value="Family Floater">Family Floater</option>
              <option value="Senior Citizen Special">Senior Citizen Special</option>
              <option value="Individual Comprehensive">Individual Comprehensive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Pre-existing Conditions
            </label>
            <div className="p-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium truncate">
              Diabetes, Hypertension, Glaucoma
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Network Hospitals
            </label>
            <div className="p-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium truncate">
              Apollo, Care, AMRI, KIMS
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Policy Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filteredPolicies.length} Comparative Policies Available
          </span>
          <span className="text-xs text-slate-400">
            CareVault does not endorse specific policies. Compare benefits and decide.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft hover:shadow-card hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Policy Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge variant="purple">{policy.planType}</Badge>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{policy.policyName}</h3>
                    <p className="text-xs text-slate-500">{policy.provider}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{policy.annualPremium.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-slate-400">per year (incl. GST)</span>
                  </div>
                </div>

                {/* Key Coverage Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-5 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Sum Insured</span>
                    <span className="font-extrabold text-slate-900">
                      ₹{(policy.coverageAmount / 100000).toFixed(0)} Lakhs
                    </span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Co-Pay</span>
                    <span className="font-bold text-brand-700">{policy.coPay}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Cashless Hospitals</span>
                    <span className="font-bold text-slate-900">{policy.networkHospitalsCount}+</span>
                  </div>
                </div>

                {/* Why this matches requirements */}
                <div className="mt-4 p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1.5">
                  <h4 className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Why this matches your requirements:
                  </h4>
                  <div className="space-y-1 text-xs text-slate-700">
                    {policy.matchReasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings / Terms */}
                <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  {policy.warnings.map((warn, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>

                {/* Room rent & Waiting period details */}
                <div className="mt-4 space-y-1 text-xs text-slate-600">
                  <p><span className="font-semibold text-slate-700">Waiting Period:</span> {policy.waitingPeriod}</p>
                  <p><span className="font-semibold text-slate-700">Room Rent Limit:</span> {policy.roomRentLimit}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Star Rating: ★ {policy.rating} / 5</span>
                <button
                  onClick={() => alert(`Reviewing complete terms for ${policy.policyName}...`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  View Policy Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};"""

cost_planner_page = """import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  Shield,
  Percent,
  Clock,
  Info,
  CheckCircle2,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';

export const CostPlannerPage: React.FC = () => {
  const { costEstimates } = useCareVault();

  const [selectedEstimateId, setSelectedEstimateId] = useState<string>(costEstimates[0]?.id || 'cost-1');
  const selectedEstimate = costEstimates.find((c) => c.id === selectedEstimateId) || costEstimates[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Treatment Cost Planner
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Understand transparent procedure cost ranges, insurance coverage, and out-of-pocket estimates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SafetyNotice
        customText="These are illustrative estimates for the hackathon MVP and are not formal hospital quotations. Actual costs vary by clinical complexity, room tier, and surgeon."
      />

      {/* Procedure Selector Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Select Procedure / Treatment Package:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {costEstimates.map((item) => {
            const isSelected = selectedEstimateId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedEstimateId(item.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold ring-1 ring-teal-500 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Badge variant="teal" size="sm">{item.specialty}</Badge>
                <h4 className="text-xs font-bold mt-1.5 line-clamp-2">{item.procedureName}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{item.totalEstimatedRange}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Procedure Detailed Breakdown */}
      {selectedEstimate && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="teal">{selectedEstimate.specialty}</Badge>
                <span className="text-xs font-semibold text-slate-400">Bhubaneswar Hospital Tiers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {selectedEstimate.procedureName}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-slate-400 uppercase block">Total Estimated Cost</span>
              <span className="text-2xl font-black text-slate-900 text-brand-600">
                {selectedEstimate.totalEstimatedRange}
              </span>
            </div>
          </div>

          {/* 3 Step Cost Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                1. Doctor Consultations
              </span>
              <p className="text-lg font-extrabold text-slate-900 mt-2">
                {selectedEstimate.consultationRange}
              </p>
              <p className="text-xs text-slate-500 mt-1">Senior specialist & anesthesiologist reviews</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                2. Diagnostics & Scans
              </span>
              <p className="text-lg font-extrabold text-slate-900 mt-2">
                {selectedEstimate.diagnosticRange}
              </p>
              <p className="text-xs text-slate-500 mt-1">Pre-op blood panels, imaging & pathology</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                3. Hospitalization & OT
              </span>
              <p className="text-lg font-extrabold text-slate-900 mt-2">
                {selectedEstimate.hospitalizationRange}
              </p>
              <p className="text-xs text-slate-500 mt-1">OT charges, surgeon fee, bed & consumables</p>
            </div>
          </div>

          {/* Insurance vs Out-of-Pocket Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-950">Possible Insurance Coverage</h3>
              </div>
              <p className="text-base font-extrabold text-emerald-800 mt-2">
                {selectedEstimate.typicalInsuranceCoverage}
              </p>
              <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
                Eligible under standard cashless hospitalization at Apollo, Care, and AMRI for active policyholders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-amber-950">Estimated Out-of-Pocket Expenses</h3>
              </div>
              <p className="text-base font-extrabold text-amber-800 mt-2">
                {selectedEstimate.outOfPocketRange}
              </p>
              <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                Covers non-medical disposables, registration fees, diet, and post-discharge take-home medicines.
              </p>
            </div>
          </div>

          {/* Recovery and Clinical Notes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Typical Recovery Period: {selectedEstimate.recoveryTime}</span>
            </div>
            <p className="text-slate-500 pl-5.5">{selectedEstimate.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};"""

os.makedirs('src/components/insurance', exist_ok=True)
os.makedirs('src/components/costPlanner', exist_ok=True)

with open('src/components/insurance/InsuranceNavigatorPage.tsx', 'w', encoding='utf-8') as f:
    f.write(insurance_page)
with open('src/components/costPlanner/CostPlannerPage.tsx', 'w', encoding='utf-8') as f:
    f.write(cost_planner_page)
print('Wrote InsuranceNavigatorPage.tsx and CostPlannerPage.tsx')
