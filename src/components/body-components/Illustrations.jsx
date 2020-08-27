import React, { Component } from "react";
import styles from "./Body.module.css";
import { Grid, Typography } from "@material-ui/core";
import illustration1 from "./../images/illusration.jpg";

const Illustrations = () => {
  return (
    <div className={styles.illustrations}>
      <Grid container spacing={5} className={styles.illustration}>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration1} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a delightful crypto trading
            experience!
          </Typography>
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration1} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a delightful crypto trading
            experience!
          </Typography>
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration1} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a delightful crypto trading
            experience!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Illustrations;
