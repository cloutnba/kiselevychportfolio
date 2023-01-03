import {createSlice} from "@reduxjs/toolkit";
import getData from "../helpers/getData";

const initialState = {
    items: [],
    isModal: false,
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        actionSetItems: (state, action) => {
            state.items = [...action.payload];
        },
        actionHandleModal: (state, action) => {
            state.isModal = action.payload;
        },
        actionClearCart: () => {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }
});

export const {actionSetItems ,actionHandleModal, actionClearCart} = itemsSlice.actions;

export const actionFetchItems = () => (dispatch) => {
    return getData()
        .then(data => {
            dispatch(actionSetItems(data));
        })
}

export const actionSetModal = (isModal) => (dispatch) => {
    return dispatch(actionHandleModal(!isModal));
}

export default itemsSlice.reducer;
