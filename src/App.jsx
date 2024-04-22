import { useRoutes } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import routes from '@/router.jsx'
import '@/styles/index.scss'

function App() {
  const routing = useRoutes(routes())
  const mode = useSelector((state) => state.darkmodeAction.mode);
  useEffect(() => {
    document.body.classList.remove(mode == 'light' ? 'dark' : 'light');
    document.body.classList.add(mode);
  }, [mode])

  return (
    <div>
      {routing}
    </div>
  )
}

export default App
