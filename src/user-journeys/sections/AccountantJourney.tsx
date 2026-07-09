import React from 'react';
import SectionHeader from '../../api-docs/components/SectionHeader';
import JourneyStep from '../components/JourneyStep';
import Icon from '../../api-docs/components/Icon';

const AccountantJourney: React.FC = () => {
  const roleColor = '#e37400';

  return (
    <section id="accountant" className="docs-section">
      <SectionHeader icon="account_balance" title="رحلة المحاسب" description="المسؤول عن تصفية العهد المالية للمناديب واعتماد المصروفات" />

      <JourneyStep number={1} title="مراجعة التصفية اليومية للمندوبين" icon="receipt_long" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/expenses', desc: 'قائمة المصروفات اليومية' },
        ]}
      >
        <p>يتابع المحاسب التصفية اليومية المالية لكل مندوب بعد إنهاء يوم العمل:</p>
        <ul className="journey-detail-list">
          <li>مراجعة إجمالي الأوزان المشتراة وتكلفة الشراء لكل مندوب</li>
          <li>التحقق من المصروفات اليومية المسجلة (مصروف السيارة، يومية المندوب، يومية المساعد، مصروفات أخرى)</li>
          <li>مقارنة المجموع الإجمالي المخصوم من العهد مع التفاصيل المرفوعة</li>
        </ul>
      </JourneyStep>

      <JourneyStep number={2} title="تدقيق الفواتير والإيصالات المرفوعة" icon="verified" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/expenses', desc: 'مراجعة المصروفات والمرفقات' },
        ]}
      >
        <p>يقوم المحاسب بالتحقق من الفواتير والإيصالات المرفوعة من قبل المندوبين:</p>
        <div className="journey-verification-steps">
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon name="image" size={20} className="journey-verify-icon" />
            </div>
            <div>
              <strong>فحص صور الإيصالات</strong>
              <p>مراجعة صور الإيصالات المرفوعة عبر تطبيق المندوب للتحقق من صحة المشتريات والمبالغ المصروفة.</p>
            </div>
          </div>
          <div className="journey-verify-item">
            <div className="journey-verify-icon" style={{ background: '#fff3e0', color: '#e65100' }}>
              <Icon name="fact_check" size={20} className="journey-verify-icon" />
            </div>
            <div>
              <strong>المطابقة والاعتماد</strong>
              <p>مطابقة الفواتير مع المصروفات المسجلة واعتمادها رسمياً في النظام المحاسبي.</p>
            </div>
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={3} title="تسويه العهد دفترياً" icon="balance" color={roleColor}>
        <p>بعد اعتماد الفواتير، يقوم المحاسب بتسوية عهد المندوبين دفترياً:</p>
        <div className="journey-resolution" style={{ background: '#fef7e0' }}>
          <Icon name="sync_alt" size={20} className="journey-resolution-icon" style={{ color: '#e37400' }} />
          <div>
            <strong>التسوية:</strong> يراجع المحاسب التصفية المالية لكل مندوب ويتأكد من خصم المبالغ الصحيحة (تكلفة الملابس + المصروفات) من عهدتهم. يقرر قيمة شحن العهد للمندوب لليوم التالي بناءً على التحليل.
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={4} title="تسجيل المبيعات وإدارة المخازن" icon="warehouse" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/admin/inventory/summary', desc: 'التحقق من رصيد المخزن والداخل والخارج' },
          { method: 'POST', path: '/api/v1/admin/sales', desc: 'تسجيل مبيعات المشترين وتعديل المخزن' },
        ]}
      >
        <p>يقوم المحاسب بتسجيل حركة المبيعات وتدقيق المخزون:</p>
        <ul className="journey-detail-list">
          <li>تسجيل مبيعات الملابس بالكيلو للمشترين الخارجيين المعتمدين في النظام بالأسعار والأوزان المباعة</li>
          <li>التأكد من عدم بيع أي أوزان تتجاوز المتاح فعلياً في رصيد المخزن لتجنب وقوع عجز دفتري</li>
          <li>مراجعة حركات الهالك والاستبعاد الإداري للملابس التالفة لتحديث الرصيد الفعلي للمستودع</li>
        </ul>
      </JourneyStep>

      <JourneyStep number={5} title="مراقبة سجل الحركة المالي العام (General Ledger)" icon="history_edu" color={roleColor}
        apiCalls={[
          { method: 'GET', path: '/api/v1/admin/accounting/ledger', desc: 'سجل العمليات المالي الموحد' },
        ]}
      >
        <p>مراجعة شاملة لدفتر اليومية الموحد لضمان حماية وسلامة الحسابات:</p>
        <div className="journey-resolution" style={{ background: '#e8f5e9' }}>
          <Icon name="verified" size={20} className="journey-resolution-icon" style={{ color: '#1e8e3e' }} />
          <div>
            <strong>التدقيق الموحد:</strong> مطابقة كافة التحويلات النقدية (شحن العهد، استقطاع المشتريات، المبيعات الخارجية، ومصروفات الشركة والمناديب) في سجل عمليات غير قابل للحذف أو التعديل لكشف التناقضات.
          </div>
        </div>
      </JourneyStep>

      <JourneyStep number={6} title="تحليل الربحية الكلية" icon="analytics" color={roleColor} isLast
        apiCalls={[
          { method: 'GET', path: '/api/v1/reports/profit', desc: 'تحليل الربح بين تاريخين' },
        ]}
      >
        <p>يحلل المحاسب ربحية العمليات عبر تقارير متخصصة:</p>
        <ul className="journey-detail-list">
          <li>مقارنة إجمالي تكاليف الشراء مقابل أسعار التوصيل والمبيعات للمشترين</li>
          <li>تحليل الوزن الإجمالي الذي تم توصيله ومقارنته بالمبيعات والمصروفات العامة والتشغيلية</li>
          <li>تصفية التقارير حسب الفترات الزمنية للتأكد من هوامش الربح وصافي الأرباح النهائية للمشروع</li>
        </ul>
      </JourneyStep>
    </section>
  );
};

export default AccountantJourney;
