import { useState, useEffect } from 'react';
import { ContactForm } from './components/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './components/ContactList';
import { Container } from './components/Container';
import { Filter } from './components/Filter';
import { SignUpForm } from 'components/HookForm';
import defaultContacts from 'data/defaultContacts.json';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export const App = () => {
  const CONTACTS_lS_KEY = 'savedContacts';

  const [contacts, setContacts] = useLocalStorage(
    CONTACTS_lS_KEY,
    defaultContacts
  );

  const [filter, setFilter] = useState('');

  const addContactHandler = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      ...data,
    };

    setContacts(state => [contact, ...state]);
  };

  const deleteContactHandler = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const onFilterHandler = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <SignUpForm />
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={addContactHandler} />

      <h1>Contacts</h1>
      <Filter value={filter} onChange={onFilterHandler} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContactHandler}
      />
    </Container>
  );
};
