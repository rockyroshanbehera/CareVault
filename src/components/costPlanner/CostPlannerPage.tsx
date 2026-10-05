import React, { useState } from 'react';
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
};