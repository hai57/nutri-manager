import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterAction from '@/store/actions/commonAction.js'

// reducers
const rootReducer = combineReducers({
  counterAction: counterAction,
})

export const store = configureStore({
  reducer: rootReducer,
})
