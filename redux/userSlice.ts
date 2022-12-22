import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
    name:'user',
    initialState: {
        user: {}
    },
    reducers: {
        userInfo: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {userInfo} = userSlice.actions;
export const userSubscribe = (state: RootState) => state.userReducer
export default userSlice.reducer;