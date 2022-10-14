import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

import styles from './PlaceItem.module.css';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMapHandler = () => setShowMap(!showMap);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass={styles.modalContent}
        footerClass={styles.modalActions}
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className={styles.mapContainer}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <li className={styles.placeItem}>
        <Card className={styles.content}>
          <div className={styles.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={styles.info}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={styles.actions}>
            <Button inverse onClick={toggleMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
