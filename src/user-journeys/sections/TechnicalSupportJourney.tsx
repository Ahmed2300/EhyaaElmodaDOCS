import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import JourneyStep from '../components/JourneyStep';
import Icon from '../../api-docs/components/Icon';

const TechnicalSupportJourney: React.FC = () => {
  const roleColor = '#0d47a1';

  return (
    <section id="technical-support" className="docs-section">
      <SectionHeader icon="support_agent" title="رحلة الدعم الفني" description="معالجة الشكاوى وإدارة محتوى الواجهة وعمليات الاستيراد الجماعي للعملاء" />

      <JourneyStep number={1} title="مراقبة وحل شكاوى العملاء" icon="confirmation_number" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/feedback/complain', desc: 'قائمة شكاوى العملاء' },
        ]}
      >
        <p>يراجع فريق الدعم الفني الشكاوى المسجلة من العملاء ويعالجها:</p>
        <ul className="journey-detail-list">
          <li>تصفية التذاكر حسب درجة الاستعجال (منخفض، عادي، مرتفع، عاجل)</li>
          <li>التنسيق مع المندوبين لحل مشاكل التوصيل والمواعيد</li>
          <li>متابعة حالة كل تذكرة حتى الإغلاق</li>
        </ul>
      </JourneyStep>

      <JourneyStep number={2} title="إدارة محتوى الواجهة" icon="web" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/settings/welcome-settings', desc: 'تحديث محتوى صفحة الهبوط' },
        ]}
      >
        <p>يدير فريق الدعم الفني المحتوى الظاهر للعملاء على صفحة الهبوط العامة:</p>
        <div className="journey-options">
          <div className="journey-option" style={{ borderColor: roleColor }}>
            <Icon name="text_fields" size={20} className="journey-option-icon" style={{ color: roleColor }} />
            <div>
              <strong>النصوص والشعارات</strong>
              <p>تحديث العناوين الرئيسية والفرعية والنصوص الترويجية والشعارات المعروضة للعملاء</p>
            </div>
          </div>
          <div className="journey-option" style={{ borderColor: roleColor }}>
            <Icon name="image" size={20} className="journey-option-icon" style={{ color: roleColor }} />
            <div>
              <strong>صور البانر والخلفيات</strong>
              <p>رفع وتحديث صور الشعار الرئيسي والخلفيات والبانرات المعروضة</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={3} title="إدارة التكاملات" icon="integration_instructions" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/content/settings/toggle-meta', desc: 'تبديل حالة Meta Pixel API' },
        ]}
      >
        <p>يشرف فريق الدعم الفني على حالة التكامل مع الأنظمة الخارجية:</p>
        <ul className="journey-detail-list">
          <li>تبديل حالة Meta Pixel Conversions API (تشغيل/إيقاف)</li>
          <li>التحقق من صحة إعدادات النظام</li>
          <li>مراقبة حالة الاتصال بالخدمات الخارجية</li>
        </ul>
      </JourneyStep>

      <JourneyStep number={4} title="استيراد جهات الاتصال الجماعي" icon="upload_file" color={roleColor} isLast
        apiCalls={[
          { method: 'POST', path: '/api/v1/contacts/import', desc: 'رفع ملف جهات اتصال' },
          { method: 'GET', path: '/api/v1/contacts/import/{batch_id}/status', desc: 'التحقق من حالة المعالجة' },
        ]}
      >
        <p>يقوم فريق الدعم الفني باستيراد قوائم جهات الاتصال بكميات كبيرة:</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="upload_file" size={20} />
            </div>
            <div>
              <strong>رفع الملفات</strong>
              <p>رفع ملفات CSV, XLSX, XLS, TXT أو VCF لاستيراد جهات الاتصال دفعة واحدة (حد أقصى 10MB)</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="query_stats" size={20} />
            </div>
            <div>
              <strong>مراقبة المعالجة</strong>
              <p>الاستعلام عن حالة معالجة الاستيراد في الخلفية للتأكد من نجاح العملية وعدم وجود أخطاء في التنسيق أو تجاوز الحد الأقصى</p>
            </div>
          </div>
        </div>
      </JourneyStep>
    </section>
  );
};

export default TechnicalSupportJourney;
