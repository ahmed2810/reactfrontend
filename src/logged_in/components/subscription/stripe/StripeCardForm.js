import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Grid, InputAdornment } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import StripeTextField from "./StripeTextField";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Moment from 'moment';

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
  const [value,setValue]= useState(new Date())


  const pikerchange = (e) =>{
    setBody({ ...body ,...{dateVisite: Moment(e).format('YYYY-MM-DD HH:mm:ss')}})
    setValue(e)
  }


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
        {/* <TextField
          onChange={(e) => {setBody({ ...body ,...{dateVisite: e.target.value}})}}
          id="datetime-local"
          required
          label="Date visite"
          type="datetime-local"
          defaultValue={new Date()}
          // min={new Date()}
          min="2022-06-19T00:00"
          InputLabelProps={{shrink: true,}}
          sx={{ width: "100%" }}
        /> */}
         <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          className="DateTimePicker"
                          label="Date Visite"
                          value={value}
                          onChange={(event) => pikerchange(event)}
                          minDateTime={new Date()}
                          inputProps={{
                            step: 900, // 15 min
                          }}
                        />
                      </LocalizationProvider>
      </Grid>
      <style>
        {`
        .MuiFormControl-root.MuiTextField-root.css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
          width: 100%;
        }
        `}
      </style>
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
