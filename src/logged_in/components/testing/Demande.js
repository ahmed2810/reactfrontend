import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import DemandeTable from "../testing/DemandeTable";
import DemandeInfo from "../testing/DemandeInfo";
import axios from 'axios';

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Demande(props) {
  const {
    transactions,
    classes,
    openAddBalanceDialog,
    selectSubscription
  } = props;

  const [datardv, setDatardv] = useState([]);

  useEffect(selectSubscription, [selectSubscription]);
  useEffect(() => {
    axios.get(`http://localhost:5000/demandes/searchdemandevalide`)
    .then(res => {
      if (res.status === 200) {
        setDatardv(res.data)
      }
    }).catch(err => {
  });

  }, []);



  return (
    <Paper>
      <List disablePadding>
        <DemandeInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        {datardv.length > 0 &&
          <DemandeTable transactions={datardv} openAddBalanceDialog={openAddBalanceDialog} />
        }
      </List>
    </Paper>
  );
}

Demande.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Demande);
