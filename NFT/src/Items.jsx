import React, { useEffect } from 'react';
import styles from './Items.module.css'

export const Items = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/items")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.container}>
      {data.map((d, id) => (
          <ul key={id}>
            <li>{d.name}</li>
            <li>Level: {d.description}</li>
            <li>Coins: {d.price}</li>
          </ul>
        ))}
    </div>
  )
}
