import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, InputAdornment } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import StripeTextField from "./StripeTextField";

function StripeCardForm(props) {
  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    setBody,
    body,
    name,
    setName
  } = props;
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="none"
          required
          label="Num Reçu"
          onChange={(e) => {setBody({ ...body ,...{numRecu: e.target.value}})}}
          fullWidth
          autoFocus
          autoComplete="off"
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(e) => {setBody({ ...body ,...{dateVisite: e.target.value}})}}
          id="datetime-local"
          required
          label="Date visite"
          type="datetime-local"
          defaultValue="2022-05-24T10:30"
          InputLabelProps={{shrink: true,}}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}

StripeCardForm.propTypes = {
  stripeError: PropTypes.string.isRequired,
  setStripeError: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amountError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired
};

export default StripeCardForm;
