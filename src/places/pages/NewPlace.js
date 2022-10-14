import React from 'react';
import Input from '../../shared/components/FormElements/Input';

import styles from './NewPlace.module.css';

const NewPlace = () => {
  return (
    <form className={styles.placeForm}>
      <Input element="input" type="text" label="Title" validators={[]} />
      hello world
    </form>
  );
};

export default NewPlace;
