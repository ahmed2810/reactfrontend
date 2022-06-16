import React from "react";
import PropTypes from "prop-types";
import { FormControl, Grid, InputAdornment, Select, MenuItem } from "@mui/material";
import StripeTextField from "./StripeTextField";
import { IbanElement } from "@stripe/react-stripe-js";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';

function StripeIBANForm(props) {
  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    name,
    setName,
    email,
    setEmail,
    setBody,
    body,
  } = props;


  return (
    <Grid container spacing={2} justifyContent="space-between">

      <Grid item xs={12}>
      <FormControl fullWidth> 
      <InputLabel id="demo-simple-select-label">avis</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        fullWidth
        variant="outlined"
        value={body.statut}
        label="Avis"
        onChange={(e) => {setBody({ ...body ,...{statut: e.target.value}})}}
      >
        <MenuItem value={"favorable"}>favorable</MenuItem>
        <MenuItem value={"défavorable"}>défavorable</MenuItem>
      </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
        <StripeTextField
          margin="none"
          variant="outlined"
          fullWidth
          label="Description"
          error={stripeError ? true : false}
          helperText={stripeError}
          required
          StripeElement={IbanElement}
          stripeOptions={{ supportedCountries: ["SEPA"] }}
          onChange={(e) => {setBody({ ...body ,...{motifDemande: e.target.value}})}}
        ></StripeTextField>
      </Grid>
    </Grid>
  );
}

StripeIBANForm.propTypes = {
  stripeError: PropTypes.string.isRequired,
  setStripeError: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amountError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired
};

export default StripeIBANForm;
