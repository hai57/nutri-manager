import { BiMenu, BiSearch, BiBell, BiUser } from 'react-icons/bi'
import PropTypes from 'prop-types';

export const NavBar = ({isDarkMode, handleThemeToggle}) => {
  NavBar.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    handleThemeToggle: PropTypes.func.isRequired,
  };
  return (

    <nav>
      <BiMenu className='bx bx-menu' />
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button className="search-btn" type="submit">
            <BiSearch className='bx'></BiSearch>
          </button>
        </div>
      </form>
      <input type="checkbox" id="theme-toggle" hidden checked={isDarkMode} onChange={handleThemeToggle}  />
      <label htmlFor="theme-toggle" className="theme-toggle"></label>
      <a href="#" className="notif">
        <BiBell className='bx'></BiBell>
        <span className="count">12</span>
      </a>
      <a href="#" className="profile">
        <BiUser className='bx bx-user'></BiUser>
      </a>
    </nav>
  )

}

