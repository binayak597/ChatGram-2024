import {createSlice} from "@reduxjs/toolkit";


const INITIAL_STATE = {

    //user -> to whom loggedInUser wants to  communicate
    selectedUser: null,
    
    //messages -> messages between selectedUser and loggedInUser

    messages: []
};


const messageSlice = createSlice({
    name: "message",
    initialState: INITIAL_STATE,
    reducers: {

        retrieveSelectedUser: (state, action) => {

            console.log(action.payload);

            state.selectedUser = action.payload;
        },

        retrieveMessages: (state, action) => {
            state.messages = action.payload
        },

        addNewMessage: (state,action) => {
            state.messages.push(action.payload);
        },

        resetSelectedUser: (state, action) => {
            state.selectedUser = null;
        }

    }

});

export default messageSlice.reducer;

export const {retrieveSelectedUser, retrieveMessages, resetSelectedUser, addNewMessage} = messageSlice.actions;

export const messageSelector = (state) => state.messageReducer;