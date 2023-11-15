/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { storage } from "@/utils/storage"
import { getAllUser } from "@/hooks/getAllUser"

const PrivatePage = ({ children }) => {
  let token = storage.get('token')
  const navigator = useNavigate()
  getAllUser()
  useEffect(() => {
    if (!token) navigator('/login')
  }, [navigator, token])

  if (!token) return null
  return <div>{children}</div>
}

export default PrivatePage
