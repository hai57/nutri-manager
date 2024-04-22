import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';

import { switchMode } from "@/store/actions/darkmodeAction";
import { Routing } from '@/utils/routing';


export const NavBar = () => {

  const selfUserData = useSelector((state) => state.selfAction.user)

  const { mode } = useSelector(state => state.darkmodeAction)

  const dispatch = useDispatch()

  const handleThemeToggle = () => {
    dispatch(switchMode(mode == 'dark' ? 'light' : 'dark'))
  }
  return (
    <nav>
      <form action="#">
      </form>
      <span>{mode === 'dark' ? 'Dark' : 'Light'}</span>
      <button className={`theme-toggle ${mode === 'dark' ? 'dark' : 'light'}`} type='button' onClick={handleThemeToggle}></button>
      <div className='profile-wrapper'>
        <a href={`${Routing.settings.path}/${selfUserData.id}`} className="profile">
          <BiUser className='bx bx-user'></BiUser>
          <span>
            {selfUserData.username}
          </span>
        </a>
      </div>
    </nav>
  )

}

