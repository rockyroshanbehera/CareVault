import os

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f"Fixed {path}")

SAFETY_NOTICE = """import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface SafetyNoticeProps {
  type?: 'medical' | 'privacy' | 'general';
  customText?: string;
  className?: string;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({
  type = 'medical',
  customText,
  className = ''
}) => {
  const isPrivacy = type === 'privacy';
  const defaultText = isPrivacy
    ? 'Your health information is sensitive. This hackathon prototype uses demo data and is not intended for storing real medical records.'
    : 'CareVault summarizes information from your medical documents and assists healthcare navigation. It does not diagnose medical conditions or replace professional medical advice.';

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs leading-relaxed ${
        isPrivacy
          ? 'bg-amber-50/80 border-amber-200 text-amber-900'
          : 'bg-blue-50/80 border-blue-200/80 text-blue-900'
      } ${className}`}
    >
      {isPrivacy ? (
        <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
      )}
      <div>
        <span className="font-semibold mr-1">
          {isPrivacy ? 'Privacy & Demo Notice:' : 'Important Medical Disclaimer:'}
        </span>
        <span className="text-slate-700">{customText || defaultText}</span>
      </div>
    </div>
  );
};"""

STAT_CARD = """import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  color?: 'brand' | 'teal' | 'emerald' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'brand',
  onClick
}) => {
  const colorStyles = {
    brand: 'bg-brand-50 text-brand-600 border-brand-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all ${
        onClick ? 'cursor-pointer hover:border-brand-200' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {trend && <span className="text-xs font-semibold text-emerald-600">{trend}</span>}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};"""

write('src/components/common/SafetyNotice.tsx', SAFETY_NOTICE)
write('src/components/common/StatCard.tsx', STAT_CARD)
