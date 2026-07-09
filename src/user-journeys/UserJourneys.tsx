import React, { useEffect, useState } from 'react';
import GuestUserJourney from './sections/GuestUserJourney';
import FieldAgentJourney from './sections/FieldAgentJourney';
import LiaisonLoopSection from './sections/LiaisonLoopSection';
import SuperAdminJourney from './sections/SuperAdminJourney';
import AccountantJourney from './sections/AccountantJourney';
import TechnicalSupportJourney from './sections/TechnicalSupportJourney';
import Icon from '../api-docs/components/Icon';

const roles = [
  { id: 'guest-user', label: 'رحلة العميل', icon: 'person', color: '#1a73e8' },
  { id: 'field-agent', label: 'دورة عمل المندوب', icon: 'local_shipping', color: '#1e8e3e' },
  { id: 'liaison-loop', label: 'حلقة الوصل', icon: 'handshake', color: '#6a1b9a' },
  { id: 'super-admin', label: 'رحلة المدير', icon: 'admin_panel_settings', color: '#6a1b9a' },
  { id: 'accountant', label: 'رحلة المحاسب', icon: 'account_balance', color: '#e37400' },
  { id: 'technical-support', label: 'الدعم الفني', icon: 'support_agent', color: '#0d47a1' },
];

const roleIds = roles.map(r => r.id);

const UserJourneys: React.FC = () => {
  const hash = window.location.hash.replace('#', '');
  const initialRole = roleIds.includes(hash) ? hash : 'guest-user';
  const [activeRole, setActiveRole] = useState(initialRole);

  useEffect(() => {
    const roleId = window.location.hash.replace('#', '');
    if (roleIds.includes(roleId)) {
      setTimeout(() => {
        document.getElementById(roleId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (roleIds.includes(id)) {
        setActiveRole(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = roles[0].id;

      for (const role of roles) {
        const el = document.getElementById(role.id);
        if (el && el.offsetTop <= scrollPos) {
          current = role.id;
        }
      }

      if (current !== activeRole) {
        setActiveRole(current);
        history.replaceState(null, '', `#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeRole]);

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-header">
          <div className="docs-sidebar-logo">
            <div className="logo-icon">
              <Icon name="map" size={18} />
            </div>
            <h1>رحلات المستخدم</h1>
          </div>
          <div className="docs-sidebar-subtitle">إحياء الموضة CRM</div>
        </div>
        <nav className="docs-nav">
          <div className="docs-nav-section">الأدوار</div>
          {roles.map((role) => (
            <a
              key={role.id}
              href={`#${role.id}`}
              className={`docs-nav-item ${activeRole === role.id ? 'active' : ''}`}
              onClick={() => setActiveRole(role.id)}
              style={activeRole === role.id ? { borderRight: `3px solid ${role.color}` } : {}}
            >
              <span className="nav-icon" style={{ color: role.color }}>
                <Icon name={role.icon} size={18} />
              </span>
              <span>{role.label}</span>
            </a>
          ))}
        </nav>
      </aside>
      <main className="docs-main">
        <GuestUserJourney />
        <FieldAgentJourney />
        <LiaisonLoopSection />
        <SuperAdminJourney />
        <AccountantJourney />
        <TechnicalSupportJourney />
        <footer className="docs-footer">
          <p>2026 &copy; إحياء الموضة (ehyaaelmoda.com). جميع الحقوق محفوظة.</p>
          <p style={{ marginTop: 4 }}>رحلة المستخدم - توثيق تفاعلي لسير عمل النظام.</p>
        </footer>
      </main>
    </div>
  );
};

export default UserJourneys;
