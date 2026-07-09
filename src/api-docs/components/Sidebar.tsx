import React from 'react';
import Icon from './Icon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  section?: string;
}

const navSections: { name: string; items: NavItem[] }[] = [
  {
    name: 'المقدمة',
    items: [
      { id: 'architecture', label: 'النظام المعماري', icon: 'hub' },
      { id: 'access', label: 'الصلاحيات والأدوار', icon: 'lock' },
      { id: 'security', label: 'التشفير والأمان', icon: 'encrypted' },
      { id: 'admin-dashboard', label: 'تحديثات لوحة الإدارة', icon: 'dashboard' },
    ],
  },
  {
    name: 'نقاط النهاية',
    items: [
      { id: 'auth-endpoints', label: 'المصادقة والمشرفين', icon: 'login' },
      { id: 'zone-endpoints', label: 'المناطق الجغرافية', icon: 'pin_drop' },
      { id: 'order-endpoints', label: 'الطلبات', icon: 'inventory_2' },
      { id: 'customer-endpoints', label: 'العملاء', icon: 'people' },
      { id: 'blocklist-endpoints', label: 'قائمة الحظر', icon: 'block' },
      { id: 'planning-endpoints', label: 'التخطيط', icon: 'route' },
      { id: 'financial-endpoints', label: 'النظام المالي والعهد', icon: 'payments' },
      { id: 'tracking-endpoints', label: 'التتبع', icon: 'my_location' },
      { id: 'sse-endpoints', label: 'البث المباشر', icon: 'stream' },
      { id: 'reports-endpoints', label: 'التقارير', icon: 'bar_chart' },
    ],
  },
  {
    name: 'النماذج',
    items: [
      { id: 'models-directory', label: 'معجم النماذج', icon: 'account_tree' },
    ],
  },
  {
    name: 'التدقيق',
    items: [
      { id: 'audit', label: 'التناقضات', icon: 'find_in_page' },
      { id: 'next-steps', label: 'الخطوات القادمة', icon: 'trending_up' },
    ],
  },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-header">
        <div className="docs-sidebar-logo">
          <div className="logo-icon">
            <Icon name="description" size={18} />
          </div>
          <h1>توثيق API</h1>
        </div>
        <div className="docs-sidebar-subtitle">إحياء الموضة CRM</div>
      </div>
      <nav className="docs-nav">
        {navSections.map((group) => (
          <div key={group.name}>
            <div className="docs-nav-section">{group.name}</div>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon name={item.icon} size={18} className="nav-icon" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
