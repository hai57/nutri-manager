import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/login'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserPage = lazy(() => import('@/pages/dashboard/user'))
const ActivityPage = lazy(() => import('@/pages/dashboard/activities'))
const PrivatePage = lazy(() => import('@/pages/private'))

const RedirectToLogin = () => <Navigate to="/login" replace />;


const routes = () => [
  {
    path: '/',
    element: <RedirectToLogin />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: `/dashboard`,
    element: (
      <PrivatePage>
        <DashboardPage>
          <Outlet />
        </DashboardPage>
      </PrivatePage>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Navigate to="users" replace />,
      },
      {
        path: 'users',
        element: <UserPage />,
      },
      {
        path: 'activities',
        element: <ActivityPage />,
      },
    ],
  },
]

export default routes
