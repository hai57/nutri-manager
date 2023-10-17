import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/actions/commonAction'
const DashboardPage = () => {

  const value = useSelector((state) => state.counterAction.value)
  const dispatch = useDispatch()
  return (
    <>
    <button type="button" onClick={() => dispatch(decrement())}>Decrease Value</button>
    &nbsp;&nbsp;{value}  &nbsp;&nbsp;
    <button type="button" onClick={() => dispatch(increment())}>Increase Value</button>
    </>
  )
}

export default DashboardPage;
