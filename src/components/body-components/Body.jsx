import React, { Component } from "react";
import SimpleSecureSeamless from "./SimpleSecureSeamles";
import styles from './Body.module.css'
import Illustrations from "./Illustrations";
import BeforeFooter from "./BeforeFooter";
const Body = () => {
  return (
    <div className={styles.body}>
      <div className={styles.bodyContainer}>
        <SimpleSecureSeamless />
        <Illustrations/>
      </div>
      <BeforeFooter/>
    </div>
  );
};

export default Body;
