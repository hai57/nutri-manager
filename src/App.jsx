import { useRoutes } from 'react-router-dom'

import routes from '@/router.jsx'

function App() {
  const routing = useRoutes(routes())
  return (
    <div>
      {routing}
    </div>
  )
}

export default App
