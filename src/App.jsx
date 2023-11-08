import { useRoutes } from 'react-router-dom'

import routes from '@/router.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const routing = useRoutes(routes())

  const { mode } = useSelector(state => state.darkmodeAction)

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
