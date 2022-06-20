import React, { useState } from "react";
import Box from '@mui/material/Box';
import Form from './Form'
import { useLocation } from "react-router-dom";


export default function VerticalLinearStepper() {
  const location = useLocation();


 console.log(location.state)

  return (
    <Box
    display="flex"
    justifyContent="center"
  >
      <div>
      <Form
      choix={location.state.detail}
      />

    </div>
    </Box>
  );
}
