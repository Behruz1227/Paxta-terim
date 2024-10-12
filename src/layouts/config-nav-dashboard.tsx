import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navAdminData = [
  {
    title: 'Boshqaruv paneli',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Foydalanuvchilar',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Tumanlar',
    path: '/districts',
    icon: icon('ic-cart'),
  },
  {
    title: 'Mashinalar',
    path: '/machines',
    icon: icon('ic-blog'),
  },
  {
    title: 'Fermalar',
    path: '/farms',
    icon: icon('ic-farm'),
  },
  {
    title: 'Hisobotlar',
    path: '/reports',
    icon: icon('ic-report'),
  },
  {
    title: 'Statistik',
    path: '/statistic',
    icon: icon('ic-stats'),
  },
];

export const navUserData = [
  {
    title: 'Hisobotlar',
    path: '/hisobotlar',
    icon: icon('ic-analytics'),
  },
  {
    title: "Hisobot qo'shish",
    path: '/reportCreate',
    icon: icon('ic-analytics'),
  },

];

export const navUser = [
  {
    title: 'Statistik',
    path: '/hisobotlars',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Hisobotlar',
    path: '/reportlar',
    icon: icon('ic-analytics'),
  },
];
