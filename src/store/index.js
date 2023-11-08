import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterAction from '@/store/actions/commonAction.js'
import darkmodeAction from '@/store/actions/darkmodeAction.js'

// reducers
const rootReducer = combineReducers({
  counterAction: counterAction,
  darkmodeAction: darkmodeAction
})

export const store = configureStore({
  reducer: rootReducer,
})
