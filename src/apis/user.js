/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/apis'

const privateApi = useApiCMS(true)
const userServicePrivate = axios.create(privateApi)

userServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
userServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const userServiceApi = {
  getUser: () => userServicePrivate.get('/getUser'),
}
