/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const publicApi = useApiCMS(false)
const privateApi = useApiCMS(true)
const authServicePublic = axios.create(publicApi)
const authServicePrivate = axios.create(privateApi)

authServicePublic.interceptors.request.use(onRequestFulfilled, onRequestRejected)
authServicePublic.interceptors.response.use(onFulfilled, onRejected)
authServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
authServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const authServiceApi = {
  login: (p) => authServicePublic.post('/user/loginAdmin', p),
  register: (p) => authServicePublic.post('/user/register', p),
  checkToken: () => authServicePrivate.get('/user/checkToken'),
}
