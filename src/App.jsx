import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);


    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        form.reset();
        const newUser = [...users, data];
        setUsers(newUser);
      })
  }

  return (
    <>
      <h1>Users Data</h1>
      <h2>Number of Users: {users.length}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Submit" />
      </form>
      {
        users.map(user => <h4 key={user.id}>Name: {user.name} Email: {user.email}</h4>)
      }
    </>
  )
}

export default App
