import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Divider,
} from "@material-ui/core";
import styles from "./Forgot.module.css";
import firebase, { auth } from "./../firebase-component/firebase";
import illustration from './../images/forgot.jpg'
import { Spinner } from "react-bootstrap";




const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const [spinner, setSpinner] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    setSpinner(true)
    event.preventDefault();
    const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const result = validation.test(email);

    if (result) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setMessage("Check your email to reset password");
          setSpinner(false);
        })
        .catch(() => {
          setMessage("Please Retry");
          setSpinner(false);
        });
    } else {
      setMessage("incorrect email");
    }
  };
  return (
    <div className={styles.forgotPassword}>
      <Container className={styles.container} maxWidth="sm">
        <form action="">
          <div className={styles.illustration}>
            <img src={illustration} alt="" />
          </div>
          <div className={styles.typo}>
            <Typography className={styles.typo} variant="h5">
              Forgot Password
            </Typography>
          </div>

          <Divider className={styles.divider} variant="middle" />
          <TextField
            id="outlined-basic"
            label="enter Email"
            name="email"
            variant="outlined"
            onChange={handleChange}
            className={styles.textField}
          />
          <Typography style={{ color: "red" }}>{message}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={styles.btn}
            onClick={handleSubmit}
          >
            {spinner ? (
              <Spinner
                as="span"
                animation="border"
                variant="light"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
