import { createSlice } from "@reduxjs/toolkit";

const multiplicationFormSlice = createSlice({
    name: "multiplicationForm",
    initialState: {
        multiplicand: 0,
        limit: 0
    },
    reducers: {
        changeMultiplicand: (state, action) => {
            state.multiplicand = action.payload;
        },
        changeLimit: (state, action) => {
            state.limit = action.payload;
        }
    }
});

export const { changeMultiplicand, changeLimit } = multiplicationFormSlice.actions;
export const multiplicationFormReducer = multiplicationFormSlice.reducer;