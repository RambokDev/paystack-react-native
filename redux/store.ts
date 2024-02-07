// import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query'
// import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'

import {api} from "./services/api";
import transactions from "./slices/transactions";

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    payment: transactions.reducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    // reducer: persistedReducer,
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

// export let persistor = persistStore(store)