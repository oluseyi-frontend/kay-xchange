import React, { Component, useContext } from "react";

import firebase from "./../firebase-component/firebase";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { DataCentral } from "./../context-component/Context";
import { Divider, TextField, Container, Typography, Card, CardContent, CardActions } from "@material-ui/core";
import styles from "./BankAccount.module.css";
import illustration from './../images/transaction.jpg'
const BuyingBankForm = ({ match }) => {
  const id = match.params.id;
  const fiatValue = match.params.fiatValue;
  const currencyName = match.params.currencyName;
  const currencyQuantity = match.params.currencyQuantity;
  const history = useHistory();
  const { currentUser, user } = useContext(DataCentral);
  const [name, setName] = useState(currentUser.firstName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phoneNumber);
  const [publicKey, setPublicKey] = useState(
    "pk_test_541e67ddb4b18d513cfa4d67ed80165fbe9c51b8"
  );
  const [amount, setAmount] = useState(parseInt(fiatValue) * 100);
  const [walletID, setWalletID] = useState("");
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      history.push("/user-profile");
      alert("Thanks for doing business with us! Come back soon!!");
      firebase.firestore().collection(user.uid).doc(id).set({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phoneNumber,
        walletID: walletID,
        state: "paid",
        IdType: currentUser.typeOfId,
        id: id,
        status: "pending",
        currencyName: currencyName,
        currencyQuantity: currencyQuantity,
        fiatValue: fiatValue,
      });
    },

    onClose: () => alert("Wait! Don't leave :("),
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "walletID") {
      setWalletID(value);
    }
  };
  return (
    <div className={styles.buyingBankForm}>
      <Container maxWidth="sm" className={styles.buyingContainer}>
        <Card className={styles.myCard}>
          <CardContent>
            <div className={styles.illustration}>
              <img src={illustration} alt="" />
            </div>
            <div className={styles.heading}>
              <Typography varient="h6">COMPLETE TRANSACTION</Typography>
            </div>
            <Divider className={styles.divider2} variant="middle" />
            <div className={styles.cryptoAddress}>
              <TextField
                className={styles.address}
                id="outlined-basic"
                label="Crypto Address"
                variant="outlined"
                name="walletID"
                onChange={handleChange}
              />
              <Typography style={{ color: "red", marginTop: ".5rem" }}>
                NB: Please double check address before paying
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <div className={styles.paystackBtn}>
              <PaystackButton {...componentProps} className={styles.mainBtn} />
            </div>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default BuyingBankForm;
