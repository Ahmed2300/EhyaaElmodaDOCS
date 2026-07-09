import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';
import Alert from '../components/Alert';

const PlanningEndpointsSection: React.FC = () => {
  return (
    <section id="planning-endpoints" className="docs-section">
      <SectionHeader
        icon="route"
        title="تخطيط مسارات التوصيل وزيارات المندوبين"
        description="إدارة جداول المندوبين ومواعيد الزيارات - مبني على طلبات الطلب (order_ids)"
      />

      <Alert type="warning" icon="warning">
        <strong>تحديث مهم:</strong> أصبح التخطيط مبنياً على الطلبات (order_ids) بدلاً من العملاء (customer_ids). كل عنصر خطة يجب أن يربط بـ customer_id و order_id معاً. عمود order_id في جدول plan_items أصبح إجبارياً وغير قابل للفارغ.
      </Alert>

      <Alert type="info" icon="assignment_ind">
        <strong>مسارات الإسناد المزدوجة (Dual Assignment Paths):</strong>
        <br />
        يمكن إسناد الطلبات للمناديب عبر طريقتين متوازيتين:
        <br />
        - <strong>الإسناد بواسطة الإدارة (Admin-Assigned):</strong> يقوم الأدمن باختيار الطلبات النشطة وإسنادها يدوياً للمندوب وتوليد خطة سيره عبر نقطة النهاية <code>POST /api/v1/plannings</code>.
        <br />
        - <strong>الإسناد الذاتي (Self-Assigned):</strong> يقوم المندوب برسم دائرة على الخريطة وحجز الطلبات المناسبة لنطاقه مباشرة عبر <code>POST /api/v1/planning/self-assign/claim</code>.
        <br />
        في الحالتين، يتم تحديث المندوب المعين في <code>orders.user_id</code> وتتحول حالة الطلب التشغيلية إلى <strong>معين لمندوب ASSIGNED (2)</strong>.
      </Alert>

      {/* === Admin Planning === */}
      <EndpointCard
        method="POST"
        url="/api/v1/plannings"
        title="إنشاء خطة"
        access="محمي"
        permission="manage plannings"
        description="تخصيص جدول توصيل لمندوب في تاريخ محدد. يستقبل مصفوفة من معرفات الطلبات (order_ids) بدلاً من معرفات العملاء."
        payload={{
          user_id: 3,
          date: '2026-07-10',
          status: 'pending',
          order_ids: [14, 25, 36],
        }}
        validation={{
          user_id: 'required | exists:users,id',
          date: 'required | date',
          status: 'nullable | in:pending,in_progress,completed,cancelled',
          order_ids: 'required | array | min:1',
          'order_ids.*': 'required | integer | exists:orders,id',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/plannings/{plan}/items"
        title="إضافة عنصر خطة"
        access="محمي"
        description="إضافة زيارة محددة إلى جدول المندوب. يجب ربط العنصر بـ customer_id و order_id معاً."
        payload={{
          order_id: 105,
          customer_id: 42,
          status: 'pending',
          notes: 'Handle with care',
        }}
        validation={{
          order_id: 'required | exists:orders,id',
          customer_id: 'required | exists:customers,id',
          status: 'nullable | string',
          notes: 'nullable | string',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/planning/items/{id}/check-in"
        title="تسجيل الوصول (Check-in)"
        access="محمي"
        description="تسجيل وصول المندوب إلى موقع العميل. يتم حساب المسافة بناءً على pick_up_coordinates الخاصة بالطلب بدلاً من إحداثيات العميل."
        validation={{
          lat: 'nullable | numeric',
          long: 'nullable | numeric',
          notes: 'nullable | string',
        }}
      />

      <Alert type="info" icon="info">
        <strong>تحقق الجغرافيا:</strong> يتم حساب المسافة بين GPS المندوب وإحداثيات pick_up_coordinates الخاصة بالطلب (وليس العميل). إذا كانت المسافة أكثر من 500 متر، يتم رفض تسجيل الوصول.
      </Alert>

      <EndpointCard
        method="POST"
        url="/api/v1/planning/items/{id}/check-out"
        title="تسجيل المغادرة (Check-out)"
        access="محمي"
        description="إتمام الزيارة وقياس وزن الطرد. يُحدَّث حالة الطلب إلى PICKED_UP (3) وتحديث حالة العميل إذا لزم الأمر."
        payload={{
          weight: 18.5,
          action: 'buy',
          notes: 'Items collected',
        }}
        validation={{
          weight: 'required | numeric | min:0',
          action: 'required | string | in:buy',
          notes: 'nullable | string',
        }}
      />

      <Alert type="success" icon="check_circle">
        <strong>المعالجة الخلفية عند الشراء (action: buy):</strong>
        <br />
        1. تحديث حالة الطلب إلى PICKED_UP (3)
        <br />
        2. تسجيل الوزن وسعر الشراء في الطلب (weight × buying_price من الإعدادات)
        <br />
        3. إذا كانت حالة العميل new، يتم ترقيته إلى active
        <br />
        4. تحديث إحصائيات النظام ورصيد العهدة
      </Alert>

      <EndpointCard
        method="POST"
        url="/api/v1/plannings/end-day"
        title="إنهاء يوم العمل وتصفية الوردية (End Day & Imprest Settlement)"
        access="محمي (Sanctum Auth - مندوب ميداني)"
        description="إرسال طلب إنهاء شفت العمل اليومي للمندوب. يقوم النظام تلقائياً بخصم إجمالي مشترياته ومصروفاته الميدانية من رصيد عهدته المتبقي وإغلاق الخطة."
        payload={{
          plan_id: 12,
          notes: 'تمت الزيارات بالكامل وتوريد إيصالات الوقود',
        }}
        validation={{
          plan_id: 'required | integer | exists:plannings,id',
          notes: 'nullable | string | max:500',
        }}
      />

      {/* === Self-Assign Flow === */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#202124' }}>الإسناد الذاتي للمندوبين (Self-Assign Flow)</h3>
        <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 16 }}>تتيح هذه النقاط للمندوبين تحديد دائرة على الخريطة وانتقاء الطلبات النشطة وإسنادها لأنفسهم مباشرة في خطتهم اليومية.</p>

        <Alert type="info" icon="info">
          <strong>آلية العمل:</strong> يرسم المندوب دائرة على الخريطة، يبحث النظام عن الطلبات النشطة داخل تلك الدائرة، ثم يختار المندوب الطلبات التي يريد إسنادها لنفسه. يتم استخدام قفل تزامني (Pessimistic Locking) لمنع الإسناد المتزامن للطلب نفسه من قبل مندوبين آخرين.
        </Alert>

        <EndpointCard
          method="POST"
          url="/api/v1/planning/self-assign/query"
          title="البحث عن طلبات مرشحة"
          access="محمي (مندوب ميداني)"
          description="البحث عن الطلبات النشطة داخل دائرة محددة يرسمها المندوب على الخريطة. يستبعد الطلبات المعينة بالفعل أو المؤرشفة أو المرفوضة."
          payload={{
            lat: 30.0123,
            lng: 31.2345,
            radius_meters: 1500,
          }}
          validation={{
            lat: 'required | numeric',
            lng: 'required | numeric',
            radius_meters: 'required | numeric | min:1 | max:10000',
          }}
        />

        <EndpointCard
          method="POST"
          url="/api/v1/planning/self-assign/claim"
          title="إسناد الطلبات للمندوب"
          access="محمي (مندوب ميداني)"
          description="إسناد مجموعة محددة من الطلبات إلى خط المندوب اليومية. يتم تنفيذها في معاملة باستخدام SELECT ... FOR UPDATE (Pessimistic Locking) لمنع التزامن. إذا حاول مندوب آخر الإسناد في نفس الوقت، يتم رفض طلبه بخطأ 422."
          payload={{
            order_ids: [14, 15, 22],
          }}
          validation={{
            order_ids: 'required | array | min:1',
            'order_ids.*': 'required | integer | exists:orders,id',
          }}
        />

        <Alert type="warning" icon="warning">
          <strong>التحكم في التزامن (Concurrency Control):</strong>
          <br />
          - يتم استخدام قفل تزامني (Pessimistic Locking) في المعاملة: SELECT ... FOR UPDATE
          <br />
          - أي طلب يتم إسناده يُقفل فوراً
          <br />
          - إذا حاول مندوب آخر الإسناد في نفس الوقت، يتم حجب طلبه حتى انتهاء المعاملة ثم رفضه بخطأ 422: "Order has already been claimed"
          <br />
          - يتم بث حدث فوري (Broadcast) لجميع المناديب الآخرين لتحديث خرائطهم
        </Alert>

        {/* === Plan Lock and Admin Unlock === */}
        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 8, color: '#202124' }}>إتمام الخطط والتحكم في أقفال المسارات (Route Lock & Admin Bypass)</h3>
        <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 16 }}>بمجرد تأكيد المندوب لخطته اليومية، يتم قفل إمكانية حجز طلبات جديدة حتى إنهاء المهام الحالية بالكامل أو تدخل الأدمن يدوياً.</p>

        <Alert type="warning" icon="lock">
          <strong>قواعد إقفال المسار (Itinerary Locking Rules):</strong>
          <br />
          1. <strong>قفل الاستكشاف:</strong> بمجرد "إتمام الخطة" (Finalize Plan)، يغلق النظام إمكانية رسم دوائر أو حجز طلبات إضافية من الخريطة للمندوب.
          <br />
          2. <strong>شرط فتح الحجز:</strong> لا يمكن للمندوب البدء في حجز طلبات ليوم عمل جديد إلا بعد **تصفية وإنهاء كافة الزيارات الحالية** (تحديث حالتها لـ تم الاستلام، ملغى، مرفوض).
          <br />
          3. <strong>تخطي الأدمن (Admin Override):</strong> المشرف العام (Super Admin) هو الجهة الوحيدة القادرة على فك هذا القفل للمندوب أثناء يوم العمل لإتاحة الحجز مجدداً أو إسناد مهام طارئة.
        </Alert>

        <EndpointCard
          method="POST"
          url="/api/v1/plannings/{id}/finalize"
          title="إتمام واعتماد الخطة اليومية (Finalize & Lock Plan)"
          access="محمي (مندوب ميداني)"
          description="تأكيد الخطة اليومية وقفلها للبدء في حركة التجميع الميدانية. يُعطل إمكانية حجز أي طلبات جديدة للمندوب."
          validation={{
            id: 'required | exists:plannings,id',
          }}
        />

        <EndpointCard
          method="POST"
          url="/api/v1/admin/plannings/{id}/unlock"
          title="فك قفل خطة المندوب (Admin Unlock Route)"
          access="محمي (الأدمن فقط)"
          permission="manage plannings"
          description="فك قفل المسار التشغيلي للمندوب يدوياً للسماح له بإعادة حجز طلبات إضافية أو إعادة جدولة خطته من الشارع."
          validation={{
            id: 'required | exists:plannings,id',
          }}
        />

        <EndpointCard
          method="GET"
          url="/api/v1/planning/self-assign/stream"
          title="بث تحديثات الإسناد في الوقت الفعلي"
          access="محمي (SSE Stream)"
          description="تيار Server-Sent Events ي推送 تحديثات فورية للمندوبين لتحديث خرائطهم ومنع الإسناد المزدوج."
        />

        <div className="table-wrapper" style={{ marginTop: 12 }}>
          <table>
            <thead>
              <tr>
                <th>نوع الحدث</th>
                <th>البيانات</th>
                <th>التأثير</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code style={{ background: '#e8f5e9', color: '#1b5e20', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>orders_claimed</code></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{'{ "order_ids": [14, 15] }'}</td>
                <td style={{ fontSize: 12 }}>يقوم عملاء المندوبين الآخرين بإزالة هذه النقاط من خرائطهم فوراً</td>
              </tr>
              <tr>
                <td><code style={{ background: '#e3f2fd', color: '#0d47a1', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>order_released</code></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{'{ "order_ids": [22] }'}</td>
                <td style={{ fontSize: 12 }}>إذا أعاد الأدمن تعيين أو إلغاء مسار، تظهر النقاط مجدداً على الخريطة</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PlanningEndpointsSection;
