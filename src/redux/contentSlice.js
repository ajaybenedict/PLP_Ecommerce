import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    page: 1,
    hasMore: true,
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.items = [...state.items, ...action.payload];
        },
        increamentPage: (state) => {
            state.page += 1;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        }
    },
});

export const { setContent, increamentPage, setHasMore } = contentSlice.actions;
export default contentSlice.reducer;
