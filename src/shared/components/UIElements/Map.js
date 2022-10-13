import React from 'react';

import styles from './Map.module.css';

const Map = (props) => {
  return (
    <div
      className={`${styles.map} ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
