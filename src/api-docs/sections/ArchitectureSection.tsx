import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Alert from '../components/Alert';
import Icon from '../components/Icon';

const modules = [
  { name: 'Admin', purpose: 'إدارة الأدوار والصلاحيات والمستخدمين الإداريين', models: 'Admin, Role, Permission' },
  { name: 'Core', purpose: 'الخدمات الجغرافية المشتركة والمحافظات والمناطق والإعدادات', models: 'Governorate, District, Setting, VipZone, RejectZone, AiEvaluatedGrid' },
  { name: 'Customers', purpose: 'ملفات العملاء وتصنيف العملاء المتوقعين وواجهة تحويل Meta API', models: 'Customer, BlockedCustomer' },
  { name: 'ErrorTracing', purpose: 'مراقبة الاستثناءات وتسجيل API', models: 'ErrorTracing' },
  { name: 'Financial', purpose: 'إدارة المصروفات التشغيلية وحسابات السلف', models: 'Expense' },
  { name: 'Order', purpose: 'طلبات العملاء العامة وسير عمل الطلبات الإدارية', models: 'Order' },
  { name: 'Planning', purpose: 'تخطيط مسارات التوصيل وجداول المندوبين', models: 'Plan, PlanItem' },
  { name: 'Reports', purpose: 'تقارير تحليلية (الربحية، أداء المندوبين، كثافة المواقع)', models: 'استعلامات وتجميعات' },
  { name: 'Tracking', purpose: 'تسجيل المواقع الفعلية وسجلات التتبع للمندوبين', models: 'UserLocation' },
];

const customerStatuses = [
  { value: 'new', label: 'جديد', desc: 'الملف مسجل حديثاً ولم يتم اتخاذ إجراء عليه' },
  { value: 'wa_sent', label: 'تم إرسال واتساب', desc: 'تم بدء التواصل التلقائي عبر واتساب' },
  { value: 'replied', label: 'تم الرد', desc: 'رد العميل على رسالة الواتساب' },
  { value: 'negotiating', label: 'جاري التواصل', desc: 'جاري التفاوض الهاتفي أو البيعي مع العميل' },
  { value: 'follow_up', label: 'متابعة لاحقاً', desc: 'تم تحديد موعد لمتابعة العميل مستقبلاً' },
  { value: 'postponed', label: 'مؤجل', desc: 'تأجيل موعد المعاملة بناءً على رغبة العميل' },
  { value: 'confirmed', label: 'تم الشراء', desc: 'تأكيد إتمام المعاملة بنجاح' },
  { value: 'no_answer', label: 'لم يرد', desc: 'لم يتمكن منسق الاتصال من الوصول للعميل' },
  { value: 'rejected', label: 'مرفوض', desc: 'تم رفض التعامل مع العميل أو حظره' },
  { value: 'visited', label: 'تمت الزيارة', desc: 'قام المندوب بزيارة العميل ميدانياً' },
  { value: 'delivered', label: 'تم التوصيل', desc: 'تم تسليم الأوزان وتصفية المعاملة' },
  { value: 'out_for_delivery', label: 'خارج للتوصيل', desc: 'المندوب في طريقه لموقع العميل' },
  { value: 'archived', label: 'مؤرشف', desc: 'موقع غير أساسي أو عميل تم أرشفته تشغيلياً' },
];

const customerFields = [
  { name: 'id', type: 'PK', desc: 'المعرف الفريد' },
  { name: 'customer_code', type: 'string', desc: 'رمز العميل الفريد' },
  { name: 'name', type: 'string', desc: 'الاسم (اختياري)' },
  { name: 'phone', type: 'encrypted', desc: 'رقم الموبايل المشفّر عند التخزين' },
  { name: 'whatsapp', type: 'string', desc: 'رقم الواتساب' },
  { name: 'phone_hash', type: 'string', desc: 'بصمة الهاتف للبحث السريع' },
  { name: 'status', type: 'string (Validated)', desc: 'حالة العميل (التحقق من صحتها في استمارات الإدخال)' },
  { name: 'trust_score', type: 'integer', desc: 'مؤشر الأمان والجودة' },
  { name: 'importance_score', type: 'integer', desc: 'نقاط الأولوية الجغرافية' },
  { name: 'assigned_rep_id', type: 'FK', desc: 'المندوب المعين (users.id)' },
  { name: 'created_by', type: 'FK', desc: 'من أنشأ الملف (admin.id)' },
];

const orderFields = [
  { name: 'id', type: 'PK', desc: 'المعرف الفريد' },
  { name: 'request_code', type: 'string', desc: 'رمز الطلب الفريد (REQ-XXXXXX)' },
  { name: 'customer_id', type: 'FK', desc: 'العميل المالك (customers.id)' },
  { name: 'weight', type: 'decimal', desc: 'الوزن المستلم بالكيلوجرام' },
  { name: 'buying_price', type: 'decimal', desc: 'سعر الشراء الكلي' },
  { name: 'delivery_price', type: 'decimal', desc: 'سعر التوصيل' },
  { name: 'pick_up_coordinates', type: 'json', desc: 'إحداثيات الموقع الخاصة بهذا الطلب' },
  { name: 'address', type: 'string', desc: 'العنوان التفصيلي' },
  { name: 'location_details', type: 'string', desc: 'تفاصيل الموقع الإضافية' },
  { name: 'user_id', type: 'FK', desc: 'المندوب المعين (users.id)' },
  { name: 'status', type: 'enum', desc: 'حالة الطلب التشغيلية (0-9)' },
];

const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="docs-section">
      <SectionHeader
        icon="hub"
        title="النظام المعماري والهيكل النمطي"
        description="نظرة عامة على البنية المعمارية وفصل هوية العميل عن دورة حياة الطلب"
      />

      <div className="card">
        <div className="card-title">
          <Icon name="account_tree" size={22} className="card-icon" />
          نبذة عن البنية المعمارية
        </div>
        <p>
          تم بناء نظام إحياء الموضة CRM كتطبيق مونوليثي نمطي باستخدام بنية معمارية صارمة قائمة على المجال
          (Laravel Modules). كل منطقة وظيفية في النظام معزولة في وحدة مستقلة ضمن المسار <code>Modules/</code>.
          هذا الفصل يضمن قاعدة بيانات نظيفة وحدود واضحة وسهولة في التوسع.
        </p>
      </div>

      {/* === 1-to-Many Architecture === */}
      <div className="card" style={{ borderRight: '3px solid #1a73e8' }}>
        <div className="card-title">
          <Icon name="call_split" size={22} className="card-icon" />
          بنية الـ 1-to-Many: العميل (Customer) والطلبات (Orders)
        </div>
        <p>
          النظام <strong>لا يحذف أو يستبدل</strong> جدول العملاء. بدلاً من ذلك، يحتفظ بجدول العملاء كسجل الهوية الرئيسي
          (Master Identity Registry) ويُدخل/يحافظ على جدول طلبات منفصل لتتبع طلبات التجميع الفردية عبر الزمن.
        </p>
      </div>

      {/* === Entity Relationship Diagram === */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: 20,
        marginTop: 16,
        overflowX: 'auto',
      }}>
        <img
          src="https://i.ibb.co/CKWZZyTG/ed747385-af8c-4084-855d-53b36a3b0446.jpg"
          alt="diagram showing 1-to-Many relationship between Customer and Order tables"
          style={{ width: '100%', height: 'auto', borderRadius: 4, display: 'block' }}
        />
      </div>

      {/* === Customer Table Schema === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24, color: '#202124' }}>جدول العملاء (customers - محفوظ)</h3>
      <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 12 }}>
        <strong>الغرض:</strong> يمثل الملف الشخصي والهوية للعميل. يحتفظ بالبيانات عبر الزمن حتى لو لم يقم العميل بأي طلبات.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>العمود</th>
              <th>النوع</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {customerFields.map((f) => (
              <tr key={f.name}>
                <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{f.name}</code></td>
                <td><span style={{ fontSize: 12, color: '#80868b' }}>{f.type}</span></td>
                <td style={{ fontSize: 13 }}>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Customer Lifecycle Statuses === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24, color: '#202124' }}>حالات العميل (Customer Lifecycle States)</h3>
      <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 12 }}>العمود <code>status</code> في جدول العملاء محدود بالقيم التالية فقط (حالة الهوية):</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>القيمة</th>
              <th>الاسم</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {customerStatuses.map((s) => (
              <tr key={s.value}>
                <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{s.value}</code></td>
                <td style={{ fontWeight: 600 }}>{s.label}</td>
                <td style={{ fontSize: 13 }}>{s.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Alert type="warning" icon="warning">
        <strong>حالة مهمة:</strong> الحالات التشغيلية الطويلة (مثل wa_sent, replied, negotiating, follow_up, postponed, confirmed, no_answer, visited, delivered, out_for_delivery) أُزيلت من جدول العملاء. هذه الحالات الآن خاصة بحالة الطلب في خط أنابيب الطلبات.
      </Alert>

      {/* === Orders Table Schema === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24, color: '#202124' }}>جدول الطلبات (orders - أضيف/تم الحفاظ عليه)</h3>
      <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 12 }}>
        <strong>الغرض:</strong> يتتبع كل طلب تجميع فريد (order) ينشئه العميل عبر الزمن. لكل عميل يمكن أن يكون له طلبات متعددة (1:N).
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>العمود</th>
              <th>النوع</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {orderFields.map((f) => (
              <tr key={f.name}>
                <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{f.name}</code></td>
                <td><span style={{ fontSize: 12, color: '#80868b' }}>{f.type}</span></td>
                <td style={{ fontSize: 13 }}>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Order Pipeline Statuses === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24, color: '#202124' }}>حالة الطلب (Order Pipeline Statuses)</h3>
      <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 12 }}>الطلب يمثل معاملة واحدة. حالاته قصيرة المدى وتمثل خط أنابيب اللوجستيات:</p>

      <div className="status-enum">
        {[
          { code: 0, label: 'PENDING', ar: 'قيد الانتظار' },
          { code: 1, label: 'APPROVED', ar: 'موافق عليه' },
          { code: 2, label: 'ASSIGNED', ar: 'معين لمندوب' },
          { code: 3, label: 'PICKED_UP', ar: 'تم الاستلام بالميدان' },
          { code: 4, label: 'DELIVERED', ar: 'تم التوريد للمخازن' },
          { code: 5, label: 'REJECTED', ar: 'مرفوض أثناء المعاينة' },
          { code: 6, label: 'CANCELLED', ar: 'ملغى من العميل أو الإدارة' },
          { code: 7, label: 'COMMUNICATED', ar: 'تم التواصل وبانتظار تحديد موعد' },
          { code: 8, label: 'SCHEDULED_VISITED', ar: 'زيارة مجدولة وتأكيد الموعد' },
          { code: 9, label: 'RESCHEDULED', ar: 'مؤجل وإعادة جدولة' },
        ].map((s) => (
          <div key={s.code} className="status-item">
            <span className="status-code">{s.code}</span>
            <span className="status-label">{s.label}</span>
            <span className="status-ar">{s.ar}</span>
          </div>
        ))}
      </div>

      {/* === Unit Map === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24, color: '#202124' }}>خريطة الوحدات النمطية</h3>

      <div className="grid-2">
        {modules.map((mod) => (
          <div key={mod.name} className="module-card">
            <div className="module-name">{mod.name}</div>
            <div className="module-purpose">{mod.purpose}</div>
            <div className="module-models">{mod.models}</div>
          </div>
        ))}
      </div>

      <Alert type="info" icon="info">
        <strong>10 وحدات نمطية نشطة</strong> — يضم النظام 10 وحدات نمطية مستقلة، كل منها مسؤول عن مجال وظيفي محدد.
      </Alert>
    </section>
  );
};

export default ArchitectureSection;
