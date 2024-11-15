import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    storeData: null,
    itemData: [],
};

// Creating the slice
const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        // Define the setUser reducer with a typed action payload
        setStoreData: (state, action) => {
            state.storeData = action.payload;
        },
        setItemsData: (state, action)=>{
            state.itemData = action.payload;
        }
    },
});

// Exporting actions and userSlice reducer for storing
export const { setStoreData, setItemsData } = storeSlice.actions;
export default storeSlice.reducer;