import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import styles from './PlaceList.module.css';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${styles.placeList} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Places</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={styles.placeList}>
      {props.items.map((place) => (
        <PlaceItem
          key={props.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
