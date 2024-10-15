import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navAdminData = [
  {
    title: 'Бошқарув панели',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Фойдаланувчилар',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Туманлар',
    path: '/districts',
    icon: icon('ic-cart'),
  },
  {
    title: 'Машиналар',
    path: '/machines',
    icon: icon('ic-blog'),
  },
  {
    title: 'Фермалар',
    path: '/farms',
    icon: icon('ic-farm'),
  },
  {
    title: 'Ҳисоботлар',
    path: '/reports',
    icon: icon('ic-report'),
  },
  {
    title: 'Статистика ',
    path: '/statistic',
    icon: icon('ic-stats'),
  },
];

export const navUserData = [
  {
    title: 'Ҳисоботлар',
    path: '/hisobotlar',
    icon: icon('ic-analytics'),
  },
  {
    title: "Ҳисобот қўшиш",
    path: '/reportCreate',
    icon: icon('ic-analytics'),
  },

];

export const navUser = [
  {
    title: 'Статистика ',
    path: '/hisobotlars',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Ҳисоботлар',
    path: '/reportlar',
    icon: icon('ic-analytics'),
  },
];
