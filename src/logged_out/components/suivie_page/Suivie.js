import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';




const Suivie = () => {

  const [numrecu, setNumrecu] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  const SuivieDemande = () => {
    
    axios.get(`http://localhost:5000/demandes/searchdemande/${numrecu}`)
    .then(res => {
        if (res.status === 200) {
          setData(res.data);
          setVisible(true);
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
          <div>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              marginBottom: 3,
            }}
          >
            <TextField 
            fullWidth 
            label="Numero reçu" 
            onChange={(e) => setNumrecu(e.target.value)}
            id="fullWidth" />
          </Box>
          </div>
          <div><Button variant="contained" onClick={()=>SuivieDemande()}>Confirmer</Button></div>

          <Box style={{margin :' 20px 0'}}>
            {visible &&
              <>
                <p>Votre date de visite sera le : {data.dateVisite}</p>
                { data.statut !== null &&
                  <>
                    <p>Avis : {data.statut}</p>
                    <p>Les anomalies marquées : {data.motifDemande}</p>
                  </>
                }
              </>
            }

            
          </Box>
  
  </div>
  </Box>
  );
}

export default Suivie