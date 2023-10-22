import { useEffect, useState } from "react";
import { NavBar } from "./navBar";
import { Header } from "./header"
import { Data } from "./data";

export const ContentWrapper = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const toggler = document.getElementById('theme-toggle');

    const handleThemeChange = () => {
      if (toggler.checked) {
        document.body.classList.add('dark');
        setDarkMode(true);
      } else {
        document.body.classList.remove('dark');
        setDarkMode(false);
      }
    };

    toggler.addEventListener('change', handleThemeChange);


    return () => {
      toggler.removeEventListener('change', handleThemeChange);
    };
  }, []);
  const handleThemeToggle = () => {
    setDarkMode(!isDarkMode);
  };
  return (
    <div className='content'>
      <NavBar isDarkMode={isDarkMode} handleThemeToggle={handleThemeToggle} />
      <main>
        <Header />
        <Data />
      </main>
    </div>
  );
};
