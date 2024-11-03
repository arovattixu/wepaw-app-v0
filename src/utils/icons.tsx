import React from 'react';
import {
  AlertCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Dog,
  Cat,
  DollarSign,
  Eye,
  EyeOff,
  Facebook,
  HelpCircle,
  Instagram,
  Loader,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  Package,
  PawPrint,
  Plus,
  Search,
  Settings,
  Share2,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  Twitter,
  User,
  Users,
  X
} from 'lucide-react';

export type IconName = 
  | 'alertCircle'
  | 'bell'
  | 'chevronLeft'
  | 'chevronRight'
  | 'clock'
  | 'copy'
  | 'creditCard'
  | 'dog'
  | 'cat'
  | 'dollarSign'
  | 'eye'
  | 'eyeOff'
  | 'facebook'
  | 'helpCircle'
  | 'instagram'
  | 'loader'
  | 'lock'
  | 'logOut'
  | 'menu'
  | 'messageCircle'
  | 'package'
  | 'pawPrint'
  | 'plus'
  | 'search'
  | 'settings'
  | 'share2'
  | 'shield'
  | 'shoppingBag'
  | 'shoppingCart'
  | 'trash2'
  | 'truck'
  | 'twitter'
  | 'user'
  | 'users'
  | 'x';

const iconComponents = {
  alertCircle: AlertCircle,
  bell: Bell,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clock: Clock,
  copy: Copy,
  creditCard: CreditCard,
  dog: Dog,
  cat: Cat,
  dollarSign: DollarSign,
  eye: Eye,
  eyeOff: EyeOff,
  facebook: Facebook,
  helpCircle: HelpCircle,
  instagram: Instagram,
  loader: Loader,
  lock: Lock,
  logOut: LogOut,
  menu: Menu,
  messageCircle: MessageCircle,
  package: Package,
  pawPrint: PawPrint,
  plus: Plus,
  search: Search,
  settings: Settings,
  share2: Share2,
  shield: Shield,
  shoppingBag: ShoppingBag,
  shoppingCart: ShoppingCart,
  trash2: Trash2,
  truck: Truck,
  twitter: Twitter,
  user: User,
  users: Users,
  x: X
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  const IconComponent = iconComponents[name];
  return <IconComponent size={size} {...props} />;
}