import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Alert from '../components/Alert';
import Icon from '../components/Icon';
import EndpointCard from '../components/EndpointCard';

const AuditSection: React.FC = () => {
  return (
    <section id="audit" className="docs-section">
      <SectionHeader
        icon="find_in_page"
        title="سجلات النشاط والتناقضات (Activity Logs & Audits)"
        description="سجلات التدقيق لمراقبة العمليات البرمجية والتناقضات المكتشفة في النظام"
      />

      <Alert type="warning" icon="warning">
        <strong>تنبيه: مسار مفقود</strong> — يحدد <code>PlanningController</code> الدالة
        <code> updateOrderStatus(Request $request)</code> المرتبطة بالمسار
        <code> PATCH /api/v1/plannings/update-order-status</code> في
        <code> PlanningController.php:L97</code>.
        ومع ذلك، هذا المسار غير معلن في ملف مسارات وحدة Planning (<code>routes/api.php</code>).
        محاولة استدعائه ستؤدي إلى استجابة 404 Not Found.
      </Alert>

      <div className="card" style={{ marginBottom: 32 }}>
        <div className="card-title">
          <Icon name="build" size={22} className="card-icon" />
          التوصية
        </div>
        <p>
          إضافة السطر التالي إلى قسم المسارات المحمية في <code>Modules/Planning/routes/api.php</code>:
        </p>
        <div style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: 8,
          padding: '12px 16px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          direction: 'ltr',
          textAlign: 'left',
          marginTop: 8,
        }}>
          <span style={{ color: '#569cd6' }}>Route</span>::<span style={{ color: '#dcdcaa' }}>patch</span>(<span style={{ color: '#ce9178' }}>'plannings/update-order-status'</span>, [<span style={{ color: '#569cd6' }}>PlanningController</span>::<span style={{ color: '#dcdcaa' }}>class</span>, <span style={{ color: '#ce9178' }}>'updateOrderStatus'</span>])<span style={{ color: '#569cd6' }}>-&gt;</span><span style={{ color: '#dcdcaa' }}>name</span>(<span style={{ color: '#ce9178' }}>'planning.update-order-status'</span>);
        </div>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>نقاط نهاية سجلات النشاط (Activity / Audit Logs)</h3>
      <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 16 }}>تتبع تفصيلي لكافة الأحداث والعمليات التي أجراها الموظفون ومدراء النظام لضمان النزاهة والشفافية التشغيلية.</p>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/audit-logs"
        title="قائمة سجل النشاط (Audit Logs List)"
        access="محمي (الأدمن والمشرف)"
        permission="view reports"
        description="استرجاع قائمة بكافة الأنشطة المسجلة (مثل: إنشاء عميل، إسناد مسار، تعديل إعداد) مع فلاتر التصفية المحسنة."
        validation={{
          user_id: 'nullable | exists:users,id (المستخدم الفاعل)',
          event: 'nullable | in:created,updated,deleted,restored',
          start_date: 'nullable | date | format:YYYY-MM-DD',
          end_date: 'nullable | date | format:YYYY-MM-DD',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/admin/audit-logs/{id}"
        title="تفاصيل سجل النشاط"
        access="محمي (الأدمن والمشرف)"
        permission="view reports"
        description="استرجاع تفاصيل سجل نشاط محدد مع عرض مقارنة القيم القديمة والجديدة لخصائص النموذج المعدل (attribute_changes)."
        validation={{
          id: 'required | exists:activity_log,id',
        }}
      />
    </section>
  );
};

export default AuditSection;
