/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useApiCMS, onRequestFulfilled, onRequestRejected, onFulfilled, onRejected } from '@/api'

const privateApi = useApiCMS(true)
const activitiesServicePrivate = axios.create(privateApi)

activitiesServicePrivate.interceptors.request.use(onRequestFulfilled, onRequestRejected)
activitiesServicePrivate.interceptors.response.use(onFulfilled, onRejected)

export const activitiesServiceApi = {
  getAllActivities: (offset, limit) => activitiesServicePrivate.get(`/activities/get-all-activities?offset=${offset}&limit=${limit}`),
  getActivityById: (p) => activitiesServicePrivate.get(`/activities/get-activity-by-id/${p}`),
  createActivities: (p) => activitiesServicePrivate.post('/activities/create-activities', p),
  updateActivities: (p) => activitiesServicePrivate.put('/activities/update-activities', p),
  deleteActivities: (p) => activitiesServicePrivate.delete('/activities/delete-activities', p),

  getSubActivities: (offset, limit) => activitiesServicePrivate.get(`/activities/get-subactivities?offset=${offset}&limit=${limit}`),
  getSubActivitiesByIdActivity: (p, offset, limit) => activitiesServicePrivate.get(`/activities/get-subactivities-by-id-activity/${p}?offset=${offset}&limit=${limit}`),
  createSubActivities: (p) => activitiesServicePrivate.post('/activities/create-subactivities', p),
  updateSubActivities: (p) => activitiesServicePrivate.put('/activities/update-subactivities', p),
  deleteSubActivities: (p) => activitiesServicePrivate.delete('/activities/delete-subactivities', p),
}
