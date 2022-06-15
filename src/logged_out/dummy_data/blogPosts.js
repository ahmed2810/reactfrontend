import React, { Fragment } from "react";
import { Typography } from "@mui/material";

const content = (
  <Fragment>
    <Typography variant="h3" paragraph>
      Les documents à fournir sont :
    </Typography>
    <Typography variant="h4" paragraph>
    1- Service prevention et securité incendie:
    </Typography>
    <Typography variant="h6" paragraph>
    <strong>Attestation de prevention</strong>
    </Typography>
    <Typography variant="h6"paragraph>
      <p>-Copie carte identité nationale.</p>
      <p>-Copie contrat de location ou titre de propriété.</p>
      <p>-Plan situation de local.</p>
      <p>-Plan conception de local.</p>
      <p>-Fiche de renseignement.</p>
    </Typography>
  
    <Typography variant="h6" paragraph>
     <strong> Etude dossier securité</strong>
    </Typography>
    <Typography variant="h6"paragraph>
      <p>-Demande au nom de directeur regionale de la protection civile.</p>
      <p>-Trois Copie de dossier de securité  comprenant : </p>
      <p>  1/Plans de conception , coupes et implantation.</p>
      <p>  2/Etude de securité.</p>
    </Typography>
    <Typography variant="h4" paragraph>
    2-Service Formation:
    </Typography>
    <Typography variant="h6" paragraph>
    <strong>Attestation de formation Secourisme</strong> 
    </Typography>

    <Typography variant="h6"paragraph>
      <p>-Copie carte identité nationale.</p>
      <p>-Fiche de renseignement.</p>
    </Typography>
    <Typography variant="h6" paragraph>
    <strong>Attestation de formation Maitre najeur</strong> 
    </Typography>

    <Typography variant="h6"paragraph>
      <p>-Copie carte identité nationale.</p>
      <p>-Fiche de renseignement.</p>
    </Typography>
  
    <Typography variant="h6" paragraph>
      <strong>Bénevolat</strong>
    </Typography>
    <Typography variant="h6"paragraph>
      <p>-Demande au nom de directeur regionale de la protection civile.</p>
      <p>-Copie carte identité nationale </p>
      <p>-Bulttein numero 3.</p>
    </Typography>
    <Typography variant="h4" paragraph>
   3-Service Planification et gestion crises
    </Typography>
    <Typography variant="h6" paragraph>
      <strong>Attestation d'intervention</strong>
    </Typography>
    <Typography variant="h6"paragraph>
      <p>-Copie carte identité nationale.</p>
      
      <p>-Fiche de renseignement.</p>
    </Typography>
  
    <Typography variant="h6" paragraph>
     <strong>Operation blanche</strong>
    </Typography>
    <Typography variant="h6"paragraph>
      <p>-Demande au nom de directeur regionale de la protection civile.</p>
    
    </Typography>
    
   

  </Fragment>
);

const posts = [
  {
    title: "Prévention et securité incendie",
    id: 1,
    date: 1576281600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/prevention2.jpg`,
    snippet:
      "Les documents necessaires pour déposer une demande d'attestation de prévention sont:"
     ,
    content: content,
  },
  {
    title: "Formation et bénévolat",
    id: 2,
    date: 1576391600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/secourisme.jpg`,
    snippet:
    "Les documents necessaires pour déposer une demande d'attestation de formation sont:",
    content: content,
  },
  
  {
    title: "Planification et gestion risque",
    id: 3,
    date: 1572281600,
    src: `${process.env.PUBLIC_URL}/images/logged_out/palanification.jpg`,
    snippet:
      "Les documents necessaires pour déposer une demande d'attestation d'intervention sont:",
    content: content,
  },


];

export default posts;