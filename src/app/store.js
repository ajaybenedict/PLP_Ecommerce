import { configureStore } from "@reduxjs/toolkit";
import contentReducer from '../redux/contentSlice';

export const store = configureStore({
    reducer: {
        content: contentReducer,
    },
});
