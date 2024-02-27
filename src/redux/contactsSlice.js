import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contactList: []
    },
    reducers: {
        addContact: (state, action) => {
            state.contactList.push(action.payload)},
        deleteContact: (state, action) => {
            const index = state.contactList.findIndex(task => task.id === action.payload);
            state.contactList.splice(index, 1)
        }
    }
})

export const { addContact, deleteContact }= contactsSlice.actions;

const persistBalanceConfig = {
    key: 'root',
    storage,
  };

export const contactsReducer = persistReducer(persistBalanceConfig, contactsSlice.reducer);