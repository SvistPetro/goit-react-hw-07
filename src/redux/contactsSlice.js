import {  createSlice } from '@reduxjs/toolkit'
import { fetchContacts, deleteContact, addContact } from './operations'

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contactList: [],
        loading: false,
        error: false
    },
    extraReducers: builder => 
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.contactList = action.payload;
                
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.contactList = state.contactList.filter(contact => contact.id !== action.payload.id);
            })
            .addCase(deleteContact.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.contactList.push(action.payload);
            })
            .addCase(addContact.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
})

export const contactsReducer = contactsSlice.reducer