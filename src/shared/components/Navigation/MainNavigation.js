import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import styles from './MainNavigation.module.css';
import SideDrawer from './SideDrawer';

const MainNavigation = (props) => {
  return (
    <>
      <SideDrawer>
        <nav className={styles.drawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={styles.menuBtn}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={styles.title}>
          <Link to="/">Your Places</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
