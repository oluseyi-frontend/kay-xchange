import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Button,
  Chip,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import styles from "./SellModal.module.css";
import { FaWindowClose } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { CopyToClipboard } from "react-copy-to-clipboard";
const SellModal = ({
  orderId,
  handleClose,
  CURRENCY_NAME,
  onFinish,
  message,
  addressIn,
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <Card className={styles.myCard}>
          {addressIn.length === 0 ? (
            <CircularProgress />
          ) : (
            <CardContent className={styles.myCardContent}>
              <div className={styles.headingText}>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  component="h5"
                  gutterBottom
                >
                  Complete Transaction
                </Typography>
                <Avatar className={styles.red} onClick={handleClose}>
                  <GrClose />
                </Avatar>
              </div>
              <Typography
                gutterBottom
                color="textSecondary"
                variant="body2"
                component="p"
              >
                Transfer {CURRENCY_NAME} to the following address
              </Typography>
              <Chip className={styles.chip} label={`${addressIn}`} />
              <CopyToClipboard text={addressIn} onCopy={() => setCopied(true)}>
                <Button variant="contained" color="primary">
                  Copy to clipboard
                </Button>
              </CopyToClipboard>
              {copied ? <span style={{ color: "green" }}>Copied.</span> : null}
              <Typography
                color="textSecondary"
                variant="body2"
                component="p"
                gutterBottom
              >
                Please Do not leave Page, Click the finish button once transfer
                is complete
              </Typography>
              <FormControl variant="outlined" className={styles.btn}>
                <Typography variant="button">{message}</Typography>
                <Button variant="contained" color="primary" onClick={onFinish}>
                  Finish
                </Button>
              </FormControl>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SellModal;
