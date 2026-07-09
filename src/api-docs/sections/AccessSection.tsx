import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Icon from '../components/Icon';

const permissions = [
  'manage roles',
  'manage permissions',
  'manage admins',
  'manage core',
  'view locations',
  'manage locations',
  'manage settings',
  'manage reject zones',
  'manage customers',
  'manage orders',
  'manage plannings',
  'submit feedback',
  'view reports',
];

const AccessSection: React.FC = () => {
  return (
    <section id="access" className="docs-section">
      <SectionHeader
        icon="lock"
        title="الوصول إلى النظام، الأدوار والصلاحيات"
        description="إدارة المصادقة والصلاحيات عبر Laravel Sanctum و Spatie"
      />

      <div className="card">
        <div className="card-title">
          <Icon name="vpn_key" size={22} className="card-icon" />
          آلية المصادقة
        </div>
        <p>
          تتم إدارة المصادقة عبر <strong>Laravel Sanctum</strong> باستخدام Bearer Tokens.
          الوصول إلى نقاط النهاية محكوم بطبقة صلاحيات Spatie يتم تطبيقها عبر Middleware.
        </p>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#202124' }}>صلاحيات Spatie النشطة</h3>

      <div className="permission-list">
        {permissions.map((perm) => (
          <span key={perm} className="permission-tag">
            <Icon name="check_circle" size={14} className="perm-icon" />
            {perm}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AccessSection;
