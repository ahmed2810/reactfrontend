import React from "react";
import { Grid, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudIcon from "@mui/icons-material/Cloud";
import MeassageIcon from "@mui/icons-material/Message";
import CancelIcon from "@mui/icons-material/Cancel";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "les recents attestation ",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <SnippetFolderIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "les demandes diposés",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <SnippetFolderIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "les demandes rejétes",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <SnippetFolderIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
 
  
];

function FeatureSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
         Departement Technique
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);
