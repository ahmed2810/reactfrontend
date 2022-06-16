import  React,{useEffect , useState} from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useHistory } from "react-router-dom";



 function UseFormControl(props) {
  const [DataAgent, setDataAgent] = useState();
  const history = useHistory();
  useEffect(() => {
   let currentpath= window.location.pathname
   if(currentpath !== "/c/add"){
        let idAgent = props.match.params.id

        axios.get(`http://localhost:5000/users/searchbyid/${idAgent}`)
        .then(res => {
          if (res.status === 200) {
           
            setDataAgent(res.data)
          }
        }).catch(err => {
      });
    
      }else{
        setDataAgent({ ...DataAgent ,...{role: 1}})
      }
       

  }, []);

  const newagent = () => {
    axios.post(`http://localhost:5000/users/createuser`, DataAgent)
    .then(res => {
      if (res.status === 200) {
        history.push({
          pathname: '/c/superadmin',
      }) 
      }
    }).catch(err => {
    
    });
  };

  const updateagent = () => {
    let idAgent = props.match.params.id
    axios.put(`http://localhost:5000/users/update/${idAgent}`,  DataAgent)
    .then(res => {
      if (res.status === 200) {
        history.push({
          pathname: '/c/superadmin',
      }) 
       
      }
    }).catch(err => {
     
    });
  }

  const retour = () => {
   
  
        history.push({
          pathname: '/c/superadmin',
      }) 
       
    
  }
  return (
    <Box component="form" noValidate autoComplete="off" width={"50%"}>
      <style>
        {`
        .Posts , .Subscription{
          display: none;
        }
        `}
      </style>
      
       <TextField         
        label="Nom"
        type="text" 
        value={DataAgent ? DataAgent.firstName : ''}            
        sx={{ width: "100%" , margin:"0 0 20px 0"}}
         onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{firstName: e.target.value}})
        }}
        />
         <TextField
        label="Prénom"
        type="text"
        value={DataAgent ? DataAgent.lastName : ''}

        sx={{ width: "100%" , margin:"0 0 20px 0" }}
        onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{lastName: e.target.value}})
        }}
        />
        <TextField
        label="Cin"
        type="number"
        value={DataAgent ? DataAgent.cin : ''}
        sx={{ width: "100%" ,  margin:"0 0 20px 0" }}
        onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{cin: e.target.value}})
        }}
        />
          <TextField
        label="Telephone"
        type="number"
        value={DataAgent ? DataAgent.phone : ''}
        sx={{ width: "100%" ,  margin:"0 0 20px 0" }}
        onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{phone: e.target.value}})
        }}
        />
          <TextField
        label="Email"
        type="text"
        value={DataAgent ? DataAgent.email : ''}
        sx={{ width: "100%" ,  margin:"0 0 20px 0"}}
        onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{email: e.target.value}})
        }}
        />
          <TextField
        label="Mot de passe"
        type="text"
        value={DataAgent ? DataAgent.password : ''}
        sx={{ width: "100%" ,  margin:"0 0 20px 0"}}
        onChange={(e) => {
          setDataAgent({ ...DataAgent ,...{password: e.target.value}})
        }}
        />
       
         <Button variant="contained" style={{margin:"15px"}} onClick={()=>retour()} >Retour</Button>

        {props.match.params.id ?

          <Button variant="contained" onClick={()=>updateagent()}>Confirmer</Button>
          :
          <>
          
          <Button variant="contained" onClick={()=>newagent()}>Confirmer</Button>
          </>
        }
        
    </Box>
   

  );
}
export default(UseFormControl);