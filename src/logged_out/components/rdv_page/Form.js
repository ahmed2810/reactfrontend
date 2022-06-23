import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'; 
import { Button } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { jsPDF } from "jspdf";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from "moment-timezone";
import _ from "lodash";


const Form = (props) => {
  const { choix } = props;
  let user = JSON.parse(localStorage.getItem("user"))
  var doc = new jsPDF('landscape');
  const [body, setBody] = useState({
    user : [`${user && user._id}`] ,
    refService :  choix === 1 ? "securite" : (choix === 2) ? "formation" : "planification"
  });
  const [dateInterdites, setDateInterdites] = useState([]);
  const [groupedRdv, setGroupedRdv] = useState({});  
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, handleDateChange] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentHours, setCurrentHours] = useState(null);  
  
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6 || dateInterdites.includes(date.getTime());
  }

  const sendform = () => {
    axios.post(`http://localhost:5000/demandes/createdemande`, body)
      .then(res => {
        if (res.status === 200) {
          swal({
            title: "Nouvelle demande",
            text: "La demande a été crée",
            icon: "success",
          }).then(function() {
            doc.text(20, 20, ` Demande de Rendez-vous a éte crée par le citoyen(ne):\n \n \n
            \n Nom: ${user.firstName} 
            \n Prénom: ${user.lastName} 
            \n Cin : ${user.cin} 
            \n Telephone : ${user.phone}
            \n Date de Rendez-Vous : ${ moment(body.dateRdv).format('DD-MM-YYYY HH:mm')}  
            \n \n \n Merci de contacter la Direction Regionale de la Protection Civile 
            \n de votre Gouvernorat pour faire le depot votre dossier.` );
            doc.save('ProtectionCivile.pdf');
          });
        }
        
       
      }).catch(err => {
        
     console.log(err)
        swal({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error,
          
         })
    });
  }
   


  const getListRdv = async () => {
    await axios.get(`http://localhost:5000/demandes/search`)
      .then(res => {
        if (res.status === 200) {
          const rdv = res.data;
          const DateNotDispo = [];
          rdv.map(item => Object.assign(item, { dateRdv: moment(item.dateRdv).tz('Europe/Paris').format('YYYY-MM-DD HH:mm') }) );
          rdv.map(item => Object.assign(item, { customDateRdv: moment(item.dateRdv).format('YYYY-MM-DD') }) );
          
          // Regroup list rdv by date
          const result = _.groupBy(rdv, 'customDateRdv');
          setGroupedRdv(result);
          // Check no dispo days
          Object.keys(result).map((item, index) => {
            //  16 max rdv by day
            if(result[Object.keys(result)[index]].length >= 16 ){
              DateNotDispo.push(new Date(item+'T00:00').getTime());
            }
          });
          setDateInterdites(DateNotDispo);
          setShowCalendar(true);
        }
      }).catch(err => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    getListRdv();
  }, []);

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
                            label="Choisir Specialité"
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
                        {showCalendar &&
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                              autoOk 
                              required
                              renderInput={(props) => <TextField {...props} sx={{ width: 300 }} 
                                onKeyDown={e => e.preventDefault()}
                                InputLabelProps={{
                                  shrink: true,
                                  readOnly: true
                                }}/>
                              }
                              label="Date Rendez-Vous"
                              inputFormat="dd/MM/yyyy HH:mm"
                              value={selectedDate}
                              minDate={tomorrow}
                              onChange={(date) => {
                                console.log('here change', moment(date).format('YYYY-MM-DD HH:mm') ); 
                                setCurrentDate(moment(date).format('YYYY-MM-DD'));
                                setCurrentHours(moment(date).format('HH'));
                                handleDateChange(date)
                                setBody({ ...body ,...{dateRdv: moment(date).format()}})
                                // setBody({ ...body ,...{dateRdv: date} })
                              } }
                              shouldDisableDate={disableWeekends}                        
                              ampm={false}
                              minTime={new Date(0, 0, 0, 8)}
                              maxTime={new Date(0, 0, 0, 17, 30)}
                              allowTextInput={false}
                              shouldDisableTime={(timeValue, clockType) => {
                                let arrayHours = [];
                                let disabledH = [13];
                                let arrayMinutes = {};
                                let disabledM = null;
                                // Get rdv hour by day selected
                                if(groupedRdv[currentDate]){
                                  groupedRdv[currentDate].map(item => arrayHours.push(moment.utc(item.dateRdv).format('HH')) );
                                  groupedRdv[currentDate].map(item => Object.assign(arrayMinutes, { [moment.utc(item.dateRdv).format('HH')]: moment(item.dateRdv).format('mm') })   );
                                                                  
                                  const occurrencesH = arrayHours.reduce(function (acc, curr) {
                                    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                                  }, {});
                                  // Check no dispo days
                                  Object.keys(occurrencesH).map((item) => {
                                    // check if we have to rdv by hour so disabled
                                    if(occurrencesH[item] >= 2 ){                                    
                                      disabledH.push(parseInt(item));
                                    }
                                  });
                                  if(clockType === "minutes" && arrayMinutes[currentHours]){
                                    disabledM = arrayMinutes[currentHours];                                  
                                  }                             
                                }
                                return (clockType === "hours" && disabledH.includes(timeValue) ) || (clockType === "minutes" && ((disabledM && disabledM === '00') ? timeValue >= 0 && timeValue !== 30 : (disabledM && disabledM === '30') ? timeValue > 0 : (timeValue > 0 && timeValue !== 30)) );
                              }}
                            />
                          </LocalizationProvider>
                        }
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

 const direction =  [
// "Ariana",
// "Béja",
// "Ben Arous",
// "Bizerte",
// "Gabès",
// "Gafsa",
// "Jendouba",
// "Kairouan",
// "Kasserine",
// "Kébili",
// "du Kef",
// "Mahdia",
// "Manouba",
// "Médenine",
// "Monastir",
// "Nabeul",
// "Sfax",
// "Sidi Bouzid",
// "Siliana",
 "Sousse",
// "Tataouine",
// "Tozeur",
// "Tunis",
// "Zaghouan"
 ];
