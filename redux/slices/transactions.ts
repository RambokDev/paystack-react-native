import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    success: false
}

const transactions = createSlice({

    name: 'payment',
    initialState: initialState,

    reducers: {
        paymentSucceeded(state) {
            state.success = true
        },

    }
})

export const {paymentSucceeded} = transactions.actions
export default transactions