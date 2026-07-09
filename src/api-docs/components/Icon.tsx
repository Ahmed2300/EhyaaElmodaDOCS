import React from 'react';
import {
  Activity, AlertTriangle, ArrowDownUp, ArrowLeft, ArrowUpRight,
  Award, Badge, BadgeCheck, Banknote, Battery, BugPlay, Building2,
  Calculator, CalendarCheck, CalendarClock, CheckCircle2, ChevronDown, ChevronUp,
  ClipboardCheck, ClipboardList, Clock, Code, Cog, CreditCard, Crosshair, Delete,
  Download, Edit, Eye, FileText, FileSearch, Flame, Fuel, Gavel, Globe, Grid3x3, Handshake,
  Headphones, HelpCircle, Image, Info, Key, LayoutDashboard, List,
  LocateFixed, Lock, LogIn, LogOut, Map, MapPin, MapPinned, MessageCircle,
  MessageSquare, MousePointerClick, Package, PencilLine,
  PhoneCall, PieChart, Radio, RadioTower, Receipt, ReceiptText, RefreshCw,
  Repeat, Route, Scale, Shield, ShoppingCart,
  SlidersHorizontal, Smartphone, Sparkles, Star, Tag, Text, Ticket, TrendingUp,
  Truck, Upload, User, UserCog, UserPlus, Users, Wallet, Workflow, XCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  account_balance: Building2,
  account_balance_wallet: Wallet,
  account_tree: Workflow,
  admin_panel_settings: UserCog,
  ads_click: MousePointerClick,
  analytics: Activity,
  api: Code,
  archive: Package,
  arrow_back: ArrowLeft,
  auto_awesome: Sparkles,
  badge: Badge,
  balance: Scale,
  bar_chart: Activity,
  battery_full: Battery,
  block: Shield,
  build: Cog,
  bug_report: BugPlay,
  calculate: Calculator,
  call: PhoneCall,
  call_split: ArrowUpRight,
  cancel: XCircle,
  cell_tower: RadioTower,
  chat: MessageCircle,
  check_circle: CheckCircle2,
  check: CheckCircle2,
  checklist: ClipboardList,
  confirmation_number: Ticket,
  dashboard: LayoutDashboard,
  delete: Delete,
  description: FileText,
  directions: Map,
  download: Download,
  edit: Edit,
  edit_note: PencilLine,
  encrypted: Lock,
  event_available: CalendarCheck,
  event_upcoming: CalendarClock,
  expand_less: ChevronUp,
  expand_more: ChevronDown,
  fact_check: ClipboardCheck,
  feedback: MessageSquare,
  filter_alt: SlidersHorizontal,
  find_in_page: FileSearch,
  gavel: Gavel,
  gps_fixed: LocateFixed,
  grid_on: Grid3x3,
  group: Users,
  handshake: Handshake,
  help: HelpCircle,
  history: Clock,
  home: Globe,
  hub: Workflow,
  image: Image,
  info: Info,
  integration_instructions: Code,
  inventory_2: Package,
  label: Tag,
  list: List,
  local_fire_department: Flame,
  local_gas_station: Fuel,
  local_shipping: Truck,
  location_on: MapPinned,
  lock: Lock,
  login: LogIn,
  logout: LogOut,
  loop: Repeat,
  map: Map,
  my_location: Crosshair,
  near_me: Crosshair,
  notes: FileText,
  open_in_new: ArrowUpRight,
  paid: CreditCard,
  payments: Banknote,
  people: Users,
  person: User,
  person_add: UserPlus,
  phone_iphone: Smartphone,
  pie_chart: PieChart,
  pin_drop: MapPin,
  price_change: TrendingUp,
  query_stats: Activity,
  radar: Crosshair,
  rate_review: Star,
  receipt: Receipt,
  receipt_long: ReceiptText,
  refresh: RefreshCw,
  report: AlertTriangle,
  route: Route,
  scale: Scale,
  schedule: CalendarClock,
  search: FileSearch,
  settings: Cog,
  settings_ethernet: Workflow,
  shield: Shield,
  shopping_cart: ShoppingCart,
  show_chart: TrendingUp,
  sort: ArrowDownUp,
  star: Star,
  stars: Award,
  stream: Radio,
  support_agent: Headphones,
  swap_horiz: RefreshCw,
  sync_alt: RefreshCw,
  text_fields: Text,
  timeline: Activity,
  trending_up: TrendingUp,
  upload_file: Upload,
  verified: BadgeCheck,
  visibility: Eye,
  vpn_key: Key,
  warning: AlertTriangle,
  web: Globe,
};

interface IconProps {
  name?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', style, children }) => {
  const iconName = name || children || '';
  const LucideIcon = iconMap[iconName];

  if (!LucideIcon) {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: size, height: size, fontSize: size,
          fontFamily: "'JetBrains Mono', monospace", color: '#d93025',
          ...style,
        }}
        title={`Unknown icon: ${iconName}`}
      >?</span>
    );
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, ...style,
      }}
    >
      <LucideIcon size={size} strokeWidth={1.5} />
    </span>
  );
};

export default Icon;