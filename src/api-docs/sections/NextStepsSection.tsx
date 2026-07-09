import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Icon from '../components/Icon';

const steps = [
  {
    icon: 'bug_report',
    title: 'إصلاح التناقض في المسارات',
    desc: 'تطبيق مسار update-order-status المفقود في وحدة Planning.',
  },
  {
    icon: 'api',
    title: 'إنشاء مواصفات OpenAPI/Swagger',
    desc: 'توثيق تلقائي لنقاط النهاية باستخدام (مثل L5-Swagger) لإخراج واجهة Swagger UI تفاعلية.',
  },
  {
    icon: 'schedule',
    title: 'مهمة دورية لمسح مناطق VIP',
    desc: 'بناء أمر Artisan لمسح ai_evaluated_grids منتهية الصلاحية دورياً وتحويل الشبكات المستمرة إلى مضلعات VipZone مسيجة.',
  },
];

const NextStepsSection: React.FC = () => {
  return (
    <section id="next-steps" className="docs-section">
      <SectionHeader
        icon="trending_up"
        title="الخطوات القادمة"
        description="الإجراءات الموصى بها للبناء على هيكل API الحالي"
      />

      <div style={{ display: 'grid', gap: 12 }}>
        {steps.map((step, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 36,
              height: 36,
              background: '#e8f0fe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#1a73e8',
            }}>
              <Icon name={step.icon} size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: '#5f6368', margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextStepsSection;
