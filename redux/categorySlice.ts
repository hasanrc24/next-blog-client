import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: []
    },
    reducers: {
        allCategories: (state, action) => {
            state.categories =  action.payload
        }
    }
})

export const {allCategories} = categorySlice.actions;
export const categorySubscribe = (state: RootState) => state.categoryReducer;
export default categorySlice.reducer;