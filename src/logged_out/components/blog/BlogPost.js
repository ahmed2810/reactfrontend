import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import format from "date-fns/format";
import { Grid, Typography, Card, Box, ButtonGroup } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import BlogCard from "./BlogCard";
import ShareButton from "../../../shared/components/ShareButton";
import ZoomImage from "../../../shared/components/ZoomImage";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    boxShadow: theme.shadows[4],
  },
});

function BlogPost(props) {
  const { classes, date, title, src, content, otherArticles, loginModel, blogId } = props;
  const [choix, setChoix] = useState(null);
  let history = useHistory();

  useEffect(() => {
    document.title = `protection civile  - ${title}`;
    smoothScrollTop();
  }, [title]);

  useEffect(() => {
    if (choix === 1) {
      // history.push("/rdv");
      history.push({
        pathname: '/rdv',
        state: { detail: choix }
    });
    }else if (choix === 2) {
      history.push({
        pathname: '/rdv',
        state: { detail: choix }
    });
    }else if (choix === 3) {
      history.push({
        pathname: '/rdv',
        state: { detail: choix }
    });
    }
  }, [ choix ]);

  return (
    <Box
      className={classNames("lg-p-top", classes.wrapper)}
      display="flex"
      justifyContent="center"
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={12}>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h4">
                  <b>{title}</b>
                </Typography>
              </Box>
              <ZoomImage className={classes.img} src={src} alt="" />
              <Box p={3}>
                {content}
                <Box pt={2}>
               
      
                <Button     
                  loginModel={loginModel} 
                  setChoix = {setChoix}
                  blogId = {blogId}/>
                </Box>
              </Box>
            </Card>
          </Grid>
          {/* <Grid item md={3}>
            <Typography variant="h6" paragraph>
              Autres Services
            </Typography>
            {otherArticles.map((blogPost) => (
              <Box key={blogPost.id} mb={3}>
                <BlogCard
                  title={blogPost.title}
                  snippet={blogPost.snippet}
                 
                  // date={blogPost.date}
                  
                  url={`${blogPost.url}${blogPost.params}`}
                />
              </Box>
            ))}
          </Grid> */}
        </Grid>
      </div>
    </Box>
  );
}

BlogPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  otherArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, { withTheme: true })(BlogPost);
