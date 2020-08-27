import React from "react";
import "./Banner.css";
import BannerImage from "./../images/mobile-app-mocks.png";
import FadingCarousel from "./FadingCarousel";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="headerBanner">
      <div className="container my-container">
        <div className="row">
          <div className="col-md-8 my-col">
            <div className="my-fading-carousel">
              <FadingCarousel />
              <p>
                KayXchange makes it safe and easy to buy and sell Bitcoin,
                Ethereum, Ripple, Litecoin and other cryptocurrencies using your
                local currency.
              </p>
              <Link to="/createAccount" className="nav-link">
                <Button
                  variant="contained"
                  color="primary"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <img src={BannerImage} className="img-fluid banner-mockup" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
