import React, { useState } from 'react';
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
};