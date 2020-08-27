import React, { Component } from 'react';
import styles from './Body.module.css'

import { Typography } from '@material-ui/core';
const SimpleSecureSeamless = () => {
    return (
      <div className={styles.SimpleSecureSeamless}>
        <Typography variant="h3">
          Simple. Secure. Easy.
        </Typography>
        <Typography variant="p" >
          It’s our mission to provide you with a delightful crypto trading
          experience!
        </Typography>
      </div>
    );
}
 
export default SimpleSecureSeamless
