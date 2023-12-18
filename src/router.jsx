import { lazy } from 'react'
import { Navigate } from 'react-router-dom';
import { Routing } from './utils/routing';

const LoginPage = lazy(() => import('@/pages/login'))
const UserPage = lazy(() => import('@/pages/dashboard/user'))
const ActivityPage = lazy(() => import('@/pages/dashboard/activities'))
const SubActivityPage = lazy(() => import('@/pages/dashboard/subActivities'))
const SettingPage = lazy(() => import('@/pages/dashboard/settings'))
const PrivatePage = lazy(() => import('@/pages/private'))

const RedirectToLogin = () => <Navigate to="/login" replace />;


const routes = () => [
  {
    path: '/',
    element: <RedirectToLogin />,
  },
  {
    path: Routing.login.path,
    element: <LoginPage />,
  },
  {
    element: <PrivatePage />,
    children: [
      {
        path: Routing.users.path,
        element: <UserPage />,
      },
      {
        path: Routing.activities.path,
        element: <ActivityPage />,
      },
      {
        path: `${Routing.settings.path}/:idUser`,
        element: <SettingPage />,
      },
      {
        path: `${Routing.subActivities.path}/:id`,
        element: <SubActivityPage />
      }
    ],
  },
]

export default routes
