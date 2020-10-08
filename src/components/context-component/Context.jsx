import React, { Component, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import Axios from "axios";
import { useState } from "react";
import firebase from "./../firebase-component/firebase";
export const DataCentral = React.createContext();
const CryptoExchangeContext = (props) => {
  const CRYPTO_PRICES = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XMR,BCH,USDT,LTC,STEEM,SBD,HIVE,HBD&tsyms=USD,EUR&api_key={a36270f8a9e8c6ae57776a51d10c8c2446a1597335a4f05d781a4cc7c7320265}`;
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [cryptoInString, setCryptoInString] = useState("");
  const [myPrices, setMyPrices] = useState([]);
  const [mySellingPrices, setMySellingPrices] = useState([]);
  const [myWallets, setMyWallets] = useState([]);
  const [time, setTime] = useState('')

  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    
    Axios.get(CRYPTO_PRICES).then((data) => {
      const prices = data.data;
      setCryptoPrices(prices);     
    });
  
    Axios.get("https://api.cryptapi.io/btc/info/").then((data) => {
      console.log(data)
    }).catch ((err) => {
      console.log(err)
    })
   

    const events = firebase.firestore().collection("prices");
    events.onSnapshot((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });

      setMyPrices(tempDoc);
    });
      const events3 = firebase.firestore().collection("selling-prices");
      events3.onSnapshot((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
        });

        setMySellingPrices(tempDoc);
      });
    const events2 = firebase.firestore().collection("wallets");
    events2.onSnapshot((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });

      setMyWallets(tempDoc);
    });
  }, []);

  useEffect(() => {
    if (user) {
       checkingIfKycIsTrue();
    } else {
      
    }
    
  }, [user]);
  
  const checkingIfKycIsTrue = () => {
    const events = firebase.firestore().collection("users").doc(user.uid)
    events.onSnapshot((querySnapshot) => {
      console.log(querySnapshot)
      const tempDoc = [];
    
      tempDoc.push({ id: querySnapshot, ...querySnapshot.data() });
    

      setCurrentUser({ id: querySnapshot, ...querySnapshot.data()});
      });
  }

  return (
    <DataCentral.Provider
      value={{
        cryptoPrices: cryptoPrices,
        myPrices: myPrices,
        myWallets: myWallets,
        mySellingPrices: mySellingPrices,
        user: user,
        setUser: setUser,
        currentUser: currentUser
      }}
    >
      {props.children}
    </DataCentral.Provider>
  );
};

export default CryptoExchangeContext;
