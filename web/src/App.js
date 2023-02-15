import { useMutation, useQuery } from "@apollo/client";
import './App.css';
import { GET_USERS, ADD_USER, REMOVE_USER } from './graphql/queries';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function App() {
  const { register, handleSubmit } = useForm();
  const { data } = useQuery(GET_USERS)
  const [addUser] = useMutation(ADD_USER)
  const [removeUser] = useMutation(REMOVE_USER)
  const usersArr = data?.getUsers
  const [users, setUsers] = useState(usersArr)

  const onSubmit = (item) => {
    addUser({
      variables: item
    }) 

    setUsers([...users, item])
  }

  const removeItem = (index, id) => { 
    console.log(id)
    removeUser({
      variables: {
        id: Number(id)
      }
    })

    setUsers((oldUser) => {
      return oldUser.filter((_, i) => i !== index)
    })
  }

   useEffect(() => {
	 	setUsers(usersArr)
	 }, [usersArr])

  return (
    <div>
      <h1>Add users</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <input  {...register("name")} />      
      <input {...register("email")} />
      <input {...register("jobtitle")} />
      
      <button type="submit">Add user</button>

      <h1>Users</h1>

     {users?.map(({id, name, email }, index) => ( 
      <div key={id} onClick={() => removeItem(index, id)}>
      <span > {name}</span>
      <span> {email} </span>
      </div>
    ))}
    </form>
    </div>
  )
}

export default App;
