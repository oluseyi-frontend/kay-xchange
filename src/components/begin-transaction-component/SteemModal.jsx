import React, { Component } from 'react';
import { useState } from "react";
import { 
  FormControl,
  TextField,
  Select,
  Button,
  InputLabel,
  Typography,
    Snackbar,
    Avatar,
  Card
} from "@material-ui/core";
import styles from './SellModal.module.css'
import { GrClose } from "react-icons/gr";
import { db } from './../firebase-component/firebase';
const SteemModal = ({
  currencyQuantity,
    CURRENCY_NAME,
    handleClose,
  bankName,
  accountName,
  accountNumber,
  ID,
}) => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmitToDb = () => {
    db.collection("orders")
      .doc(ID)
      .set({
        value: currencyQuantity,
        bankName: bankName,
        accountName: accountName,
        accountNumber: accountNumber,
        memo: ID,
        username: username,
        currencyName: CURRENCY_NAME
      })
      .then(() => {
        console.log("document written");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <Card className={styles.mySteemCard}>
          <div className={styles.headingText}>
            <Typography
              color="textSecondary"
              variant="h5"
              component="h5"
              gutterBottom
            >
              Complete Transaction
            </Typography>
            <Avatar className={styles.red} onClick={handleClose}>
              <GrClose />
            </Avatar>
          </div>
          <FormControl variant="contained">
            <TextField
              id="outlined-basic"
              label="steem username"
              variant="outlined"
              name="steem username"
              onChange={handleChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined">
            <a
              href={`https://hivesigner.com/sign/transfer?from=${username}&to=kay1&amount=${currencyQuantity}%20STEEM&memo=${ID}`}
              variant="contained"
              color="primary"
              onClick={handleSubmitToDb}
            >
              connect to steem connect
            </a>
          </FormControl>
        </Card>
      </div>
    </div>
  );
};
 
export default SteemModal;