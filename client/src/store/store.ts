import {configureStore} from "@reduxjs/toolkit";
import userReducer from './user/slice';
import catalogReducer from './catalog/slice';


const store = configureStore({
    reducer: {
        user:userReducer,
        catalog:catalogReducer
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;