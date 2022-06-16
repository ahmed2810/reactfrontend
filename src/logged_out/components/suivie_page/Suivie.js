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
              {data.refService === "formation" ?
                <div className='repdata'>
                  <p><span className='title'>Votre date de session formation sera le :</span> {data.dateVisite}</p>
                  { data.statut !== null ?
                    <>
                      <p> <span className='title'>Votre attestation est :</span> {data.statut}</p>
                    </>
                    :<p>Votre attestation est en cours de traitement </p>
                  }
                </div>
              :(data.refService === "planification" )?
              <div className='repdata'>
                  
                  { data.statut !== null ?
                    <>
                      <p> <span className='title'>Votre attestation est :</span> {data.statut}</p>

                    </>
                    :<p>Votre attestation est en cours de traitement </p>
                  }
                </div>
                :
                <div className='repdata'>
                  <p><span className='title'>Votre date de visite sera le :</span> {data.dateVisite}</p>
                  { data.statut !== null &&
                    <>
                      <p> <span className='title'>Avis :</span> {data.statut}</p>
                      <p><span className='title'>Les anomalies marquées :</span> {data.motifDemande}</p>
                    </>
                  }
                </div>
              }
              </>
            }

            
          </Box>
  
  </div>
  <style>
    {`
    .repdata{
      padding: 20px;
      border: 1px solid black;
    }
    .title{
      font-weight: 900;
    }
    
    `}
  </style>
  </Box>
  );
}

export default Suivie