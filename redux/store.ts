import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import articleReducer from '../redux/articleSlice';
import categoryReducer from '../redux/categorySlice';
import userReducer from '../redux/userSlice';

const rootReducer = combineReducers({
    articleReducer,
    categoryReducer,
    userReducer
});

const masterReducer = (state: any, action: any) => {
    if(action.type === HYDRATE){
        const newState = {
            ...state,
            articleReducer: {
                articles: action.payload.articleReducer.articles
            },
            categoryReducer: {
                categories: action.payload.categoryReducer.categories
            }
        }
        return newState;
    }
    else{
        return rootReducer(state, action)
    }
}

export const store = configureStore({
    reducer: masterReducer
});

export const wrapper = createWrapper(() =>store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch