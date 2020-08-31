import React, { useContext, useEffect } from "react";
import Header from "../header-components/Header";
import Banner from "../banner-component/Banner";
import styles from "./App.module.css";
import Marquee from "./../marquee-components/Marquee";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from './../home-components/Home';
import BuySell from '../buySell-component/BuySell';
import BankAccountForm from './../bankAccount-component/BankAccount';
import Footer from "../footer-component/Footer";
import KycForm from './../kyc-components/KycForm';
import Login from './../login-components/Login';
import { DataCentral } from './../context-component/Context';
import SignUp from './../create-account-component/SignUp';
import Faq from './../faq-component/Faq';
import BuyingBankForm from './../bankAccount-component/BuyingBankAccount';
import UserProfile from './../userProfile-component/UserProfile';
import ForgotPassword from './../forgot=password-component/ForgotPassword';

const App = () => {
  const { user, setUser, currentUser } = useContext(DataCentral)
 
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/expressTransaction" exact component={BuySell} />
        <Route
          path="/buySell/:id/:currencyName/:currencyQuantity"
          component={BankAccountForm}
        />
        <Route
          path="/buySell2/:id/:currencyName/:currencyQuantity/:fiatValue"
          component={
            currentUser.kycVerification
              ? BuyingBankForm
              : user
              ? UserProfile
              : Login
          }
        />
        <Route path="/login" component={Login} />
        <Route path="/kycform" component={user ? KycForm : Login} />
        <Route path="/createAccount" component={SignUp} />
        <Route path="/user-profile" component={user ? UserProfile : Login} />
        <Route path="/faq" component={Faq} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
