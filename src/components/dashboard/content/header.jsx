import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const { id } = useParams();
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    // Lay ten trang tu pathname cua location
    const pathname = location.pathname;
    let pageName = '';
    switch (pathname) {
      case "/users":
        pageName = "Users";
        break;
      case "/activities":
        pageName = "Activities";
        break;
      case "/schedules":
        pageName = "Schedules";
        break;
      case `/sub-activities/${id}`:
        pageName = "Sub Activities";
        break;
      // eslint-disable-next-line no-duplicate-case
      case `/settings/${id}`:
        pageName = "Settings";
        break;
      // Thêm các trường hợp khác nếu cần
      default:
        pageName = "Unknown Page";
    } setActivePage(pageName);
  }, [location.pathname]);

  return (
    <div className="header">
      <div className="left">
        <h1>Dashboard</h1>
        <ul className="breadcrumb">
          <li><a href="#">
            Dash Board
          </a></li>

          {activePage && (
            <li><a href="#" className="active">{activePage}</a></li>
          )}
        </ul>
      </div>
    </div>
  );
};
