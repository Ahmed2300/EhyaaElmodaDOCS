import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';

const ZoneEndpointsSection: React.FC = () => {
  return (
    <section id="zone-endpoints" className="docs-section">
      <SectionHeader
        icon="pin_drop"
        title="المناطق الجغرافية ومناطق VIP والرفض"
        description="إدارة الحدود الجغرافية المسيجة"
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#202124' }}>مناطق VIP</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/vip-zones"
        title="تسجيل منطقة VIP"
        access="محمي"
        permission="manage core"
        description="تسجيل حدود جغرافية ذات أولوية عالية."
        payload={{
          name: 'Maadi VIP North',
          priority_score: 10,
          is_active: true,
          polygon: [
            { lat: 30.0123, lng: 31.2345 },
            { lat: 30.0234, lng: 31.2456 },
            { lat: 30.0345, lng: 31.2345 },
            { lat: 30.0123, lng: 31.2345 },
          ],
        }}
        validation={{
          name: 'required | string | max:255',
          polygon: 'required | array',
          'polygon.*': 'required | array',
          'polygon.*.lat': 'required | numeric',
          'polygon.*.lng': 'required | numeric',
          priority_score: 'nullable | integer',
          is_active: 'boolean',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/vip-zones/evaluate/reevaluate"
        title="تقييم مناطق VIP"
        access="محمي"
        description="تشغيل مهمة خلفية لربط جميع مواقع العملاء والطلبات بمناطق VIP. يعيد job_uuid لتتبع التقدم."
      />

      <EndpointCard
        method="GET"
        url="/api/v1/vip-zones/evaluate/reevaluation-progress/{uuid}"
        title="حالة التقييم"
        access="محمي"
        description="سحب مقاييس التقدم (الإجمالي، المعالج، الحالة) لمهمة إعادة التقييم."
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>مناطق الرفض</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/reject-zones"
        title="إنشاء منطقة رفض"
        access="محمي"
        permission="manage reject zones"
        description="إنشاء مناطق محظورة للتوصيل بسبب قيود أمنية أو لوجستية."
        payload={{
          name: 'Zone Name',
          polygon: [{ lat: 30.0123, lng: 31.2345 }],
          is_active: true,
        }}
        validation={{
          name: 'required | string | max:255',
          polygon: 'required | array',
          'polygon.*': 'required | array',
          'polygon.*.lat': 'required | numeric',
          'polygon.*.lng': 'required | numeric',
          is_active: 'boolean',
        }}
      />
    </section>
  );
};

export default ZoneEndpointsSection;
