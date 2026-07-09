import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Alert from '../components/Alert';
import Icon from '../components/Icon';

const adjustments = [
  {
    current: 'عرض نقاط تمثل العملاء فقط على الخريطة.',
    new: 'توفير خريطتين منفصلتين للأدمن: خريطة الطلبات النشطة (للأدمن والمندوب) لمتابعة التجميع الميداني، وخريطة العملاء الجغرافية (للأدمن فقط) لمراقبة التوزيع الكلي.',
    icon: 'map',
  },
  {
    current: 'نافذة المعلومات تعرض بيانات العميل وحالته التشغيلية.',
    new: 'في خريطة الطلبات: تعرض تفاصيل الطلب (REQ-XXXXXX) والوزن والعنوان وبيانات التواصل. وفي خريطة العملاء للأدمن: تعرض كود العميل (CUST-XXXXXX) وملفه الشخصي وتقييم أمانه.',
    icon: 'info',
  },
  {
    current: 'إسناد عميل للمندوب يدوياً.',
    new: 'إسناد طلب للمندوب: إما يدوياً بواسطة الأدمن بتعديل orders.user_id، أو ذاتياً بواسطة المندوب عبر تحديد دائرة على خريطته وحجز الطلبات فوراً.',
    icon: 'person_add',
  },
  {
    current: 'ملف العميل يعرض تفاصيل وحالة الهوية فقط.',
    new: 'ملف العميل (المحفوظ بالكامل) يعرض التفاصيل التعريفية بالإضافة لتبويب فرعي يعرض سجل الطلبات التاريخية بالكامل (رمز الطلب، التاريخ، الوزن، الحالة، المبلغ).',
    icon: 'badge',
  },
  {
    current: 'تخطيط المسارات باختيار customer_ids',
    new: 'تخطيط المسارات باختيار order_ids (طلبات نشطة فقط)',
    icon: 'route',
  },
  {
    current: 'تدقيق إغلاق الوردية بناءً على زيارات العملاء',
    new: 'تدقيق إغلاق الوردية بناءً على الطلبات المكتملة (حالة picked_up) خلال الوردية النشطة',
    icon: 'receipt',
  },
];

const AdminDashboardSection: React.FC = () => {
  return (
    <section id="admin-dashboard" className="docs-section">
      <SectionHeader
        icon="dashboard"
        title="تحديثات لوحة تحكم الإدارة (Order-Centric)"
        description="التغييرات المطلوبة لدعم التدفق المبني على الطلبات بدلاً من العملاء"
      />

      <Alert type="info" icon="info">
        <strong>المبدأ الأساسي:</strong> أصبحت لوحة التحكم مبنية على الطلبات (Order-Centric) بدلاً من العملاء (Customer-Centric). كل نقطة على الخريطة تمثل طلباً (وليس عميلاً)، وكل عملية إسناد تربط طلباً بمندوب.
      </Alert>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#202124' }}>مقارنة: التطبيق الحالي مقابل التطبيق الجديد</h3>

      <div style={{ display: 'grid', gap: 12 }}>
        {adjustments.map((adj, i) => (
          <div key={i} className="card" style={{ padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                width: 48,
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                flexShrink: 0,
              }}>
                <Icon name={adj.icon} size={22} className="card-icon" />
              </div>
              <div style={{ flex: 1, padding: '16px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#d93025', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      التطبيق الحالي
                    </div>
                    <p style={{ fontSize: 13, color: '#5f6368', margin: 0, lineHeight: 1.6 }}>{adj.current}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1e8e3e', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      التطبيق الجديد
                    </div>
                    <p style={{ fontSize: 13, color: '#5f6368', margin: 0, lineHeight: 1.6 }}>{adj.new}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === Customer Profile View Detail === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>ملف العميل (Customer Profile View) - تحديث تفصيلي</h3>

      <div className="card" style={{ borderRight: '3px solid #1a73e8' }}>
        <div className="card-title">
          <Icon name="badge" size={22} className="card-icon" />
          عرض الملف الشخصي مع سجل الطلبات
        </div>
        <p>
          أصبح صفحة الملف الشخصي للعميل تعرض <strong>بيانات الملف الشخصي + تبويب فرعي قابل للنقر</strong> يعرض سجل الطلبات
          (جميع المعاملات السابقة والنشطة) مع تفاصيل كل طلب: رمز الطلب، التاريخ، الوزن، الحالة، والمبلغ المدفوع.
        </p>
      </div>

      <div className="table-wrapper" style={{ marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>البيانات المعروضة</th>
              <th>التطبيق الحالي</th>
              <th>التطبيق الجديد</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>معلومات الملف الشخصي</td>
              <td>اسم العميل، الهاتف، الحالة التشغيلية</td>
              <td>اسم العميل، الهاتف، حالة الهوية (new/active/rejected/archived)، رمز العميل</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>سجل الطلبات</td>
              <td>-</td>
              <td>تبويب فرعي يعرض جميع الطلبات: request_code, weight, buying_price, status, created_at</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>الخرائط المتاحة (Map Layers)</td>
              <td>خريطة واحدة فقط تعرض العملاء</td>
              <td>خريطتان للأدمن (خريطة الطلبات للتجميع الميداني + خريطة العملاء للتوزيع الجغرافي). وخريطة واحدة للمندوب (خريطة الطلبات النشطة).</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>عملية الإسناد</td>
              <td>إسناد العميل للمندوب</td>
              <td>إسناد الطلب للمندوب + ربطه في الخطة اليومية</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert type="info" icon="info">
        <strong>API المرتبط:</strong> يتم تحميل سجل الطلبات عبر نقطة النهاية <code>GET /api/v1/customers/{'{id}'}/orders</code> التي تُرجع قائمة بجميع طلبات العميل (الماضية والنشطة).
      </Alert>
    </section>
  );
};

export default AdminDashboardSection;
