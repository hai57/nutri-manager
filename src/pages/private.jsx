/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { storage } from "@/utils/storage"
import DashboardPage from "./dashboard"
import { authServiceApi } from "@/api/auth"
import { setSelf } from "@/store/actions/selfAction"

const PrivatePage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  let token = storage.get('token')
  const { authorize } = useSelector(state => state.authorizeAction)

  const handleCheckToken = async () => {
    authServiceApi.checkToken()
      .then(res => {
        dispatch(setSelf(res.user))
      })
      .catch(() => navigator('/login'))
  }

  useEffect(() => {
    if (!authorize) {
      if (token) {
        handleCheckToken()
      } else {
        navigator('/login')
      }
    }
  }, [navigator, authorize])

  if (!token) return null
  return (
    <div>
      <DashboardPage>
        <Outlet />
      </DashboardPage>
    </div>
  )
}

export default PrivatePage
