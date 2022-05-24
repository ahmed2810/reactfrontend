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
   
   let history = useHistory();

   const redirectCard = () =>{
    if(localStorage.getItem("connected") === "true" ){
      setChoix(blogId)
    }else{
      loginModel()
    }
   }

    return (
    <Stack spacing={2} direction="row " className='justify-content-around' style={{margin:"10px"}}>
      
      <Button variant="contained" 
      // onClick={() => { props.loginModel() }} 
      onClick={() => { redirectCard() }} 
      >prendre RDV</Button>
      <Button variant="outlined"  
      // onClick={() => { props.loginModel() }}
      onClick={() => { history.push({
        pathname: '/suivie',
    }); }}
      >Suivre Demande</Button>
    </Stack>






  );
}
export default BasicButtons