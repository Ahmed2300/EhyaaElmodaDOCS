import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';

const TrackingEndpointsSection: React.FC = () => {
  return (
    <section id="tracking-endpoints" className="docs-section">
      <SectionHeader
        icon="my_location"
        title="التتبع الفوري ونظام تحديد المواقع"
        description="تسجيل موقع المندوبين في الوقت الفعلي"
      />

      <EndpointCard
        method="POST"
        url="/api/v1/tracking/log"
        title="تسجيل موقع"
        access="محمي"
        description="نقطة نهاية تسجيل GPS المستمر للمندوبين الميدانيين."
        payload={{
          lat: 30.0444,
          long: 31.2357,
          metadata: {
            speed_kmh: 22.4,
            battery_percentage: 78,
          },
        }}
        validation={{
          lat: 'required | numeric',
          long: 'required | numeric',
          metadata: 'nullable | array',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/tracking/history/{userId}"
        title="سجل التتبع"
        access="محمي"
        description="سحب سجلات التتبع لعرض مسارات المندوبين."
      />
    </section>
  );
};

export default TrackingEndpointsSection;
