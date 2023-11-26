import { useSelector } from "react-redux";

import { NavBar } from "./navBar";
import { Header } from "./header"
import { Outlet } from "react-router-dom";

export const ContentWrapper = () => {
  const { mode } = useSelector(state => state.darkmodeAction)

  return (
    <div className='content'>
      <NavBar isDarkMode={mode == 'dark'} />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};
