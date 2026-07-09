import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import JourneyStep from '../components/JourneyStep';
import Icon from '../../api-docs/components/Icon';

const SuperAdminJourney: React.FC = () => {
  const roleColor = '#6a1b9a';

  return (
    <section id="super-admin" className="docs-section">
      <SectionHeader icon="admin_panel_settings" title="رحلة المشرف العام / الأدمن" description="التحكم بكافة العمليات اللوجستية وتتبع المناديب والتصفية المالية - مبني على التحليل الفعلي للكود البرمجي" />

      {/* === 1. Field Operations Dashboard === */}
      <JourneyStep number={1} title="لوحة التشغيل الميداني والتحكم" icon="dashboard" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/reports/dashboard', desc: 'بطاقات النظرة العامة' },
          { method: 'GET', path: '/api/v1/admin/orders', desc: 'قائمة الطلبات مع الفلاتر' },
          { method: 'SSE', path: '/api/v1/planning/self-assign/stream', desc: 'مراقبة عمليات الإسناد الذاتي للمناديب' },
        ]}
      >
        <p>شاشة التحكم الرئيسية هي مركز إدارة العمليات اليومية لحظة بلحظة. يتحكم الأدمن بكافة العمليات اللوجستية ويتتبع المناديب والتصفية المالية.</p>

        <h4 className="journey-subtitle">متابعة المؤشرات الرئيسية (KPIs):</h4>
        <div className="journey-fields-grid">
          <div className="journey-field">
            <Icon className="journey-field-icon" size={20}>analytics</Icon>
            <span>عدد الطلبات الكلي (Total Leads)</span>
          </div>
          <div className="journey-field">
            <Icon className="journey-field-icon" size={20}>star</Icon>
            <span>الطلبات المميزة (High Priority) بمعدل 8-10</span>
          </div>
          <div className="journey-field">
            <Icon className="journey-field-icon" size={20}>event_available</Icon>
            <span>الزيارات المؤكدة والمسندة للمناديب</span>
          </div>
          <div className="journey-field">
            <Icon className="journey-field-icon" size={20}>scale</Icon>
            <span>وزن المشتريات المكتملة بالكيلوجرام</span>
          </div>
        </div>

        <h4 className="journey-subtitle">مراقبة الإسناد الذاتي اللحظي (Self-Assign Monitoring):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>radar</Icon>
            </div>
            <div>
              <strong>مراقبة التداخل المباشر</strong>
              <p>يتبع الأدمن خريطة الطلبات لحظياً ويرى تحرك المناديب وعمليات الإسناد المباشرة التي يقومون بها من الشارع عبر الـ SSE Streams.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fce8e6', color: '#d93025' }}>
              <Icon size={20}>person_add</Icon>
            </div>
            <div>
              <strong>إسناد الطلبات وإدارة المهام</strong>
              <p>إسناد أي طلب يدوياً للمندوب وتخطيط خط سيره عبر لوحة التحكم (Admin-Assigned)، أو السماح للمندوبين بحجز وإسناد الطلبات ذاتياً (Self-Assigned). في كلتا الحالتين، يتحول الطلب في قاعدة البيانات إلى حالة "معين لمندوب ASSIGNED" ويُربط بـ user_id للمندوب المعين.</p>
            </div>
          </div>
        </div>

        <h4 className="journey-subtitle">الرسوم البيانية التفاعلية:</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
              <Icon size={20}>show_chart</Icon>
            </div>
            <div>
              <strong>مخطط معدل التحويل اليومي (Conversion Flow)</strong>
              <p>مقارنة الطلبات الجديدة بعمليات الشراء الناجحة خلال فترة زمنية محددة.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>pie_chart</Icon>
            </div>
            <div>
              <strong>مخطط توزيع المناطق الجغرافية</strong>
              <p>معرفة النسب المئوية للطلبات الواردة من كل منطقة.</p>
            </div>
          </div>
        </div>

        <h4 className="journey-subtitle">الخرائط التفاعلية والفرز الجغرافي:</h4>
        <ul className="journey-detail-list">
          <li>توفير خريطتين منفصلتين للأدمن:
            <ul>
              <li><strong>خريطة الطلبات (Orders Map):</strong> لمتابعة حركة تجميع الملابس الميدانية، ومواقع المناديب النشطة وحالات الطلبات الجارية لحظياً.</li>
              <li><strong>خريطة العملاء (Customers Map):</strong> لعرض التوزيع الجغرافي الدائم لكامل قاعدة بيانات العملاء (تجمعات العملاء VIP، مؤرشف، نشط، جديد).</li>
            </ul>
          </li>
          <li>خيارات تصفية سريعة على الخرائط: عرض طلبات VIP فقط، أو إخفاء الطلبات المرفوضة والملغاة.</li>
        </ul>

        <h4 className="journey-subtitle">إدارة وتوزيع الطلبات ميدانياً:</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>lock</Icon>
            </div>
            <div>
              <strong>حماية سرية البيانات</strong>
              <p>أرقام الهواتف مشفرة ومخفية بشكل افتراضي (masked phone). الأدمن ينقر زر الكشف لعرض الرقم الحقيقي عند الحاجة.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon size={20}>person_add</Icon>
            </div>
            <div>
              <strong>إسناد الطلبات يدوياً</strong>
              <p>إسناد أي طلب يدوياً لأي مندوب تجميع وتحديد خطة سيره (تخطي الإسناد الذاتي).</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fce8e6', color: '#d93025' }}>
              <Icon size={20}>block</Icon>
            </div>
            <div>
              <strong>رفض واستبعاد الطلبات</strong>
              <p>استبعاد العملاء غير الجديين أو خارج نطاق الخدمة.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon size={20}>download</Icon>
            </div>
            <div>
              <strong>تصدير بيانات الإعلانات (Export Hashed)</strong>
              <p>سحب بيانات العملاء مشفرة لمطابقتها مع الحملات الإعلانية على Meta.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      {/* === 2. Live Telemetry === */}
      <JourneyStep number={2} title="تتبع المناديب المباشر" icon="radar" color={roleColor}
        apiCalls={[
          { method: 'SSE', path: '/api/v1/locations/agent-report/stream', desc: 'بث مواقع المناديب في الوقت الفعلي' },
          { method: 'GET', path: '/api/v1/tracking/history/{userId}', desc: 'سجل تحركات المندوب' },
        ]}
      >
        <p>تتيح شاشة التحكم بالخريطة متابعة أسطول الحركة ميدانياً:</p>

        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>cell_tower</Icon>
            </div>
            <div>
              <strong>البث الجغرافي المباشر</strong>
              <p>الاتصال بقنوات SSE لتلقي إحداثيات المناديب أثناء تحركهم لحظة بلحظة.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon size={20}>speed</Icon>
            </div>
            <div>
              <strong>مراقبة أداء المندوب</strong>
              <p>الاطلاع على سرعة حركة المندوب الحالية ونسبة بطارية هاتفه لضمان الالتزام بخطة السير ومساعدته في حال حدوث عطل.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon size={20}>timeline</Icon>
            </div>
            <div>
              <strong>سجل التحركات (History Trail)</strong>
              <p>استرجاع ورسم مسار تحركات المندوب الجغرافية خلال أيام سابقة لمراجعة كفاءة خطوط السير وتأكيد الزيارات الميدانية.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      {/* === 3. VIP & Reject Zones === */}
      <JourneyStep number={3} title="إدارة نطاقات VIP ومناطق الرفض" icon="pin_drop" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/vip-zones', desc: 'إنشاء منطقة VIP جديدة' },
          { method: 'POST', path: '/api/v1/reject-zones', desc: 'إنشاء منطقة رفض جديدة' },
          { method: 'POST', path: '/api/v1/vip-zones/evaluate/reevaluate', desc: 'إعادة تقييم شامل للنظام الجغرافي' },
        ]}
      >
        <p>يتحكم الأدمن بالمحددات الجغرافية التي تصنف العملاء وتفلترهم تلقائياً بمجرد تقديم العميل لطلبه:</p>

        <div className="journey-options">
          <div className="journey-option" style={{ borderColor: '#1e8e3e' }}>
            <Icon className="journey-option-icon" style={{ color: '#1e8e3e' }} size={20}>stars</Icon>
            <div>
              <strong>رسم نطاقات VIP</strong>
              <p>إنشاء وتعديل وحذف مناطق VIP الجغرافية بصيغة مضلعات إحداثية (Polygon Map) مع تعيين نقاط أولوية (Priority Score) لكل منطقة لترتيب أسبقية استلام الطلبات.</p>
            </div>
          </div>
          <div className="journey-option" style={{ borderColor: '#d93025' }}>
            <Icon className="journey-option-icon" style={{ color: '#d93025' }} size={20}>block</Icon>
            <div>
              <strong>تحديد نطاقات الرفض</strong>
              <p>تحديد المناطق التي يُحظر أو يتعذر التوصيل إليها جغرافياً لمنع استقبال طلبات غير قابلة للتنفيذ.</p>
            </div>
          </div>
        </div>

        <div className="journey-resolution" style={{ background: '#f3e5f5' }}>
          <Icon className="journey-resolution-icon" style={{ color: '#6a1b9a' }} size={20}>refresh</Icon>
          <div>
            <strong>إعادة تقييم النظام الجغرافي:</strong> إرسال طلب إعادة تقييم شامل لجميع عملاء وطلبات النظام للتأكد من مطابقة إحداثياتهم مع التغييرات الجديدة، مع متابعة نسبة تقدم عملية التقييم في الخلفية عبر job_uuid.
          </div>
        </div>
      </JourneyStep>

      {/* === 4. Customers & Leads === */}
      <JourneyStep number={4} title="إدارة العملاء والطلبات المحتملة" icon="people" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/customers', desc: 'قائمة العملاء مع الفلاتر' },
          { method: 'GET', path: '/api/v1/customers/{id}/orders', desc: 'سجل طلبات العميل (Customer Order History)' },
          { method: 'POST', path: '/api/v1/customers/bulk-update', desc: 'تحديث مجمع للعملاء' },
          { method: 'POST', path: '/api/v1/customers/bulk-delete', desc: 'حذف مجمع للعملاء' },
          { method: 'POST', path: '/api/v1/customers/{id}/mark-lead', desc: 'ترقية إلى Lead (Meta CAPI)' },
          { method: 'POST', path: '/api/v1/customers/{id}/mark-qualified', desc: 'ترقية إلى Qualified Lead' },
          { method: 'POST', path: '/api/v1/customers/{id}/mark-hot', desc: 'ترقية إلى Hot Lead' },
        ]}
      >
        <p>يتحكم الأدمن بقاعدة البيانات ومراحل الفلترة التسويقية والتشغيلية:</p>

        <h4 className="journey-subtitle">البحث المتقدم والتصنيف:</h4>
        <ul className="journey-detail-list">
          <li>فلترة العملاء حسب الحالة التشغيلية (new, active, rejected, archived)، المحافظة، الحي، نوع الحدث التسويقي (Meta Event)، وحالتهم البيعية</li>
        </ul>

        <h4 className="journey-subtitle">استعراض وتدقيق سجل طلبات العميل (Customer Order History):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
              <Icon size={20}>badge</Icon>
            </div>
            <div>
              <strong>شاشة العميل الشخصية</strong>
              <p>عند الدخول على قائمة العملاء والضغط على أي ملف تعريف عميل، تظهر شاشة العميل الشخصية التي تحتوي على كامل بياناته.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>list</Icon>
            </div>
            <div>
              <strong>تبويب سجل الطلبات</strong>
              <p>يحتوي على جدول كامل ومرتب تنازلياً يعرض تاريخ معاملات العميل (جميع الطلبات السابقة والحالية): كود الطلب REQ، تاريخ الإنشاء، الوزن الفعلي المستلم، المبلغ المالي المدفوع، المندوب المستلم، والحالة النهائية لكل طلب.</p>
            </div>
          </div>
        </div>

        <h4 className="journey-subtitle">العمليات الجماعية (Bulk Operations):</h4>
        <div className="journey-fields-grid">
          <div className="journey-field action">
            <Icon className="journey-field-icon" size={20}>edit</Icon>
            <span>تعديل حالات مجموعة كبيرة من العملاء دفعة واحدة (Bulk Update)</span>
          </div>
          <div className="journey-field action">
            <Icon className="journey-field-icon" size={20}>delete</Icon>
            <span>حذف جماعي للعملاء غير المرغوب بهم (Bulk Delete)</span>
          </div>
          <div className="journey-field full-width action">
            <Icon className="journey-field-icon" size={20}>auto_awesome</Icon>
            <span>التقييم الجغرافي بالذكاء الاصطناعي لمجموعة عملاء دفعة واحدة (Bulk Evaluate) لتحديث نقاط الأولوية</span>
          </div>
        </div>

        <h4 className="journey-subtitle">التكامل التسويقي اليدوي مع Meta API:</h4>
        <div className="journey-steps-flow">
          <div className="journey-flow-step" style={{ borderColor: '#1a73e8' }}>
            <Icon className="journey-flow-icon" style={{ color: '#1a73e8' }} size={20}>person</Icon>
            <span>Mark as Lead</span>
          </div>
          <Icon className="journey-flow-arrow" size={20}>arrow_back</Icon>
          <div className="journey-flow-step" style={{ borderColor: '#e37400' }}>
            <Icon className="journey-flow-icon" style={{ color: '#e37400' }} size={20}>verified</Icon>
            <span>Mark as Qualified Lead</span>
          </div>
          <Icon className="journey-flow-arrow" size={20}>arrow_back</Icon>
          <div className="journey-flow-step" style={{ borderColor: '#d93025' }}>
            <Icon className="journey-flow-icon" style={{ color: '#d93025' }} size={20}>local_fire_department</Icon>
            <span>Mark as Hot Lead</span>
          </div>
        </div>
        <div className="journey-note" style={{ marginTop: 12 }}>
          <Icon size={16} style={{ color: '#80868b' }}>info</Icon>
          <span>يقوم النظام تلقائياً عند الترقية بإرسال حدث التحويل الفوري إلى Meta Conversions API وتوريث حالة التحويل لآخر طلب خاص بالعميل.</span>
        </div>
      </JourneyStep>

      {/* === 5. Routes & Dispatching === */}
      <JourneyStep number={5} title="تخطيط وتوزيع المسارات اليومية" icon="route" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/plannings', desc: 'إنشاء خطة يومية' },
          { method: 'POST', path: '/api/v1/plannings/{plan}/items', desc: 'إضافة زيارة إلى الخطة' },
          { method: 'POST', path: '/api/v1/admin/plannings/{id}/unlock', desc: 'فك قفل مسار المندوب يدوياً' },
        ]}
      >
        <p>يتحكم المشرف العام بهيكلة العمل اليومي للمناديب ويملك سلطة كسر أقفال المسارات الميدانية:</p>

        <h4 className="journey-subtitle">صياغة خطط السير اليومية (Plans CRUD):</h4>
        <ul className="journey-detail-list">
          <li>إنشاء وتعديل خطة عمل لكل مندوب ليوم محدد وإسناد الطلبات له (Admin-Assigned)</li>
          <li>إضافة نقاط زيارات طلبات محددة (Plan Items) إلى جدول سير المندوب</li>
          <li>مراجعة حالات الزيارات الميدانية للطلبات (بانتظار التحرك، تم الاستلام، مؤجل، ملغى)</li>
        </ul>

        <h4 className="journey-subtitle">إعادة التعيين والتحكم الاستثنائي بالأقفال:</h4>
        <div className="journey-resolution" style={{ background: '#e8f0fe' }}>
          <Icon className="journey-resolution-icon" style={{ color: '#1a73e8' }} size={20}>swap_horiz</Icon>
          <div>
            <strong>إعادة توزيع الطلبات:</strong> سحب طلبات من خطة مندوب وإسنادها لمندوب آخر لحل اختناقات العمل الميداني أو بسبب تغيب المناديب.
          </div>
        </div>

        <div className="journey-resolution" style={{ background: '#fffde7', border: '1px solid #fbc02d', marginTop: 12 }}>
          <Icon className="journey-resolution-icon" style={{ color: '#fbc02d' }} size={20}>lock_open</Icon>
          <div>
            <strong>فك قفل الخطة (Bypass Lock):</strong> الصلاحية لفتح قفل الخطة اليومية المغلقة للمندوب للسماح له بإعادة حجز طلبات إضافية من الشارع قبل تصفية زياراته السابقة في حالات الطوارئ.
          </div>
        </div>
      </JourneyStep>

      {/* === 6. Financial & Inventory Management === */}
      <JourneyStep number={6} title="النظام المالي والمخازن والتدقيق العام" icon="account_balance" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/admin/accounting/summary', desc: 'لوحة الحسابات الرئيسية' },
          { method: 'POST', path: '/api/v1/admin/accounting/imprest/adjust', desc: 'تعديل وشحن العهد' },
          { method: 'POST', path: '/api/v1/admin/accounting/corporate-expenses', desc: 'تسجيل مصروفات الشركة' },
          { method: 'GET', path: '/api/v1/admin/inventory/summary', desc: 'عرض رصيد المخزن والوارد والصادر' },
          { method: 'POST', path: '/api/v1/admin/sales', desc: 'تسجيل مبيعات المشترين' },
          { method: 'GET', path: '/api/v1/admin/accounting/ledger', desc: 'سجل العمليات المالي الموحد' },
        ]}
      >
        <p>يدير الأدمن/المشرف العام الدورة المالية للمشروع بالكامل، بدءاً من العهد الميدانية وحتى مبيعات المخازن والأرباح الصافية:</p>

        <h4 className="journey-subtitle">لوحة الحسابات الرئيسية (Main Accounting Dashboard):</h4>
        <ul className="journey-detail-list">
          <li><strong>ملخص المركز المالي:</strong> مراقبة إجمالي المشتريات والمبيعات (وزناً وقيمة)، والمخزون المتاح، وإجمالي المصروفات وصافي الأرباح الإجمالية.</li>
          <li><strong>مراقبة عهد المناديب:</strong> عرض الأرصدة النقدية الجارية لجميع المناديب في الميدان وتعديلها أو شحنها لدعم عمليات الشراء الميدانية.</li>
          <li><strong>مصروفات الشركة العامة:</strong> تسجيل بنود المصروفات العامة (إيجار المقرات، أجور الإداريين، الإعلانات والتسويق) وخصمها مباشرة من صافي الربح.</li>
        </ul>

        <h4 className="journey-subtitle">إدارة المخزن وسجل المشتريات (Inventory & Purchases):</h4>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon size={20}>warehouse</Icon>
            </div>
            <div>
              <strong>تحديث المخزون التلقائي</strong>
              <p>بمجرد إتمام المندوب للزيارة (Check-out) بالميدان وتوريد الملابس، يُنشأ سجل شراء تلقائي في سجل المشتريات (Purchases Log) ليزيد وزن المخزن وخصم القيمة من عهدة المندوب (لا يسمح بالإدخال اليدوي للمشتريات).</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon size={20}>settings_backup_restore</Icon>
            </div>
            <div>
              <strong>حركات الهالك والتعديل</strong>
              <p>إدخال تعديلات إدارية يدوية على المخزون لتسجيل العجز، الزيادة، أو الملابس التالفة المستبعدة (الهالك) لحساب الوزن الصافي الحالي بدقة.</p>
            </div>
          </div>
        </div>

        <h4 className="journey-subtitle">المبيعات والمشترون الخارجيون (Sales & Buyers):</h4>
        <ul className="journey-detail-list">
          <li><strong>تسجيل المبيعات:</strong> إدخال عمليات بيع بضائع للمشترين الخارجيين بالوزن وسعر البيع المتفق عليه لزيادة الإيرادات وصافي الأرباح.</li>
          <li><strong>شرط التحقق من المخزن:</strong> يمنع النظام برمجياً بيع أي وزن يتجاوز الرصيد الفعلي المتاح حالياً في المخزن لتجنب الأخطاء المحاسبية.</li>
          <li><strong>إدارة المشترين:</strong> تسجيل المشترين الخارجيين مع أرقام هواتفهم وملاحظاتهم، وتحديد "المشتري الافتراضي" لتسهيل الفواتير السريعة.</li>
        </ul>

        <h4 className="journey-subtitle">دفتر اليومية وسجل العمليات المالي الموحد (General Ledger):</h4>
        <div className="journey-resolution" style={{ background: '#f3e5f5' }}>
          <Icon className="journey-resolution-icon" style={{ color: '#6a1b9a' }} size={20}>history_edu</Icon>
          <div>
            <strong>النزاهة والرقابة المالية:</strong> توثيق تلقائي غير قابل للتعديل أو الحذف لكافة العمليات المالية (شحن عهد، شراء، بيع، مصروفات) بالتاريخ ورابط المستخدم والمبلغ لضمان حماية النظام من الاختلاس أو التلاعب.
          </div>
        </div>
      </JourneyStep>

      {/* === 7. System Settings === */}
      <JourneyStep number={7} title="إعدادات النظام وإدارة الصلاحيات" icon="settings" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/admin/admins', desc: 'إنشاء حساب موظف جديد' },
          { method: 'PATCH', path: '/api/v1/admin/admins/{id}/status', desc: 'تفعيل/إيقاف حساب' },
          { method: 'POST', path: '/api/v1/admin/roles', desc: 'إدارة الأدوار والصلاحيات' },
          { method: 'PUT', path: '/api/v1/settings/buying_price', desc: 'تعديل سعر الشراء العالمي' },
          { method: 'POST', path: '/api/v1/settings/welcome-settings', desc: 'تحديث محتوى صفحة الهبوط' },
          { method: 'POST', path: '/api/v1/content/settings/toggle-meta', desc: 'تفعيل/إيقاف Meta Pixel' },
        ]}
      >
        <p>يتحكم الأدمن بهوية النظام والمعايير التشغيلية الحاكمة:</p>

        <h4 className="journey-subtitle">إدارة المستخدمين والموظفين (Staff Management):</h4>
        <ul className="journey-detail-list">
          <li>إنشاء حسابات المدراء الجدد، الفنيين، المحاسبين، والمناديب</li>
          <li>تعديل بيانات الموظفين وتفعيل أو إيقاف حساباتهم الوظيفية</li>
          <li>تعيين الأدوار والصلاحيات (Spatie Roles & Permissions) لكل حساب للتحكم في ما يرونه داخل لوحة التحكم</li>
        </ul>

        <h4 className="journey-subtitle">سجل التدقيق والعمليات (Audit Logs):</h4>
        <div className="journey-resolution" style={{ background: '#f3e5f5' }}>
          <Icon className="journey-resolution-icon" style={{ color: '#6a1b9a' }} size={20}>history</Icon>
          <div>
            <strong>الشفافية والمتابعة:</strong> استعراض سجلات النشاط التفصيلية لمشاهدة ما قام به كل موظف أو أدمن في النظام (تعديل عميل، إسناد مسار، تغيير إعداد) لضمان الشفافية ومكافحة الأخطاء البشرية.
          </div>
        </div>

        <h4 className="journey-subtitle">إعدادات التشغيل العامة والأسعار:</h4>
        <div className="journey-fields-grid">
          <div className="journey-field action">
            <Icon className="journey-field-icon" size={20}>price_change</Icon>
            <span>تعديل سعر شراء الملابس للكيلوجرام الواحد (buying_price) - يتحدث فوراً لدى جميع المناديب</span>
          </div>
          <div className="journey-field action">
            <Icon className="journey-field-icon" size={20}>web</Icon>
            <span>تعديل إعدادات صفحة الهبوط: الشعار، الصور، العنوان الترويجي، والسطر الوصفي</span>
          </div>
          <div className="journey-field full-width action">
            <Icon className="journey-field-icon" size={20}>ads_click</Icon>
            <span>تفعيل أو إيقاف ربط التحويلات الإعلانية مع Meta (Toggle Meta Conversation API)</span>
          </div>
        </div>
      </JourneyStep>

      {/* === 8. Bulk Contact Import === */}
      <JourneyStep number={8} title="استيراد جهات الاتصال والرفع الجماعي (CSV / VCF)" icon="upload_file" color={roleColor} isLast
        apiCalls={[
          { method: 'POST', path: '/api/v1/contacts/import', desc: 'رفع ملف جهات اتصال' },
          { method: 'GET', path: '/api/v1/contacts/import/{batch_id}/status', desc: 'التحقق من حالة معالجة الاستيراد' },
        ]}
      >
        <p>يستطيع الأدمن/المشرف استيراد جهات الاتصال والعملاء دفعة واحدة من ملفات خارجية لجدولتهم ميدانياً:</p>
        
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="upload_file" size={20} />
            </div>
            <div>
              <strong>رفع الملفات الجماعية</strong>
              <p>رفع ملفات CSV, XLSX, XLS, TXT أو VCF لاستيراد جهات الاتصال بضغطة واحدة (حد أقصى للملف 10MB) وتفويضها للخريطة والترميز التلقائي.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e3f2fd', color: '#0d47a1' }}>
              <Icon name="query_stats" size={20} />
            </div>
            <div>
              <strong>متابعة ومعالجة الطوابير</strong>
              <p>الاستعلام الآلي عن حالة طوابير معالجة البيانات (Job Queue Status) للتأكد من فك تشفير وتخزين أرقام الهواتف بنجاح والترميز الجغرافي للروابط.</p>
            </div>
          </div>
        </div>
      </JourneyStep>
    </section>
  );
};

export default SuperAdminJourney;
