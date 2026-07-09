import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';

const FeedbackEndpointsSection: React.FC = () => {
  return (
    <section id="feedback-endpoints" className="docs-section">
      <SectionHeader
        icon="feedback"
        title="ضمان الجودة وتغذية العملاء الراجعة"
        description="تقييم الخدمة وإدارة الشكاوى"
      />

      <EndpointCard
        method="POST"
        url="/api/v1/feedback/rate"
        title="تقييم الخدمة"
        access="محمي"
        permission="submit feedback"
        description="إرسال تقييم رضا العملاء عن الخدمة."
        payload={{
          customer_id: 24,
          rating: 5,
          comment: 'Excellent service',
        }}
        validation={{
          customer_id: 'required | exists:customers,id',
          rating: 'required | integer | min:1 | max:5',
          comment: 'nullable | string',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/feedback/complain"
        title="تقديم شكوى"
        access="محمي"
        permission="submit feedback"
        description="إرسال تذكرة شكوى عميل."
        payload={{
          customer_id: 24,
          subject: 'Delayed Pickup',
          description: "Rep didn't show up on schedule",
          priority: 'high',
        }}
        validation={{
          customer_id: 'required | exists:customers,id',
          subject: 'required | string | max:255',
          description: 'required | string',
          priority: 'nullable | in:low,normal,high,urgent',
        }}
      />
    </section>
  );
};

export default FeedbackEndpointsSection;
