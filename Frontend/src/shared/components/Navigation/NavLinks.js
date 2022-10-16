import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import styles from './NavLinks.module.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
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
        </>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Authenticate
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
