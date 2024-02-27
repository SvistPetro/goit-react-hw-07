import { configureStore } from '@reduxjs/toolkit'
import { contactsReducer } from './contactsSlice'
import { filterReducer } from './filterSlice'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist'

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filters: filterReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);