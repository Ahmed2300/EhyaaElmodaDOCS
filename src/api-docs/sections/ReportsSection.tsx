import React from 'react';
import SectionHeader from '../components/SectionHeader';

const reports = [
  {
    method: 'GET',
    url: '/api/v1/reports/performance',
    desc: 'مقاييس أداء المنسقين النشطين.',
  },
  {
    method: 'GET',
    url: '/api/v1/reports/customers',
    desc: 'إحصائيات اكتساب العملاء والتوزيع وخط أنابيب العملاء المتوقعين.',
  },
  {
    method: 'GET',
    url: '/api/v1/reports/system',
    desc: 'مقاييس معالجة المهام الداخلية وقائمة الانتظار.',
  },
  {
    method: 'GET',
    url: '/api/v1/reports/dashboard',
    desc: 'بطاقات نظرة عامة مجمعة (الإيرادات، عدد الطلبات، المندوبين النشطين).',
  },
  {
    method: 'GET',
    url: '/api/v1/reports/profit?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD',
    desc: 'تحليل الربح ووزن التسليم بين تاريخين.',
  },
];

const ReportsSection: React.FC = () => {
  return (
    <section id="reports-endpoints" className="docs-section">
      <SectionHeader
        icon="bar_chart"
        title="تقارير ذكاء الأعمال"
        description="جميع التقارير تتطلب مصادقة Sanctum وصلاحية view reports"
      />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>HTTP</th>
              <th>المسار</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td><span className="badge badge-get">{r.method}</span></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, direction: 'ltr', textAlign: 'left' }}>{r.url}</td>
                <td style={{ fontSize: 12 }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReportsSection;
