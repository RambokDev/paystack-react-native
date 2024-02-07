import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    success: false
}

const payment = createSlice({

    name: 'payment',
    initialState: initialState,

    reducers: {
        paymentSucceeded(state) {
            state.success = true
        },

    }
})

export const {paymentSucceeded} = payment.actions
export default payment