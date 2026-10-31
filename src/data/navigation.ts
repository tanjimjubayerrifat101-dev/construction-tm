import { Building2, Star, Users, Award, ShieldCheck, type LucideIcon } from 'lucide-react';

export type NavChild = { key: string; href: string; icon: LucideIcon };
export type NavGroup = { groupKey: string; items: NavChild[] };
export type NavItem = { key: string; href?: string; groups?: NavGroup[] };

export const NAV: NavItem[] = [
  {
    key: 'about',
    groups: [
      { groupKey: 'company', items: [
        { key: 'aboutTmyazna', href: '/about#about-us', icon: Building2 },
        { key: 'mvv', href: '/about#vision', icon: Star },
      ]},
      { groupKey: 'people', items: [
        { key: 'leadership', href: '/about#leadership', icon: Users },
      ]},
    ],
  },
  { key: 'services', href: '/service' },
  { key: 'projects', href: '/projects' },
  {
    key: 'credentials',
    groups: [

      { groupKey: 'quality', items: [
        { key: 'certificates', href: '/credential#certificates', icon: Award },
        { key: 'vendorRegistrations', href: '/credential#vendor', icon: ShieldCheck },
        { key: 'accreditations', href: '/credential#compliance', icon: ShieldCheck }
        
      ]},
    ],
  },
  { key: 'media', href: '/media' },
  { key: 'careers', href: '/careers' },
  { key: 'contact', href: '/contact' },
];