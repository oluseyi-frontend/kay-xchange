import React, { Component, useContext, useState } from "react";
import { DataCentral } from "./../context-component/Context";
import styles from "./Login.module.css";
import { Spinner } from "react-bootstrap";
import {
  TextField,
  Container,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Typography,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import firebase from "./../firebase-component/firebase";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import illustration from "./../images/sign-up.jpg";


const Login = () => {
const history = useHistory()
  const { user, setUser } = useContext(DataCentral);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [spinner, setSpinner] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (validation.test(value)) {
        setMessage("correct email !!!");
           
      } else {
     
        setMessage("please input correct email");
      }
    }
    if (name === "password") {
      setPassword(value);
    }
    
    
  };

  const handleSubmit = () => {
setSpinner(true)
   
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        setUser(data.user);
        history.push('/user-profile')
        setSpinner(false)
      })
      .catch((error) => {
        setMessage(error.message);
        setSpinner(false)
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.login}>
      <Container maxWidth="sm" className={styles.container}>
        <form className={styles.myForm} autoComplete="off">
          <div className={styles.illustration}>
            <img src={illustration} alt="" />
          </div>
          <div className={styles.typo}>
            <Typography variant="h5">LOG IN</Typography>
          </div>
          <Divider className={styles.divider} variant="middle" />

          <div className={styles.email}>
            <TextField
              className={styles.email}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.password}>
            <FormControl variant="outlined" className={styles.password}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>
          <span style={{ color: "red", marginTop: "1rem" }}>{message}</span>
          <div className={styles.loginBtn}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {spinner? <Spinner
                as="span"
                animation="border"
                variant="light"
                size="sm"
                role="status"
                aria-hidden="true"
              />: 'Log in'}
            </Button>
          </div>
          <div className={styles.links}>
            <Link to="/forgot-password">Forgot Password</Link>
            <span>
              Dont have an account yet ?{" "}
              <Link to="/createAccount">Create Account</Link>{" "}
            </span>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
