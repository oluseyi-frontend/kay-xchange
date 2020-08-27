import React, { useState, useContext } from "react";
import styles from "./Marquee.module.css";
//import { Card } from 'react-bootstrap';
import { Card, CardContent, Typography } from "@material-ui/core";
import { DataCentral } from "../context-component/Context";
import NumberFormat from "react-number-format";
const Marquee = () => {

  const { cryptoPrices} = useContext(DataCentral)

  return (
    <div className={styles.myMarquee}>
      <marquee behavior="" direction="">
        {Object.keys(cryptoPrices).map((key) => {
     return (
       <Card key={key} className={styles.myCard}>
         <CardContent>
           <Typography color="textSecondary" gutterBottom>
             {key}
           </Typography>
           <Typography variant="body2" component="p">
             <NumberFormat
               value={cryptoPrices[key].USD}
               displayType={"text"}
               thousandSeparator={true}
               prefix={"$"}
             />
           </Typography>
         </CardContent>
       </Card>
     );
        })}
      </marquee>
    </div>
  );
};

export default Marquee;
