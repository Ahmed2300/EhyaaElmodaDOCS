import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';
import Alert from '../components/Alert';

const FinancialEndpointsSection: React.FC = () => {
  return (
    <section id="financial-endpoints" className="docs-section">
      <SectionHeader
        icon="payments"
        title="النظام المالي والعهد والمخازن (Financials & Inventory)"
        description="نقاط نهاية الإدارة المالية للعهد، سجل المشتريات، المخازن، المبيعات، ومصروفات الشركة"
      />

      <Alert type="warning" icon="shield">
        <strong>قواعد الحماية والنزاهة المالية (Financial Integrity Rules):</strong>
        <br />
        1. <strong>عدم التعديل أو الحذف:</strong> لا يمكن حذف أو تعديل أي سجل مالي (عملية شراء، بيع، مصروف، أو تعديل عهدة) بعد اعتماده. أي تصحيح يتم عبر **حركة تصحيحية (Correction Transaction)** جديدة لضمان دقة سجل المراجعة (Audit Trail).
        <br />
        2. <strong>تجميد الأسعار:</strong> تُحفظ أسعار الشراء والبيع والعمليات كما كانت **وقت التنفيذ** ولا تتأثر بتعديل الإعدادات العامة لاحقاً.
        <br />
        3. <strong>الكسور العشرية:</strong> تدعم الأوزان الكسور العشرية (Decimal) بدقة متناهية لمطابقة القراءات الميدانية للموازين.
      </Alert>

      {/* === Section 1: Accounting Dashboard === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>1. لوحة تحكم الحسابات (Accounting Dashboard)</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/accounting/summary"
        title="ملخص المركز المالي (Dashboard Summary)"
        access="محمي (الأدمن والمحاسب)"
        permission="view reports"
        description="استرجاع إجمالي المشتريات والمبيعات (وزناً وقيمة)، رصيد المخزن الحالي، إجمالي المصروفات وصافي الربح."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/accounting/imprest/adjust"
        title="تعديل وشحن عهدة مندوب (Imprest Adjust)"
        access="محمي (الأدمن والمحاسب)"
        permission="manage admins"
        description="شحن أو تعديل رصيد العهدة المالية لمندوب معين (تخصيص رصيد البداية أو تعويض العهدة)."
        payload={{
          user_id: 12,
          amount: 1500.0,
          action: 'add',
          notes: 'شحن العهدة لبداية الأسبوع',
        }}
        validation={{
          user_id: 'required | exists:users,id',
          amount: 'required | numeric | min:1',
          action: 'required | string | in:add,deduct,set',
          notes: 'required | string | max:255',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/accounting/corporate-expenses"
        title="تسجيل المصروفات العامة للشركة"
        access="محمي (الأدمن والمحاسب)"
        permission="manage settings"
        description="تسجيل المصاريف التشغيلية للمشروع (مثل: إيجار المقرات، الرواتب الإدارية، الحملات الإعلانية) وتخصم تلقائياً من صافي الأرباح."
        payload={{
          category: 'marketing',
          amount: 5000.0,
          description: 'حملة إعلانات فيسبوك لشهر يوليو',
        }}
        validation={{
          category: 'required | string | in:rent,salaries,marketing,utilities,other',
          amount: 'required | numeric | min:1',
          description: 'required | string | max:500',
        }}
      />

      {/* === Section 2: Inventory === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>2. إدارة المخازن (Inventory Management)</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/inventory/summary"
        title="حالة المخزن الحالي (Inventory Status)"
        access="محمي (الأدمن والمحاسب)"
        permission="view reports"
        description="عرض رصيد المخزن الحالي (بالكيلوجرام) وإحصائيات الوارد (من المشتريات) والصادر (من المبيعات) والتعديلات الإدارية."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/inventory/movements"
        title="تسجيل حركة مخزنية يدوية (تعديل/هالك)"
        access="محمي (الأدمن والمحاسب)"
        permission="manage core"
        description="إجراء تعديل يدوي على المخزون لتسجيل الهالك أو العجز بعد الجرد."
        payload={{
          weight: 12.5,
          type: 'waste',
          notes: 'ملابس تالفة غير صالحة للبيع تم استبعادها',
        }}
        validation={{
          weight: 'required | numeric | min:0.01',
          type: 'required | string | in:adjustment_in,adjustment_out,waste',
          notes: 'required | string | max:255',
        }}
      />

      {/* === Section 3: Sales & Buyers === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>3. المبيعات والمشترون (Sales & Buyers)</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/admin/sales"
        title="تسجيل عملية بيع بضاعة (Record Sale)"
        access="محمي (الأدمن والمحاسب)"
        permission="manage orders"
        description="تسجيل مبيعات الملابس بالكيلو للمشترين الخارجيين. يتحقق النظام تلقائياً من توفر الوزن في المخزن ويخصمه فوراً."
        payload={{
          buyer_id: 3,
          weight: 150.0,
          selling_price_per_kg: 25.0,
          notes: 'تسليم شحنة ما قبل العيد',
        }}
        validation={{
          buyer_id: 'required | exists:buyers,id',
          weight: 'required | numeric | min:1 (يجب ألا يتجاوز الوزن المتاح في المخزن)',
          selling_price_per_kg: 'required | numeric | min:0.1',
          notes: 'nullable | string | max:255',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/admin/buyers"
        title="قائمة المشترين (List Buyers)"
        access="محمي"
        description="استرجاع المشترين الخارجيين مع بيانات التواصل والملاحظات والمشتري الافتراضي."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/buyers"
        title="إضافة مشتري جديد"
        access="محمي"
        permission="manage settings"
        description="إضافة بيانات جهة شراء خارجية جديدة للمبيعات الجملة."
        payload={{
          name: 'مصنع الأمل للمنسوجات',
          phone: '01222222222',
          is_default: false,
          notes: 'عميل معتمد لاستلام مخلفات الفرز الثاني',
        }}
        validation={{
          name: 'required | string | max:255',
          phone: 'required | string | max:20',
          is_default: 'boolean',
          notes: 'nullable | string',
        }}
      />

      {/* === Section 4: Agent Expenses & shift finalize === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>4. مصروفات المناديب والتسوية اليومية</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/expenses"
        title="تسجيل المصروفات اليومية (المندوب)"
        access="محمي (Sanctum Auth - مندوب ميداني)"
        description="تسجيل المصاريف الميدانية والوقود والأجور في نهاية الوردية اليومية لتخصم من العهدة."
        payload={{
          fuel_amount: 150.0,
          fuel_receipt_image: '(ملف صورة إيصال الوقود - jpeg/png/pdf)',
          agent_wage: 200.0,
          assistant_wage: 150.0,
          other_amount: 50.0,
          notes: 'شراء كيس تعبئة إضافي',
        }}
        validation={{
          fuel_amount: 'nullable | numeric | min:0',
          fuel_receipt_image: 'nullable | file | image | max:5120',
          agent_wage: 'required | numeric | min:0',
          assistant_wage: 'nullable | numeric | min:0',
          other_amount: 'nullable | numeric | min:0',
          notes: 'nullable | string | max:255',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/expenses"
        title="عرض وفلترة قائمة المصروفات"
        access="محمي (Sanctum Auth - محاسب/أدمن)"
        permission="view expenses"
        description="عرض قائمة المصروفات الميدانية المرفوعة من المناديب مع التصفية الجغرافية والزمنية ومراجعة المرفقات."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/expenses/{id}/approve"
        title="اعتماد المصاريف والتسوية"
        access="محمي (محاسب/أدمن)"
        permission="manage expenses"
        description="اعتماد المصاريف المرفوعة بشكل نهائي بعد مراجعة الإيصالات والمطابقة الدفترية."
      />

      {/* === Section 5: General Ledger === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>5. سجل الحركة المالي العام (General Ledger Log)</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/accounting/ledger"
        title="سجل العمليات المالي الموحد"
        access="محمي (الأدمن والمحاسب)"
        permission="view reports"
        description="استرجاع سجل تفصيلي غير قابل للتعديل لكافة الحركات المالية في النظام (شراء، بيع، شحن عهدة، مصروفات) موثقاً بالوقت، المستخدم، والمبلغ والرصيد الناتج."
        validation={{
          type: 'nullable | in:imprest_add,imprest_deduct,sale,purchase,expense',
          start_date: 'nullable | date',
          end_date: 'nullable | date',
        }}
      />
    </section>
  );
};

export default FinancialEndpointsSection;
