import React, { Component, useState, useContext } from "react";
import styles from "./Buy.module.css";
import { Button, Chip } from "@material-ui/core";
import BuyForm from "./SellForm";
import SellForm from "./BuyForm";
import illustration from "./../images/illusration.jpg";
import { DataCentral } from "./../context-component/Context";
const BuySell = () => {
  const [switchValue, setSwitchValue] = useState(true);
  const [buyForm, setBuyForm] = useState(true);
  const [sellForm, setSellForm] = useState(false);
  const { myPrices, mySellingPrices } = useContext(DataCentral);

  const handleChange = (event) => {
    setSwitchValue(!switchValue);
   
  };

  const handleSubmit = () => {
  
  };

  const handleClick = (event) => {
    const { textContent } = event.target;

    if (textContent === "SELL") {
      setBuyForm(true);
      setSellForm(false);
    } else if (textContent === "BUY") {
      setSellForm(true);
      setBuyForm(false);
    }
  };
  return (
    <div className={styles.BuyComponent}>
      <marquee behavior="" direction="">
        <Chip
          className={styles.chip}
          label={myPrices.map((myRate) => {
            return (
              <p  key={myRate.id} style={{ display: "flex" }}>
                {" "}
                {myRate.id} Buying rate: {myRate.price}/$,{" "}
              </p>
            );
          })}
        />
        <Chip
          className={styles.chip}
          label={mySellingPrices.map((myRate) => {
            return (
              <p key={myRate.id} style={{ display: "flex" }}>
                {" "}
                {myRate.id} Selling rate: {myRate.price}/$,{" "}
              </p>
            );
          })}
        />

        <Chip
          className={styles.chip}
          label="SCAM ALERT: PLEASE DO NOT TRANSACT OUTSIDE THE PREMISES OF THIS WEBSITE, BEWARE!!!"
        />
      </marquee>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.illustration}>
            <img src={illustration} alt="" />
          </div>
          <div className={styles.text}>
            <h4>Buy or Sell Instantly</h4>
            <p>
              A simple way to buy or sell cryptocurrency in less than a minute.
            </p>
          </div>
          <div className={styles.btns}>
            <Button
              className={styles.buyBtn}
              onClick={handleClick}
              variant="contained"
              color="primary"
            >
              SELL
            </Button>
            <Button
              className={styles.sellBtn}
              onClick={handleClick}
              variant="contained"
              color="primary"
            >
              BUY
            </Button>
          </div>
          {buyForm && <BuyForm />}
          {sellForm && <SellForm />}
        </form>
      </div>
    </div>
  );
};

export default BuySell;
