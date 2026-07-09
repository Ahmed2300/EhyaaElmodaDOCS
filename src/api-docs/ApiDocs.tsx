import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import ArchitectureSection from './sections/ArchitectureSection';
import AccessSection from './sections/AccessSection';
import SecuritySection from './sections/SecuritySection';
import AuthEndpointsSection from './sections/AuthEndpointsSection';
import ZoneEndpointsSection from './sections/ZoneEndpointsSection';
import OrderEndpointsSection from './sections/OrderEndpointsSection';
import CustomerEndpointsSection from './sections/CustomerEndpointsSection';
import BlocklistEndpointsSection from './sections/BlocklistEndpointsSection';
import PlanningEndpointsSection from './sections/PlanningEndpointsSection';
import FinancialEndpointsSection from './sections/FinancialEndpointsSection';
import TrackingEndpointsSection from './sections/TrackingEndpointsSection';
import SSEEndpointsSection from './sections/SSEEndpointsSection';
import ReportsSection from './sections/ReportsSection';
import AuditSection from './sections/AuditSection';
import ModelsDirectorySection from './sections/ModelsDirectorySection';
import AdminDashboardSection from './sections/AdminDashboardSection';
import NextStepsSection from './sections/NextStepsSection';

const sectionIds = [
  'architecture',
  'access',
  'security',
  'admin-dashboard',
  'models-directory',
  'auth-endpoints',
  'zone-endpoints',
  'order-endpoints',
  'customer-endpoints',
  'blocklist-endpoints',
  'planning-endpoints',
  'financial-endpoints',
  'tracking-endpoints',
  'sse-endpoints',
  'reports-endpoints',
  'audit',
  'next-steps',
];

const ApiDocs: React.FC = () => {
  const hash = window.location.hash.replace('#', '');
  const initialSection = sectionIds.includes(hash) ? hash : 'architecture';
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionIds.includes(sectionId)) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (sectionIds.includes(id)) {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
        history.replaceState(null, '', `#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="docs-layout">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="docs-main">
        <ArchitectureSection />
        <AccessSection />
        <SecuritySection />
        <AdminDashboardSection />
        <ModelsDirectorySection />
        <AuthEndpointsSection />
        <ZoneEndpointsSection />
        <OrderEndpointsSection />
        <CustomerEndpointsSection />
        <BlocklistEndpointsSection />
        <PlanningEndpointsSection />
        <FinancialEndpointsSection />
        <TrackingEndpointsSection />
        <SSEEndpointsSection />
        <ReportsSection />
        <AuditSection />
        <NextStepsSection />

        <footer className="docs-footer">
          <p>2026 &copy; إحياء الموضة (ehyaaelmoda.com). جميع الحقوق محفوظة.</p>
          <p style={{ marginTop: 4 }}>صمم هذا المستند كمرجع فني نهائي للتكامل.</p>
        </footer>
      </main>
    </div>
  );
};

export default ApiDocs;
