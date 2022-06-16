
import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import SuperAdminTable from "./SuperAdminTable";
import SuperAdminInfo from "./SuperAminInfo";
import openRegisterDialog from "../../logged_out/components/register_login/DialogSelector";
import axios from 'axios';

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function SuperAdmin(props) {
  const {
    transactions,
    classes,
    openRegisterDialog,
    selectSubscription
  } = props;

  const [DataAgent, setDataAgent] = useState([]);

  useEffect(selectSubscription, [selectSubscription]);
  useEffect(() => {
    axios.get(`http://localhost:5000/users/search/1`)
    .then(res => {
      if (res.status === 200) {
        setDataAgent(res.data)
      }
    }).catch(err => {
  });

  }, []);



  return (
    <Paper>
      <List disablePadding>
        <SuperAdminInfo openRegisterDialog={openRegisterDialog} />
        <Divider className={classes.divider} />
        {DataAgent.length > 0 &&
          <SuperAdminTable transactions={DataAgent} openRegisterDialog={openRegisterDialog} />
        }
      </List>
      <style>
        {`
        .Posts , .Subscription{
          display: none;
        }
        `}
      </style>
    </Paper>
  );
}

SuperAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(SuperAdmin);