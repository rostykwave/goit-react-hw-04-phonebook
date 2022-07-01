import { useState, useEffect } from 'react';
import { ContactForm } from './components/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './components/ContactList';
import { Container } from './components/Container';
import { Filter } from './components/Filter';
import { SignUpForm } from 'components/HookForm';

export const App = () => {
  const CONTACTS_lS_KEY = 'savedContacts';

  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(CONTACTS_lS_KEY)) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
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

  useEffect(() => {
    console.log('use APP');
    window.localStorage.setItem(CONTACTS_lS_KEY, JSON.stringify(contacts));
  }, [contacts]);

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

// const CONTACTS_lS_KEY = 'savedContacts';

// export class OLDApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem(CONTACTS_lS_KEY));

//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;

//     if (prevState.contacts !== contacts) {
//       localStorage.setItem(CONTACTS_lS_KEY, JSON.stringify(contacts));
//     }
//   }

//   addContactHandler = data => {
//     const { contacts } = this.state;
//     if (contacts.find(contact => contact.name === data.name)) {
//       alert(`${data.name} is already in contacts`);
//       return;
//     }

//     const contact = {
//       id: nanoid(),
//       ...data,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };

//   deleteContactHandler = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onFilterHandler = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <SignUpForm />
//         <h1>PhoneBook</h1>
//         <ContactForm onSubmit={this.addContactHandler} />

//         <h1>Contacts</h1>
//         <Filter value={filter} onChange={this.onFilterHandler} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContactHandler}
//         />
//       </Container>
//     );
//   }
// }
