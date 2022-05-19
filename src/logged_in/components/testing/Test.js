import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import HeadSection from "../../../logged_out/components/home/HeadSection";
import FeatureSection from "../../../logged_out/components/home/FeatureSection";
import Footer from "../../../logged_out/components/footer/Footer";

function Test(props) {
  const {
    selectPosts,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    setPosts,
  } = props;

  return (
    <Fragment>
    <HeadSection /> 
     <FeatureSection /> 
      <Footer/>
  </Fragment>
  );
}


Test.propTypes = {
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPosts: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
};
export default Test;
