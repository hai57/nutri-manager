/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const activitiesServicePrivate = axios.create(privateApi)

activitiesServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
activitiesServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const activitiesServiceApi = {
  getAllActivities: (offset,limit) => activitiesServicePrivate.get(`/activities/getAllActivities?offset=${offset}&limit=${limit}`),
  createActivities: (p) => activitiesServicePrivate.post('/activities/createActivities', p),
  updateActivities: (p) => activitiesServicePrivate.put('/activities/updateActivities', p),
  deleteActivities: (p) => activitiesServicePrivate.delete('/activities/deleteActivities',p)
}
