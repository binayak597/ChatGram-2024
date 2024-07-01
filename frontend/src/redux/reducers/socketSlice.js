import {createSlice} from "@reduxjs/toolkit";


const INITIAL_STATE={
    socket: null,
    onlineUsers: []
}

const socketSlice = createSlice({
    name: "socket",
    initialState: INITIAL_STATE,
    reducers: {

        getSocketConnection: (state, action) => {
            // console.log(action.payload);
            state.socket = action.payload;
        },
        resetSocketConnection: (state, action) => {
            state.socket = null;
        },

        getOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export default socketSlice.reducer;

export const {getSocketConnection, resetSocketConnection, getOnlineUsers} = socketSlice.actions;

export const socketSelector = (state) => state.socketReducer;