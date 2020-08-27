import React, { useState, useEffect, useContext } from "react";
import styles from "./Buy.module.css";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
  Chip,
  Avatar,
  Typography,
  Grid,
  Container
} from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom";
import { DataCentral } from "../context-component/Context";
import firebase from './../firebase-component/firebase';
import NumberFormat from "react-number-format";
const SellForm = () => {
  const [orderCode, setOrderCode] = useState("");
  const { cryptoPrices, myPrices } = useContext(DataCentral)
  const [nameOfCurrency, setNameOfCurrency] = useState("");
  const [quantityInCrypto, setQuantityInCrypto] = useState(0);
  const [quantityInFiat, setQuantityInFiat] = useState(0);
 const [myRate, setMyRate] = useState(Number)
  const [price, setPrice] = useState();
  const [fiatValue, setFiatValue] = useState(Number);
  const [message, setMessage] = useState()
  const [prefferredFiatCurrency, setPrefferredFiatCurrency ] =useState("")



 

  useEffect(() => {
  
    Object.keys(cryptoPrices).map((key) => {
    const newkey = key.toLowerCase()
      if (newkey === nameOfCurrency) {
        console.log(cryptoPrices[key].USD) 
        setPrice(cryptoPrices[key].USD)
      }
    })
    myPrices.map((myPrice) => {
      if (myPrice.id === nameOfCurrency) {
        setMyRate(myPrice.price)
      } else {
        
      }
    })
   
  }, [nameOfCurrency]);

  useEffect(() => {
    handleOrderIdGeneneration();
  }, []);

  useEffect(() => {
 sellFormValidation()
  })
  const sellFormValidation = () => {
    if (nameOfCurrency == '' || quantityInCrypto == 0 ) {
      setMessage('fill up all required fields')
    } else {
      setMessage()
    }
}
  const handleOrderIdGeneneration = (event) => {
    function randomString(length, chars) {
      var result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    var rString = randomString(
      32,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );

    setOrderCode(rString);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(name);
    if (name === "Currency to Sell") {
      setNameOfCurrency(value);
      setQuantityInFiat(0);
      setQuantityInCrypto(0);
      setFiatValue(0)
      setPrice()
    }
    if (name === "Quantity to Sell in crypto") {
      const valueInDollar = value * price;
      const valueInNaira = valueInDollar * myRate;
      setFiatValue(valueInNaira);
      setQuantityInCrypto(value);
      setQuantityInFiat(valueInNaira);
    }
    if (name === "Quantity to Sell in fiat") {
      setFiatValue(value);
      setQuantityInFiat(value);
      const valueInDollar = value / myRate;
      const valueIncrypto = valueInDollar / price;
      setQuantityInCrypto(valueIncrypto);
    }
    if (name === 'sell with') {
      setPrefferredFiatCurrency(value)
    }
  };
  return (
    <div className={styles.buyForm}>
      <Grid container spacing={1}>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Cryptocurrency to Sell
            </InputLabel>
            <Select
              native
              label="Cryptocurrency to Sell"
              name="Currency to Sell"
              onChange={handleChange}
            >
              <option aria-label="None" value={null} />
              {Object.keys(cryptoPrices).map((key) => {
                const newkey = key.toLowerCase();
                return <option value={newkey}>{newkey}</option>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Sell For
            </InputLabel>
            <Select
              native
              label="Sell With"
              onChange={handleChange}
              name="sell with"
            >
              <option aria-label="None" value="" />
              <option value="Naira">Naira</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
            <TextField
              id="outlined-basic"
              label=" Quantity to Sell in crypto"
              variant="outlined"
              onChange={handleChange}
              name="Quantity to Sell in crypto"
              value={quantityInCrypto}
              type="Number"
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
            <TextField
              id="outlined-basic"
              label=" Quantity to Sell in fiat"
              variant="outlined"
              onChange={handleChange}
              name="Quantity to Sell in fiat"
              value={quantityInFiat}
              type="Number"
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          {price ? (
            <Typography className={styles.chip} variant='h6'>
              You will be paid:
              <NumberFormat
                value={fiatValue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"#"}
                decimalScale={2}
              />
            </Typography>
          ) : null}
        </Grid>
        <Grid item sm={12} xs={12}>
          <Typography
            style={{ color: "red" }}
            variant="body2"
            gutterBottom
            component="p"
          >
            {message}
          </Typography>
          <FormControl variant="outlined" className={styles.continueBtn}>
            <Button disabled={message} variant="contained" color="primary">
              <Link
                className={styles.anchor}
                to={`/buySell/${orderCode}/${nameOfCurrency}/${quantityInCrypto}`}
              >
                Continue
              </Link>
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default SellForm;
