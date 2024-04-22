/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const userServicePrivate = axios.create(privateApi)

userServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
userServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const userServiceApi = {
  getAllUser: (offset, limit) => userServicePrivate.get(`/user/get-all-user?offset=${offset}&limit=${limit}`),
  createUser: (p) => userServicePrivate.post('/user/create-user', p),
  updateUser: (p) => userServicePrivate.put('/user/update-user-with-id', p),
  deleteUser: (p) => userServicePrivate.delete('/user/delete-user', p),
}
