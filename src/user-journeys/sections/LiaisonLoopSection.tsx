import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import Icon from '../../api-docs/components/Icon';

const LiaisonLoopSection: React.FC = () => {
  return (
    <section id="liaison-loop" className="docs-section">
      <SectionHeader icon="handshake" title="حلقة الوصل والتنسيق التشغيلي الفوري" description="سيناريو التنسيق اللحظي لمنع التداخل وحل التعارض عند قيام مندوبين بالبحث الجغرافي في نفس النطاق - بنية 1-to-Many: العميل يملك عدة طلبات" />

      <div className="liaison-diagram">
        <div className="liaison-columns">
          <div className="liaison-col">
            <div className="liaison-col-header" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
              <Icon name="admin_panel_settings" size={20} />
              لوحة الإدارة
            </div>
          </div>
          <div className="liaison-col">
            <div className="liaison-col-header" style={{ background: '#e8f5e9', color: '#1e8e3e' }}>
              <Icon name="local_shipping" size={20} />
              خريطة المندوب
            </div>
          </div>
          <div className="liaison-col">
            <div className="liaison-col-header" style={{ background: '#fef7e0', color: '#e37400' }}>
              <Icon name="account_balance" size={20} />
              النظام المحاسبي
            </div>
          </div>
        </div>

        <div className="liaison-steps">
          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#1a73e8' }}>1</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">الإدارة / المندوب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">الخريطة</span>
              </div>
              <p>يقوم الأدمن أو المندوب مسبقاً بفتح الخريطة ورسم مضلع مغلق (Polygon) لتحديد منطقة تجميع الملابس المستهدفة (مثلاً المعادي). يستخلص النظام كافة طلبات الاستلام الواقعة داخل هذا المضلع تلقائياً لتشكيل خطة مسار المندوب لليوم التالي.</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#1e8e3e' }}>2</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المندوب</span>
                <Icon name="loop" size={16} className="liaison-arrow" />
                <span className="liaison-to">العملاء</span>
              </div>
              <p>يتواصل المندوب مع العملاء وينسق المواعيد. عند موافقة العميل على موعد غداً، يغير حالته إلى "مؤكد" (SCHEDULED_VISITED).</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#1a73e8' }}>3</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المندوب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">الإدارة</span>
              </div>
              <p>تظهر التأكيدات فوراً في لوحة تحكم الإدارة لمعرفة عدد الزيارات المجدولة لليوم التالي لكل مندوب.</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#e37400' }}>4</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المندوب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">النظام</span>
              </div>
              <p>في صباح اليوم التالي، يتحرك المندوب للعملاء المؤكدين ويقوم بالتحقق الجغرافي الصارم (قفل المسافة في نطاق 500 متر).</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#e37400' }}>5</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المندوب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">النظام المحاسبي</span>
              </div>
              <p>بمجرد إتمام الشراء وإدخال الوزن (مثلاً 10 كجم)، يقوم النظام فوراً بضرب هذا الوزن في سعر الكيلو المعتمد في الإدارة ويقيد قيمة الملابس في الحسابات الميدانية.</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#6a1b9a' }}>6</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المندوب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">الإدارة + المحاسب</span>
              </div>
              <p>بعد الانتهاء، يضغط المندوب زر إنهاء اليوم ويسجل مصروفات التشغيل. يقوم النظام بخصم المجموع الإجمالي من عهدة المندوب مباشرة.</p>
            </div>
          </div>

          <div className="liaison-step">
            <div className="liaison-step-num" style={{ background: '#d93025' }}>7</div>
            <div className="liaison-step-content">
              <div className="liaison-step-from-to">
                <span className="liaison-from">المحاسب</span>
                <Icon name="arrow_back" size={16} className="liaison-arrow" />
                <span className="liaison-to">النظام</span>
              </div>
              <p>تظهر التصفية فوراً للمحاسب/الأدمن في تقرير العمليات اليومي المالي. يعتمد المحاسب الفواتير المرفوعة عبر التطبيق ويوثق الحركات المالية الميدانية، بينما يظل الرصيد المتبقي مستمراً وجارياً في محفظة المندوب لليوم التالي دون تصفير.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Self-Assign Table */}
      <h3 style={{ marginTop: 32, marginBottom: 16, fontSize: '1.1rem', fontWeight: 600 }}>سيناريو الإسناد الذاتي ومنع التداخل اللحظي</h3>
      <p style={{ marginBottom: 16, color: '#5f6368', lineHeight: 1.7 }}>
        يوضح الجدول التالي سيناريو التنسيق اللحظي لمنع التداخل وحل التعارض عند قيام مندوبين بالبحث الجغرافي في نفس النطاق:
      </p>

      {/* Polygon Selection Diagram */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: 20,
        marginTop: 16,
        marginBottom: 24,
        textAlign: 'center'
      }}>
        <img
          src="/polygon_map_selection.png"
          alt="رسم مضلع مغلق على الخريطة لتحديد الطلبات ميدانياً"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 6, display: 'block', margin: '0 auto' }}
        />
        <p style={{ fontSize: 12, color: '#5f6368', marginTop: 10, marginBottom: 0, direction: 'rtl' }}>
          <strong>شكل توضيحي:</strong> رسم مضلع مغلق (Polygon) لتحديد وفلترة الطلبات النشطة جغرافياً واستخلاصها بواسطة محرك الذكاء الاصطناعي دون الاعتماد على الموقع الحالي للمندوب.
        </p>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', lineHeight: 1.6 }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #e0e0e0', minWidth: 40 }}>الخطوة</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #e0e0e0', minWidth: 180, color: '#1e8e3e' }}>المندوب "أ" (Agent A)</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #e0e0e0', minWidth: 180, color: '#1e8e3e' }}>المندوب "ب" (Agent B)</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #e0e0e0', minWidth: 180, color: '#1a73e8' }}>خادم النظام (Backend)</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #e0e0e0', minWidth: 200 }}>النتيجة والتأثير على قاعدة البيانات</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>1</td>
              <td style={{ padding: '10px 12px' }}>يرسم مضلعاً مغلقاً (Polygon) حول حي المعادي</td>
              <td style={{ padding: '10px 12px' }}>يرسم مضلعاً مغلقاً متقاطعاً في نفس المنطقة بالمعادي</td>
              <td style={{ padding: '10px 12px' }}>يستقبل طلبات الاستعلام الجغرافية</td>
              <td style={{ padding: '10px 12px' }}>يعود لكل منهما قائمة الطلبات الواقعة داخل المضلع المرسوم (تشمل الطلب REQ-10)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>2</td>
              <td style={{ padding: '10px 12px' }}>يحدد الطلب REQ-10 ويضغط "إسناد"</td>
              <td style={{ padding: '10px 12px' }}>يحدد نفس الطلب REQ-10 ويضغط "إسناد" بعد المندوب "أ" بـ 500 مللي ثانية</td>
              <td style={{ padding: '10px 12px' }}>يفتح Transaction آمن ويقفل حقل الطلب REQ-10 للتحقق (FOR UPDATE)</td>
              <td style={{ padding: '10px 12px' }}>يتم قبول طلب المندوب "أ" وحجز الطلب باسمه وتغيير حالته لـ ASSIGNED وربطه بخطته</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>3</td>
              <td style={{ padding: '10px 12px' }}>يظهر له تأكيد الإسناد بنجاح</td>
              <td style={{ padding: '10px 12px' }}>-</td>
              <td style={{ padding: '10px 12px' }}>يبث فوراً حدث SSE: <code>orders_claimed {'{id: 10}'}</code></td>
              <td style={{ padding: '10px 12px' }}>يستقبل تطبيق المندوب "ب" البث اللحظي ويقوم بإخفاء النقطة REQ-10 فوراً من شاشته وخريطته</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>4</td>
              <td style={{ padding: '10px 12px' }}>-</td>
              <td style={{ padding: '10px 12px' }}>يضغط تأكيد الإرسال للطلب REQ-10 (طلب معلق في واجهته قبل التحديث)</td>
              <td style={{ padding: '10px 12px' }}>يستقبل الطلب ويتحقق من القفل الجغرافي المعلق</td>
              <td style={{ padding: '10px 12px' }}>يرفض الخادم العملية فوراً ويرسل استجابة 422: "عفواً، تم حجز هذا الطلب بواسطة مندوب آخر"</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>5</td>
              <td style={{ padding: '10px 12px' }}>يتصل بالعميل الخاص بالطلب REQ-10 لتأكيد زيارة الغد</td>
              <td style={{ padding: '10px 12px' }}>يتحرك لتحديد طلبات حرة أخرى على خريطته المحدثة</td>
              <td style={{ padding: '10px 12px' }}>يراقب العمليات على لوحة التحكم</td>
              <td style={{ padding: '10px 12px' }}>تتحول حالة الطلب REQ-10 لـ SCHEDULED_VISITED عند موافقة العميل</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiaisonLoopSection;
