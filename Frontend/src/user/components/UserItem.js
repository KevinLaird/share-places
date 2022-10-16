import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import styles from './UserItem.module.css';

const UserItem = (props) => {
  return (
    <li className={styles.userItem}>
      <Card className={styles.content}>
        <Link to={`/${props.id}/places`}>
          <div className={styles.image}>
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className={styles.info}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
