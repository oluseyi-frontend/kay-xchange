import React, { Component, useContext } from 'react';
import { DataCentral } from './../context-component/Context';
import styles from './Login.module.css'
import { TextField, Container } from '@material-ui/core';


const Login = () => {
    const { user, setUser } = useContext(DataCentral);
    
    return (
      <div className={styles.login}>
        <Container className={styles.container} maxWidth="sm">
          <h4>COMING SOON....I AM BEING DEVELOPED</h4>
        </Container>
      </div>
    );
}
 
export default Login;