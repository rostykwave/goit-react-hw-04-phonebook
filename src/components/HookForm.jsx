import { useState, useEffect } from 'react';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = e => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log('Use');
  }, []);
  useEffect(() => {
    console.log('Use name');
  }, [name]);

  return (
    <form autoComplete="off">
      <label>
        <span>Name</span>
        <input type="text" name="name" onChange={handleChange} value={name} />
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
