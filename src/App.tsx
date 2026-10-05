import React, { useState, useEffect } from 'react';
import { CareVaultProvider, useCareVault } from './context/CareVaultContext';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { FamilyPage } from './components/family/FamilyPage';
import { HealthVaultPage } from './components/vault/HealthVaultPage';
import { AIAssistantPage } from './components/assistant/AIAssistantPage';
import { PrepareDoctorPage } from './components/doctorPrep/PrepareDoctorPage';
import { HospitalFinderPage } from './components/hospitals/HospitalFinderPage';
import { DoctorFinderPage } from './components/doctors/DoctorFinderPage';
import { InsuranceNavigatorPage } from './components/insurance/InsuranceNavigatorPage';
import { CostPlannerPage } from './components/costPlanner/CostPlannerPage';
import { PharmacyFinderPage } from './components/pharmacies/PharmacyFinderPage';
import { EmergencyModal } from './components/emergency/EmergencyModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsEmergencyModalOpen, setIsGlobalSearchOpen } = useCareVault();
  const [isInApp, setIsInApp] = useState(false);

  // Global keyboard shortcut for search (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  if (!isInApp) {
    return (
      <LandingPage
        onEnterDemo={() => setIsInApp(true)}
        onExplore={() => {
          setIsInApp(true);
          setActiveTab('overview');
        }}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'family':
        return <FamilyPage />;
      case 'vault':
        return <HealthVaultPage />;
      case 'assistant':
        return <AIAssistantPage />;
      case 'doctorPrep':
        return <PrepareDoctorPage />;
      case 'hospitals':
        return <HospitalFinderPage />;
      case 'doctors':
        return <DoctorFinderPage />;
      case 'insurance':
        return <InsuranceNavigatorPage />;
      case 'costPlanner':
        return <CostPlannerPage />;
      case 'pharmacies':
        return <PharmacyFinderPage />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar & Mobile Bottom Navigation */}
      <Sidebar onOpenEmergency={() => setIsEmergencyModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Header onOpenEmergency={() => setIsEmergencyModalOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <EmergencyModal />
    </div>
  );
};

export function App() {
  return (
    <CareVaultProvider>
      <AppContent />
    </CareVaultProvider>
  );
}

export default App;
