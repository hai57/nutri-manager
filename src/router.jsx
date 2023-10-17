import { lazy } from 'react'
const LoginPage = lazy(() => import('@/pages/login'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))

const routes = () => [
  {
    path: ''
  },
  {
    path: `/login`,
    element: <LoginPage />,
  },
  {
    path: `/dashboard`,
    element: <DashboardPage />,
  },
]

export default routes
