import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";
import axios from 'axios';

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Subscription(props) {
  const {
    transactions,
    classes,
    openAddBalanceDialog,
    selectSubscription
  } = props;

  const [datardv, setDatardv] = useState([]);

  useEffect(selectSubscription, [selectSubscription]);
console.log('transactions',transactions);
  useEffect(() => {
    axios.get(`http://localhost:5000/demandes/searchrdv`)
    .then(res => {
      if (res.status === 200) {
        console.log(res.data);
        setDatardv(res.data)
      }
    }).catch(err => {
  });

  }, []);



  return (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        {datardv.length > 0 &&
          <SubscriptionTable transactions={datardv} openAddBalanceDialog={openAddBalanceDialog} />
        }
      </List>
    </Paper>
  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Subscription);
