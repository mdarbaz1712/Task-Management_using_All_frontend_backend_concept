import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth.js"
export const backend_url="https://task-manager-backend-e7jp.onrender.com/";
const store=configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store