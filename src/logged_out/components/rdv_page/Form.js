import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'; 
import Date from './Date';  




const Form = (props) => {
  const {
    choix,






   } = props;
  
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

                        <Date/>
                    </Box>
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

const direction = ["Gouvernorat de l'Ariana",
"Gouvernorat de Béja",
"Gouvernorat de Ben Arous",
"Gouvernorat de Bizerte",
"Gouvernorat de Gabès",
"Gouvernorat de Gafsa",
"Gouvernorat de Jendouba",
"Gouvernorat de Kairouan",
"Gouvernorat de Kasserine",
"Gouvernorat de Kébili",
"Gouvernorat du Kef",
"Gouvernorat de Mahdia",
"Gouvernorat de Manouba",
"Gouvernorat de Médenine",
"Gouvernorat de Monastir",
"Gouvernorat de Nabeul",
"Gouvernorat de Sfax",
"Gouvernorat de Sidi Bouzid",
"Gouvernorat de Siliana",
"Gouvernorat de Sousse",
"Gouvernorat de Tataouine",
"Gouvernorat de Tozeur",
"Gouvernorat de Tunis",
"Gouvernorat de Zaghouan"];
