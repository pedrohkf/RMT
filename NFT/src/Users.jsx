import { func } from "prop-types";
import React, { useEffect } from "react";
import styles from './Users.module.css';

export const Users = () => {
  const [userID, setUserID] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, [userID]);

  useEffect(() => {
    fetch("http://localhost:8081/userItemsID", userID)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, [userID]);

  const handleChange = (e) => {
    
    setUserID(e.target.value);
  };

  function enviarID(e){
    e.preventDefault();
    fetch(`http://localhost:8081/userItemsID?userID=`+ userID)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <input
        type="number"
        name="inputNumber"
        onChange={handleChange}
        placeholder="1"
      />
      <br />
      {userID}
      {users.map((d, id) => (
        <ul key={id}>
          <li>{d.username}</li>
          <li>Level: {d.level}</li>
          <li>Coins: {d.coin}</li>
        </ul>
      ))}
      <br />

      {items.map((d, id) => (
        <ul key={id}>
          <li>{d.name}</li>
          <li>{d.price}</li>
          <li>{d.description}</li>
        </ul>
      ))}

      <button onClick={enviarID}>Buscar</button>
    </div>
  );
};
