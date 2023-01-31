import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from 'react';
import './App.css';
import { GET_USERS, UPDATE_EMAIL } from './graphql/queries';

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [update] = useMutation(UPDATE_EMAIL);
  const [editing, setEditing] = useState(0);
  const [newEmail, setNewEmail] = useState("")

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const updateEmail = (id) => {

    update({ variables: { id: ~~id, email: newEmail } })

    alert("E-mail atualizado");

    const newData = data.getUsers.map(item => {
      if (item.id === id) {
        return {
          ...item,
          email: newEmail
        }
      }

      return item;
    })

    console.log(newData)

    setEditing(0);
  }

  return data.getUsers.map(({ id, name, email }) => (
    <div key={id}>
      <h3>{name}</h3>
      <br />
      <b>About this location:</b>
      <p onClick={() => setEditing(id)}>{email}</p>

      {editing === id && <div>
        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />

        <button onClick={() => updateEmail(id)}>Salvar</button>
      </div>}
      <br />
    </div>
  ));
}

export default App;
