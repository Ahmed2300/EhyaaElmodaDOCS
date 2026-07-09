import React, { useEffect, useState } from 'react';
import ApiDocs from './api-docs/ApiDocs';
import UserJourneys from './user-journeys/UserJourneys';
import Icon from './api-docs/components/Icon';

type Page = 'api-docs' | 'user-journeys';

const apiSectionIds = [
  'architecture', 'access', 'security', 'admin-dashboard', 'models-directory',
  'auth-endpoints', 'zone-endpoints', 'order-endpoints', 'customer-endpoints',
  'blocklist-endpoints', 'planning-endpoints', 'tracking-endpoints',
  'feedback-endpoints', 'sse-endpoints', 'reports-endpoints', 'audit', 'next-steps',
];

const journeySectionIds = [
  'guest-user', 'field-agent', 'liaison-loop', 'super-admin', 'accountant', 'technical-support',
];

function parseHash(): { page: Page; section: string | null } {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return { page: 'api-docs', section: null };
  if (journeySectionIds.includes(hash)) return { page: 'user-journeys', section: hash };
  if (apiSectionIds.includes(hash)) return { page: 'api-docs', section: hash };
  return { page: 'api-docs', section: null };
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(() => parseHash().page);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const { page: p } = parseHash();
      setPage(p);
      setSidebarOpen(false); // Close mobile sidebar on route navigation
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-mobile-open');
    } else {
      document.body.classList.remove('sidebar-mobile-open');
    }
    return () => {
      document.body.classList.remove('sidebar-mobile-open');
    };
  }, [sidebarOpen]);

  const switchPage = (p: Page) => {
    setPage(p);
    setSidebarOpen(false);
    const firstSection = p === 'api-docs' ? apiSectionIds[0] : journeySectionIds[0];
    window.location.hash = firstSection;
  };

  return (
    <div>
      <nav className="top-nav">
        <button
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="القائمة الجانبية"
        >
          <Icon name={sidebarOpen ? 'close' : 'menu'} size={24} />
        </button>
        <button
          className={`top-nav-tab ${page === 'api-docs' ? 'active' : ''}`}
          onClick={() => switchPage('api-docs')}
        >
          <Icon name="description" size={18} />
          <span>توثيق API</span>
        </button>
        <button
          className={`top-nav-tab ${page === 'user-journeys' ? 'active' : ''}`}
          onClick={() => switchPage('user-journeys')}
        >
          <Icon name="map" size={18} />
          <span>رحلات المستخدم</span>
        </button>
      </nav>
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      {page === 'api-docs' ? <ApiDocs /> : <UserJourneys />}
    </div>
  );
};

export default App;
