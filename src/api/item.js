/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const itemServicePrivate = axios.create(privateApi)

itemServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
itemServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const userServiceApi = {
  getAllItem: (offset, limit) => itemServicePrivate.get(`/itemSchedule/getAllItem?offset=${offset}&limit=${limit}`),
  createItemSchedule: (p) => itemServicePrivate.post('/itemSchedule/createItemSchedule', p),
  updateItemSchedule: (p) => itemServicePrivate.put('/itemSchedule/updateItemSchedule', p),
  deleteItemSchedule: (p) => itemServicePrivate.delete('/itemSchedule/deleteItemSchedule', p),
}
