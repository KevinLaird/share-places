import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import styles from './PlaceItem.module.css';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const toggleMapHandler = () => setShowMap((prevShowMap) => !prevShowMap);

  const toggleShowDeleteHandler = () => {
    setShowConfirmModal((prevShowDeleteHandler) => !prevShowDeleteHandler);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE',
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
      <Modal
        show={showConfirmModal}
        onCancel={toggleShowDeleteHandler}
        header="Are you sure?"
        footerClass={styles.modalActions}
        footer={
          <>
            <Button inverse onClick={toggleShowDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone.
        </p>
      </Modal>
      <li className={styles.placeItem}>
        <Card className={styles.content}>
          {isLoading && <LoadingSpinner asOverlay />}
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
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={toggleShowDeleteHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
