import{configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Features/User";
import postReducer from "../Features/PostSlice";
export const Store= configureStore({
    reducer:{
        users: usersReducer,
        posts: postReducer,
    },
});