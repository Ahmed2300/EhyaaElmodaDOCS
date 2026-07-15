import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import JourneyStep from '../components/JourneyStep';
import Icon from '../../api-docs/components/Icon';

const FieldAgentJourney: React.FC = () => {
  const roleColor = '#1e8e3e';

  return (
    <section id="field-agent" className="docs-section">
      <SectionHeader icon="local_shipping" title="رحلة المندوب الميداني - دورة العمل القائمة على الطلبات" description="شاشة واحدة مبنية بالكامل على الخريطة التفاعلية - الإسناد الذاتي الفوري مع منع التداخل اللحظي - بنية 1-to-Many" />

      {/* === 1. Map View & Circle Drawing === */}
      <JourneyStep number={1} title="عرض الخريطة ورسم نطاق العمل" icon="map" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/auth/login', desc: 'تسجيل الدخول' },
          { method: 'GET', path: '/api/v1/plannings/self-assign/query', desc: 'البحث عن طلبات متاحة في النطاق' },
        ]}
      >
        <p>يفتح المندوب تطبيق الهاتف قبل بدء يوم العمل بـ 24 ساعة (مثلاً في اليوم السابق). تظهر له شاشة واحدة فقط تعتمد كلياً على الخريطة الميدانية.</p>

        <h4 className="journey-subtitle">عناصر الصفحة الأساسية:</h4>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon name="map" size={18} className="journey-field-icon" />
            <span>خريطة الطلبات التفاعلية (نقاط الطلبات النشطة وغير المسندة)</span>
          </div>
          <div className="journey-field">
            <Icon name="filter_alt" size={18} className="journey-field-icon" />
            <span>فلتر الحالات (لاختيار الطلبات المعروضة)</span>
          </div>
          <div className="journey-field">
            <Icon name="people" size={18} className="journey-field-icon" />
            <span>عدد الطلبات الظاهرة حالياً على الخريطة</span>
          </div>
          <div className="journey-field">
            <Icon name="account_balance_wallet" size={18} className="journey-field-icon" />
            <span>رصيد العهدة المالي الحالي (للعرض فقط)</span>
          </div>
        </div>

        <h4 className="journey-subtitle">أداة رسم مضلع مغلق على الخريطة (Polygon Selection):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="near_me" size={20} />
            </div>
            <div>
              <strong>رسم مضلع مغلق حول المنطقة المستهدفة</strong>
              <p>يستخدم المندوب أو الأدمن أداة رسم حر أو نقاط مغلقة على الخريطة لرسم مضلع يغطي المنطقة الجغرافية المحددة للعمل (مثلاً حي المعادي بالقاهرة) دون الارتباط بموقعه الجغرافي الحالي (مثلاً لو كان حالياً في المنصورة ويخطط للسفر غداً للقاهرة).</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
              <Icon name="filter_alt" size={20} />
            </div>
            <div>
              <strong>فلترة الطلبات الجغرافية بالمضلع</strong>
              <p>بمجرد إغلاق شكل المضلع على الخريطة، يقوم محرك البحث الجغرافي باستخلاص كافة طلبات الاستلام النشطة والعملاء الواقعين بداخل المضلع تمهيداً لإسنادها وجدولتها.</p>
            </div>
          </div>
        </div>

        <div className="journey-note" style={{ marginTop: 12 }}>
          <Icon name="info" size={16} style={{ color: '#d93025' }} />
          <span style={{ fontWeight: 600 }}>قواعد عرض وفلترة الخريطة:</span>
          <ul style={{ margin: '6px 18px 0 0', padding: 0, listStyleType: 'disc', fontSize: '0.8rem', lineHeight: 1.6 }}>
            <li><strong>تأثير الحالات على الخريطة:</strong> عند اكتمال الزيارة (تمت الزيارة / Check-out)، يختفي العميل تماماً من على الخريطة. أما الحالات الأخرى (مثل تم الإسناد أو خدهم أو تم التواصل) فتظل معروضة على الخريطة مع تغيير ألوان المؤشرات فقط للدلالة على حالتها الحالية.</li>
            <li><strong>التصفية عند الرسم:</strong> عند رسم المضلع المغلق، تشتمل القائمة الجغرافية المستخلصة فقط على الطلبات والعملاء الذين لا يزالون <strong>قيد الانتظار (Pending)</strong> بانتظار الجدولة والإسناد.</li>
          </ul>
        </div>

        {/* Polygon Selection Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step1_polygon_draw.png"
            alt="تحديد الطلبات برسم مضلع مغلق على الخريطة"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> رسم مضلع مغلق (Polygon) لتحديد وفلترة الطلبات النشطة جغرافياً واستخلاصها بواسطة محرك الذكاء الاصطناعي لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 2. Real-Time Self-Assign (Claim) === */}
      <JourneyStep number={2} title="الإسناد الذاتي ومنع التداخل اللحظي" icon="handshake" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/planning/self-assign/claim', desc: 'إسناد الطلبات للمندوب (قفل متزامن)' },
          { method: 'SSE', path: '/api/v1/planning/self-assign/stream', desc: 'بث تحديثات الإسناد للمناديب' },
        ]}
      >
        <p>يحدد المندوب الطلبات التي يختارها من القائمة ويضغط على زر "إسناد الطلبات لمحفظتي".</p>

        <h4 className="journey-subtitle">آلية القفل المتزامن (Concurrency Lock):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="check_circle" size={20} />
            </div>
            <div>
              <strong>إذا كانت الطلبات حرة</strong>
              <p>يقوم نظام الـ Backend بفتح معاملة برمجية آمنة (Database Transaction with FOR UPDATE) لقفل الطلبات. يتم إسناد الطلبات فوراً للمندوب وتوليد خطة الغد تلقائياً.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fce8e6', color: '#d93025' }}>
              <Icon name="warning" size={20} />
            </div>
            <div>
              <strong>إذا كان أحد الطلبات محجوزاً مسبقاً</strong>
              <p>إذا قام مندوب آخر بتأكيد إسناد أي من الطلبات قبله بأجزاء من الثانية، يرفض النظام العملية ويعرض تنبيهاً: "بعض الطلبات تم إسنادها لمندوب آخر"، ويعيد تحديث القائمة فوراً.</p>
            </div>
          </div>
        </div>

        <h4 className="journey-subtitle">البث اللحظي لمنع التداخل (SSE Stream):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="cell_tower" size={20} />
            </div>
            <div>
              <strong> orders_claimed (تم الإسناد)</strong>
              <p>بمجرد إتمام المندوب "أ" لعملية الإسناد بنجاح، يتم بث حدث فوري لجميع التطبيقات المفتوحة في أيدي المناديب الآخرين لإخفاء النقاط من خرائطهم وقوائمهم تلقائياً.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon name="loop" size={20} />
            </div>
            <div>
              <strong> order_released (تم الإطلاق)</strong>
              <p>عند إعادة تعيين أو إلغاء إسناد أي طلب، يتم بث حدث لإعادة النقاط المتاحة لخرائط المناديب الآخرين.</p>
            </div>
          </div>
        </div>

        {/* Step 2 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step2_order_claim.png"
            alt="الإسناد الذاتي للطلب"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> تأكيد إسناد وحجز الطلبات للمندوب بنجاح (مع قفل متزامن لمنع الحجز المزدوج) لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 3. Finalize & Lock Plan === */}
      <JourneyStep number={3} title="إتمام واعتماد الخطة وقفل المسار اليومي" icon="lock" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/plannings/{id}/finalize', desc: 'تأكيد الخطة وقفل التعديل عليها' },
        ]}
      >
        <p>بعد اختيار المندوب لمجموعة الطلبات المناسبة، يضغط زر "إتمام واعتماد الخطة" لتثبيت مسار اليوم التالي وبدء التنفيذ:</p>
        
        <h4 className="journey-subtitle">قواعد إقفال وحوكمة المسارات:</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fce8e6', color: '#d93025' }}>
              <Icon name="lock" size={20} />
            </div>
            <div>
              <strong>قفل الاستكشاف والحجز</strong>
              <p>بمجرد تأكيد الخطة، يتم قفل إمكانية حجز أو إسناد أي طلبات جديدة من الخريطة للمندوب. يُحجب زر رسم المضلع تماماً للتركيز على الزيارات الحالية.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon name="check_circle" size={20} />
            </div>
            <div>
              <strong>شرط التصفية وإعادة الفتح</strong>
              <p>لا يستطيع المندوب القيام بأي عمليات حجز أو إسناد جديدة إلا بعد **إنهاء وتصفية كافة الطلبات الحالية** في خطته (بزيارتها وإغلاقها بالكامل).</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="admin_panel_settings" size={20} />
            </div>
            <div>
              <strong>صلاحية الأدمن الاستثنائية</strong>
              <p>المشرف العام (Super Admin) هو الشخص الوحيد القادر على فك القفل التشغيلي للمندوب أثناء المسار يدوياً لتمكينه من إعادة حجز طلبات إضافية عند الحاجة.</p>
            </div>
          </div>
        </div>

        {/* Step 3 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step3_plan_locked.png"
            alt="اعتماد وقفل خطة المسار"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> قفل وإغلاق خطة السير تماماً لمنع أي تعديلات أثناء التنفيذ الميداني لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 4. Appointment Scheduling === */}
      <JourneyStep number={4} title="تجهيز المواعيد والتواصل مع العملاء" icon="event_available" color={roleColor}>
        <p>بالنقر على الطلبات المسندة إليه، يستعين المندوب بأزرار الاتصال الهاتفي والواتساب السريعة للتنسيق مع العملاء وتجهيز مواعيد الغد:</p>
        <ul className="journey-detail-list">
          <li>يتصل بالعملاء عبر الهاتف أو الواتساب مباشرة من التطبيق</li>
          <li>عند موافقة العميل على موعد الزيارة غداً، يغير المندوب حالة الطلب إلى مؤكد (SCHEDULED_VISITED)</li>
          <li>تظهر هذه التأكيدات فوراً في لوحة تحكم الإدارة لمعرفة عدد الزيارات المجدولة لليوم التالي لكل مندوب</li>
        </ul>

        <h4 className="journey-subtitle">نافذة التواصل مع العميل (Bottom Sheet):</h4>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon name="badge" size={18} className="journey-field-icon" />
            <span>اسم العميل</span>
          </div>
          <div className="journey-field">
            <Icon name="chat" size={18} className="journey-field-icon" />
            <span>رقم الهاتف (واتساب)</span>
          </div>
          <div className="journey-field">
            <Icon name="location_on" size={18} className="journey-field-icon" />
            <span>العنوان</span>
          </div>
          <div className="journey-field">
            <Icon name="label" size={18} className="journey-field-icon" />
            <span>الحالة الحالية</span>
          </div>
          <div className="journey-field action">
            <Icon name="call" size={18} className="journey-field-icon" />
            <span>زر اتصال هاتفي</span>
          </div>
          <div className="journey-field action">
            <Icon name="chat" size={18} className="journey-field-icon" />
            <span>زر دردشة واتساب</span>
          </div>
          <div className="journey-field action">
            <Icon name="directions" size={18} className="journey-field-icon" />
            <span>فتح خرائط جوجل للاتجاهات</span>
          </div>
          <div className="journey-field action">
            <Icon name="edit" size={18} className="journey-field-icon" />
            <span>تعديل حالة العميل</span>
          </div>
        </div>

        {/* Step 4 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step4_client_call.png"
            alt="تجهيز المواعيد والتواصل"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> التواصل مع العميل لتأكيد وتحديد موعد الزيارة وتغيير الحالة إلى مؤكد لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 5. Check-in === */}
      <JourneyStep number={5} title="بدء الزيارة الميدانية (Check-in)" icon="location_on" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/planning/items/{id}/check-in', desc: 'تسجيل بدء الزيارة مع GPS' },
        ]}
      >
        <p>في صباح اليوم التالي، يرى المندوب على الخريطة طلبات اليوم المؤكدة فقط ويبدأ بالمرور عليها:</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="filter_alt" size={20} />
            </div>
            <div>
              <strong>فلترة العملاء</strong>
              <p>يختار المندوب الفلتر على "مؤكد" لتظهر له زيارات اليوم فقط.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="directions" size={20} />
            </div>
            <div>
              <strong>فتح الاتجاهات</strong>
              <p>يتحرك المندوب للعميل الأول ويضغط "فتح الاتجاهات" لفتح تطبيق خرائط جوجل.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="pin_drop" size={20} />
            </div>
            <div>
              <strong>تسجيل الوصول</strong>
              <p>عند الوصول للموقع الفعلي، يضغط "تسجيل بدء الزيارة" (Check-in).</p>
            </div>
          </div>
        </div>

        <div className="journey-resolution" style={{ background: '#fce8e6' }}>
          <Icon name="shield" size={20} className="journey-resolution-icon" style={{ color: '#d93025' }} />
          <div>
            <strong>شرط المسافة الجغرافي:</strong> يقارن النظام موقع المندوب بـإحداثيات الطلب الحالي (pick_up_coordinates). إذا زاد البعد عن 500 متر، يتم إلغاء الـ Check-in لحماية البيانات من التلاعب ومنع التحديثات الوهمية.
          </div>
        </div>

        {/* Step 5 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step5_visit_checkin.png"
            alt="تسجيل بدء الزيارة مع شرط المسافة الجغرافي"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> تسجيل الوصول (Check-in) عند التواجد داخل نطاق الـ 500 متر من إحداثيات موقع العميل لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 6. Check-out === */}
      <JourneyStep number={6} title="إتمام الزيارة والشراء (Check-out)" icon="shopping_cart" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/planning/items/{id}/check-out', desc: 'إتمام الزيارة مع الوزن والإجراءات' },
        ]}
      >
        <p>يزن المندوب الملابس ويضغط "تمت الزيارة وتوريد الوزن" (Check-out). تظهر له نافذة منبثقة لتسجيل التفاصيل:</p>

        <h4 className="journey-subtitle">حقول الإدخال:</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="scale" size={20} />
            </div>
            <div>
              <strong>حقل الوزن (إجباري)</strong>
              <p>يسجل الوزن كقيمة عشرية موجبة أكبر من صفر (min:20 على POST /api/v1/orders عند التأسيس، لكن لا يوجد حد أدنى عند الـ Check-out). لا يمكن الحفظ بدون إدخال الوزن.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon name="star" size={20} />
            </div>
            <div>
              <strong>خيار "عميل مميز" (اختياري)</strong>
              <p>في حال تفعيله من قبل المندوب، يسجل النظام العميل داخلياً كـ Hot Lead، ويرسل فوراً حدث التحويل (Hot Lead Event) إلى Meta مع تسجيل اسم المندوب ووقت التقييم. المندوب لا يرى أي مصطلحات معقدة مثل Pixel أو Events.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#f3e5f5', color: '#6a1b9a' }}>
              <Icon name="archive" size={20} />
            </div>
            <div>
              <strong>خيار "أرشفة العميل" (اختياري)</strong>
              <p>في حال تفعيله: تتحول حالة العميل فوراً إلى "مؤرشف". في حال عدم تفعيله: تتحول إلى "تمت الزيارة". في الحالتين، يختفي العميل من خريطة تشغيل المندوب فوراً ليبقى في لوحة الإدارة فقط.</p>
            </div>
          </div>
        </div>

        <div className="journey-resolution" style={{ background: '#e8f5e9' }}>
          <Icon name="sync_alt" size={20} className="journey-resolution-icon" style={{ color: '#1e8e3e' }} />
          <div>
            <strong>بعد الحفظ والخصم الفوري:</strong> يتم تحويل حالة الطلب لـ PICKED_UP، ويقوم النظام باحتساب قيمة المشتريات (الوزن المكتوب × سعر الشراء المعتمد) وخصمها فوراً ولحظياً من رصيد عهدة المندوب الجارية في قاعدة البيانات، وتحديث إحصائيات المخزون مباشرة لكل أوردر بمفرده (دون الانتظار لنهاية اليوم).
          </div>
        </div>

        {/* Step 6 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step6_visit_checkout.png"
            alt="إتمام الزيارة وتوريد الوزن والخصم التلقائي"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> وزن الملابس المشتراة وتوريدها مع الخصم الفوري والمباشر من محفظة المندوب لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 7. Continuous Tracking === */}
      <JourneyStep number={7} title="التتبع المستمر أثناء التنقل" icon="my_location" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/tracking/log', desc: 'تسجيل الموقع كل بضع دقائق' },
        ]}
      >
        <p>أثناء تنقل المندوب بين العملاء، يعمل تطبيق الجوال على تسجيل الموقع في الخلفية بشكل مستمر لبناء مسار تتبع كامل:</p>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon name="pin_drop" size={18} className="journey-field-icon" />
            <span>إحداثيات (Latitude, Longitude)</span>
          </div>
          <div className="journey-field">
            <Icon name="speed" size={18} className="journey-field-icon" />
            <span>السرعة بالكيلومتر في الساعة</span>
          </div>
          <div className="journey-field">
            <Icon name="battery_full" size={18} className="journey-field-icon" />
            <span>نسبة البطارية المتبقية</span>
          </div>
          <div className="journey-field">
            <Icon name="route" size={18} className="journey-field-icon" />
            <span>بناء مسار تتبع كامل</span>
          </div>
        </div>

        {/* Step 7 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step7_bg_tracking.png"
            alt="التتبع المستمر أثناء التنقل"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> تسجيل المسار الفعلي وحالة التتبع في الخلفية طوال اليوم الميداني لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 8. End Day & Settlement === */}
      <JourneyStep number={8} title="إقفال الشفت وتصفية العهدة اليومية" icon="event_upcoming" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/expenses', desc: 'تسجيل المصروفات اليومية' },
          { method: 'POST', path: '/api/v1/plannings/end-day', desc: 'إنهاء يوم العمل والتصفية' },
        ]}
      >
        <p>يضغط المندوب زر "إنهاء يوم العمل" ويرفع مصروفاته التشغيلية (الوقود، أجور المساعدين، مصاريف الصيانة). يقوم النظام بخصم هذه المصروفات من رصيد عهدته المتبقي (علماً بأن تكلفة الملابس المشتراة قد خُصمت تلقائياً وفورياً مع كل أوردر تم إقفاله أثناء اليوم).</p>

        <h4 className="journey-subtitle">المعادلة الحسابية للعهد والربط الفوري:</h4>
        <div className="journey-resolution" style={{ background: '#e8f0fe' }}>
          <Icon name="calculate" size={20} className="journey-resolution-icon" />
          <div>
            <strong>1. أثناء الوردية (بعد كل أوردر):</strong> الرصيد الحالي للعهدة = الرصيد السابق - (الوزن المستلم × سعر شراء الكيلو المعتمد).
            <br />
            <strong>2. عند إقفال الشفت:</strong> الرصيد النهائي المسوى = الرصيد الجاري للعهدة - (مصروف السيارة + يومية المندوب + يومية المساعد + المصروفات الأخرى).
          </div>
        </div>

        <h4 className="journey-subtitle">البيانات المحسوبة تلقائياً:</h4>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon name="scale" size={18} className="journey-field-icon" />
            <span>إجمالي الأوزان المشتراة</span>
          </div>
          <div className="journey-field">
            <Icon name="price_change" size={18} className="journey-field-icon" />
            <span>سعر شراء الكيلو (من الإعدادات)</span>
          </div>
          <div className="journey-field full-width">
            <Icon name="payments" size={18} className="journey-field-icon" />
            <span>إجمالي تكلفة الشراء = إجمالي الأوزان x سعر الكيلو</span>
          </div>
        </div>

        <h4 className="journey-subtitle">المصروفات الميدانية (يتم إدخالها يدوياً):</h4>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon name="local_gas_station" size={18} className="journey-field-icon" />
            <span>مصروف السيارة (وقود)</span>
          </div>
          <div className="journey-field">
            <Icon name="person" size={18} className="journey-field-icon" />
            <span>يومية المندوب</span>
          </div>
          <div className="journey-field">
            <Icon name="group" size={18} className="journey-field-icon" />
            <span>يومية المساعد</span>
          </div>
          <div className="journey-field">
            <Icon name="receipt" size={18} className="journey-field-icon" />
            <span>مصروفات أخرى</span>
          </div>
          <div className="journey-field full-width">
            <Icon name="notes" size={18} className="journey-field-icon" />
            <span>ملاحظات إضافية</span>
          </div>
        </div>

        <div className="journey-resolution" style={{ background: '#e8f5e9' }}>
          <Icon name="sync_alt" size={20} className="journey-resolution-icon" style={{ color: '#1e8e3e' }} />
          <div>
            <strong>بعد التأكيد:</strong> يقوم النظام تلقائياً بخصم المجموع الإجمالي من رصيد عهدة المندوب. أي عملية شحن أو زيادة للعهدة تتم حصرياً من لوحة تحكم الإدارة.
          </div>
        </div>

        {/* Step 8 Diagram */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginTop: 16,
          textAlign: 'center'
        }}>
          <img
            src="/step8_shift_lock.png"
            alt="إقفال الشفت وتصفية العهدة اليومية"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0 auto' }}
          />
          <p style={{ fontSize: 11, color: '#5f6368', marginTop: 8, marginBottom: 0 }}>
            <strong>توضيح:</strong> احتساب وتدقيق المصروفات وإقفال الشفت اليومي مع ترحيل الرصيد المتبقي مستمراً لليوم التالي لمشروع "إحياء الموضة".
          </p>
        </div>
      </JourneyStep>

      {/* === 9. Detailed Operational Scenarios & Exception Handling === */}
      <div className="card" style={{ marginTop: 40, borderRight: '3px solid #d93025' }}>
        <div className="card-title" style={{ color: '#d93025', marginBottom: 12 }}>
          <Icon name="warning" size={24} className="card-icon" />
          <span>السيناريوهات التشغيلية وحالات الاستثناء (Detailed Operational Scenarios)</span>
        </div>
        <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 20 }}>
          دليل محاكاة السيناريوهات الحية والمشاكل التشغيلية المتوقعة في الميدان وكيفية معالجتها برمجياً لضمان سلامة الدورة اللوجستية والمالية:
        </p>

        <div className="table-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ width: '22%', padding: '12px 8px', fontSize: 13, fontWeight: 700 }}>السيناريو وحالة الاستثناء</th>
                <th style={{ width: '38%', padding: '12px 8px', fontSize: 13, fontWeight: 700 }}>سلوك وتفاعل المندوب (Frontend App)</th>
                <th style={{ padding: '12px 8px', fontSize: 13, fontWeight: 700 }}>الضوابط البرمجية والأمان (Backend API)</th>
              </tr>
            </thead>
            <tbody>
              {/* Scenario 1 */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 'bold', color: '#c53929' }}>
                  تداخل الحجز الجغرافي (Pessimistic Concurrency Lock)
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يفتح المندوب "أ" والمندوب "ب" الخريطة ويحدد كل منهما دائرة متقاطعة ويحاولان حجز الطلب نفسه في نفس الثانية.
                  <br />
                  - المندوب الذي يسجل الحجز متأخراً بأجزاء من الثانية يتلقى خطأ: "عذراً، الطلب محجوز مسبقاً".
                  <br />
                  - يتم تحديث الخرائط تلقائياً وإخفاء النقطة عبر البث اللحظي <code>SSE Stream</code>.
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يتم حجز الأسطر في قاعدة البيانات باستخدام <code>SELECT ... FOR UPDATE</code> داخل <code>DB::transaction</code>.
                  <br />
                  - يمنع الحجز المزدوج ويرمي خطأ 409 Conflict.
                  <br />
                  - يتم بث حدث <code>orders_claimed</code> فورياً لجميع المناديب النشطين لإزالة النقطة من خرائطهم.
                </td>
              </tr>

              {/* Scenario 2 */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 'bold', color: '#c53929' }}>
                  التحقق الجغرافي المغلوط (Geofencing Guard Mismatch)
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يحاول المندوب عمل <strong>Check-in</strong> لتسجيل بدء الزيارة وهو لا يزال على بعد مسافة طويلة من موقع العميل (أكبر من 500 متر).
                  <br />
                  - يعرض التطبيق رسالة تنبيه حمراء: "يجب أن تكون على بعد 500 متر أو أقل من موقع العميل لتسجيل الوصول".
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يستقبل API إحداثيات GPS المرسلة من التطبيق: <code>POST /api/v1/planning/items/check-in</code>.
                  <br />
                  - يحسب مسافة Haversine الجيوديسية بين موقع المندوب وموقع الطلب الفعلي <code>pick_up_coordinates</code>.
                  <br />
                  - إذا كانت المسافة &gt; 500 متر، يرمي الاستعلام <code>ValidationException</code> ويرفض التحديث.
                </td>
              </tr>

              {/* Scenario 3 */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 'bold', color: '#c53929' }}>
                  عجز رصيد العهدة المالية (Insufficient Imprest Balance)
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يقوم المندوب بوزن الملابس عند العميل وتكون تكلفتها الإجمالية (الوزن × السعر) أكبر من رصيد عهدته المتبقي.
                  <br />
                  - يعرض التطبيق رسالة خطأ عند المغادرة: "رصيد عهدتك المتبقي لا يكفي لإتمام هذه المشتريات، يرجى التواصل مع الإدارة لشحن المحفظة".
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - عند إرسال طلب الـ Check-out: يتحقق النظام تلقائياً من أن رصيد عهدة المندوب الجاري <code>users.financial_imprest</code> أكبر من أو يساوي قيمة المشتريات المحسوبة.
                  <br />
                  - في حال عدم الكفاية، يتم رفض الطلب ويرفض السيستم تغيير حالة الأوردر لـ PICKED_UP حتى يتم شحن عهدته إدارياً عبر <code>imprest/adjust</code>.
                </td>
              </tr>

              {/* Scenario 4 */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 'bold', color: '#c53929' }}>
                  تأجيل أو إلغاء الزيارة تلفونياً (Reschedule & Cancel)
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يتصل المندوب بالعملاء قبلها بيوم لتنسيق مواعيد بكرة، فيطلب عميل تأجيل الزيارة أو إلغائها نهائياً.
                  <br />
                  - يقوم المندوب بفتح نافذة العميل (Bottom Sheet) وتغيير الحالة فوراً لـ "تأجيل" أو "إلغاء".
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يتم معالجة الطلب برمجياً ويقوم الباك إند بتحديث حالة الأوردر لـ <code>RESCHEDULED (9)</code> أو <code>CANCELLED (6)</code>.
                  <br />
                  - يقوم النظام تلقائياً باستبعاد الطلب من خطة السير النشطة للمندوب لليوم التالي لضمان دقة إحصائيات الخطة.
                </td>
              </tr>

              {/* Scenario 5 */}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 'bold', color: '#c53929' }}>
                  ضعف تغطية الإنترنت بالميدان (Offline Tracking Mode)
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - يدخل المندوب جراجاً أو منطقة تنقطع بها شبكة الإنترنت أثناء تتبع موقعه بالـ GPS.
                  <br />
                  - يقوم التطبيق بحفظ الإحداثيات محلياً (نظام التخزين المؤقت LocalStorage/SQLite).
                  <br />
                  - بمجرد استعادة الشبكة، يقوم برفعها دفعة واحدة (Batch Sync) في الخلفية.
                </td>
                <td style={{ padding: '12px 8px', fontSize: 13, lineHeight: 1.5 }}>
                  - تستقبل API التتبع <code>POST /api/v1/tracking/log</code> مصفوفة الإحداثيات المرفوعة، وتقوم بحفظها مؤقتاً في كاش Redis.
                  <br />
                  - يقوم الكرون جوب <code>tracking:persist</code> كل 3 دقائق بسحب الإحداثيات وحفظها بجدول <code>user_locations</code> بتوقيتها الأصلي.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FieldAgentJourney;
