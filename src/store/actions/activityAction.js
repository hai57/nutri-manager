import { createSlice } from '@reduxjs/toolkit'

export const activityAction = createSlice({
  name: 'getActivity',
  initialState: {
    activity: {
      id: "",
      name: ""
    }
  },
  reducers: {
    setSelf: (state, action) => {
      state.user = action.payload
    },
  }
})
export const { setA } = selfAction.actions
export default selfAction.reducer
