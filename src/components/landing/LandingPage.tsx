import React from 'react';
import {
  Shield,
  FileText,
  Sparkles,
  Users,
  Building2,
  Stethoscope,
  HeartHandshake,
  ArrowRight,
  Activity,
  Heart,
  Search,
  CheckCircle2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface LandingPageProps {
  onEnterDemo: () => void;
  onExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDemo, onExplore }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-brand-50/30 flex flex-col">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center shadow-md shadow-brand-500/20 text-white font-bold text-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Care<span className="text-brand-600">Vault</span></span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
                Hackathon MVP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExplore}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Explore Features
            </button>
            <button
              onClick={onEnterDemo}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/20 transition-all flex items-center gap-2 group"
            >
              <span>Enter Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI-Powered Family Health Management & Healthcare Navigation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            Your family&apos;s health, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-teal-600">
              organized for life.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Store medical records, understand health documents with AI, discover verified doctors and hospitals, and keep your family&apos;s vital health information in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterDemo}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-2xl shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all flex items-center justify-center gap-3"
            >
              <span>Launch Live Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-soft hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Architecture & Flow</span>
            </button>
          </div>

          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
                  RS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-lg">Rajesh Sharma (Father)</h3>
                    <Badge variant="brand">62 Years</Badge>
                    <Badge variant="neutral">Blood Group: B+</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Next Cardiology Follow-up: 24 Sep 2026 • Apollo Hospitals</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5" /> 12 Analyzed Records
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> AI Summarized
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Active Conditions</span>
                <p className="text-sm font-semibold text-slate-800">Hypertension, Type 2 Diabetes</p>
                <p className="text-xs text-slate-500 mt-1">Penicillin Allergy flagged in vault</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Recent Document</span>
                <p className="text-sm font-semibold text-slate-800 truncate">Dr. Vivek Sharma Prescription</p>
                <p className="text-xs text-brand-600 mt-1 font-medium">Telmisartan 40mg • Atorvastatin</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">AI Assistant Query</span>
                <p className="text-xs text-slate-700 italic">&quot;Show Dad&apos;s latest prescription & precautions&quot;</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">✓ Source-cited response available</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/60 py-20 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">Core Capabilities</h2>
              <p className="text-3xl font-extrabold text-slate-900">Everything your family needs for lifelong healthcare</p>
              <p className="text-slate-600 mt-3">From unstructured PDF prescriptions to finding emergency care within minutes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Lifelong Health Vault</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Securely organize prescriptions, lab reports, discharge summaries, and vaccine records across generations in one searchable vault.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Medical Summaries</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Transform complex clinical jargon into simple reasons for visit, key lab findings, active medications, and targeted questions for your doctor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Family Profiles & Timelines</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dedicated health spaces for parents, children, and grandparents with chronological event tracking, vital alerts, and allergy tags.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Hospital Discovery & Match</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Discover nearby hospitals with objective match scoring based on specialty, distance, budget tier, and 3-way side-by-side comparison.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Doctor Preparation Brief</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generate concise 1-page clinical briefings with copy and printable PDF views to make appointments 3x more productive.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1-Tap Emergency Mode</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Instant critical SOS view showing blood groups, critical allergies, active medications, family phone contacts, and nearest trauma centers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-600" />
            <span className="font-bold text-slate-800">CareVault</span> — Your family&apos;s health, organized for life.
          </div>
          <p className="text-slate-400">Hackathon MVP Prototype • Built for demo presentation</p>
        </div>
      </footer>
    </div>
  );
};
