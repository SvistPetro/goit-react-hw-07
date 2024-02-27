import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/contactsSlice'
import { selectContactList } from '../../redux/selectors'
import css from './Form.module.css'
import { nanoid } from 'nanoid'



const Form = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContactList);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChangeName = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const id = nanoid().toString();
        const formName = name.trim().toString();
        const formNumber = number.trim().toString();
        const finalFormData = {id, name: formName, number: formNumber};

        const duplicate = contacts.some(contact => contact.name.toLowerCase() === formName.toLowerCase());
        if(duplicate) {
          alert(`${formName} is already in contacts`);
          return;
        }

        dispatch(addContact(finalFormData));
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <form className={css.form} onSubmit={onSubmitForm}>
            <label htmlFor="name" className={css.label}>
                <span className={css.name}>Name</span>
                <input type="text" name="name" className={css.input} value={name} onChange={onChangeName} required />
            </label>
            <label htmlFor="number" className={css.label}>
                <span className={css.name}>Number</span>
                <input type="tel" name="number" className={css.input} value={number} onChange={onChangeName} required />
            </label>
            <button type="submit" className={css.button}>Add contact</button>
        </form>
    )
}

export default Form