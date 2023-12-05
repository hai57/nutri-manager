import { storage } from '@/utils/storage';

const API_ROOT = import.meta.env.VITE_BASE_API;
const configHeader = {
  headers : {
    'Content-Type': 'application/json',
  },
  baseURL: API_ROOT,
};


const useApiCMS = (useToken = false) => {
  const token = storage.get('token')
  if (useToken) {
    let tempConfig = {...configHeader}
    tempConfig.headers = {
      ...configHeader.headers,
      'Authorization' : `Bearer ${token}`
    }
    return tempConfig
  }
  return configHeader
}

const onRequestFulfilled = config => {
  return config
}
const onRequestRejected = error => {
  return Promise.reject(error)
}

const onFulfilled = response => {
  return Promise.resolve({
    ...response.data,
    success: true
  })
  // if (response.data.code === 0 || response.data.result === 1) {

  // } else {
  //   const errors = response.data?.errors || []
  //   return Promise.reject(errors)
  // }
}

const onRejected = err => {
  const { status } = err?.response || {}
  if (status === 400) {
    return  Promise.reject('error 400')
  } else if (status === 500) {
    return  Promise.reject('error 500')
  } else {
    return  Promise.reject('error')
  }
}

export { onRequestRejected, onRequestFulfilled, onFulfilled, onRejected, useApiCMS }
