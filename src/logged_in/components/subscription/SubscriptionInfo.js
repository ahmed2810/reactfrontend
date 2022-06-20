import React from "react";
import PropTypes from "prop-types";
import { ListItemText,  Toolbar } from "@mui/material";

import withStyles from '@mui/styles/withStyles';

const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function SubscriptionInfo(props) {
  const { classes, openAddBalanceDialog } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText  primary= "Liste des Rendez-vous" />
      
    </Toolbar>
  );
}

SubscriptionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(SubscriptionInfo);
