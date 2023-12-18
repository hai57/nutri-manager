import { createSlice } from '@reduxjs/toolkit'

export const authorizeAction = createSlice({
  name: 'authorize',
  initialState: {
    authorize: false,
  },
  reducers: {
    isauthorize: state => {
      state.authorize = true
    },
    isNotauthorize: state => {
      state.authorize = false
    },
  }
})
export const { isauthorize, isNotauthorize } = authorizeAction.actions
export default authorizeAction.reducer
