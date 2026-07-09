import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';
import Alert from '../components/Alert';

const CustomerEndpointsSection: React.FC = () => {
  return (
    <section id="customer-endpoints" className="docs-section">
      <SectionHeader
        icon="people"
        title="إدارة العملاء"
        description="نقاط نهاية إدارة ملفات العملاء - الحالات محدودة بـ new, active, rejected, archived"
      />

      <Alert type="warning" icon="warning">
        <strong>تحديث:</strong> أصبحت حالات العميل محدودة بـ 4 قيم فقط: <code>new</code>، <code>active</code>، <code>rejected</code>، <code>archived</code>. الحالات التشغيلية الطويلة (wa_sent, replied, negotiating, follow_up, postponed, confirmed, no_answer, visited, delivered, out_for_delivery) أُزيلت من جدول العملاء ونقلت إلى جدول الطلبات.
      </Alert>

      <Alert type="info" icon="info">
        <strong>بنية 1-to-Many:</strong> كل عميل يمكن أن يملك عدة طلبات (orders) عبر الزمن. جدول الطلبات يتتبع كل معاملة على حدة مع رمزها الفريد (REQ-XXXXXX).
      </Alert>

      <EndpointCard
        method="POST"
        url="/api/v1/customers"
        title="إنشاء عميل"
        access="محمي"
        permission="manage customers"
        description="إنشاء ملف عميل جديد مع تشغيل تحليل مكاني تلقائي."
        payload={{
          phone: '01000000000',
          whatsapp: '01000000000',
          name: 'Jane Doe',
          google_maps_link: 'https://maps.app.goo.gl/example',
          status: 'new',
          evaluate_via_ai: true,
          meta_event: 'Lead',
        }}
        validation={{
          phone: 'required | string | max:20',
          name: 'nullable | string | max:255',
          whatsapp: 'nullable | string | max:20',
          google_maps_link: 'nullable | string',
          lat: 'nullable | numeric',
          long: 'nullable | numeric',
          address: 'nullable | string',
          governorate_id: 'nullable | exists:governorates,id',
          district_id: 'nullable | exists:districts,id',
          notes: 'nullable | string',
          status: 'nullable | string | in:new,active,rejected,archived',
          assigned_rep_id: 'nullable | exists:users,id',
          evaluate_via_ai: 'nullable | boolean',
          skip_location: 'nullable | boolean',
          meta_event: 'nullable | string | in:Lead,Qualified Lead,Hot Lead',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/customers"
        title="قائمة العملاء"
        access="محمي"
        permission="manage customers"
        description="قائمة العملاء مع دعم فلاتر: بحث (هاتف، اسم، customer_code)، حالة العميل (new, active, rejected, archived). الاستجابة تتضمن بيانات الملف الشخصي."
        validation={{
          status: 'nullable | string | in:new,active,rejected,archived',
          search: 'nullable | string | matches phone, name, or customer_code',
        }}
      />

      {/* === Customer Order History === */}
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>سجل طلبات العميل</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/customers/{id}/orders"
        title="سجل طلبات العميل (Customer Order History)"
        access="محمي (Sanctum Auth)"
        permission="manage customers or view reports"
        description="استرجاع السجل الكامل للطلبات (الماضية والنشطة) لعميل محدد. يُعرض في صفحة الملف الشخصي للعميل على لوحة تحكم الإدارة."
        validation={{
          id: 'required | exists:customers,id',
        }}
      />

      <div className="table-wrapper" style={{ marginTop: 12 }}>
        <table>
          <thead>
            <tr>
              <th>الحقل</th>
              <th>النوع</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>id</code></td>
              <td>integer</td>
              <td>معرف الطلب</td>
            </tr>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>request_code</code></td>
              <td>string</td>
              <td>رمز الطلب الفريد (REQ-XXXXXX)</td>
            </tr>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>weight</code></td>
              <td>decimal</td>
              <td>الوزن المستلم بالكيلوجرام</td>
            </tr>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>buying_price</code></td>
              <td>decimal</td>
              <td>سعر الشراء الكلي</td>
            </tr>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>status</code></td>
              <td>enum</td>
              <td>حالة الطلب التشغيلية</td>
            </tr>
            <tr>
              <td><code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>created_at</code></td>
              <td>timestamp</td>
              <td>وقت الإنشاء</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: 16,
        marginTop: 12,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        lineHeight: 1.6,
      }}>
        <div style={{ marginBottom: 8, fontWeight: 600, color: '#202124' }}>مثال على الاستجابة:</div>
        <pre style={{ margin: 0, direction: 'ltr', textAlign: 'left' }}>
{`{
  "status": "success",
  "data": [
    {
      "id": 142,
      "request_code": "REQ-000142",
      "weight": 25.5,
      "buying_price": "382.50",
      "status": "delivered",
      "created_at": "2026-07-01 12:00:00"
    },
    {
      "id": 88,
      "request_code": "REQ-000088",
      "weight": 18.0,
      "buying_price": "270.00",
      "status": "picked_up",
      "created_at": "2026-06-15 10:30:00"
    }
  ]
}`}
        </pre>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>تحويلات العملاء المتوقعين (Meta CAPI)</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/customers/{id}/mark-lead"
        title="تحديد كعميل متوقع (Mark as Lead)"
        access="محمي"
        description="إرسال حدث Lead إلى Meta Conversions API. يرث حالة التحويل لآخر طلب خاص بالعميل."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/customers/{id}/mark-qualified"
        title="تحديد كمؤهل (Mark as Qualified Lead)"
        access="محمي"
        description="إرسال حدث QualifiedLead إلى Meta Conversions API. يرث حالة التحويل لآخر طلب."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/customers/{id}/mark-hot"
        title="تحديد كساخن (Mark as Hot Lead)"
        access="محمي"
        description="إرسال حدث HotLead إلى Meta Conversions API. يرث حالة التحويل لآخر طلب."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/customers/{id}/re-evaluate"
        title="إعادة تقييم العميل"
        access="محمي"
        description="تشغيل إعادة حساب فوري لإحداثيات شبكة الأولوية للعميل."
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>العمليات المجمعة</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/customers/bulk-update"
        title="تحديث مجمع"
        access="محمي"
        permission="manage customers"
        description="تحديث حالة و meta_event لعدة عملاء في وقت واحد."
        validation={{
          customer_ids: 'required | array | min:1',
          'customer_ids.*': 'required | integer | exists:customers,id',
          status: 'nullable | string | in:new,active,rejected,archived',
          meta_event: 'nullable | string | in:Lead,Qualified Lead,Hot Lead',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/customers/bulk-delete"
        title="حذف مجمع"
        access="محمي"
        permission="manage customers"
        description="حذف جماعي لسجلات العملاء."
        validation={{
          customer_ids: 'required | array | min:1',
          'customer_ids.*': 'required | integer | exists:customers,id',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/customers/bulk-evaluate"
        title="تقييم جغرافي بالذكاء الاصطناعي مجمع"
        access="محمي"
        permission="manage customers"
        description="تشغيل التقييم الجغرافي بالذكاء الاصطناعي لمجموعة عملاء دفعة واحدة لتحديث نقاط الأولوية."
        validation={{
          customer_ids: 'required | array | min:1',
          'customer_ids.*': 'required | integer | exists:customers,id',
        }}
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>استيراد جهات الاتصال</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/contacts/import"
        title="استيراد جهات اتصال"
        access="محمي"
        permission="manage customers"
        description="استيراد مجمع لجهات الاتصال عبر رفع ملف (CSV, TXT, XLSX, XLS, VCF)."
        validation={{
          file: 'required | file | max:10240',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/contacts/import/{batch_id}/status"
        title="حالة الاستيراد"
        access="محمي"
        description="الاستعلام عن تفاصيل معالجة قائمة انتظار الاستيراد."
      />
    </section>
  );
};

export default CustomerEndpointsSection;
