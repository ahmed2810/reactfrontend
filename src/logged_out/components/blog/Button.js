import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";



const BasicButtons=(props)=> {
  const {
    setChoix,
    loginModel,
    blogId

   } = props;
   
   const history = useHistory();

   const redirectCard = (mypath) =>{
     console.log('blogId :: ', blogId);
    if(localStorage.getItem("connected") === "true" ){
      if (mypath === 0) {
        setChoix(blogId)
      }else{
        history.push({
          pathname: '/suivie',
      }) }
    }else{
      loginModel()
    }
   }

    return (
    <Stack spacing={2} direction="row " className='justify-content-around' style={{margin:"10px"}}>
      
      <Button variant="contained" 
      onClick={() => { redirectCard(0) }} 
      >prendre RDV</Button>
      <Button variant="outlined"  
      onClick={() => { redirectCard(1)}}
      >Suivre Demande</Button>
    </Stack>






  );
}
export default BasicButtons