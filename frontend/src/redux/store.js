import { configureStore } from "@reduxjs/toolkit";
import  messageReducer  from "./reducers/messageSlice";
import socketReducer from "./reducers/socketSlice"


const store = configureStore({
    reducer: {
        messageReducer,
        socketReducer
    }
});

export default store;