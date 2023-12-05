import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BiLogOutCircle, BiCog, BiGroup, BiListCheck } from "react-icons/bi";

import { storage } from "@/utils/storage";


export const SideBar = () => {
    const [activeItem, setActiveItem] = useState('/dashboard/users');
    const location = useLocation();

    useEffect(() => {
        // Khi thay đổi địa chỉ URL, cập nhật activeItem
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        storage.remove('token');
        storage.remove('userId')

    };

    return (
        <div className="sidebar">
            <a href="#" className="logo">
                <i className='bx bx-code-alt'></i>
                <div className="logo-name"><span>Asmr</span>Prog</div>
            </a>
            <ul className="side-menu">
                <li className={activeItem === '/dashboard/users' ? 'active' : ''}>
                    <a href="/dashboard/users" >
                        <BiGroup className="bx" />
                        Users
                    </a>
                </li>
                <li className={activeItem === '/dashboard/activities' ? 'active' : ''}>
                    <a href="/dashboard/activities" >
                        <BiListCheck className="bx" />
                        Activities
                    </a>
                </li>
                <li><a href="#"><BiCog className="bx" />Settings</a></li>
            </ul>
            <ul className="side-menu bottom">
                <li>
                    <a href="/login" className="logout" onClick={handleLogout}>
                        <BiLogOutCircle className="bx"></BiLogOutCircle>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}
