import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReduces";
import ExpensesReducers from './ExpensesReducers'
 const store=configureStore({
    reducer:{
        auth:AuthReducer,
        Expence:ExpensesReducers
    }
})

export default store;




