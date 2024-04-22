import { useLocation } from "react-router-dom";
import { BiLogOutCircle, BiCog, BiGroup, BiListCheck } from "react-icons/bi";
import { IoListOutline } from "react-icons/io5";

import { Routing } from '@/utils/routing';
import { storage } from "@/utils/storage";
import { useSelector } from "react-redux";




export const SideBar = () => {
    const location = useLocation();
    const idUser = useSelector((state) => state.selfAction.user.id)
    const sidebarMenu = [
        { label: "User", path: Routing.users.path, name: "user", icon: <BiGroup className="bx" /> },
        // { label: "Schedule", path: Routing.schedules.path, name: "schedules", icon: <AiOutlineSchedule className="bx" /> },
        { label: "Activity", path: Routing.activities.path, name: "activity", icon: <BiListCheck className="bx" /> },
        { label: "Sub Activity", path: Routing.subActivities.path, name: "subActivity", icon: <BiListCheck className="bx" /> },
        { label: "Settings", path: `${Routing.settings.path}/${idUser}`, name: "settings", icon: <BiCog className="bx" /> },
    ]
    const handleLogout = () => {
        storage.remove('token')

    };

    const checkActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    }

    return (
        <div className="sidebar">
            <a href="/users" className="logo">
                <i className='bx bx-code-alt'></i>
                <div className="logo-name">
                    <span><IoListOutline className="bx" /></span>
                    Healthy
                </div>
            </a>
            <ul className="side-menu">
                {sidebarMenu.map((item, index) => {
                    return (
                        <li key={index} className={checkActive(item.path)}>
                            <a href={item.name == "subActivity" ? '' : item.path} >
                                {item.icon}
                                {item.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <ul className="side-menu bottom">
                <li>
                    <a href={`${Routing.login.path}`} className="logout" onClick={handleLogout}>
                        <BiLogOutCircle className="bx"></BiLogOutCircle>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}
