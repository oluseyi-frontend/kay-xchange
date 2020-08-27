import React, { Component } from 'react';
import Banner from '../banner-component/Banner';
import Marquee from './../marquee-components/Marquee';
import Body from '../body-components/Body';

const Home = () => {
    return ( 
        <div>
            <Banner />
            <Marquee />     
            <Body/>
        </div>        
     );
}
 
export default Home;