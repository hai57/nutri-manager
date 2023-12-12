import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';

import { switchMode } from "@/store/actions/darkmodeAction";


export const NavBar = () => {


  const { mode } = useSelector(state => state.darkmodeAction)

  const dispatch = useDispatch()

  const handleThemeToggle = () => {
    dispatch(switchMode(mode == 'dark' ? 'light' : 'dark'))
  }
  return (
    <nav>
      <form action="#">
        {/* <div className="form-input">
          <input type="search" placeholder="Search..." />
        </div> */}
      </form>
      <span>{mode === 'dark' ? 'Dark' : 'Light'}</span>
      <button className={`theme-toggle ${mode === 'dark' ? 'dark' : 'light'}`} type='button' onClick={handleThemeToggle}></button>
      {/* <a href="#" className="notif">
        <BiBell className='bx'></BiBell>
        <span className="count">12</span>
      </a> */}
      <a href="#" className="profile">
        <BiUser className='bx bx-user'></BiUser>
      </a>
    </nav>
  )

}

