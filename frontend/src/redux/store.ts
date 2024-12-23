import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './userSlice';
import adminSlice from './adminSlice';
import storeSlice from './storeSlice';

//User for persist store
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

//Main slices to store data
const rootReducer = combineReducers({
    user: userSlice,
    admin: adminSlice,
    store: storeSlice,
});

//Persisting store
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;