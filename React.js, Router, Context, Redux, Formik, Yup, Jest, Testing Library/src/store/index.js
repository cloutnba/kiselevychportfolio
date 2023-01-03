import {configureStore} from "@reduxjs/toolkit";
import {itemsReducer} from "../reducers";

const store = configureStore({
    reducer: {
        items: itemsReducer,
    }
})

export default store;
