import { BiLogOutCircle, BiSolidDashboard, BiCog, BiGroup } from "react-icons/bi";
export const SideBar = () => {
    return (
        <div className="sidebar">
            <a href="#" className="logo">
                <i className='bx bx-code-alt'></i>
                <div className="logo-name"><span>Asmr</span>Prog</div>
            </a>
            <ul className="side-menu">
                <li className="active"><a href="#"><BiSolidDashboard className="bx" />Dashboard</a></li>
                <li ><a href="#"><BiGroup className="bx" />Users</a></li>
                <li><a href="#"><BiCog className="bx" />Settings</a></li>
            </ul>
            <ul className="side-menu bottom">
                <li>
                    <a href="#" className="logout">
                        <BiLogOutCircle className="bx"></BiLogOutCircle>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}
