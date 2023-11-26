import { SideBarWrapper } from '@/components/dashboard/sideMenu';
import { ContentWrapper } from '@/components/dashboard/content';
import '@/styles/index.scss'
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {


  return (
    <>
      <SideBarWrapper />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  )
}

export default DashboardPage;
