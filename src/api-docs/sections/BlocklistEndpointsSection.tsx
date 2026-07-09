import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';

const BlocklistEndpointsSection: React.FC = () => {
  return (
    <section id="blocklist-endpoints" className="docs-section">
      <SectionHeader
        icon="block"
        title="مكافحة البريد المزعج وقوائم الحظر"
        description="منع الطلبات العامة من جهات الاتصال الاحتيالية"
      />

      <EndpointCard
        method="POST"
        url="/api/v1/blocklist"
        title="إضافة إلى قائمة الحظر"
        access="محمي"
        permission="manage customers"
        description="حظر جهات الاتصال الاحتيالية لمنع الطلبات العامة."
        payload={{
          whatsapp_number: '01000000000',
          reason: 'Spam orders verified via GPS bounds',
          is_permanent: true,
        }}
        validation={{
          whatsapp_number: 'required | string',
          reason: 'required | string | max:255',
          is_permanent: 'boolean',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/blocklist"
        title="قائمة الحظر"
        access="محمي"
        permission="manage customers"
        description="عرض جميع السجلات المحظورة."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/blocklist/{id}/unblock"
        title="إلغاء حظر"
        access="محمي"
        permission="manage customers"
        description="إزالة جهة اتصال من قائمة الحظر."
      />
    </section>
  );
};

export default BlocklistEndpointsSection;
