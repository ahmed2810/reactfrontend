import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'; 
import { Button } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
//import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Form = (props) => {
  const {
    choix
   } = props;
   let user = JSON.parse(localStorage.getItem("user"))
   var doc = new jsPDF('landscape');
   const [body, setBody] = useState(
    {
    user : [`${user && user._id}`] ,
    // user : {firstName : user ? user.firstName : "", lastName : user ? user.lastName : ""} ,
    refService :  choix === 1 ? "Securite" : (choix === 2) ? "formation" : "planification"
    }
    );
    const [value, setValue] = useState(new Date());

  
   const sendform = () => {
  

    axios.post(`http://localhost:5000/demandes/createdemande`, body)
    .then(res => {
      if (res.status === 200) {
        swal({
          title: "Nouvelle demande",
          text: "La demande a été crée",
          icon: "success",
        }).then(function() {
          doc.text(20, 20, ` Nom: ${user.firstName} \n Prénom: ${user.lastName} \n Telephone :${user.phone}  ` );
          doc.save('ProtectionCivile.pdf');
        });
      }
    }).catch(err => {
  });
  }
   

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={ "lg-p-top"}
    >
    <div>
    <div className='date'>
        <Fragment>
            <div>
                      <Box>
                        <Autocomplete
                        onChange={(e) => {
                          setBody({ ...body ,...{city: e.target.innerText}})
                        }}
                        id="country-select-demo"
                          sx={{ width: 300 }}
                          options={direction}
                          autoHighlight
                          renderInput={(params) => (
                              <TextField
                              {...params}
                              label="Choisir Gouvernorat"
                              inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                              />
                          )}
                          />
                      </Box>

                      <Box style={{marginTop:"20px"}}>
                      <Autocomplete
                        onChange={(e) => {
                          setBody({ ...body ,...{refSubservice: e.target.innerText}})
                        }}
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={choix === 1 ? choixsecurite : (choix === 2) ? choixformation : choixplanification}
                        autoHighlight
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Choisir specialité"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                        />
                        </Box>

                        </div>

                    <div style={{marginTop:"20px"}}>

                    <Box>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="DateTimePicker"
                          value={value}
                          style={{ width: "300px" }}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          minDateTime={new Date()}
                          inputProps={{
                            step: 900, // 15 min
                          }}
                        />
                      </LocalizationProvider> */}
             
                    <TextField
                    onChange={(e) => {
                      setBody({ ...body ,...{dateRdv: e.target.value}})
                    }}
                      id="datetime-local"
                      label="Rendez-Vous"
                      type="datetime-local"
                      defaultValue=""
                      sx={{ width: 300 }}
                      InputLabelProps={{
                        shrink: true,
                        
                      }}
                      inputProps={{
                        step: 900, // 15 min
                      }}
                    />
                    
                    </Box>
                    </div>
                    <div style={{marginTop:"20px"}}>

                    <Button variant="contained" onClick={()=>sendform()}>Confirmer</Button>

                    </div>

</Fragment>
</div>
</div>
</Box>
  );
}

export default Form




const choixsecurite = [
"Demande Attestation prévention",
"Etude d'un dossier sécurité",
"Autres",
];
const choixformation = [
"Formation Secourisme et lutte contre incendie",
"Formation Maitre Najeur",
"Autres",
];
const choixplanification = [
"Demande Attestation d'intervention",
"Demande operation blanche",
"Autres",
];

const direction = [
"Ariana",
"Béja",
"Ben Arous",
"Bizerte",
"Gabès",
"Gafsa",
"Jendouba",
"Kairouan",
"Kasserine",
"Kébili",
"du Kef",
"Mahdia",
"Manouba",
"Médenine",
"Monastir",
"Nabeul",
"Sfax",
"Sidi Bouzid",
"Siliana",
"Sousse",
"Tataouine",
"Tozeur",
"Tunis",
"Zaghouan"
];
