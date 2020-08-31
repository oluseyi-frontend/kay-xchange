import React, { Component, useEffect, useContext, useState } from "react";
import styles from "./UserProfile.module.css";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptIcon from "@material-ui/icons/Receipt";
import {
  Container,
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Divider,
  Grid,
    IconButton,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Table, TableBody,
    TablePagination,
    
    Checkbox,
  TableSortLabel
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { DataCentral } from "./../context-component/Context";

import firebase from './../firebase-component/firebase';

const columns = [
  { id: "id", label: "Order ID", minWidth: 170 },
  { id: "currencyQuantity", label: "Qty", minWidth: 50 },
  {
    id: "IdType",
    label: "ID used",
    minWidth: 170,
    align: "left",
  },

  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "left",
  },
  {
    id: "fiatValue",
    label: "Fiat Value",
    minWidth: 170,
    align: "left",
  },
  {
    id: "walletID",
    label: "wallet used",
    minWidth: 170,
    align: "left",
  },
  {
    id: "currencyName",
    label: "currency",
    minWidth: 170,
    align: "left",
  },
];


const UserProfile = () => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      padding: '1rem'
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();
  const { user, currentUser } = useContext(DataCentral);
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orders, setOrders] = useState([]);
  useEffect(() => {
  
    retrieveOrderFromDb()
  }, [user])
  
  const retrieveOrderFromDb = () => {
     const events = firebase.firestore().collection(user.uid);
     events.onSnapshot((querySnapshot) => {
       const tempDoc = [];
       querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() });
       })

       setOrders(tempDoc);
     })
  }
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <div className={styles.userProfile}>
      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card className={styles.root}>
              <CardContent>
                <Typography variant="h6" component="h6">
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12} className={styles.grid}>
            <Card>
              <CardContent>
                <div className={styles.root}>
                  <Typography
                    className={styles.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    USER PROFILE
                  </Typography>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    className={styles.iconBtn}
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <Divider className={styles.divider} variant="middle" />
                <div className={styles.email}>
                  <Typography variant="h6" component="h6">
                    User Email
                  </Typography>
                  <Typography className={styles.pos} color="textSecondary">
                    {currentUser.email}
                  </Typography>
                </div>
                <Divider className={styles.divider} variant="middle" />
                <div className={styles.phoneNumber}>
                  <Typography variant="h6" component="h6">
                    Phone Number
                  </Typography>
                  <Typography className={styles.pos} color="textSecondary">
                    {currentUser.phoneNumber}
                  </Typography>
                </div>
                <Divider className={styles.divider} variant="middle" />
                <div className={styles.kycStatus}>
                  <Typography variant="h6" component="h6">
                    Kyc verification status
                  </Typography>
                  <Typography className={styles.pos} color="textSecondary">
                    {currentUser.kycVerification
                      ? "verified"
                      : "pending verification"}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Paper className={classes.root}>
              <div className={styles.root2}>
                <Typography
                  className={styles.title}
                  color="textSecondary"
                  gutterBottom
                >
                  PREVIOUS TRANSACTION
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  className={styles.iconBtn}
                >
                  <ReceiptIcon/>
                </IconButton>
              </div>
              <Divider className={styles.divider2} variant="middle" />
              <TableContainer className={classes.container}>
                {orders.length === 0 ? (
                    <Typography variant="h6" component="h6">
                    No previous Transaction
                  </Typography>
                 
                ) : (
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                console.log(value);
                                console.log(row);
                                console.log(column.id);
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
              {orders.length === 0 ? null : (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserProfile;
