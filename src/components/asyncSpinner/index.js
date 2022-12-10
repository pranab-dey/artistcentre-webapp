import React from 'react';

import styles from './spinner.module.scss';

function AsyncSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loader__container}>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}

export default AsyncSpinner;
