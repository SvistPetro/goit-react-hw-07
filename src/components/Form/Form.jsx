import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/operations'
import { selectContactList } from '../../redux/selectors'
import css from './Form.module.css'
import { nanoid } from 'nanoid'

const Form = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContactList);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onChangeName = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'phone':
                setPhone(value);
                break;

            default:
                return;
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const id = nanoid().toString();
        const formName = name.trim().toString();
        const formPhone = phone.trim().toString();
        const finalFormData = {id, name: formName, phone: formPhone};

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
        setPhone('');
    }

    return (
        <form className={css.form} onSubmit={onSubmitForm}>
            <label htmlFor="name" className={css.label}>
                <span className={css.name}>Name</span>
                <input type="text" name="name" className={css.input} value={name} onChange={onChangeName} required />
            </label>
            <label htmlFor="phone" className={css.label}>
                <span className={css.name}>Number</span>
                <input type="tel" name="phone" className={css.input} value={phone} onChange={onChangeName} required />
            </label>
            <button type="submit" className={css.button}>Add contact</button>
        </form>
    )
}

export default Form