import { useDispatch, useSelector } from 'react-redux'
import { selectFilters } from '../../redux/selectors'
import { selectContactsState } from '../../redux/selectors'
import { fetchContacts, deleteContact } from '../../redux/operations'
import css from './ContactList.module.css'
import { useEffect } from 'react'

const ContactList = () => {
    const dispatch = useDispatch();
    const { contactList, loading, error } = useSelector(selectContactsState);
    const filter = useSelector(selectFilters);

    const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

    useEffect(() => {
        dispatch(fetchContacts());
    },[dispatch])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong...</p>}
            {!loading && contactList.length === 0 && <p>Your phonebook is empty. Add first contact!</p>}
            {filteredContacts.length > 0 && (
                <ul>
                    {filteredContacts.map(contact => {
                        return (
                            <li key={contact.id} className={css.list}>
                                <span className={css.name}>{contact.name}:</span>
                                <span className={css.phone}>{contact.phone}</span>
                                <button className={css.button} onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default ContactList