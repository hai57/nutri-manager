/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const publicApi = useApiCMS(true)
const userServicePrivate = axios.create(privateApi)
const userServicePublic = axios.create(publicApi)

userServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
userServicePrivate.interceptors.response.use(onFulfilled, onRejected)
userServicePublic.interceptors.request.use(onRequestFulfilled, onRequestRejected)
userServicePublic.interceptors.response.use(onFulfilled, onRejected)
export const userServiceApi = {
  getAllUser: () => userServicePrivate.get('/user/getAllUser'),
  createUser: (p) => userServicePublic.post('/user/createUser',p),
  deleteUser: (p) => userServicePrivate.delete('/user/deleteUser',p)
}
