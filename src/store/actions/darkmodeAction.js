import { createSlice } from '@reduxjs/toolkit'

export const darkmodeAction = createSlice({
  name: 'darkmode',
  initialState: {
    mode: 'light'
  },
  reducers: {
    switchMode: (state, action) => {
      state.mode = action.payload
    },
  }
})
export const { switchMode } = darkmodeAction.actions
export default darkmodeAction.reducer
