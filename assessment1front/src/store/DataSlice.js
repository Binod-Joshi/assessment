import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    response: null,
    error: null,
    allUserList: [],
}

const DataSlice = createSlice({
    name:"test",
    initialState,
    reducers: {
        authRequest: (state) =>{
            state.loading = true;
            state.status = "loading";
        },
        authSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.status = "success";
        },
        authLogout:(state) => {
            state.status = 'idle'
            state.loading = false;
            state.currentUser = null;
            state.response = null;
            state.error = null;
            localStorage.clear();
        },
        authFailed:(state,action) => {
            state.loading = false;
            state.status = "failed";
            state.response = action.payload;
        },
        authError:(state,action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        },
        authListOfUser:(state,action) => {
            state.loading = false;
            state.allUserList = action.payload;
        }
    }
});

export const {authRequest,authFailed,authSuccess,authError,authListOfUser,authLogout} = DataSlice.actions;
export const dataReducer = DataSlice.reducer;