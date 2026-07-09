import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';
import Alert from '../components/Alert';
import OrderStatusGuide from './OrderStatusGuide';

const OrderEndpointsSection: React.FC = () => {
  return (
    <section id="order-endpoints" className="docs-section">
      <SectionHeader
        icon="inventory_2"
        title="الطلبات (Order Pipeline)"
        description="نقاط نهاية إنشاء وإدارة الطلبات - كل طلب يمثل طلب تجميع واحد"
      />

      <Alert type="info" icon="info">
        <strong>ملاحظة مهمة:</strong> الطلب هو الكيان الأساسي في خط الإنتاج. يحمل الإحداثيات الجغرافية والعنوان الخاص بطلب التجميع المحدد. حالته تمثل خط أنابيب اللوجستيات بالكامل (0-9). العميل يمكن أن يملك عدة طلبات عبر الزمن (1:N).
      </Alert>

      {/* === Guest Order Submission === */}
      <EndpointCard
        method="POST"
        url="/api/v1/orders"
        title="إنشاء طلب عام (صفحة الهبوط)"
        access="عام (محدد بـ 3 طلبات/دقيقة)"
        description="نقطة نهاية إرسال الطلبات العامة من صفحة الهبوط. تنشئ عميل جديد أو تحل عميل موجوداً وتنشئ طلباً جديداً بحالة PENDING."
        payload={{
          customer_phone: '01000000000',
          customer_name: 'Guest User',
          customer_google_maps_link: 'https://maps.app.goo.gl/example',
          privacy_policy_approved: true,
          is_primary_location: true,
          meta_event_id: 'lead_abc123xyz',
          notes: 'Handle with care',
        }}
        validation={{
          customer_phone: 'required | regex:/^(\\+201|201|01|1)[0-2,5]{1}[0-9]{8}$/',
          customer_name: 'sometimes | string | max:255',
          privacy_policy_approved: 'required | boolean | accepted',
          is_primary_location: 'required | boolean',
          meta_event_id: 'nullable | string',
          notes: 'nullable | string',
          'customer_google_maps_link': 'required_without_all:pick_up_coordinates,address | nullable | string',
          'pick_up_coordinates': 'required_without_all:customer_google_maps_link,address | nullable | array',
          'address': 'required_without_all:pick_up_coordinates,customer_google_maps_link | nullable | string',
        }}
      />

      <Alert type="warning" icon="warning">
        <strong>منطق إنشاء الطلبات (Customer Order Logic):</strong>
        <br />
        1. إذا لم يكن العميل موجوداً (رقم هاتف جديد): يتم إنشاء ملف عميل جديد (status = new) وإنشاء طلب جديد (status = pending).
        <br />
        2. إذا كان العميل موجوداً ولديه طلب نشط معلق (pending): يتم تحديث/دمج الوزن والموقع في ذلك الطلب.
        <br />
        3. إذا كان العميل موجوداً وجميع طلباته السابقة مكتملة/مغلقة: يتم إنشاء طلب جديد (status = pending) مرتبط بنفس customer_id.
      </Alert>

      <Alert type="info" icon="info">
        <strong>ملاحظة:</strong> العميل لا يسجل أي أوزان في مرحلة التسجيل. الوزن يُسجل حصرياً بواسطة المندوب أثناء الاستلام الفعلي (Check-out).
      </Alert>

      <Alert type="info" icon="info">
        <strong>بوابة موقع الاستلام:</strong> يسأل النظام العميل: "هل موقعك الحالي هو المكان الرئيسي؟"
        <br />
        - إذا وافق (is_primary_location = true): يتم إنشاء الطلب بحالة PENDING وتوليد كود REQ-XXXXXX.
        <br />
        - إذا رفض (is_primary_location = false): يتم حفظ الطلب بحالة CANCELLED ونقل العميل إلى archived.
      </Alert>

      {/* === Admin Order Creation === */}
      <EndpointCard
        method="POST"
        url="/api/v1/admin/orders"
        title="إنشاء طلب إداري"
        access="محمي"
        permission="manage orders"
        description="إنشاء طلب جديد تحت عميل من لوحة التحكم الإدارية. يربط بـ customer_id وينشئ سجل طلب."
        payload={{
          customer_id: 42,
          weight: 25.0,
          pick_up_coordinates: { lat: 30.0444, lng: 31.2357 },
          address: 'شارع الرئيسي، المعادي',
        }}
        validation={{
          customer_id: 'required | exists:customers,id',
          weight: 'nullable | numeric | min:20',
          'pick_up_coordinates': 'nullable | array',
          'address': 'nullable | string',
        }}
      />

      {/* === Admin Order List === */}
      <EndpointCard
        method="GET"
        url="/api/v1/admin/orders"
        title="قائمة الطلبات"
        access="محمي"
        permission="manage orders"
        description="سجل الطلبات مع دعم الفلاتر: بحث (رمز الطلب REQ-XXXXXX أو هاتف العميل)، حالة الطلب (0-9)، المحافظة، المنطقة."
        validation={{
          status: 'nullable | integer | in:0,1,2,3,4,5,6,7,8,9',
          governorate_id: 'nullable | exists:governorates,id',
          district_id: 'nullable | exists:districts,id',
          search: 'nullable | string | matches order_code or customer phone',
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

      {/* Order Status Guide */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, color: '#202124' }}>مرجع حالات الطلب التفصيلي</h3>
        <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 20 }}>شرح مفصل لكل حالة من حالات الطلب ومتى تُستخدم مع أمثلة عملية</p>
        <OrderStatusGuide />
      </div>
    </section>
  );
};

export default OrderEndpointsSection;
