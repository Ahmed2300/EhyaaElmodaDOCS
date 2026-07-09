import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Alert from '../components/Alert';
import CodeBlock from '../components/CodeBlock';
import Icon from '../components/Icon';

const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="docs-section">
      <SectionHeader
        icon="encrypted"
        title="طبقة الأمان وتشفير البيانات"
        description="حماية معلومات العملاء الشخصية (PII) في وضع السكون"
      />

      <div className="card">
        <div className="card-title">
          <Icon name="phone_iphone" size={22} className="card-icon" />
          التشفير المحسّن لأرقام الهواتف
        </div>
        <p>
          يتم معالجة أرقام هواتف العملاء عبر <code>EncryptedE164Phone.php</code>.
          عند الكتابة، يتم تنفيذ ثلاث خطوات:
        </p>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
            <span style={{ background: '#e8f0fe', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>1</span>
            <span><strong>التوحيد:</strong> يتم تنظيف الإدخال من الأحرف غير الرقمية وتحويله إلى صيغة E.164 المصرية (مثال: 01012345678 ← +201012345678).</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
            <span style={{ background: '#e8f0fe', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>2</span>
            <span><strong>التشفير:</strong> يتم تشفير الرقم الموحد باستخدام <code>AES-256-CBC</code> عبر <code>Crypt::encryptString()</code> قبل الحفظ في عمود <code>phone</code>.</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ background: '#e8f0fe', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>3</span>
            <span><strong>التجزئة الثابتة:</strong> يتم إنشاء تجزئة SHA-256 للرقم E.164 وتخزينها تلقائياً في عمود <code>phone_hash</code>.</span>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#202124' }}>مقتطف من تطبيق Cast</h3>

      <CodeBlock
        code={`return [
    $key => Crypt::encryptString($phone),
    'phone_hash' => hash('sha256', $phone),
];`}
      />

      <Alert type="info" icon="info">
        <strong>ملاحظة:</strong> هذا النهج المزدوج يضمن حماية أرقام الهواتف ضد اختراق قاعدة البيانات مع الحفاظ على قابلية البحث.
        للبحث أو التحقق من uniqueness، يقوم API بتجزئة معايير البحث ومطابقتها مع <code>phone_hash</code>،
        متجاوزاً الحاجة إلى فك تشفير الجدول بأكمله.
      </Alert>
    </section>
  );
};

export default SecuritySection;
