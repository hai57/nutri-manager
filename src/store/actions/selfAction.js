import { createSlice } from '@reduxjs/toolkit'

export const selfAction = createSlice({
  name: 'self',
  initialState: {
    user: {
      id: "",
      username: "",
      gender: "",
      gmail: "",
      birthday: "",
      weight: "",
      height: ""
    }
  },
  reducers: {
    setSelf: (state, action) => {
      state.user = {
        ...state.user,
        // Cập nhật các giá trị mới từ action.payload
        ...action.payload
      };
    },
  }
})
export const { setSelf } = selfAction.actions
export default selfAction.reducer
