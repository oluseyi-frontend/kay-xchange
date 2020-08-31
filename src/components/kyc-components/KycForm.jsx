import React, { Component, useState, useContext } from "react";
import styles from "./Kyc.module.css";
import {
  Container,
  IconButton,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Button,
  Select,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import illustration from "./../images/kyc.jpg";
import { DataCentral } from "./../context-component/Context";
import InputFiles from "react-input-files";
import firebase, {db} from './../firebase-component/firebase';
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const KycForm = () => {
  const classes = useStyles();
  const { user } = useContext(DataCentral);
  const [typeOfId, setTypeOfId] = useState("");
  const [frontView, setFrontView] = useState();
  const [backView, setBackview] = useState();
  const [userHolding, setUserHolding] = useState();
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState('')
  const handleChange = (event) => {
    const { name } = event.target;
    console.log(event);

    if (name === "front-view") {
      const file = event.target.files[0];
      setFrontView(file);
    }
    if (name === "back-view") {
      const file = event.target.files[0];
      setBackview(file);
    }
    if (name === "user-holding") {
      const file = event.target.files[0];
      setUserHolding(file);
    }
    if (name === "type of id") {
      setTypeOfId(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    setSpinner(true)
    e.preventDefault();

    firebase
      .storage()
      .ref(`${user.uid}/frontView`)
      .put(frontView)
        .then(() => {
             firebase
               .storage()
               .ref(`${user.uid}/frontView`)
               .getDownloadURL()
               .then(function (url) {
                 db.collection("users")
                   .doc(user.uid)
                   .update({
                       
                           frontView: url,
                           typeOfId: typeOfId
                  
                   })
                   .then(() => {
                     console.log("document written2");

                   })

                   .catch((error) => {
                     setMessage("please try again");
                     setSpinner(false);
                   });
               })
               .catch(function (error) {
                 setMessage("please try again");
                 setSpinner(false);
               });
      })
      .catch((error) => {
        setMessage("please try again");
        setSpinner(false);
      });
        firebase
          .storage()
          .ref(`${user.uid}/backView`)
          .put(backView)
          .then(() => {
            console.log("written successfully");
            firebase
              .storage()
              .ref(`${user.uid}/backView`)
              .getDownloadURL()
              .then(function (url) {
                db.collection("users")
                  .doc(user.uid)
                  .update({
                 
                        backView: url,                     
                   
                  })
                  .then(() => {
                    
                  })
                  .catch((error) => {
                    setMessage("please try again");
                    setSpinner(false);
                  });
              })
              .catch(function (error) {
                setMessage("please try again");
                setSpinner(false);
              });
          })
          .catch((error) => {
          setMessage("please try again");
          setSpinner(false);
          });
        firebase
          .storage()
          .ref(`${user.uid}/userHolding`)
          .put(userHolding)
          .then(() => {
            console.log("written successfully");
            firebase
              .storage()
              .ref(`${user.uid}/userHolding`)
              .getDownloadURL()
              .then(function (url) {
                db.collection("users")
                  .doc(user.uid)
                  .update({
                  
                      userHolding: url,
                      kyc: true,
                      kycVerification: false
                  })
                  .then(() => {
                 
                     setSpinner(false);
                  })
                  .catch((error) => {
                   
                    setMessage("please try again");
                    setSpinner(false);
                  });
              })
              .catch(function (error) {
                setMessage("please try again");
                setSpinner(false);
              });
          })
          .catch((error) => {
         
            setMessage('please try again')
            setSpinner(false)
          });
   
      
       
       
  };
  return (
    <div className={styles.accountContent}>
      <Container maxWidth="sm" className={styles.container}>
        <form
          onSubmit={handleSubmit}
          className={styles.myForm}
          autoComplete="off"
        >
          <div className={styles.illustration}>
            <img alt="" src={illustration} />
          </div>
          <div className={styles.typo}>
            <Typography variant="h5">KYC FORM</Typography>
          </div>
          <Divider className={styles.divider} variant="middle" />

          <div className={styles.typeOfId}>
            <FormControl className={styles.select} variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Type of ID
              </InputLabel>
              <Select
                native
                value={typeOfId}
                onChange={handleChange}
                label="Type of ID"
                name="type of id"
              >
                <option aria-label="None" value="" />
                <option value="National ID Card">National ID Card</option>
                <option value="International Passport">
                  International Passport
                </option>
                <option value="Voters Card">Voters Card</option>
                <option value="Drivers's License">Driver's License</option>
              </Select>
            </FormControl>
          </div>
          <div className={styles.frontView}>
            <label className={styles.label} htmlFor="">
              <Typography className={styles.typo2} variant="h6">
                upload front view of form of ID
              </Typography>

              <input
                name="front-view"
                onChange={handleChange}
                type="file"
                className={styles.input}
              />
            </label>
          </div>
          <Divider className={styles.divider2} variant="middle" />
          <div className={styles.backView}>
            <label className={styles.label} htmlFor="">
              <Typography className={styles.typo2} variant="h6">
                upload back view of form of ID
              </Typography>
              <input
                type="file"
                name="back-view"
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
          <Divider className={styles.divider2} variant="middle" />
          <div className={styles.userHolding}>
            <label className={styles.label} htmlFor="">
              <Typography className={styles.typo2} variant="h6">
                upload user holding form ID
              </Typography>
              <input
                type="file"
                name="user-holding"
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
          <Divider className={styles.divider2} variant="middle" />
          <div className={styles.submitBtn}>
            <Typography style={{color: 'red'}}>
              {message}
            </Typography>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
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
          </div>
          <Link to="/expressTransaction">Back to transaction</Link>
        </form>
      </Container>
    </div>
  );
};

export default KycForm;
