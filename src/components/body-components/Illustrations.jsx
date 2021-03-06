import React, { Component } from "react";
import styles from "./Body.module.css";
import { Grid, Typography } from "@material-ui/core";
import illustration1 from "./../images/illusration.jpg";
import illustration2 from "./../images/4560.jpg";
import illustration3 from "./../images/front.jpg";

const Illustrations = () => {
  return (
    <div className={styles.illustrations}>
      <Grid container spacing={5} className={styles.illustration}>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration1} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a simple and delightful crypto trading
            experience!
          </Typography>
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration2} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a secure and delightful crypto trading
            experience!
          </Typography>
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={styles.grid}>
          <img src={illustration3} alt="" />
          <Typography className={styles.typo} variant="p">
            It’s our mission to provide you with a easy and delightful crypto trading
            experience!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Illustrations;
