import React from 'react';
import SectionHeader from '../components/SectionHeader';
import EndpointCard from '../components/EndpointCard';

const AuthEndpointsSection: React.FC = () => {
  return (
    <section id="auth-endpoints" className="docs-section">
      <SectionHeader
        icon="login"
        title="المصادقة وإدارة المشرفين"
        description="نقاط نهاية المصادقة وإدارة حسابات المشرفين"
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#202124' }}>المصادقة</h3>

      <EndpointCard
        method="POST"
        url="/api/v1/auth/login"
        title="تسجيل الدخول"
        access="عام"
        description="مصادقة المستخدمين (مشرفين، منسقين، مندوبين) وإصدار توكن Sanctum."
        payload={{
          email: 'admin@crm.com',
          password: 'password',
        }}
        validation={{
          email: 'required | email',
          password: 'required',
        }}
      />

      <EndpointCard
        method="POST"
        url="/api/v1/auth/logout"
        title="تسجيل الخروج"
        access="محمي"
        description="إلغاء توكن الجلسة الحالية."
      />

      <EndpointCard
        method="GET"
        url="/api/v1/auth/me"
        title="الملف الشخصي"
        access="محمي"
        description="استرجاع معلومات الملف الشخصي والدور والصلاحيات."
      />

      <EndpointCard
        method="PUT"
        url="/api/v1/auth/me"
        title="تحديث الملف الشخصي"
        access="محمي"
        description="تحديث بيانات الملف الشخصي (الاسم، البريد الإلكتروني، كلمة المرور)."
        payload={{
          name: 'New Name',
          email: 'new@test.com',
          password: 'newpassword',
          password_confirmation: 'newpassword',
        }}
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>إدارة الأدوار والصلاحيات</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/roles"
        title="قائمة الأدوار"
        access="محمي"
        permission="manage roles"
        description="عرض قائمة الأدوار."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/roles"
        title="إنشاء دور"
        access="محمي"
        permission="manage roles"
        description="إنشاء دور جديد."
        payload={{ name: 'new_role', permissions: ['manage orders', 'view locations'] }}
        validation={{
          name: 'required | string | unique:roles,name',
          'permissions': 'nullable | array',
          'permissions.*': 'exists:permissions,name',
        }}
      />

      <EndpointCard
        method="GET"
        url="/api/v1/admin/permissions"
        title="قائمة الصلاحيات"
        access="محمي"
        permission="manage permissions"
        description="عرض صلاحيات النظام."
      />

      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '24px 0 12px', color: '#202124' }}>إدارة المشرفين</h3>

      <EndpointCard
        method="GET"
        url="/api/v1/admin/admins"
        title="قائمة المشرفين"
        access="محمي"
        permission="manage admins"
        description="عرض قائمة المشرفين."
      />

      <EndpointCard
        method="POST"
        url="/api/v1/admin/admins"
        title="إنشاء مشرف"
        access="محمي"
        permission="manage admins"
        description="إنشاء مشرف جديد."
        payload={{ name: 'Admin Name', email: 'admin@test.com', password: 'password', role: 'super-admin' }}
        validation={{
          name: 'required | string | max:255',
          email: 'required | email | unique:users,email',
          password: 'required | string | min:8',
          role: 'required | exists:roles,name',
          financial_imprest: 'nullable | numeric | min:0',
        }}
      />

      <EndpointCard
        method="PATCH"
        url="/api/v1/admin/admins/{id}/status"
        title="تبديل حالة المشرف"
        access="محمي"
        permission="manage admins"
        description="تبديل حالة المشرف بين نشط ومعطل."
      />

      <EndpointCard
        method="DELETE"
        url="/api/v1/admin/admins/{id}"
        title="حذف مشرف"
        access="محمي"
        permission="manage admins"
        description="حذف ناعم لحساب المشرف."
      />
    </section>
  );
};

export default AuthEndpointsSection;
