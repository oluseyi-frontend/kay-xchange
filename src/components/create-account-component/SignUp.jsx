import React, { useState, useContext } from "react";
import { DataCentral } from "./../context-component/Context";
import styles from "./SignUp.module.css";
import { TextField, Typography, Button, Divider, Container, FormControl, InputLabel, Grid, IconButton, OutlinedInput, InputAdornment, } from "@material-ui/core";
import firebase, {db} from './../firebase-component/firebase';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import illustration from './../images/create2.jpg'
import { Link, useHistory } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
const SignUp = () => {
  const history = useHistory()
 const { user, setUser } = useContext(DataCentral);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [spinner, setSpinner] = useState(false)

 const handleChange = (event) => {
   const { name, value } = event.target;
   if (name === "email") {
     setEmail(value);
    
   }
   if (name === 'password') {
       setPassword(value);
   }
    if (name === "first name") {
      setFirstName(value);
    }
    if (name === "last name") {
      setLastName(value);
   }
    if (name === "phone") {
      setPhone(value);
    }
   
 };
  const handleSubmit = () => {
    setSpinner(true)
   firebase
     .auth().createUserWithEmailAndPassword(email, password)
     .then((data) => {
       
      
       db.collection("users")
         .doc(data.user.uid)
         .set({
           email: email,
           firstName: firstName,
           lastName: lastName,
           phoneNumber: phone,
           status: 'valid',
           role: 'user'
         })
         .then(() => {
           setUser();
           history.push('/login')
           console.log("document written");
         })
         .catch((error) => {
           firebase.auth().currentUser.delete().then(() => {
             setMessage('sorry try again')
             setSpinner(false)
           }).catch(() => {
             setMessage("sorry try again");
             setSpinner(false)
           })
        
         });
     })
     .catch((error) => {
        setSpinner(false);
       setMessage(error.message);
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
      <Container className={styles.container} maxWidth="sm">
        <form className={styles.form} noValidate autoComplete="off">
          <div className={styles.illustration}>
            <img src={illustration} alt="" />
          </div>
          <div className={styles.typo}>
            <Typography variant="h5">CREATE ACCOUNT</Typography>
          </div>
          <Divider className={styles.divider} variant="middle" />
          <Grid container spacing={4}>
            <Grid item md={6} sm={6} xs={12} className={styles.names}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="first name"
                variant="outlined"
                onChange={handleChange}
                value={firstName}
                className={styles.names}
                type="text"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
                className={styles.names}
                id="outlined-basic"
                label="Last Name"
                name="last name"
                variant="outlined"
                onChange={handleChange}
                value={lastName}
                type="text"
              />
            </Grid>
            <Grid item sm={12} xs={12} className={styles.email}>
              <TextField
                className={styles.email}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                onChange={handleChange}
                name="email"
                value={email}
                type="email"
              />
            </Grid>
            <Grid item sm={12} xs={12}>
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
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                className={styles.phone}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                onChange={handleChange}
                name="phone"
                value={phone}
                type="tel"
              />
            </Grid>
          </Grid>
          <div className={styles.createBtn}>
            <Typography style={{ color: "red" }}>{message}</Typography>
            <Button onClick={handleSubmit} variant="contained" color="primary">
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
                "Create Account"
              )}
            </Button>
            <Typography className={styles.link}>
              Already have an account ? <Link to="/login">Sign In</Link>{" "}
            </Typography>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
