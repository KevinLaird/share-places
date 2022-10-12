import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={toggleDrawer} />}
      <SideDrawer show={drawerIsOpen}>
        <nav className={styles.drawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={styles.menuBtn} onClick={toggleDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={styles.title}>
          <Link to="/">Your Places</Link>
        </h1>
        <nav className={styles.headerNav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
