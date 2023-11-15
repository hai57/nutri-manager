import { lazy } from 'react'
const LoginPage = lazy(() => import('@/pages/login'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const PrivatePage = lazy(() => import('@/pages/private'))

const routes = () => [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: `/dashboard`,
    element: <PrivatePage><DashboardPage /></PrivatePage>,
  },
]

export default routes
