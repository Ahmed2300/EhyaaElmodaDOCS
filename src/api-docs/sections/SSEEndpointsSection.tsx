import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Icon from '../components/Icon';

const sseEndpoints = [
  {
    method: 'GET',
    url: '/api/v1/admin/orders/stream',
    access: 'Sanctum Bearer + manage orders',
    description: 'بث الطلبات النشطة في الوقت الفعلي عند دخولها خط الإنتاج.',
  },
  {
    method: 'GET',
    url: '/api/v1/locations/ranks/stream',
    access: 'Sanctum Bearer + view reports',
    description: 'بث تحديثات التصنيف/الحرارة النشطة لأداء المواقع الجغرافية.',
  },
  {
    method: 'GET',
    url: '/api/v1/locations/agent-report/stream',
    access: 'Sanctum Bearer + view reports',
    description: 'بث وضع المندوبين المباشر وكفاءة التوزيع والقياس عن بعد.',
  },
];

const SSEEndpointsSection: React.FC = () => {
  return (
    <section id="sse-endpoints" className="docs-section">
      <SectionHeader
        icon="stream"
        title="البث المباشر (SSE)"
        description="تدفقات الأحداث من الخادم إلى العميل عبر Server-Sent Events"
      />

      <div className="card">
        <div className="card-title">
          <Icon name="settings_ethernet" size={22} className="card-icon" />
          آلية البث
        </div>
        <p>
          يستخدم النظام تقنية Server-Sent Events (SSE) عبر <code>text/event-stream</code> لدفع مقاييس
          القياس عن بعد إلى العملاء الإداريين في الوقت الفعلي.
        </p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>HTTP</th>
              <th>المسار</th>
              <th>متطلب الوصول</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {sseEndpoints.map((ep, i) => (
              <tr key={i}>
                <td><span className="badge badge-get">{ep.method}</span></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, direction: 'ltr', textAlign: 'left' }}>{ep.url}</td>
                <td style={{ fontSize: 12 }}>{ep.access}</td>
                <td style={{ fontSize: 12 }}>{ep.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SSEEndpointsSection;
