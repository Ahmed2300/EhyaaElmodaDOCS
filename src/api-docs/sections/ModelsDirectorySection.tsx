import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Icon from '../components/Icon';

interface Attribute {
  field: string;
  type: string;
  desc: string;
}

interface RoleMap {
  role: string;
  permissions: string;
}

interface ModelSection {
  id: string;
  icon: string;
  name: string;
  entity: string;
  table: string;
  traits?: string;
  attributes: Attribute[];
  roles: RoleMap[];
}

const models: ModelSection[] = [
  {
    id: 'model-users',
    icon: 'people',
    name: 'المستخدمين الموظفين',
    entity: 'App\\Models\\User',
    table: 'users',
    attributes: [
      { field: 'id', type: 'BigInteger (PK, Auto-increment)', desc: 'المعرّف الفريد للموظف' },
      { field: 'name', type: 'String', desc: 'اسم الموظف الثنائي أو الكامل' },
      { field: 'email', type: 'String (Unique)', desc: 'البريد الإلكتروني للموظف (يُستخدم لتسجيل الدخول)' },
      { field: 'password', type: 'String', desc: 'كلمة المرور المشفرة (بصيغة Bcrypt/Argon2)' },
      { field: 'financial_imprest', type: 'Decimal (8,2) - Default: 0.00', desc: 'رصيد العهدة النقدية المتاحة للمندوب لشراء الملابس من الشارع' },
      { field: 'role', type: 'String (Spatie Assignment)', desc: 'الدور الأساسي للموظف (super_admin, agent, technical_support, accountant)' },
      { field: 'status', type: 'Boolean - Default: true', desc: 'حالة نشاط الحساب الوظيفي (نشط / معطل)' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'صلاحيات كاملة (CRUD). يملك الحصري لإنشاء الحسابات، وتعيين الأدوار، وتفعيل/تعطيل الموظفين، وضخ أو تعديل رصيد العهدة financial_imprest.' },
      { role: 'المحاسب (Accountant)', permissions: 'قراءة فقط للمناديب ومراجعة عهدهم المالية، وإجراء شحن المحافظ.' },
      { role: 'الدعم الفني (Technical Support)', permissions: 'قراءة فقط.' },
      { role: 'المندوب (Field Agent)', permissions: 'قراءة فقط لملف حسابه الشخصي؛ ويتم تصفية رصيد عهدته تلقائياً عند الإغلاق اليومي.' },
    ],
  },
  {
    id: 'model-customers',
    icon: 'person',
    name: 'العملاء',
    entity: 'Modules\\Customers\\Models\\Customer',
    table: 'customers',
    traits: 'LogsActivity (تدقيق العمليات), InteractsWithMedia (رفع المرفقات)',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'المعرّف الفريد للعميل' },
      { field: 'customer_code', type: 'String (Unique)', desc: 'كود العميل الفريد المتولد تلقائياً (مثال: CUST-00214)' },
      { field: 'name', type: 'String (Nullable)', desc: 'اسم العميل (اختياري)' },
      { field: 'phone', type: 'String (Encrypted)', desc: 'رقم هاتف العميل (يتم تشفيره بـ AES-256 قبل الحفظ لحماية الخصوصية)' },
      { field: 'phone_hash', type: 'String (Index)', desc: 'بصمة SHA-256 للرقم للبحث السريع المطابق وتجنب فك التشفير' },
      { field: 'whatsapp', type: 'String (Nullable)', desc: 'رقم الواتساب المباشر للعميل' },
      { field: 'google_maps_link', type: 'Text (Nullable)', desc: 'رابط الخرائط المقدم أو المستخرج' },
      { field: 'lat', type: 'Decimal (10,8) - Nullable', desc: 'خط العرض الجغرافي المسجل لموقع العميل' },
      { field: 'long', type: 'Decimal (11,8) - Nullable', desc: 'خط الطول الجغرافي المسجل لموقع العميل' },
      { field: 'address', type: 'Text (Nullable)', desc: 'العنوان النصي التفصيلي المكتوب' },
      { field: 'governorate_id', type: 'ForeignKey (Nullable)', desc: 'محافظ العميل (يربط بـ governorates.id)' },
      { field: 'district_id', type: 'ForeignKey (Nullable)', desc: 'الحي/المركز التابع له العميل (يربط بـ districts.id)' },
      { field: 'importance_score', type: 'Integer (Nullable)', desc: 'تقييم الأهمية الجغرافية المستخرج بالذكاء الاصطناعي (0-9)' },
      { field: 'classification', type: 'String', desc: 'تصنيف العميل الجغرافي (High / Medium / Low Priority)' },
      { field: 'ai_classification_reasoning', type: 'Text (Nullable)', desc: 'التحليل والسبب الجغرافي المقدم من الذكاء الاصطناعي' },
      { field: 'trust_score', type: 'Integer - Default: 100', desc: 'مؤشر موثوقية العميل (يقل في حال تقديم طلبات كاذبة)' },
      { field: 'evaluation_method', type: 'String (Nullable)', desc: 'طريقة التقييم الجغرافي المتبعة (GRID_AI, VIP_ZONE, REJECT_ZONE)' },
      { field: 'status', type: "String - Default: 'new'", desc: 'حالة lifecycle العميل الحالية (new, active, rejected, archived)' },
      { field: 'sales_status', type: 'String (Nullable)', desc: 'حالة التواصل البيعي الحالية للعميل' },
      { field: 'assigned_rep_id', type: 'ForeignKey (Nullable)', desc: 'المندوب المفضل المعين للعميل (يربط بـ users.id)' },
      { field: 'created_by', type: 'ForeignKey (Nullable)', desc: 'منشئ الحساب (أدمن أو لوحة الدخول) (يربط بـ users.id)' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'صلاحيات كاملة (CRUD)، والتحكم الجماعي بالذكاء الاصطناعي، ومراجعة سجل التعديلات بالكامل.' },
      { role: 'الدعم الفني (Technical Support)', permissions: 'صلاحيات كاملة للتحديث والاستيراد الجماعي للعملاء وملفاتهم ومعالجة طلبات التعديل الجغرافي.' },
      { role: 'المندوب (Field Agent)', permissions: 'قراءة فقط للمعلومات الأساسية لإجراء الاتصال أو بدء التوجه للزيارة. يملك فقط صلاحية تغيير حالة العميل لـ "مؤرشف" أو تفعيل وسام "عميل مميز" عند إنهاء الطلب.' },
      { role: 'العميل (Guest)', permissions: 'صلاحية إنشاء ملف حسابه الخاص فقط لأول مرة عبر الاستمارة العامة.' },
    ],
  },
  {
    id: 'model-orders',
    icon: 'inventory_2',
    name: 'الطلبات / الأوردرات',
    entity: 'Modules\\Order\\Models\\Order',
    table: 'orders',
    traits: 'LogsActivity, SoftDeletes',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'المعرّف الفريد للطلب' },
      { field: 'request_code', type: 'String (Unique)', desc: 'كود الطلب اللوجستي الفريد (مثال: REQ-000024)' },
      { field: 'customer_id', type: 'ForeignKey', desc: 'العميل صاحب الطلب (يربط بـ customers.id)' },
      { field: 'weight', type: 'Float (Nullable)', desc: 'وزن الملابس الكلي المستلم فعلياً بعد التصفية' },
      { field: 'buying_price', type: 'Decimal (8,2) - Nullable', desc: 'إجمالي المبلغ المالي المدفوع لشراء الملابس من العميل' },
      { field: 'delivery_price', type: 'Decimal (8,2) - Nullable', desc: 'تكلفة التوصيل/النقل المحسوبة للعملية' },
      { field: 'pick_up_coordinates', type: 'JSON / Array', desc: 'الإحداثيات الجغرافية المحددة لهذا الطلب (خط الطول والعرض)' },
      { field: 'address', type: 'Text (Nullable)', desc: 'العنوان المحدد لتنفيذ الطلب الحالي' },
      { field: 'location_details', type: 'JSON (Nullable)', desc: 'تفاصيل التحليل والترميز الجغرافي الخاص بموقع الطلب' },
      { field: 'user_id', type: 'ForeignKey (Nullable)', desc: 'المندوب الموكل إليه تنفيذ الطلب (يربط بـ users.id)' },
      { field: 'status', type: 'Integer (OderStatus Enum)', desc: 'حالة الطلب اللوجستية (من 0 قيد الانتظار إلى 9 مؤجل وإعادة جدولة)' },
      { field: 'is_vip', type: 'Boolean - Default: false', desc: 'هل الطلب نشأ داخل نطاق جغرافي VIP أم لا' },
      { field: 'terms_accepted', type: 'Boolean - Default: true', desc: 'تأكيد موافقة العميل على البنود والخصوصية' },
      { field: 'terms_accepted_at', type: 'DateTime (Nullable)', desc: 'تاريخ ووقت قبول شروط الطلب' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'صلاحيات كاملة (CRUD). وجدولة وإسناد الطلبات للمناديب يدوياً.' },
      { role: 'المندوب (Field Agent)', permissions: 'استعراض خريطة الطلبات غير المسندة، والتحكم بعملية "الإسناد الذاتي" للطلبات المناسبة لنطاقه، وتحديث حالة الطلب إلى "تم الاستلام" وإدخال الوزن الحقيقي بعد معاينة الملابس.' },
      { role: 'المحاسب (Accountant)', permissions: 'مراجعة قيمة المشتريات الإجمالية ومطابقتها مع الأوزان المسجلة لتسوية العهد المالية.' },
      { role: 'العميل (Guest)', permissions: 'إنشاء طلبات الشراء الجديدة بحالة PENDING تلقائياً عبر الاستمارة.' },
    ],
  },
  {
    id: 'model-plans',
    icon: 'route',
    name: 'خطط السير اليومية',
    entity: 'Modules\\Planning\\Models\\Plan',
    table: 'plans',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف الخطة اليومية' },
      { field: 'user_id', type: 'ForeignKey', desc: 'المندوب صاحب الخطة (يربط بـ users.id)' },
      { field: 'date', type: 'Date', desc: 'تاريخ اليوم التشغيلي للخطة (يُسمح به لليوم التالي غداً فقط)' },
      { field: 'status', type: "String - Default: 'pending'", desc: 'حالة العمل للخطة اليومية (pending, in_progress, completed, cancelled)' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'إنشاء وتعديل وإلغاء وإسناد الخطط للمناديب.' },
      { role: 'المندوب (Field Agent)', permissions: 'استعراض خطته الخاصة لليوم الحالي، وتأكيد إنهاء يوم العمل ليقوم النظام تلقائياً بتغيير حالة الخطة إلى completed.' },
    ],
  },
  {
    id: 'model-plan-items',
    icon: 'checklist',
    name: 'عناصر خطة السير',
    entity: 'Modules\\Planning\\Models\\PlanItem',
    table: 'plan_items',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف الزيارة المحدد' },
      { field: 'plan_id', type: 'ForeignKey', desc: 'الخطة التابع لها هذا العنصر (يربط بـ plans.id)' },
      { field: 'customer_id', type: 'ForeignKey', desc: 'العميل المراد زيارته (يربط بـ customers.id)' },
      { field: 'order_id', type: 'ForeignKey (Required)', desc: 'الطلب المحدد المراد تجميعه في هذه الزيارة (يربط بـ orders.id)' },
      { field: 'check_in', type: 'DateTime (Nullable)', desc: 'تاريخ ووقت وصول المندوب الفعلي وبدء الزيارة في الميدان' },
      { field: 'check_out', type: 'DateTime (Nullable)', desc: 'تاريخ ووقت مغادرة المندوب وإتمام الزيارة بنجاح' },
      { field: 'status', type: "String - Default: 'pending'", desc: 'حالة الزيارة الفردية (pending, visited, completed, cancelled)' },
      { field: 'notes', type: 'Text (Nullable)', desc: 'ملاحظات المندوب المكتوبة أثناء الزيارة الميدانية' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'بناء جدول الزيارات وتعديله يدوياً.' },
      { role: 'المندوب (Field Agent)', permissions: 'تحديث حقول التاريخ والوقت (check_in, check_out) وتأكيد إتمام الزيارة وكتابة الملاحظات الميدانية.' },
    ],
  },
  {
    id: 'model-expenses',
    icon: 'receipt',
    name: 'المصروفات المالية',
    entity: 'Modules\\Financial\\Models\\Expense',
    table: 'expenses',
    traits: 'InteractsWithMedia (لرفع صور الفواتير كـ bill)',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف المصروف الفردي' },
      { field: 'user_id', type: 'ForeignKey', desc: 'المندوب الذي سجل المصروف (يربط بـ users.id)' },
      { field: 'amount', type: 'Decimal (8,2)', desc: 'القيمة المالية للمصروف بالعملة المعتمدة' },
      { field: 'title', type: 'String', desc: 'عنوان المصروف الأساسي (مثال: "بنزين 92"، "يومية مساعد")' },
      { field: 'description', type: 'Text (Nullable)', desc: 'الشرح والتفصيل لسبب الصرف' },
      { field: 'date', type: 'Date', desc: 'تاريخ إدخال وصرف القيمة المالية' },
    ],
    roles: [
      { role: 'المندوب (Field Agent)', permissions: 'صلاحية إنشاء (تسجيل) المصاريف الميدانية ورفع الفاتورة الرقمية المرفقة كصورة.' },
      { role: 'المحاسب (Accountant)', permissions: 'مراجعة المصروفات والموافقة عليها أو رفضها لتصفية العهد دفترياً.' },
      { role: 'المشرف العام (Super Admin)', permissions: 'قراءة ومراجعة إجمالي المصروفات في مركز تقارير الأرباح.' },
    ],
  },
  {
    id: 'model-zones',
    icon: 'pin_drop',
    name: 'النطاقات الجغرافية VIP والرفض',
    entity: 'VipZone / RejectZone',
    table: 'vip_zones / reject_zones',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف النطاق' },
      { field: 'name', type: 'String', desc: 'اسم النطاق الجغرافي التوضيحي (مثال: "المعادي VIP الشمالية")' },
      { field: 'polygon', type: 'JSON / Array', desc: 'الإحداثيات الجغرافية الكاملة للمضلع (خطوط الطول والعرض للرؤوس)' },
      { field: 'priority_score', type: 'Integer - Default: 0', desc: 'نقاط الأولوية الخاصة بالمنطقة (خاص بـ vip_zones فقط لرفع أولوية الاستلام)' },
      { field: 'is_active', type: 'Boolean - Default: true', desc: 'حالة نشاط المنطقة (تفعيل / إيقاف التقييم التلقائي بها)' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'الصلاحية الكاملة الحصرية (CRUD) لرسم وحذف وتعديل مضلعات النطاقات الجغرافية على الخريطة.' },
      { role: 'الأدوار الأخرى', permissions: 'لا تملك حق الوصول المباشر لهذه النماذج، ويتم استخدامها داخلياً لمعالجة طلبات العملاء.' },
    ],
  },


  {
    id: 'model-blocked',
    icon: 'gavel',
    name: 'قائمة العملاء المحظورين',
    entity: 'Modules\\Customers\\Models\\BlockedCustomer',
    table: 'blocked_customers',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف سجل الحظر' },
      { field: 'whatsapp_hash', type: 'String (Unique)', desc: 'بصمة SHA-256 لهاتف الواتساب المحظور لتجنب تكراره والتحقق الفوري' },
      { field: 'whatsapp_encrypted', type: 'String', desc: 'الهاتف الفعلي مشفراً للرجوع إليه يدوياً من الأدمن' },
      { field: 'block_reason', type: 'String', desc: 'سبب الحظر (سواء تلاعب بالإحداثيات أو إلغاء متكرر)' },
      { field: 'blocked_by', type: 'String', desc: 'من قام بالحظر (سواء الأدمن يدوياً أو النظام تلقائياً)' },
      { field: 'attempts_count', type: 'Integer - Default: 0', desc: 'عدد محاولات العميل لتقديم طلب جديد أثناء حظره' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'صلاحية حظر أو فك حظر الأرقام يدوياً والاطلاع على قائمة الحظر.' },
    ],
  },
  {
    id: 'model-locations',
    icon: 'my_location',
    name: 'التتبع الجغرافي للمناديب',
    entity: 'Modules\\Tracking\\Models\\UserLocation',
    table: 'user_locations',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف السجل الجغرافي' },
      { field: 'user_id', type: 'ForeignKey', desc: 'المندوب الذي تم التقاط موقعه (يربط بـ users.id)' },
      { field: 'lat', type: 'Decimal (10,8)', desc: 'خط العرض الحالي للمندوب' },
      { field: 'long', type: 'Decimal (11,8)', desc: 'خط الطول الحالي للمندوب' },
      { field: 'metadata', type: 'JSON (Nullable)', desc: 'بيانات إضافية (مثل سرعة المندوب ونسبة البطارية)' },
    ],
    roles: [
      { role: 'المندوب (Field Agent)', permissions: 'يقوم تطبيقه تلقائياً في الخلفية بإرسال إحداثياته الحالية.' },
      { role: 'المشرف العام (Super Admin)', permissions: 'الاطلاع الفوري على تحركات الكباتن وتتبع تاريخ حركاتهم الجغرافية.' },
    ],
  },
  {
    id: 'model-grids',
    icon: 'grid_on',
    name: 'تقييمات الشبكة بالذكاء الاصطناعي',
    entity: 'Modules\\Core\\Models\\AiEvaluatedGrid',
    table: 'ai_evaluated_grids',
    attributes: [
      { field: 'grid_id', type: 'String (PK)', desc: 'المعرف الجغرافي الفريد للشبكة' },
      { field: 'score', type: 'Integer', desc: 'تقييم الأهمية الجغرافية المستخرج بالذكاء الاصطناعي (0-9)' },
      { field: 'reason', type: 'Text', desc: 'التحليل والسبب الجغرافي المقدم من الذكاء الاصطناعي' },
      { field: 'center_lat', type: 'Decimal (10,8)', desc: 'خط العرض الجغرافي لمركز الشبكة' },
      { field: 'center_lng', type: 'Decimal (11,8)', desc: 'خط الطول الجغرافي لمركز الشبكة' },
      { field: 'expires_at', type: 'DateTime', desc: 'تاريخ انتهاء صلاحية التقييم للتحديث التلقائي' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'قراءة وتحديث التقييمات الجغرافية وإطلاق عمليات المسح الذكي.' },
    ],
  },
  {
    id: 'model-governorates',
    icon: 'map',
    name: 'المحافظات والمناطق',
    entity: 'Modules\\Core\\Models\\Governorate / District',
    table: 'governorates / districts',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف المنطقة/المحافظة' },
      { field: 'name', type: 'String (Translatable)', desc: 'الاسم المترجم للمنطقة/المحافظة' },
      { field: 'boundary', type: 'Polygon / Geometry', desc: 'الحدود الجغرافية للمنطقة/المحافظة للمقارنة المكانية' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'تحديد حدود المحافظات والمراكز التابعة لها للترميز الجغرافي التلقائي.' },
    ],
  },
  {
    id: 'model-settings',
    icon: 'settings',
    name: 'الإعدادات العامة للنظام',
    entity: 'Modules\\Core\\Models\\Setting',
    table: 'settings',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف الإعداد' },
      { field: 'key', type: 'String (Unique)', desc: 'مفتاح الإعداد الفريد' },
      { field: 'value', type: 'Text / JSON', desc: 'قيمة الإعداد المسجلة' },
      { field: 'type', type: 'String', desc: 'نوع الإعداد (text, json, boolean)' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'تحديث قيم الإعدادات والتحكم بالمعايير العامة للنظام.' },
    ],
  },
  {
    id: 'model-sales',
    icon: 'sell',
    name: 'سجل المبيعات للمشترين',
    entity: 'Modules\\Accounting\\Models\\Sale',
    table: 'sales',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف المبيعات' },
      { field: 'buyer_id', type: 'ForeignKey', desc: 'المشتري المستلم للشحنة (يربط بـ buyers.id)' },
      { field: 'weight', type: 'Decimal (8,2)', desc: 'الوزن الإجمالي المبيع بالكيلوجرام' },
      { field: 'selling_price_per_kg', type: 'Decimal (8,2)', desc: 'سعر البيع المعتمد للكيلوجرام' },
      { field: 'total_amount', type: 'Decimal (10,2)', desc: 'إجمالي قيمة المبيعات (الوزن × السعر)' },
      { field: 'notes', type: 'String (Nullable)', desc: 'أي ملاحظات إضافية حول شحنة البيع' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'الاطلاع على قائمة المبيعات وإدخال فواتير بيع جديدة.' },
      { role: 'المحاسب (Accountant)', permissions: 'تسجيل مبيعات الجملة ومطابقتها مع الوزن الفعلي الصادر من المخزن.' },
    ],
  },
  {
    id: 'model-buyers',
    icon: 'storefront',
    name: 'المشترون الخارجيون',
    entity: 'Modules\\Accounting\\Models\\Buyer',
    table: 'buyers',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف المشتري' },
      { field: 'name', type: 'String', desc: 'اسم جهة الشراء الخارجية أو المصنع' },
      { field: 'phone', type: 'String', desc: 'رقم هاتف جهة التواصل' },
      { field: 'is_default', type: 'Boolean - Default: false', desc: 'مؤشر يحدد ما إذا كان هذا المشتري هو المشتري الافتراضي' },
      { field: 'notes', type: 'Text (Nullable)', desc: 'ملاحظات إضافية أو تفاصيل التعاقد' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'إدارة المشترين (إضافة وتعديل وحذف) وتعيين المشتري الافتراضي.' },
      { role: 'المحاسب (Accountant)', permissions: 'عرض قائمة المشترين لاختيارهم أثناء تحرير فواتير البيع.' },
    ],
  },
  {
    id: 'model-corporate-expenses',
    icon: 'corporate_fare',
    name: 'المصروفات العامة للشركة',
    entity: 'Modules\\Accounting\\Models\\CorporateExpense',
    table: 'corporate_expenses',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف المصروف العام' },
      { field: 'category', type: 'String', desc: 'نوع المصروف العام (rent, salaries, marketing, utilities, other)' },
      { field: 'amount', type: 'Decimal (10,2)', desc: 'قيمة المصروف المدفوعة' },
      { field: 'description', type: 'Text', desc: 'تفاصيل الصرف الإدارية والإيضاحات' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'إضافة ومتابعة المصروفات العامة للمشروع وتعديلها.' },
      { role: 'المحاسب (Accountant)', permissions: 'تسجيل المصاريف الإدارية وتصفيتها دفترياً من حساب الأرباح.' },
    ],
  },
  {
    id: 'model-financial-ledger',
    icon: 'history_edu',
    name: 'سجل الحركة المالي الموحد (الدفتر العام)',
    entity: 'Modules\\Accounting\\Models\\FinancialLedger',
    table: 'financial_ledgers',
    attributes: [
      { field: 'id', type: 'BigInteger (PK)', desc: 'معرّف الحركة المالية' },
      { field: 'user_id', type: 'ForeignKey', desc: 'من قام بإجراء الحركة (يربط بـ users.id)' },
      { field: 'type', type: 'Enum', desc: 'نوع العملية (imprest_add, imprest_deduct, sale, purchase, expense)' },
      { field: 'amount', type: 'Decimal (10,2)', desc: 'المبلغ المالي للحركة' },
      { field: 'balance_after', type: 'Decimal (12,2)', desc: 'رصيد الصندوق/الخزنة الفعلي بعد اكتمال الحركة' },
      { field: 'description', type: 'String', desc: 'وصف تفصيلي مبسط لسبب الحركة' },
    ],
    roles: [
      { role: 'المشرف العام (Super Admin)', permissions: 'قراءة سجل العمليات المالي الموحد بالكامل للتدقيق.' },
      { role: 'المحاسب (Accountant)', permissions: 'مراجعة وتدقيق الحركات التاريخية للدفتر العام ومطابقة الأرصدة.' },
    ],
  },
];

const ModelsDirectorySection: React.FC = () => {
  return (
    <section id="models-directory" className="docs-section">
      <SectionHeader
        icon="account_tree"
        title="معجم النماذج الحاكمة للبيانات وقواعد الصلاحيات"
        description="دليل هيكلية قاعدة البيانات وتوزيع الأدوار - جميع الـ Models مع الحقول والخصائص وعلاقة كل نموذج بالأدوار المختلفة"
      />

      {models.map((model, idx) => (
        <div key={model.id} id={model.id} className="card" style={{ marginTop: 32, borderRight: `3px solid #1a73e8` }}>
          <div className="card-title" style={{ marginBottom: 4 }}>
            <Icon name={model.icon} size={22} className="card-icon" />
            <span>{idx + 1}. {model.name}</span>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#5f6368' }}>
              <strong>الكيان البرمجي:</strong>{' '}
              <code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{model.entity}</code>
            </div>
            <div style={{ fontSize: 12, color: '#5f6368' }}>
              <strong>الجدول:</strong>{' '}
              <code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{model.table}</code>
            </div>
          </div>

          {model.traits && (
            <div style={{ fontSize: 12, color: '#5f6368', marginBottom: 12 }}>
              <strong>السمات المفعلة (Traits):</strong> {model.traits}
            </div>
          )}

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>الحقل</th>
                  <th style={{ width: '30%' }}>نوع البيانات (Data Type)</th>
                  <th>الوصف التقني</th>
                </tr>
              </thead>
              <tbody>
                {model.attributes.map((attr) => (
                  <tr key={attr.field}>
                    <td>
                      <code style={{ background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
                        {attr.field}
                      </code>
                    </td>
                    <td style={{ fontSize: 12, color: '#80868b', fontFamily: "'JetBrains Mono', monospace" }}>
                      {attr.type}
                    </td>
                    <td style={{ fontSize: 13 }}>{attr.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 16, marginBottom: 8, color: '#202124' }}>
            خريطة صلاحيات الأدوار
          </h4>

          <div style={{ display: 'grid', gap: 8 }}>
            {model.roles.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 12px',
                  background: '#f8f9fa',
                  borderRadius: 6,
                  border: '1px solid #e0e0e0',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: '#1a73e8' }}>{r.role}:</strong>{' '}
                <span style={{ color: '#5f6368' }}>{r.permissions}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ModelsDirectorySection;
