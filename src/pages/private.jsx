/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { storage } from "@/utils/storage"
import { getUser } from "@/hooks/getUser"

const PrivatePage = ({children}) => {
  let token = storage.get('token')
  const navigator = useNavigate()
  getUser()
  useEffect(() => {
    if (!token) navigator('/login')
  }, [navigator, token])

  if (!token) return null
  return <ddiv>{children}</ddiv>
}

export default PrivatePage
