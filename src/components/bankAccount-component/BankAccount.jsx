import React, { Component, useState, useEffect, useContext } from "react";
import styles from "./BankAccount.module.css";
import {
  FormControl,
  TextField,
  Select,
  Button,
  InputLabel,
  Typography,
  Snackbar,
} from "@material-ui/core";
import SellModal from "../begin-transaction-component/SellModal";
import Axios from "axios";
import { BankData } from "./BankData";
import { db } from "./../firebase-component/firebase";
import { DataCentral } from "./../context-component/Context";
import SteemModal from './../begin-transaction-component/SteemModal';

const BankAccountForm = ({ match }) => {
  const CURRENCY_NAME = match.params.currencyName;
  const currencyQuantity = match.params.currencyQuantity;
  console.log(CURRENCY_NAME);

  const ID = match.params.id;

  const [WALLET_ID, SETWALLET_ID] = useState("");
  
  const API = `https://cryptapi.io/api/${CURRENCY_NAME}/create/?callback=http%3A%2F%2Flocalhost%3A3000%2FexpressTransaction/${ID}&address=${WALLET_ID}&email=alawiyeolukayode%40gmail.com`;

  const CALLBACK_API = `https://cryptapi.io/api/${CURRENCY_NAME}/logs/?callback=http%3A%2F%2Flocalhost%3A3000%2FexpressTransaction/${ID}`;
  const [openModal, setOpenModal] = useState(false)
  const [openSteemModal, setOpenSteemModal] = useState(false)
  const [addressIn, setAddressIn] = useState("");
  const [callbacks, setCallbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [message2, setMessage2] = useState(false);
  const { myWallets } = useContext(DataCentral);
 
  useEffect(() => {
    if (CURRENCY_NAME === "btc") {
      myWallets.map((wallet) => {
        if (wallet.id === CURRENCY_NAME) {
          SETWALLET_ID(wallet.value);
        }
      });
    }
    if (CURRENCY_NAME === "eth") {
      myWallets.map((wallet) => {
        if (wallet.id === CURRENCY_NAME) {
          SETWALLET_ID(wallet.value);
        }
      });
    }
    if (CURRENCY_NAME === "bch") {
      myWallets.map((wallet) => {
        if (wallet.id === CURRENCY_NAME) {
          SETWALLET_ID(wallet.value);
        }
      });
    }
      if (CURRENCY_NAME === "ltc") {
        myWallets.map((wallet) => {
          if (wallet.id === CURRENCY_NAME) {
            SETWALLET_ID(wallet.value);
          }
        });
      }
      if (CURRENCY_NAME === "usdt") {
        myWallets.map((wallet) => {
          if (wallet.id === CURRENCY_NAME) {
            SETWALLET_ID(wallet.value);
          }
        });
      }
      if (CURRENCY_NAME === "xmr") {
        myWallets.map((wallet) => {
          if (wallet.id === CURRENCY_NAME) {
            SETWALLET_ID(wallet.value);
          }
        });
      }
  }, [myWallets]);
  const FetchWalletAddress = () => {
    Axios.get(API)
      .then((data) => {
        const { address_in } = data.data;
        setAddressIn(address_in);
      })
      .catch(() => {
        setOpenModal(false);
      });
  };
  const checkCallBackLogs = () => {
    Axios.get(CALLBACK_API).then((data) => {
      const { callbacks } = data.data;
      setCallbacks(callbacks);
    

      if (callbacks.length > 0) {
        callbacks.map((item) => {
          addOrderToDatabase(item.txid_in, item.value_coin, item.last_update);
          if (item.value_coin < currencyQuantity) {
            const deficit = currencyQuantity - item.value_coin;
            setMessage(
              `Balance up payment ${deficit} to the address provided or close dialog box`
            );
          } else {
            setMessage(
              `your transaction is being processed, you can close the dialog box now`
            );
          }
        });
      } else {
        setMessage(`please send ${CURRENCY_NAME} to the address provided`);
      }
    });
  };

  const addOrderToDatabase = (id, value, date) => {
    db.collection("orders")
      .doc(id)
      .set({
        value: value,
        bankName: bankName,
        accountName: accountName,
        accountNumber: accountNumber,
        currencyName: CURRENCY_NAME,
        queryUrl: match.url,
        DateAndTimeOfTransaction: date
      })
      .then(() => {
        console.log("document written");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClick = () => {
    const SteemBlockchain = ['steem', 'hive', 'sbd', 'hbd']
    const value = SteemBlockchain.includes(CURRENCY_NAME)

    if (value) {
 
      setOpenSteemModal(true)
    }
    else {
          FetchWalletAddress();
          setOpenModal(true);
    }

  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenSteemModal(false)
  };

  const onFinish = () => {
    checkCallBackLogs();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "bank name") {
      setBankName(value);
    }
    if (name === "account number") {
      setAccountNumber(value);
    }
    if (name === "account name") {
      setAccountName(value);
    }
  };
  useEffect(() => {
    bankAccountValidation();
  });
  const bankAccountValidation = () => {
    if (bankName == "" || accountName == "" || accountNumber == 0) {
      setMessage2("fill up all required fields");
    } else {
      setMessage2("");
    }
  };
  return (
    <div className={styles.bankAccountForm}>
      <div className={styles.container}>
        <form action="" container={styles.form}>
          <div className={styles.text}>
            <h5>Fill In Bank Details For Immediate Transfer</h5>
          </div>

          <FormControl variant="outlined" className={styles.select}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Bank Name
            </InputLabel>
            <Select
              native
              label="Bank Name"
              name="bank name"
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              {BankData.map((bank) => {
                return (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={styles.textField}>
            <TextField
              id="outlined-basic"
              label=" Account Number"
              variant="outlined"
              name="account number"
              onChange={handleChange}
              type="number"
            />
          </FormControl>
          <FormControl variant="outlined" className={styles.textField}>
            <TextField
              id="outlined-basic"
              label="Account Name"
              variant="outlined"
              name="account name"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="outlined" className={styles.btn}>
            {
              <Typography style={{ color: 'red' }} gutterBottom>{message2}</Typography> //
            }
            <Button
              disabled={message2}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Begin Transaction
            </Button>
          </FormControl>
        </form>
      </div>
      {openModal && (
        <SellModal
          orderId={match.params.id}
          message={message}
          CURRENCY_NAME={CURRENCY_NAME}
          addressIn={addressIn}
          onFinish={onFinish}
          addressIn={addressIn}
          handleClose={handleClose}
        />
      )}
      {openSteemModal && (
        
        <SteemModal
         currencyQuantity={currencyQuantity}
         handleClose={handleClose}
          bankName={bankName}
          accountName={accountName}
          accountNumber={accountNumber}
          ID={ID}
          CURRENCY_NAME={CURRENCY_NAME}
        
        />
      )}
    </div>
  );
};

export default BankAccountForm;
