export const Header = () => {
  return (
    <div className="header">
      <div className="left">
        <h1>Dashboard</h1>
        <ul className="breadcrumb">
          <li><a href="#">
            Dash Board
          </a></li>
          /
          <li><a href="#" className="active">Users</a></li>
        </ul>
      </div>
    </div>
  );
};
