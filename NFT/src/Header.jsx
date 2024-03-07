import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
        <nav className={`${styles.nav} container`}>
            <Link to="/">Home</Link>
            <Link to="/users">Players</Link>
            <Link to="/items">Itens</Link>
            <Link to="/login">Login</Link>
            <p><a href="">PLAY FOR FREE</a></p>
        </nav>
    </div>
  )
}
