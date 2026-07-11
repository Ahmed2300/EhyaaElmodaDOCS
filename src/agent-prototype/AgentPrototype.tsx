import React, { useState } from 'react';
import Icon from '../api-docs/components/Icon';

interface Order {
  id: number;
  customerName: string;
  area: string;
  expectedWeight: number;
  actualWeight?: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  isVip: boolean;
  distanceMeters: number; // Simulated distance from agent
}

const initialOrders: Order[] = [
  { id: 101, customerName: 'أحمد رأفت', area: 'المعادي - دجلة', expectedWeight: 15, status: 'PENDING', isVip: true, distanceMeters: 800 },
  { id: 102, customerName: 'سارة الهواري', area: 'المعادي - شارع 9', expectedWeight: 22, status: 'PENDING', isVip: false, distanceMeters: 450 },
  { id: 103, customerName: 'محمود عبد العزيز', area: 'المعادي - حدائق المعادي', expectedWeight: 30, status: 'PENDING', isVip: false, distanceMeters: 1200 },
  { id: 104, customerName: 'منى القاضي', area: 'المعادي - ثكنات المعادي', expectedWeight: 12, status: 'PENDING', isVip: true, distanceMeters: 300 },
  { id: 105, customerName: 'كريم يوسف', area: 'المعادي - زهراء المعادي', expectedWeight: 25, status: 'PENDING', isVip: false, distanceMeters: 2500 },
];

const AgentPrototype: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [imprestBalance, setImprestBalance] = useState<number>(5000.00); // Initial cash wallet
  const [buyingPricePerKg] = useState<number>(10.00); // Fixed price per kg
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  // Simulation states
  const [simulatedRadius, setSimulatedRadius] = useState<number>(1000); // meters
  const [selectedOrderForCheckin, setSelectedOrderForCheckin] = useState<Order | null>(initialOrders[1]); // Sara
  const [simulatedDistance, setSimulatedDistance] = useState<number>(650); // meters
  const [weightInput, setWeightInput] = useState<string>('24.5');
  const [isHotLead, setIsHotLead] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  
  // Expenses states
  const [fuelExpense, setFuelExpense] = useState<string>('150');
  const [helperWage, setHelperWage] = useState<string>('100');
  const [carExpense, setCarExpense] = useState<string>('50');
  const [shiftClosed, setShiftClosed] = useState<boolean>(false);

  // Claimed orders (orders with status PENDING/IN_PROGRESS/COMPLETED)
  const claimedOrdersCount = orders.filter(o => o.status !== 'PENDING').length;
  
  // Stats
  const completedOrdersCount = orders.filter(o => o.status === 'COMPLETED').length;
  const totalWeightCollected = orders
    .filter(o => o.status === 'COMPLETED')
    .reduce((sum, o) => sum + (o.actualWeight || 0), 0);

  const handleClaimOrders = () => {
    // Claim all orders within simulatedRadius
    const updated = orders.map(o => {
      if (o.distanceMeters <= simulatedRadius && o.status === 'PENDING') {
        return { ...o, status: 'IN_PROGRESS' as const };
      }
      return o;
    });
    setOrders(updated);
    setCurrentScreen(3); // Go to daily route
  };

  const handleCheckin = () => {
    if (selectedOrderForCheckin) {
      setCurrentScreen(5); // Go to weight input screen
    }
  };

  const handleCheckout = () => {
    if (!selectedOrderForCheckin) return;
    
    const weight = parseFloat(weightInput) || 0;
    const cost = weight * buyingPricePerKg;

    // Instantly deduct from cash balance
    setImprestBalance(prev => parseFloat((prev - cost).toFixed(2)));

    // Update order status
    const updated = orders.map(o => {
      if (o.id === selectedOrderForCheckin.id) {
        return { ...o, status: 'COMPLETED' as const, actualWeight: weight };
      }
      return o;
    });
    setOrders(updated);

    // Alert user
    alert(`تم إتمام الزيارة بنجاح!\nوزن الملابس: ${weight} كجم\nسعر الشراء: ${buyingPricePerKg} ج.م/كجم\nالتكلفة المستقطعة: ${cost.toFixed(2)} ج.م\nتم خصم القيمة فورياً من المحفظة.`);
    
    // Select next pending/in_progress order
    const next = updated.find(o => o.status === 'IN_PROGRESS');
    setSelectedOrderForCheckin(next || null);

    setCurrentScreen(3); // Back to task list
  };

  const handleEndDay = () => {
    const totalExpenses = (parseFloat(fuelExpense) || 0) + (parseFloat(helperWage) || 0) + (parseFloat(carExpense) || 0);
    setImprestBalance(prev => parseFloat((prev - totalExpenses).toFixed(2)));
    setShiftClosed(true);
  };

  const resetSimulation = () => {
    setOrders(initialOrders);
    setImprestBalance(5000.00);
    setShiftClosed(false);
    setSelectedOrderForCheckin(initialOrders[1]);
    setSimulatedDistance(650);
    setCurrentScreen(1);
  };

  return (
    <div className="docs-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a73e8', margin: 0 }}>
            النموذج التفاعلي المباشر لتطبيق المندوب
          </h2>
          <p style={{ fontSize: 13, color: '#5f6368', margin: '4px 0 0' }}>
            محاكاة حية لشاشات الهاتف الجوال الخاصة بالمندوب لتجربة دورة العمل اللوجستية والمالية.
          </p>
        </div>
        <button 
          onClick={resetSimulation}
          style={{
            padding: '8px 16px',
            background: '#f1f3f4',
            color: '#1a73e8',
            border: '1px solid #dadce0',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Icon name="restart_alt" size={18} />
          <span>إعادة ضبط المحاكاة</span>
        </button>
      </div>

      {/* Screen Selector Progress Bar */}
      <div style={{
        display: 'flex',
        background: '#f8f9fa',
        padding: 8,
        borderRadius: 12,
        border: '1px solid #e0e0e0',
        marginBottom: 24,
        overflowX: 'auto',
        gap: 4
      }}>
        {[
          { num: 1, name: 'الرئيسية والعهدة', icon: 'dashboard' },
          { num: 2, name: 'حجز الخريطة بالدائرة', icon: 'map' },
          { num: 3, name: 'خط السير اليومي', icon: 'route' },
          { num: 4, name: 'قفل المسافة (Check-in)', icon: 'location_on' },
          { num: 5, name: 'الوزن والخصم اللحظي', icon: 'scale' },
          { num: 6, name: 'إغلاق الشفت والمصاريف', icon: 'event_busy' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setCurrentScreen(s.num)}
            style={{
              flex: '1 1 auto',
              minWidth: 140,
              padding: '10px 12px',
              border: 'none',
              background: currentScreen === s.num ? '#1a73e8' : 'transparent',
              color: currentScreen === s.num ? '#ffffff' : '#5f6368',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Icon name={s.icon} size={18} />
            <span>{s.num}. {s.name}</span>
          </button>
        ))}
      </div>

      {/* Simulated Device Frame Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
        
        {/* Device Frame */}
        <div style={{
          width: 380,
          height: 700,
          background: '#ffffff',
          borderRadius: 40,
          border: '14px solid #202124',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Status Bar */}
          <div style={{
            height: 44,
            background: '#202124',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            color: '#ffffff',
            fontSize: 12,
            fontFamily: 'monospace',
            zIndex: 10
          }}>
            <span>5:33 📱</span>
            <div style={{
              width: 110,
              height: 20,
              background: '#000000',
              borderRadius: '0 0 12px 12px',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span>5G</span>
              <Icon name="battery_full" size={14} />
            </div>
          </div>

          {/* App Screen Content (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fa', padding: 20, position: 'relative' }}>
            
            {/* Screen 1: Login & Imprest Dashboard */}
            {currentScreen === 1 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#202124', margin: 0 }}>مرحباً، كابتن أحمد</h3>
                    <span style={{ fontSize: 11, color: '#1e8e3e', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 8, height: 8, background: '#1e8e3e', borderRadius: '50%' }} />
                      متصل ومستعد (Active)
                    </span>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a73e8' }}>
                    <Icon name="person" size={20} />
                  </div>
                </div>

                {/* Cash Wallet Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #134e4a, #065f46)',
                  borderRadius: 16,
                  padding: 20,
                  color: '#ffffff',
                  boxShadow: '0 8px 16px rgba(6,95,70,0.25)',
                  marginBottom: 20,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>العهدة النقدية الجارية (المحفظة)</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{imprestBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 11, opacity: 0.9 }}>
                    <span>الرقم المالي: #AG-9428</span>
                    <span>سعر الكيلو: {buyingPricePerKg} ج.م</span>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#202124', marginBottom: 10 }}>ملخص إنجاز اليوم:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  <div style={{ background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: 20, fontWeight: 700, color: '#1a73e8' }}>
                      {orders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'COMPLETED').length}
                    </span>
                    <span style={{ fontSize: 10, color: '#5f6368' }}>الطلبات الموكلة</span>
                  </div>
                  <div style={{ background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: 20, fontWeight: 700, color: '#1e8e3e' }}>
                      {totalWeightCollected.toFixed(1)} كجم
                    </span>
                    <span style={{ fontSize: 10, color: '#5f6368' }}>إجمالي الوزن المجمّع</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={() => setCurrentScreen(2)}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: '#1a73e8',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      fontSize: 13
                    }}
                  >
                    <Icon name="map" size={18} />
                    <span>حجز طلبات من الخريطة (مسار جديد)</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen(3)}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: '#ffffff',
                      color: '#202124',
                      border: '1px solid #dadce0',
                      borderRadius: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      fontSize: 13
                    }}
                  >
                    <Icon name="route" size={18} />
                    <span>عرض المهام الحالية لليوم ({orders.filter(o => o.status === 'IN_PROGRESS').length})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Screen 2: Circular Order Claiming Map */}
            {currentScreen === 2 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 12 }}>حجز طلبات التجميع القريبة</h3>
                
                {/* Simulated Map View */}
                <div style={{
                  height: 250,
                  background: '#e3f2fd',
                  borderRadius: 16,
                  border: '1px solid #bbdefb',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Map Grid Background Lines */}
                  <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle, #000 10%, transparent 11%)', backgroundSize: '20px 20px' }} />
                  
                  {/* Outer claims circle radius visualizer */}
                  <div style={{
                    width: simulatedRadius / 10,
                    height: simulatedRadius / 10,
                    borderRadius: '50%',
                    background: 'rgba(26, 115, 232, 0.15)',
                    border: '2px dashed #1a73e8',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}>
                    {/* Representative Pulse Marker */}
                    <div style={{
                      width: 16,
                      height: 16,
                      background: '#1a73e8',
                      borderRadius: '50%',
                      border: '3px solid #ffffff',
                      boxShadow: '0 0 10px rgba(26,115,232,0.6)'
                    }} />
                  </div>

                  {/* Simulated Orders markers */}
                  {orders.map((o) => {
                    const isInside = o.distanceMeters <= simulatedRadius;
                    // Mock display positions
                    const positions = [
                      { top: 50, right: 80 }, // 101
                      { top: 120, right: 150 }, // 102
                      { top: 180, right: 60 }, // 103
                      { top: 80, right: 230 }, // 104
                      { top: 40, right: 300 } // 105
                    ];
                    const pos = positions[(o.id - 101) % positions.length];
                    
                    return (
                      <div
                        key={o.id}
                        style={{
                          position: 'absolute',
                          top: pos.top,
                          right: pos.right,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          zIndex: 5
                        }}
                      >
                        <Icon 
                          name={o.isVip ? 'stars' : 'location_on'} 
                          size={24} 
                          style={{ 
                            color: o.status === 'COMPLETED' ? '#1e8e3e' : (isInside ? '#1a73e8' : '#80868b'),
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }} 
                        />
                        <span style={{ 
                          fontSize: 9, 
                          background: '#ffffff', 
                          padding: '1px 4px', 
                          borderRadius: 4, 
                          border: '1px solid # dadce0',
                          fontWeight: 600,
                          marginTop: -2
                        }}>
                          {o.expectedWeight}كجم
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Radius Slider Control Panel */}
                <div style={{ background: '#ffffff', padding: 14, borderRadius: 12, border: '1px solid #e0e0e0', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                    <span>نطاق دائرة البحث الميداني:</span>
                    <span style={{ color: '#1a73e8' }}>{simulatedRadius} متر</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="3000"
                    step="100"
                    value={simulatedRadius}
                    onChange={(e) => setSimulatedRadius(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: '#1a73e8' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#80868b', marginTop: 4 }}>
                    <span>300م</span>
                    <span>1.5 كم</span>
                    <span>3 كم</span>
                  </div>
                </div>

                <div style={{ background: '#e8f0fe', padding: 12, borderRadius: 10, fontSize: 12, color: '#1a73e8', marginBottom: 16 }}>
                  <strong>الطلبات القابلة للحجز بالدائرة:</strong>{' '}
                  {orders.filter(o => o.distanceMeters <= simulatedRadius && o.status === 'PENDING').length}{' '}
                  طلب (متوقع جمع {orders.filter(o => o.distanceMeters <= simulatedRadius && o.status === 'PENDING').reduce((sum, o) => sum + o.expectedWeight, 0)} كجم)
                </div>

                <button
                  onClick={handleClaimOrders}
                  disabled={orders.filter(o => o.distanceMeters <= simulatedRadius && o.status === 'PENDING').length === 0}
                  style={{
                    width: '100%',
                    padding: 14,
                    background: orders.filter(o => o.distanceMeters <= simulatedRadius && o.status === 'PENDING').length === 0 ? '#dadce0' : '#1e8e3e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 13
                  }}
                >
                  تأكيد إسناد وحجز الطلبات لخطتي
                </button>
              </div>
            )}

            {/* Screen 3: Daily Route & Task List */}
            {currentScreen === 3 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 4 }}>مسار التجميع اليومي</h3>
                <p style={{ fontSize: 11, color: '#5f6368', marginBottom: 16 }}>الطلبات مرتبة بتسلسل لوجيستي مقترح لتقليل استهلاك الوقود.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {orders.filter(o => o.status !== 'PENDING').length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#ffffff', borderRadius: 12, border: '1px solid #dadce0' }}>
                      <Icon name="route" size={40} style={{ color: '#80868b', marginBottom: 12 }} />
                      <p style={{ fontSize: 13, color: '#202124', fontWeight: 600, margin: 0 }}>لا توجد طلبات في خطتك الميدانية</p>
                      <p style={{ fontSize: 11, color: '#5f6368', marginTop: 4 }}>يرجى الذهاب لشاشة الخريطة أولاً لحجز طلبات جديدة.</p>
                      <button 
                        onClick={() => setCurrentScreen(2)}
                        style={{ marginTop: 12, padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}
                      >
                        فتح الخريطة
                      </button>
                    </div>
                  ) : (
                    orders.filter(o => o.status !== 'PENDING').map((o, index) => (
                      <div
                        key={o.id}
                        style={{
                          background: '#ffffff',
                          borderRadius: 12,
                          border: '1px solid #dadce0',
                          borderRight: `4px solid ${o.status === 'COMPLETED' ? '#1e8e3e' : '#1a73e8'}`,
                          padding: 14
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <span style={{ fontSize: 11, background: '#f1f3f4', padding: '2px 6px', borderRadius: 4, fontWeight: 700, marginLeft: 6 }}>
                              خطوة {index + 1}
                            </span>
                            {o.isVip && (
                              <span style={{ fontSize: 10, background: '#fef7e0', color: '#b06000', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                                VIP عميل مميز
                              </span>
                            )}
                            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '6px 0 2px', color: '#202124' }}>{o.customerName}</h4>
                            <span style={{ fontSize: 11, color: '#5f6368' }}>{o.area}</span>
                          </div>
                          
                          {/* Status Badge */}
                          <span style={{
                            fontSize: 10,
                            padding: '3px 8px',
                            borderRadius: 100,
                            fontWeight: 600,
                            background: o.status === 'COMPLETED' ? '#e6f4ea' : '#e8f0fe',
                            color: o.status === 'COMPLETED' ? '#137333' : '#1a73e8'
                          }}>
                            {o.status === 'COMPLETED' ? 'تم استلامه' : 'قيد الانتظار'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTop: '1px solid #f1f3f4', paddingTop: 10 }}>
                          <span style={{ fontSize: 11, color: '#5f6368' }}>الوزن التقريبي: {o.expectedWeight} كجم</span>
                          
                          {o.status !== 'COMPLETED' && (
                            <button
                              onClick={() => {
                                setSelectedOrderForCheckin(o);
                                setSimulatedDistance(o.distanceMeters);
                                setCurrentScreen(4); // Go to checkin
                              }}
                              style={{
                                padding: '6px 12px',
                                background: '#1a73e8',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: 8,
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              تسجيل الوصول للزيارة
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {claimedOrdersCount > 0 && (
                  <button
                    onClick={() => setCurrentScreen(6)}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: '#202124',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 13,
                      marginTop: 20
                    }}
                  >
                    إنهاء اليوم وإقفال الشفت
                  </button>
                )}
              </div>
            )}

            {/* Screen 4: Geofenced Check-in Gate */}
            {currentScreen === 4 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 12 }}>فحص المسافة والوصول (Check-in)</h3>
                
                {selectedOrderForCheckin ? (
                  <div>
                    <div style={{ background: '#ffffff', padding: 16, borderRadius: 12, border: '1px solid #dadce0', marginBottom: 16 }}>
                      <span style={{ fontSize: 11, color: '#80868b' }}>العميل المستهدف:</span>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#202124', margin: '4px 0 2px' }}>{selectedOrderForCheckin.customerName}</h4>
                      <p style={{ fontSize: 12, color: '#5f6368', margin: 0 }}>العنوان: {selectedOrderForCheckin.area}</p>
                    </div>

                    {/* Geofence Proximity Alert Box */}
                    <div style={{
                      background: simulatedDistance <= 500 ? '#e6f4ea' : '#fce8e6',
                      border: `1px solid ${simulatedDistance <= 500 ? '#b7e1bd' : '#f5c6cb'}`,
                      borderRadius: 12,
                      padding: 16,
                      color: simulatedDistance <= 500 ? '#137333' : '#c5221f',
                      marginBottom: 16,
                      textAlign: 'center'
                    }}>
                      <Icon name={simulatedDistance <= 500 ? 'check_circle' : 'gpp_maybe'} size={32} style={{ marginBottom: 8 }} />
                      <div style={{ fontSize: 18, fontWeight: 700 }}>
                        {simulatedDistance <= 500 ? 'تم التحقق بنجاح!' : 'خطأ: أنت بعيد جداً!'}
                      </div>
                      <div style={{ fontSize: 12, marginTop: 4, fontWeight: 600 }}>
                        المسافة الحالية من العميل: {simulatedDistance} متر
                      </div>
                      <p style={{ fontSize: 11, marginTop: 6, opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                        {simulatedDistance <= 500 
                          ? 'أنت الآن في النطاق الجغرافي المعتمد (أقل من 500م). يمكنك تسجيل بدء الزيارة بأمان.'
                          : 'النظام مقفل! يجب أن تكون على مسافة 500 متر أو أقل من موقع تجميع العميل لتسجيل الوصول.'
                        }
                      </p>
                    </div>

                    {/* GPS Simulation Slider */}
                    <div style={{ background: '#ffffff', padding: 14, borderRadius: 12, border: '1px solid #e0e0e0', marginBottom: 20 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#5f6368', marginBottom: 8 }}>
                        🛠️ لوحة محاكاة اقتراب المندوب بالسيارة (GPS):
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="1500"
                        step="50"
                        value={simulatedDistance}
                        onChange={(e) => setSimulatedDistance(parseInt(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: simulatedDistance <= 500 ? '#1e8e3e' : '#d93025' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#80868b', marginTop: 4 }}>
                        <span>50م (قريب جداً)</span>
                        <span>500م (حد القفل)</span>
                        <span>1.5 كم (بعيد)</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckin}
                      disabled={simulatedDistance > 500}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: simulatedDistance > 500 ? '#dadce0' : '#1a73e8',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: simulatedDistance > 500 ? 'not-allowed' : 'pointer',
                        fontSize: 13
                      }}
                    >
                      تسجيل بدء الزيارة الآن
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ fontSize: 13, color: '#5f6368' }}>يرجى اختيار عميل من خط السير أولاً.</p>
                    <button onClick={() => setCurrentScreen(3)} style={{ padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>العودة للمسار</button>
                  </div>
                )}
              </div>
            )}

            {/* Screen 5: Checkout & Weight Input */}
            {currentScreen === 5 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 12 }}>تسجيل البيانات وتوريد الوزن</h3>
                
                {selectedOrderForCheckin ? (
                  <div>
                    <div style={{ background: '#ffffff', padding: 14, borderRadius: 12, border: '1px solid #dadce0', marginBottom: 16 }}>
                      <span style={{ fontSize: 10, color: '#80868b' }}>العميل الحالي:</span>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#202124', margin: '2px 0' }}>{selectedOrderForCheckin.customerName}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5f6368', marginTop: 4 }}>
                        <span>سعر الكيلو: {buyingPricePerKg} ج.م</span>
                        <span>المتوقع: {selectedOrderForCheckin.expectedWeight} كجم</span>
                      </div>
                    </div>

                    {/* Weight Input Box */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#202124', marginBottom: 6 }}>الوزن الفعلي للميزان الرقمي (كجم):</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          value={weightInput}
                          onChange={(e) => setWeightInput(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #dadce0',
                            borderRadius: 10,
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'monospace'
                          }}
                        />
                        <span style={{ position: 'absolute', right: 12, top: 12, color: '#80868b' }}>
                          <Icon name="scale" size={20} />
                        </span>
                      </div>
                    </div>

                    {/* Cost Preview Calculations */}
                    <div style={{
                      background: '#fef7e0',
                      border: '1px solid #fce8b2',
                      borderRadius: 12,
                      padding: 14,
                      color: '#b06000',
                      marginBottom: 16
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span>سعر الكيلو الافتراضي:</span>
                        <span>{buyingPricePerKg}.00 ج.م</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                        <span>الوزن المقروء:</span>
                        <span>{parseFloat(weightInput) || 0} كجم</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold', borderTop: '1px solid rgba(176,96,0,0.2)', paddingTop: 8 }}>
                        <span>التكلفة المسحوبة فورياً:</span>
                        <span>{((parseFloat(weightInput) || 0) * buyingPricePerKg).toFixed(2)} ج.م</span>
                      </div>
                    </div>

                    {/* Extra Options */}
                    <div style={{ background: '#ffffff', padding: 14, borderRadius: 12, border: '1px solid #e0e0e0', marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#202124' }}>
                          🌟 تمييز كعميل هام (Hot Lead)
                        </label>
                        <input
                          type="checkbox"
                          checked={isHotLead}
                          onChange={(e) => setIsHotLead(e.target.checked)}
                          style={{ width: 18, height: 18, accentColor: '#1a73e8' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#202124' }}>
                          📦 أرشفة العميل بعد الزيارة
                        </label>
                        <input
                          type="checkbox"
                          checked={isArchived}
                          onChange={(e) => setIsArchived(e.target.checked)}
                          style={{ width: 18, height: 18, accentColor: '#1a73e8' }}
                        />
                      </div>
                    </div>

                    {/* Action checkout button */}
                    <button
                      onClick={handleCheckout}
                      disabled={!(parseFloat(weightInput) > 0)}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: '#1e8e3e',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13
                      }}
                    >
                      إتمام الزيارة وحفظ البيانات (الخصم فوري)
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ fontSize: 13, color: '#5f6368' }}>يرجى اختيار عميل من مسار السير أولاً.</p>
                  </div>
                )}
              </div>
            )}

            {/* Screen 6: Shift Closure & Expenses */}
            {currentScreen === 6 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 4 }}>إقفال الشفت اليومي</h3>
                <p style={{ fontSize: 11, color: '#5f6368', marginBottom: 16 }}>تسجيل المصاريف وحساب الأرصدة المتبقية لتسوية العهدة.</p>

                {shiftClosed ? (
                  <div style={{ textAlign: 'center', padding: '30px 20px', background: '#e6f4ea', borderRadius: 16, border: '1px solid #b7e1bd', color: '#137333' }}>
                    <Icon name="verified" size={48} style={{ marginBottom: 12 }} />
                    <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>تم إرسال التصفية بنجاح!</h4>
                    <p style={{ fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>
                      تم إرسال كافة البيانات المالية للمحاسب للمطابقة والاعتماد. رصيد العهدة الجاري مسجل ومعتمد. شفت العمل مغلق.
                    </p>
                    <div style={{ background: '#ffffff', padding: 12, borderRadius: 8, marginTop: 12, color: '#202124', fontSize: 12, fontWeight: 600, border: '1px solid #dadce0' }}>
                      العهدة المتبقية للمطابقة: {imprestBalance.toFixed(2)} ج.م
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Shift Statistics */}
                    <div style={{ background: '#ffffff', padding: 14, borderRadius: 12, border: '1px solid #dadce0', marginBottom: 16 }}>
                      <span style={{ fontSize: 10, color: '#80868b', display: 'block', marginBottom: 8 }}>ملخص إحصائيات الوردية:</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span>الأوردرات المكتملة:</span>
                        <strong>{completedOrdersCount} طلب</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span>الملابس المستلمة:</span>
                        <strong>{totalWeightCollected.toFixed(1)} كجم</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span>تكلفة المشتريات المخصومة:</span>
                        <strong style={{ color: '#d93025' }}>-{(totalWeightCollected * buyingPricePerKg).toFixed(2)} ج.م</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 'bold', borderTop: '1px solid #f1f3f4', paddingTop: 8, marginTop: 4 }}>
                        <span>رصيد العهدة الجاري:</span>
                        <span style={{ color: '#137333' }}>{imprestBalance.toFixed(2)} ج.م</span>
                      </div>
                    </div>

                    <h4 style={{ fontSize: 13, fontWeight: 600, color: '#202124', marginBottom: 10 }}>تسجيل مصروفات الوردية (الوقود واليوميات):</h4>
                    
                    {/* Fuel Expense */}
                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: 'block', fontSize: 11, color: '#5f6368', marginBottom: 4 }}>بنزين / وقود السيارة (ج.م):</label>
                      <input
                        type="number"
                        value={fuelExpense}
                        onChange={(e) => setFuelExpense(e.target.value)}
                        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #dadce0', fontSize: 13 }}
                      />
                    </div>

                    {/* Helper Wage */}
                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: 'block', fontSize: 11, color: '#5f6368', marginBottom: 4 }}>يومية المساعد الميداني (ج.م):</label>
                      <input
                        type="number"
                        value={helperWage}
                        onChange={(e) => setHelperWage(e.target.value)}
                        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #dadce0', fontSize: 13 }}
                      />
                    </div>

                    {/* Car Expense */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 11, color: '#5f6368', marginBottom: 4 }}>مصاريف وقوف سيارات / أخرى (ج.م):</label>
                      <input
                        type="number"
                        value={carExpense}
                        onChange={(e) => setCarExpense(e.target.value)}
                        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #dadce0', fontSize: 13 }}
                      />
                    </div>

                    <button
                      onClick={handleEndDay}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: '#d93025',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13
                      }}
                    >
                      إرسال التصفية وإقفال الشفت اليومي
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Device Home Indicator Bar */}
          <div style={{
            height: 28,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 8,
            borderRadius: '0 0 40px 40px'
          }}>
            <div style={{
              width: 140,
              height: 5,
              background: '#202124',
              borderRadius: 3
            }} />
          </div>

        </div>

        {/* Informative Side Panel */}
        <div style={{ flex: 1, minWidth: 280, maxWidth: 500 }}>
          <div style={{ background: '#ffffff', padding: 24, borderRadius: 16, border: '1px solid #dadce0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#202124', marginBottom: 12 }}>
              💡 دليل المحاكاة التفاعلية وقواعد العمل الفنية:
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <strong style={{ display: 'block', fontSize: 13, color: '#1a73e8', marginBottom: 2 }}>شاشة 1: الرئيسية والعهدة</strong>
                <p style={{ fontSize: 12, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>
                  تستعرض محفظة الكابتن النقدية المسحوبة من حقل <code>users.financial_imprest</code>. يتم شحن العهدة صباحاً من قبل المحاسب عبر <code>POST /api/v1/admin/accounting/imprest/adjust</code> لتوثيق الاستلام.
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: 13, color: '#1a73e8', marginBottom: 2 }}>شاشة 2: حجز الخريطة بالدائرة (اليوم السابق)</strong>
                <p style={{ fontSize: 12, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>
                  يحدد المندوب منطقة عمل الغد بالدائرة الجغرافية. يستعلم النظام عبر <code>self-assign/query</code> ويحجز عبر <code>self-assign/claim</code> باستخدام <strong>القفل التزامني (Pessimistic Concurrency Lock)</strong> لتجنب التعيين المزدوج، مع بث لحظي <code>SSE Stream</code> لتحديث خرائط المناديب الآخرين.
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: 13, color: '#1a73e8', marginBottom: 2 }}>شاشة 3: خط السير اليومي وتأكيد المواعيد</strong>
                <p style={{ fontSize: 12, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>
                  يقوم المندوب بالتواصل مع العملاء هاتفياً لغربلة الطلبات. الطلب المؤكد يتحول لـ <code>SCHEDULED_VISITED (8)</code>، والمؤجل لـ <code>RESCHEDULED (9)</code>، والملغي لـ <code>CANCELLED (6)</code>، لتصفية مسار الغد الفعال.
                </p>
              </div>

              <div style={{ background: '#fce8e6', padding: 12, borderRadius: 10, border: '1px solid #f5c6cb' }}>
                <strong style={{ display: 'block', fontSize: 13, color: '#c5221f', marginBottom: 2 }}>شاشة 4: قفل المسافة 500م (Check-in)</strong>
                <p style={{ fontSize: 12, color: '#c5221f', margin: 0, lineHeight: 1.5 }}>
                  عند الوصول، يرسل التطبيق إحداثيات GPS. يقارن الباك إند موقع المندوب بالمسار الجيوديسي لموقع الطلب <code>pick_up_coordinates</code> (معادلة Haversine). إذا زادت المسافة عن 500 متر، يتم رفض طلب الوصول برمجياً لحماية سلامة البيانات.
                </p>
              </div>

              <div style={{ background: '#e6f4ea', padding: 12, borderRadius: 10, border: '1px solid #b7e1bd' }}>
                <strong style={{ display: 'block', fontSize: 13, color: '#137333', marginBottom: 2 }}>شاشة 5: الخصم اللحظي للعهدة (Check-out)</strong>
                <p style={{ fontSize: 12, color: '#137333', margin: 0, lineHeight: 1.5 }}>
                  يوزن المندوب الملابس ويسجلها. عند ضغط إنهاء، يحسب السيستم التكلفة (الوزن x سعر الكيلو) ويحدث الطلب لـ <code>PICKED_UP (3)</code> ويخصم القيمة <strong>فورياً ولحظياً</strong> من محفظة المندوب <code>financial_imprest</code> لضمان تسوية فورية.
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: 13, color: '#1a73e8', marginBottom: 2 }}>شاشة 6: إغلاق الشفت والمصاريف (End Day)</strong>
                <p style={{ fontSize: 12, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>
                  في نهاية اليوم، يسجل المندوب مصاريفه (وقود، يوميات) عبر <code>POST /api/v1/expenses</code> لتخصم من العهدة، ثم ينهي شفته عبر <code>POST /api/v1/plannings/end-day</code> ويطابق الكاش الفعلي مع المحاسب لتصفير رصيد محفظته.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentPrototype;
