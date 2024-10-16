import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import ReportCreate from 'src/pages/master/reportCreate';


// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Notifications = lazy(() => import('src/pages/notifications'));
export const FarmsPage = lazy(() => import('src/pages/farms'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Hisobotlar = lazy(() => import('src/pages/master/hisobot'))
export const Statistic = lazy(() => import('src/pages/statistic'))
export const ReportHokim = lazy(() => import('src/pages/hokim/hokim'))

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <HomePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'districts', element: <ProductsPage /> },
        { path: 'machines', element: <BlogPage /> },
        { path: 'farms', element: <FarmsPage /> },
        { path: 'reports', element: <ReportPage /> },
        { path: 'hisobotlar', element: <Hisobotlar /> },
        { path: 'reportCreate', element: <ReportCreate/> },
        { path: 'statistic', element: <Statistic/> },
        { path: 'reportlar', element: <ReportHokim/> },
        { path: 'hisobotlars', element: <Statistic/> },
        {
          path: 'notifications',
          element: <Notifications />,
        },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
      index: true
    },
    {
      path: '404',
      element: <Page404 />,
    },
  
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
