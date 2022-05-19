import React from 'react'
import TextSuivie from './TextSuivie'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Buttonsuivie from './Buttonsuivie'

const styles = (theme) => ({
    blogContentWrapper: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
      },
      maxWidth: 1280,
      width: "100%",
    },
    wrapper: {
      minHeight: "60vh",
    },
    noDecoration: {
      textDecoration: "none !important",
    },
  });




const Suivie = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    className={ "lg-p-top"}
  >
      <div>
          <div><TextSuivie/></div>
          
          
              <div><Buttonsuivie/></div>
  
  </div>
  </Box>
  );
}

export default Suivie