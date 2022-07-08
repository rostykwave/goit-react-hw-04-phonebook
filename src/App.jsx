import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './components/ContactList';
import { Container } from './components/Container';
import { Filter } from './components/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';
import defaultContacts from 'data/defaultContacts.json';
import * as CONSTANTS from 'constants';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(
    CONSTANTS.CONTACTS_lS_KEY,
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
