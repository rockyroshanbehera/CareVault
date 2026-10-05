import React from 'react';
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
};
