import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavLinks.module.css';

const NavLinks = (props) => {
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
          exact
        >
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/u1/places"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          My Places
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/places/new"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Add Places
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Authenticate
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
