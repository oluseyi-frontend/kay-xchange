import React, { useContext, useEffect, useState } from "react";
import styles from "./Buy.module.css";
import {
  FormControl,
  TextField,
  Chip,
  Typography,
  InputLabel,
  Select,
  Button,
  Grid,
} from "@material-ui/core";
import { DataCentral } from "./../context-component/Context";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
const BuyForm = () => {
  const { cryptoPrices, mySellingPrices } = useContext(DataCentral);
  const [quantityInCrypto, setQuantityInCrypto] = useState(0);
  const [quantityInFiat, setQuantityInFiat] = useState(0);
  const [fiatValue, setFiatValue] = useState(Number);
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  const [nameOfCurrency, setNameOfCurrency] = useState("");
  const [mySellingRate, setMySellingRate] = useState(Number);
  const [prefferredFiatCurrency, setPrefferredFiatCurrency] = useState("");
const [orderCode, setOrderCode] = useState('')

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
  
  useEffect(() => {
    handleOrderIdGeneneration();
  }, []);

  useEffect(() => {
    Object.keys(cryptoPrices).map((key) => {
      const newkey = key.toLowerCase();
      if (newkey === nameOfCurrency) {
     
        setPrice(cryptoPrices[key].USD);
      }
    });
    mySellingPrices.map((myPrice) => {
      if (myPrice.id === nameOfCurrency) {
        setMySellingRate(myPrice.price);
      }
    });
  }, [nameOfCurrency]);

  useEffect(() => {
    sellFormValidation();
  });

  const sellFormValidation = () => {
    if (nameOfCurrency == "" || quantityInCrypto == 0) {
      setMessage("fill up all required fields");
    } else {
      setMessage();
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
  
    if (name === "Currency to Buy") {
      setNameOfCurrency(value);
      setQuantityInFiat(0);
      setQuantityInCrypto(0);
      setFiatValue(0);
      setPrice();
    }
    if (name === "Quantity to Buy in crypto") {
      const valueInDollar = value * price;
      const valueInNaira = valueInDollar * mySellingRate;
      setFiatValue(valueInNaira);
      setQuantityInCrypto(value);
      setQuantityInFiat(valueInNaira);
    }
    if (name === "Quantity to Buy in fiat") {
      setFiatValue(value);
      setQuantityInFiat(value);
      const valueInDollar = value / mySellingRate;
      const valueIncrypto = valueInDollar / price;
      setQuantityInCrypto(valueIncrypto);
    }
    if (name === "Buy with") {
      setPrefferredFiatCurrency(value);
    }
  };

  return (
    <div className={styles.buyForm}>
      <Grid container spacing={1}>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Cryptocurrency to Buy
            </InputLabel>
            <Select
              native
              label="Cryptocurrency to Buy"
              name="Currency to Buy"
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
              Buy With
            </InputLabel>
            <Select
              native
              label="Sell With"
              onChange={handleChange}
              name="Buy with"
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
              label=" Quantity to Buy in crypto"
              variant="outlined"
              onChange={handleChange}
              name="Quantity to Buy in crypto"
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
              label=" Quantity to Buy in fiat"
              variant="outlined"
              onChange={handleChange}
              name="Quantity to Buy in fiat"
              value={quantityInFiat}
              type="Number"
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          {price ? (
            <Typography
              style={{ display: "flex" }}
              className={styles.chip}
              variant="h6"
            >
              <NumberFormat
                style={{ marginLeft: ".4rem", marginRight: ".4rem" }}
                value={fiatValue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"#"}
                decimalScale={2}
              />
              for{" "}
              <NumberFormat
                style={{ marginLeft: ".4rem", marginRight: ".4rem" }}
                value={quantityInCrypto}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
              />
              {nameOfCurrency}
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
                to={`/buySell2/${orderCode}/${nameOfCurrency}/${quantityInCrypto}/${fiatValue}`}
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

export default BuyForm;
