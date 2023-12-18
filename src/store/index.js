import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterAction from '@/store/actions/commonAction.js'
import darkmodeAction from '@/store/actions/darkmodeAction.js'
import authorizeAction from '@/store/actions/authorzeAction.js'
import selfAction from '@/store/actions/selfAction.js'

// reducers
const rootReducer = combineReducers({
  counterAction: counterAction,
  darkmodeAction: darkmodeAction,
  authorizeAction: authorizeAction,
  selfAction: selfAction
})

export const store = configureStore({
  reducer: rootReducer,
})
