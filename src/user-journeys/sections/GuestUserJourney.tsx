import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import JourneyStep from '../components/JourneyStep';
import Icon from '../../api-docs/components/Icon';

const GuestUserJourney: React.FC = () => {
  const roleColor = '#1a73e8';

  return (
    <section id="guest-user" className="docs-section">
      <SectionHeader icon="person" title="رحلة العميل / العميل النهائي" description="صفحة الهبوط العامة لتقديم طلب بيع ملابس مستعملة - بنية 1-to-Many: العميل يملك عدة طلبات عبر الزمن" />

      <JourneyStep number={1} title="زيارة صفحة الهبوط" icon="open_in_new" color={roleColor}>
        <p>يصل العميل إلى صفحة الهبوط العامة المصممة للتفاعل السريع والسهل. الصفحة مصممة لتقديم تجربة بسيطة ومباشرة لبدء عملية البيع.</p>
        <ul className="journey-detail-list">
          <li>واجهة مستخدم بسيطة وسريعة ومفهومة فوراً</li>
          <li>نموذج مختصر يحتوي فقط على الحقول الضرورية</li>
          <li>تجربة مصممة للإكمال في أقل من دقيقة</li>
        </ul>
      </JourneyStep>

      <JourneyStep number={2} title="إدخال البيانات والتحقق" icon="edit_note" color={roleColor}>
        <p>يملأ العميل نموذج الطلب العام بالبيانات التالية:</p>
        <div className="journey-fields-grid">
          <div className="journey-field optional">
            <Icon name="badge" size={20} className="journey-field-icon" />
            <div>
              <span>الاسم الكامل</span>
              <span className="journey-field-optional">(اختياري)</span>
            </div>
          </div>
          <div className="journey-field required">
            <Icon name="chat" size={20} className="journey-field-icon" />
            <div>
              <span>رقم هاتف الواتساب</span>
              <span className="journey-field-required">(إجباري)</span>
            </div>
          </div>
        </div>
        <div className="journey-note">
          <Icon name="info" size={16} style={{ color: '#80868b' }} />
          <span>يتم التحقق من رقم الواتساب بصيغة الأرقام المصرية الصارمة (regex: ^(\+201|201|01|1)[0-2,5]{1}[0-9]{8}$) وتنسيقه بصيغة E.164 الدولية +20 لضمان صحته وتجنب التكرار.</span>
        </div>
        <div className="journey-note" style={{ marginTop: 8 }}>
          <Icon name="info" size={16} style={{ color: '#d93025' }} />
          <span>عدم تسجيل الوزن: العميل لا يسجل أي أوزان في هذه المرحلة. يتم تحديد الأوزان والتحقق منها حصرياً بواسطة المندوب أثناء الاستلام الفعلي بالميدان.</span>
        </div>
      </JourneyStep>

      <JourneyStep number={3} title="الالتقاط الجغرافي التلقائي" icon="my_location" color={roleColor}>
        <p>يتم التقاط إحداثيات موقع العميل الحالية تلقائياً وحفظها كإحداثيات جغرافية تابعة للطلب الحالي.</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
              <Icon name="gps_fixed" size={20} />
            </div>
            <div>
              <strong>تحديد تلقائي بالمتصفح (GPS الإجباري)</strong>
              <p>لا يحتاج العميل لإدخال روابط يدوية أو إحداثيات معقدة. المتصفح يطلب الإذن ويحدد الموقع تلقائياً ويخزنه في pick_up_coordinates للطلب.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={4} title="تأكيد شروط الخدمة" icon="checklist" color={roleColor}>
        <p>يجب على العميل الموافقة على شروط الخدمة وسياسات المنصة:</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="verified" size={20} />
            </div>
            <div>
              <strong>موافقة إجبارية على الشروط والسياسات</strong>
              <p>يوافق العميل على شروط الاستخدام وسياسة الخصوصية. لا يمكن إتمام الطلب بدون هذه الموافقة.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={5} title="بوابة تأكيد موقع الاستلام الرئيسي" icon="location_on" color={roleColor}
        apiCalls={[
          { method: 'POST', path: '/api/v1/orders', desc: 'إرسال الطلب مع تحديد مسار الأرشفة' },
        ]}
      >
        <p>يطرح النظام سؤالاً حاسماً يحدد مسار الطلب في النظام:</p>
        <div className="journey-decision-box">
          <div className="journey-decision-question">
            <Icon name="help" size={20} style={{ color: '#1a73e8' }} />
            <strong>"هل موقعك الحالي هو المكان الرئيسي الذي سنستلم منه الملابس؟"</strong>
          </div>
          <div className="journey-decision-options">
            <div className="journey-decision-yes">
              <div className="journey-decision-label" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
                <Icon name="check_circle" size={20} />
                نعم
              </div>
              <p>يقوم النظام بالتحقق من رقم الهاتف أولاً:</p>
              <ul className="journey-detail-list">
                <li>إذا كان الرقم موجوداً مسبقاً في جدول العملاء: يتم ربط الطلب الجديد بنفس كود العميل الحالي (customer_id) دون تكرار الملف.</li>
                <li>إذا كان الرقم جديداً: يتم إنشاء ملف تعريف عميل جديد في جدول customers أولاً، ثم ربط الطلب به.</li>
              </ul>
              <p>في كلتا الحالتين، يتم إنشاء طلب جديد بحالة قيد الانتظار (PENDING) وتوليد كود طلب فريد يبدأ بـ REQ- ويتم تمرير المعاملة لخريطة المناديب للجدولة.</p>
            </div>
            <div className="journey-decision-no">
              <div className="journey-decision-label" style={{ background: '#fce8e6', color: '#d93025' }}>
                <Icon name="cancel" size={20} />
                لا
              </div>
              <p>يتم حفظ الطلب مباشرة بحالة ملغى (CANCELLED)، وتتحول حالة العميل في النظام إلى مؤرشف (archived) وينقل الطلب والعميل إلى الأرشيف لحين تواصل الدعم الفني يدوياً لتحديث موقعه الصحيح.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={6} title="التواصل مع خدمة العملاء (واتساب)" icon="chat" color={roleColor} isLast>
        <p>بما أن العميل النهائي لا يملك حساباً على النظام لتقديم تقييمات، فإنه في حال وجود أي شكوى، توضيح، أو استفسار، يتم توجيهه للتواصل المباشر مع الدعم الفني وخدمة العملاء:</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#e8f5e9', color: '#1b5e20' }}>
              <Icon name="chat" size={20} />
            </div>
            <div>
              <strong>التواصل الفوري عبر الواتساب (WhatsApp)</strong>
              <p>يتم تحويل العميل برابط مباشر إلى رقم خدمة العملاء المعتمد لتقديم الشكاوى أو طلب التوضيحات يدوياً ويقوم الدعم الفني بمتابعتها.</p>
            </div>
          </div>
        </div>
      </JourneyStep>
    </section>
  );
};

export default GuestUserJourney;
