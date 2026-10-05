import fs from 'fs';
import path from 'path';

function writeFile(relPath, content) {
  const fullPath = path.resolve(relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Created: ' + relPath);
}

// 1. Modal.tsx
writeFile('src/components/common/Modal.tsx', 
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl'
  };

  return (
    <div className=fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in>
      <div
        className=fixed inset-0
        onClick={onClose}
        aria-hidden=true
      />
      <div
        className={relative w-full  + widthClasses[maxWidth] +  max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-modal border border-slate-100 overflow-hidden z-10}
      >
        <div className=flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/50>
          <div>
            <h3 className=text-lg font-semibold text-slate-900>{title}</h3>
            {subtitle && <p className=text-xs text-slate-500 mt-0.5>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className=p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors
            aria-label=Close modal
          >
            <X className=w-5 h-5 />
          </button>
        </div>

        <div className=p-5 overflow-y-auto max-h-[75vh]>
          {children}
        </div>
      </div>
    </div>
  );
};
);

// 2. StatCard.tsx
writeFile('src/components/common/StatCard.tsx', 
import React from 'react';

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
      className={bg-white p-5 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all  + (onClick ? 'cursor-pointer' : '')}
    >
      <div className=flex items-center justify-between>
        <span className=text-xs font-medium text-slate-500 uppercase tracking-wider>{label}</span>
        <div className={w-10 h-10 rounded-xl flex items-center justify-center border  + colorStyles[color]}>
          <Icon className=w-5 h-5 />
        </div>
      </div>
      <div className=mt-3 flex items-baseline gap-2>
        <span className=text-2xl font-bold text-slate-900>{value}</span>
        {trend && <span className=text-xs font-semibold text-emerald-600>{trend}</span>}
      </div>
      {subtitle && <p className=text-xs text-slate-500 mt-1>{subtitle}</p>}
    </div>
  );
};
);
