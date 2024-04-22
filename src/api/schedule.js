/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const scheduleServicePrivate = axios.create(privateApi)

scheduleServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
scheduleServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const scheduleServiceApi = {
  getSchedule: (offset, limit) => scheduleServicePrivate.get(`/schedule/get-schedule?offset=${offset}&limit=${limit}`),
  createSchedule: (p) => scheduleServicePrivate.post('/schedule/create-schedule', p),
  updateSchedule: (p) => scheduleServicePrivate.put('/schedule/update-schedule', p),
  deleteSchedule: (p) => scheduleServicePrivate.delete('/schedule/delete-schedule', p),
}
