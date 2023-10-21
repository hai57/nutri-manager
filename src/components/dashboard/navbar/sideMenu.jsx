export const SideBar = () => {
    return (
        <div className="sidebar">
            <a href="#" className="logo">
                <i className='bx bx-code-alt'></i>
                <div className="logo-name"><span>Asmr</span>Prog</div>
            </a>
            <ul className="side-menu">
                <li><a href="#"><i className='bx bxs-dashboard'></i>Dashboard</a></li>
                <li><a href="#"><i className='bx bx-cog'></i>Settings</a></li>
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#" className="logout">
                        <i className='bx bx-log-out-circle'></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}
