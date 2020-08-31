import React from "react";
import styles from "./Footer.module.css";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  FaTelegram,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Grid container spacing={1} className={styles.illustration}>
          <Grid item md={4} sm={12} xs={12} className={styles.arrGrid}>
            &#169;2020 Kaymax All Rights Reserved
          </Grid>
          <Grid item md={4} sm={12} xs={12} className={styles.grid}>
            <Link to="/faq">FAQ</Link>
          </Grid>
          <Grid item md={4} sm={12} xs={12} className={styles.anchorGrid}>
            <a variant="body2" href="https://www.facebook.com/alawiye.kayode">
              <FaFacebookF />
            </a>
            <a variant="body2" href="https://www.twitter.com/_oluseyi__">
              <FaTwitter />
            </a>
            {/* <a variant="body2" href="https://www.instagram.com">
              <FaInstagram />
            </a> */}
            <a
              variant="body2"
              href="https://t.me/joinchat/TpfU4xc4ycQRSZF4glgoag"
            >
              <FaTelegram />
            </a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
