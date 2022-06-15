
import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { useHistory } from "react-router-dom";


const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function SuperAdminInfo(props) {
  const { classes, openRegisterDialog } = props;
  
  const history = useHistory();

  const redirectAdd = () =>{
    
   if(localStorage.getItem("connected") === "true" ){
       history.push({
         pathname: '/c/add',
     }) 
    }
  }
  
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Liste des agents" secondary=" " />
      <Button
        variant="contained"
        color="primary"
         onClick={() =>  redirectAdd()}
    
      >
        Ajouter agent
      </Button>
    </Toolbar>
  );
}

SuperAdminInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openRegisterDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(SuperAdminInfo);