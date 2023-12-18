/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const activitiesServicePrivate = axios.create(privateApi)

activitiesServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
activitiesServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const activitiesServiceApi = {
  getAllActivities: (offset, limit) => activitiesServicePrivate.get(`/activities/getAllActivities?offset=${offset}&limit=${limit}`),
  getActivityById: (p) => activitiesServicePrivate.get(`/activities/getActivityById/${p}`),
  createActivities: (p) => activitiesServicePrivate.post('/activities/createActivities', p),
  updateActivities: (p) => activitiesServicePrivate.put('/activities/updateActivities', p),
  deleteActivities: (p) => activitiesServicePrivate.delete('/activities/deleteActivities', p),

  getSubActivities: (offset, limit) => activitiesServicePrivate.get(`/activities/getSubActivities?offset=${offset}&limit=${limit}`),
  getSubActivitiesByIdActivity: (p, offset, limit) => activitiesServicePrivate.get(`/activities/getSubActivitiesByIdActivity/${p}?offset=${offset}&limit=${limit}`),
  createSubActivities: (p) => activitiesServicePrivate.post('/activities/createSubActivities', p),
  updateSubActivities: (p) => activitiesServicePrivate.put('/activities/updateSubActivities', p),
  deleteSubActivities: (p) => activitiesServicePrivate.delete('/activities/deleteSubActivities', p),
}
