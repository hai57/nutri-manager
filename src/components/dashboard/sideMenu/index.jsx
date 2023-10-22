import { useEffect } from "react";
import { SideBar } from "./sideMenu";

export const SideBarWrapper = () => {
  useEffect(() => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

    const handleItemClick = (item) => {
      sideLinks.forEach((i) => {
        i.parentElement.classList.remove('active');
      });
      item.parentElement.classList.add('active');
    };

    sideLinks.forEach((item) => {
      item.addEventListener('click', () => {
        handleItemClick(item);
      });
    });

    return () => {
      sideLinks.forEach((item) => {
        item.removeEventListener('click', () => {
          handleItemClick(item);
        });
      });
    };
  }, []);


  return (
    <>
      <SideBar />
    </>
  );
};
