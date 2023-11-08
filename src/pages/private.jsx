/* eslint-disable react/prop-types */
import { storage } from "@/utils/storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PrivatePage = ({children}) => {
  let token = storage.get('token')
  const navigator = useNavigate()
  
  useEffect(() => {
    if (!token) navigator('/login')
  }, [navigator, token])

  if (!token) return null
  return <ddiv>{children}</ddiv>
}

export default PrivatePage
