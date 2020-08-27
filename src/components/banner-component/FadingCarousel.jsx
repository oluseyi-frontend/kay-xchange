import React, { Component, useState, useEffect } from "react";
import './FadingCarousel.css'
const FadingCarousel = () => {
    const [firstQuote, setfirstQuote] = useState(false)
    const [secondQuote, setsecondQuote] = useState(true);
    const [thirdQuote, setthirdQuote] = useState(true);
    useEffect(() => {
        handleCarousel();
        setInterval(() => {

            handleCarousel();
        }, 10000);
    }, [])
    const handleCarousel = () => {
        setTimeout(() => {

            setfirstQuote(false);
            setsecondQuote(true);
            setthirdQuote(true)
            setTimeout(() => {

                setfirstQuote(true)
                setsecondQuote(false);
                setthirdQuote(true);
              
            }, 5000);
        }, 5000);
    }

    return (
        <div className="text-carousel">
            <div className={`first-quote ${firstQuote && "quote-active"}`}>
                <h3>
                   Buy and Sell Cryptocurrency
                </h3>
            </div>
            <div className={`second-quote ${secondQuote && "quote-active"} `}>
                <h3>
                    Instant payouts to your bank account
                </h3>
            </div>
        
        </div>
    )
};

export default FadingCarousel;
