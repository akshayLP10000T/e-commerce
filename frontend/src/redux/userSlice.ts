import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state interface
interface UserState {
    user: User | null;
}

// initial state
const initialState: UserState = {
    user: null,
};

// Creating the slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Define the setUser reducer with a typed action payload
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
});

// Exporting actions and userSlice reducer for storing
export const { setUser } = userSlice.actions;
export default userSlice.reducer;