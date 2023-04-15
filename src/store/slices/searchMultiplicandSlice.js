import { createSlice } from "@reduxjs/toolkit";

const searchMultiplicandSlice = createSlice({
    name: "searchMultiplicand",
    initialState: {
        searchMultiplicand: 0
    },
    reducers: {
        changeSearchMultiplicand: (state, action) => {
            state.searchMultiplicand = action.payload;
        }
    }
});

export const { changeSearchMultiplicand } = searchMultiplicandSlice.actions;
export const searchMultiplicandReducer = searchMultiplicandSlice.reducer;