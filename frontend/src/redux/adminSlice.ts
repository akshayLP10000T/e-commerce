import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    storeRequest: null,
};

// Creating the slice
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        // Define the setUser reducer with a typed action payload
        setStoreRequest: (state, action) => {
            state.storeRequest = action.payload;
        },
    },
});

// Exporting actions and userSlice reducer for storing
export const { setStoreRequest } = adminSlice.actions;
export default adminSlice.reducer;