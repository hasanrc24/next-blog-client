import {createSlice} from '@reduxjs/toolkit';
import { RootState } from './store';

export const articleSlice  = createSlice({
    name: 'article',
    initialState: {
        articles: []
    },
    reducers: {
        allArticles: (state, action) => {
            state.articles = action.payload
        }
    }
})

export const {allArticles} = articleSlice.actions;
export const articleSubscribe = (state: RootState) => state.articleReducer;
export default articleSlice.reducer;