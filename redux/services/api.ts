import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import {REHYDRATE} from "redux-persist";
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiUrl;


export const api = createApi({

    reducerPath: 'splitApi',

    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl + 'api/',

        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', token)

            }
            return headers
        },
    }),



    // extractRehydrationInfo(action, {reducerPath}) {
    //     if (action.type === REHYDRATE) {
    //         return action.payload?.[reducerPath]
    //     }
    // },
    //
    // tagTypes: ['Profile', 'Publications', 'Categories','Shops','Products', "Tag", "Orders",'Reports','ProfileAll',"Events","ShopsStripe"],


    endpoints: (builder) => ({}),

})
