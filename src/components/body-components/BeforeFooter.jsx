import React, { Component } from "react";
import styles from "./Body.module.css";
import { Typography, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

const BeforeFooter = () => {
  return (
    <div className={styles.beforeFooter}>
      <div className={styles.beforeFooterContainer}>
        <Typography className={styles.beforeFootertypo} variant="h6">
          Ready to start trading with us ?
        </Typography>
        <Typography className={styles.beforeFootertypo} variant="h5">
          Create your account for free and start buying and selling
          cryptocurrency today
        </Typography>
          <Link to="/createAccount" className={styles.btnDiv}>
            <Button variant="contained" className={styles.btn} color="primary">
              Create a Free Account
            </Button>
          </Link>
      </div>
    </div>
  );
};

export default BeforeFooter;
