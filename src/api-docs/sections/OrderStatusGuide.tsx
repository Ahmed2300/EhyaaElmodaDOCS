import React from 'react';
import Icon from '../components/Icon';

const statuses = [
  {
    code: 0,
    label: 'PENDING',
    ar: 'جديد',
    color: '#5f6368',
    bg: '#f1f3f4',
    category: 'new',
    desc: 'تم إرسال الطلب من العميل وهو بانتظار المراجعة من الإدارة. لم يتم بعد الموافقة عليه أو تعيين مندوب.',
    example: 'العميل يملأ النموذج على صفحة الهبوط ويضغط "إرسال". الطلب يظهر فوراً في لوحة الإدارة بحالة PENDING.',
  },
  {
    code: 7,
    label: 'COMMUNICATED',
    ar: 'جاري التواصل',
    color: '#1a73e8',
    bg: '#e8f0fe',
    category: 'active',
    desc: 'قام المندوب أو الإدارة بالتواصل مع العميل للتحقق من الطلب وتأكيد التفاصيل. لم يتم بعد تحديد موعد.',
    example: 'المندوب يتصل بالعميل للتأكد من العنوان ونوع الملابس والوزن التقريبي.',
  },
  {
    code: 8,
    label: 'SCHEDULED_VISITED',
    ar: 'زيارة مجدولة',
    color: '#e37400',
    bg: '#fef7e0',
    category: 'active',
    desc: 'تم تحديد موعد محدد لزيارة العميل واستلام الملابس. الطلب في انتظار التنفيذ الميداني.',
    example: 'العميل وافق على زيارة المندوب غداً الساعة 2 ظهراً. تم تسجيل الموعد في النظام.',
  },
  {
    code: 9,
    label: 'RESCHEDULED',
    ar: 'إعادة جدولة',
    color: '#e37400',
    bg: '#fef7e0',
    category: 'active',
    desc: 'تم تأجيل موعد الزيارة الأصلي وتحديد موعد جديد. قد يكون بسبب طلب العميل أو ظرف طارئ.',
    example: 'العميل طلب تأجيل الزيارة من الأربعاء إلى الخميس بسبب سفر مفاجئ.',
  },
  {
    code: 1,
    label: 'APPROVED',
    ar: 'تمت الموافقة',
    color: '#1a73e8',
    bg: '#e8f0fe',
    category: 'active',
    desc: 'تمت مراجعة الطلب من الإدارة والموافقة عليه. جاهز لتعيين مندوب لتغطيته.',
    example: 'الأدمن يراجع الطلب ويتأكد أنه يستوفي الشروط (الوزن الحد الأدنى، الموقع ضمن الخدمة) ويضغط "موافقة".',
  },
  {
    code: 2,
    label: 'ASSIGNED',
    ar: 'تم التعيين مندوب',
    color: '#1a73e8',
    bg: '#e8f0fe',
    category: 'active',
    desc: 'تم إسناد الطلب لمندوب محدد وتم إضافته في خطة سير اليوم. المندوب مسؤول عن تنفيذ هذه الزيارة.',
    example: 'الأدمن يختار المندوب أحمد ويضيف الطلب رقم REQ-001 في خطة سيره ليوم الخميس.',
  },
  {
    code: 3,
    label: 'PICKED_UP',
    ar: 'تم الاستلام',
    color: '#1e8e3e',
    bg: '#e6f4ea',
    category: 'success',
    desc: 'قام المندوب بزيارة العميل واستلام الملابس بنجاح. تم تسجيل الوزن الفعلي وتم خصم تكلفة الشراء من عهدة المندوب.',
    example: 'المندوب وصل للعميل ووزن الملابس 22.75 كجم. قام بتسجيل الوزن في التطبيق وأكمل العملية.',
  },
  {
    code: 4,
    label: 'DELIVERED',
    ar: 'تم التوصيل',
    color: '#1e8e3e',
    bg: '#e6f4ea',
    category: 'success',
    desc: 'تم تسليم الطلب بنجاح. في سياق نظام التجميع، يعني أن عملية الشراء والاستلام تمت بالكامل.',
    example: 'بعد استلام الملابس، تم تسجيل عملية التوصيل/التسليم النهائية في النظام.',
  },
  {
    code: 5,
    label: 'REJECTED',
    ar: 'مرفوض',
    color: '#d93025',
    bg: '#fce8e6',
    category: 'terminal',
    desc: 'تم رفض الطلب من قبل الإدارة أو النظام. السبب قد يكون: موقع خارج نطاق الخدمة، بيانات غير صحيحة، أو اشتباه في احتيال.',
    example: 'العميل يطلب من منطقة محظورة (خارج الخدمة). الأدمن يرفض الطلب ويحدده كمرفوض مع السبب.',
  },
  {
    code: 6,
    label: 'CANCELLED',
    ar: 'تم الإلغاء',
    color: '#5f6368',
    bg: '#f1f3f4',
    category: 'terminal',
    desc: 'تم إلغاء الطلب either by the customer or admin. differs from REJECTED in that the order was not "rejected" but "cancelled" - it may be resubmitted.',
    example: 'العميل يتصل ويقول "غيّرت رأيي، لا أريد البيع الآن". الأدمن يلغي الطلب.',
  },
];

const activeStatuses = statuses.filter(s => s.category === 'active');
const successStatuses = statuses.filter(s => s.category === 'success');
const terminalStatuses = statuses.filter(s => s.category === 'terminal');
const newStatus = statuses.filter(s => s.category === 'new');

const OrderStatusGuide: React.FC = () => {
  return (
    <div>
      {/* Visual Flow */}
      <div className="status-flow-container">
        <h3 className="status-flow-title">مسار دورة حياة الطلب</h3>
        <div className="status-flow">
          {statuses.map((s, i) => (
            <React.Fragment key={s.code}>
              <div className="status-flow-node" style={{ background: s.bg, borderColor: s.color }}>
                <span className="status-flow-code" style={{ color: s.color }}>{s.code}</span>
                <span className="status-flow-label">{s.ar}</span>
              </div>
              {i < statuses.length - 1 && (
                <Icon name="arrow_back" size={18} className="status-flow-arrow" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Category Groups */}
      <div className="status-categories">
        {/* New */}
        <div className="status-category">
          <div className="status-category-header" style={{ borderColor: '#5f6368' }}>
            <span className="status-category-dot" style={{ background: '#5f6368' }}></span>
            <span>طلبات جديدة</span>
            <span className="status-category-count">{newStatus.length}</span>
          </div>
          {newStatus.map(s => (
            <StatusCard key={s.code} {...s} />
          ))}
        </div>

        {/* Active */}
        <div className="status-category">
          <div className="status-category-header" style={{ borderColor: '#1a73e8' }}>
            <span className="status-category-dot" style={{ background: '#1a73e8' }}></span>
            <span>قيد التنفيذ</span>
            <span className="status-category-count">{activeStatuses.length}</span>
          </div>
          {activeStatuses.map(s => (
            <StatusCard key={s.code} {...s} />
          ))}
        </div>

        {/* Success */}
        <div className="status-category">
          <div className="status-category-header" style={{ borderColor: '#1e8e3e' }}>
            <span className="status-category-dot" style={{ background: '#1e8e3e' }}></span>
            <span>مكتملة بنجاح</span>
            <span className="status-category-count">{successStatuses.length}</span>
          </div>
          {successStatuses.map(s => (
            <StatusCard key={s.code} {...s} />
          ))}
        </div>

        {/* Terminal */}
        <div className="status-category">
          <div className="status-category-header" style={{ borderColor: '#d93025' }}>
            <span className="status-category-dot" style={{ background: '#d93025' }}></span>
            <span>حالات نهائية</span>
            <span className="status-category-count">{terminalStatuses.length}</span>
          </div>
          {terminalStatuses.map(s => (
            <StatusCard key={s.code} {...s} />
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="status-comparison">
        <h3 className="status-comparison-title">الفرق بين الحالات المتشابهة</h3>

        <div className="comparison-cards">
          <div className="comparison-card">
            <div className="comparison-card-header">
              <div className="comparison-vs">
                <span style={{ color: '#d93025' }}>REJECTED (5)</span>
                <span className="comparison-vs-label"> مقابل </span>
                <span style={{ color: '#5f6368' }}>CANCELLED (6)</span>
              </div>
            </div>
            <div className="comparison-card-body">
              <div className="comparison-col">
                <h4 style={{ color: '#d93025' }}>REJECTED - مرفوض</h4>
                <ul>
                  <li>يتم رفضه من قبل الإدارة أو النظام تلقائياً</li>
                  <li>السبب: خارج نطاق الخدمة، بيانات مزيفة، احتيال</li>
                  <li>لا يمكن إعادة إرسال الطلب نفسه</li>
                  <li>غالباً ي accompanies by blocking the customer</li>
                </ul>
              </div>
              <div className="comparison-col">
                <h4 style={{ color: '#5f6368' }}>CANCELLED - ملغي</h4>
                <ul>
                  <li>يتم إلغاؤه من قبل العميل أو الإدارة</li>
                  <li>السبب: تغير رأي العميل، ظرف شخصي</li>
                  <li>يمكن للعميل إعادة إرسال طلب جديد</li>
                  <li>لا ي accompanies by any penalty or blocking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <div className="comparison-card-header">
              <div className="comparison-vs">
                <span style={{ color: '#e37400' }}>SCHEDULED_VISITED (8)</span>
                <span className="comparison-vs-label"> مقابل </span>
                <span style={{ color: '#e37400' }}>RESCHEDULED (9)</span>
              </div>
            </div>
            <div className="comparison-card-body">
              <div className="comparison-col">
                <h4 style={{ color: '#e37400' }}>SCHEDULED_VISITED - زيارة مجدولة</h4>
                <ul>
                  <li>الموعد الأصلي لا يزال سارياً</li>
                  <li>لم يتم تغيير الموعد بعد</li>
                  <li>المندوب متجه للعميل في الموعد المحدد</li>
                </ul>
              </div>
              <div className="comparison-col">
                <h4 style={{ color: '#e37400' }}>RESCHEDULED - إعادة جدولة</h4>
                <ul>
                  <li>تم تأجيل الموعد الأصلي</li>
                  <li>تم تحديد موعد جديد مختلف</li>
                  <li>السبب: طلب العميل أو ظرف طارئ</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <div className="comparison-card-header">
              <div className="comparison-vs">
                <span style={{ color: '#1e8e3e' }}>PICKED_UP (3)</span>
                <span className="comparison-vs-label"> مقابل </span>
                <span style={{ color: '#1e8e3e' }}>DELIVERED (4)</span>
              </div>
            </div>
            <div className="comparison-card-body">
              <div className="comparison-col">
                <h4 style={{ color: '#1e8e3e' }}>PICKED_UP - تم الاستلام</h4>
                <ul>
                  <li>المندوب استلم الملابس فعلياً</li>
                  <li>تم تسجيل الوزن الفعلي</li>
                  <li>تم خصم التكلفة من عهدة المندوب</li>
                  <li>هذه هي الحالة الرئيسية لنجاح العملية</li>
                </ul>
              </div>
              <div className="comparison-col">
                <h4 style={{ color: '#1e8e3e' }}>DELIVERED - تم التوصيل</h4>
                <ul>
                  <li>تم تسليم الطلب كلياً</li>
                  <li>في سياق التجميع = اكتمال العملية</li>
                  <li>تتبع مرحلة ما بعد الاستلام</li>
                  <li>تُستخدم للتقارير النهائية</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Marker Colors Guide */}
      <div className="status-comparison" style={{ marginTop: 40 }}>
        <h3 className="status-comparison-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ color: '#1a73e8' }}>map</span>
          دليل ألوان علامات الخرائط (Map Marker Colors)
        </h3>
        <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 20 }}>
          لتجنب الاختيار العشوائي للألوان وضمان توحيد الواجهات البرمجية لدى المطورين، تعتمد الخرائط على التنسيق اللوني التالي:
        </p>

        <div className="comparison-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Card 1: Orders Map */}
          <div className="comparison-card" style={{ borderTop: '3px solid #1a73e8' }}>
            <div className="comparison-card-header" style={{ padding: '12px 16px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#202124' }}>1. خريطة الطلبات النشطة (Orders Map)</h4>
            </div>
            <div style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF9800', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#FF9800' }}>#FF9800 (برتقالي):</strong> أوردر جديد معلق <code>PENDING</code> - بانتظار الجدولة أو المراجعة.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#009688', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#009688' }}>#009688 (تركواز/تيل):</strong> أوردر تمت الموافقة عليه <code>APPROVED</code> - جاهز للإسناد الذاتي أو اليدوي.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#9C27B0', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#9C27B0' }}>#9C27B0 (بنفسجي):</strong> جاري التواصل مع العميل <code>COMMUNICATED</code> - لتحديد وتأكيد التفاصيل.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#2196F3', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#2196F3' }}>#2196F3 (أزرق نشط):</strong> زيارة مجدولة أو مسندة <code>SCHEDULED_VISITED / ASSIGNED</code> - زيارة المندوب لتجمع الملابس اليوم.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FFC107', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#FFC107' }}>#FFC107 (أصفر/خردلي):</strong> أوردر تم تأجيله <code>RESCHEDULED</code> - تم تأجيل الموعد وتأكيد تاريخ جديد.
                </div>
              </div>
              <p style={{ fontSize: 11, color: '#80868b', margin: '8px 0 0 0', fontStyle: 'italic' }}>
                * الحالات النهائية (تم الاستلام، تم التوصيل، ملغى، مرفوض) تختفي تلقائياً من خريطة العمليات النشطة منعاً للازدحام.
              </p>
            </div>
          </div>

          {/* Card 2: Customers Map & Agents */}
          <div className="comparison-card" style={{ borderTop: '3px solid #6a1b9a' }}>
            <div className="comparison-card-header" style={{ padding: '12px 16px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#202124' }}>2. خريطة توزيع العملاء وتتبع المناديب (الأدمن فقط)</h4>
            </div>
            <div style={{ padding: 16, display: 'grid', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#202124', borderBottom: '1px solid #eee', paddingBottom: 4, marginBottom: 4 }}>حالات العملاء (Customer Lifecycle):</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#4CAF50' }}>#4CAF50 (أخضر زمردي):</strong> عميل جديد <code>new</code> - مسجل حديثاً ولم يتم تنفيذ عمليات ناجحة معه بعد.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#3F51B5', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#3F51B5' }}>#3F51B5 (نيلي/أزرق غامق):</strong> عميل نشط <code>active</code> - تم تجميع أوردر ناجح واحد على الأقل منه.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#F44336', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#F44336' }}>#F44336 (أحمر):</strong> عميل محظور <code>blocked/rejected</code> - مسجل في القوائم السوداء أو Spam.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#9E9E9E', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#9E9E9E' }}>#9E9E9E (رمادي):</strong> عميل مؤرشف <code>archived</code> - خارج الخدمة أو تم أرشفة موقعه.
                </div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, color: '#202124', borderBottom: '1px solid #eee', paddingBottom: 4, marginTop: 12, marginBottom: 4 }}>حالة المناديب على البث المباشر (SSE Stream):</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#00E676', display: 'inline-block', boxShadow: '0 0 0 4px rgba(0,230,118,0.2)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#00E676' }}>#00E676 (أخضر نيون متوهج):</strong> مندوب متصل ونشط - آخر تحديث جغرافي له خلال 5 دقائق.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#D50000', display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: '#D50000' }}>#D50000 (أحمر ياقوتي):</strong> مندوب غير متصل أو ثابت - لم يرسل إحداثيات منذ أكثر من 5 دقائق.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{
  code: number;
  label: string;
  ar: string;
  color: string;
  bg: string;
  category: string;
  desc: string;
  example: string;
}> = ({ code, label, ar, color, bg, desc, example }) => {
  return (
    <div className="status-detail-card" style={{ borderRight: `3px solid ${color}` }}>
      <div className="status-detail-header">
        <span className="status-detail-badge" style={{ background: bg, color }}>{code}</span>
        <div className="status-detail-names">
          <span className="status-detail-ar">{ar}</span>
          <span className="status-detail-en">{label}</span>
        </div>
      </div>
      <p className="status-detail-desc">{desc}</p>
      <div className="status-detail-example">
        <span className="status-detail-example-label">مثال عملي:</span>
        <p>{example}</p>
      </div>
    </div>
  );
};

export default OrderStatusGuide;
