import React from 'react';

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
  return <aside className={styles.sideDrawer}>{props.children}</aside>;
};

export default SideDrawer;
