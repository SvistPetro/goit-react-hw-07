import { useSelector } from 'react-redux'
import Form from './components/Form/Form'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
import { selectContactList } from './redux/selectors'


const App = () => {
  const contacts = useSelector(selectContactList);

  return (
    <div>
      <h1>Phonebook</h1>
      <Form />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
          <>
            <Filter />
            <ContactList />
          </>) : (
          <p>Your phonebook is empty. Add first contact!</p>
        )
      }
    </div>
  )
}

export default App
