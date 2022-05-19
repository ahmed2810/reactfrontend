import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import  Test  from "./blog/Test";
import StepForm from "./rdv_page/StepForm";
import Suivie from "./suivie_page/Suivie";



function Routing(props) {
  const { blogPosts, selectBlog, selectHome,openLoginDialog } = props;
  useLocationBlocker();
  return (
    <Switch>
      {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))}
       <PropsRoute
        exact
        path="/rdv"
        component={StepForm}
        title="titre1"
        age="25"
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
        openLoginDialog={openLoginDialog}
      />
      <PropsRoute
        exact
        path="/suivie"
        component={Suivie}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />

    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
  openLoginDialog:PropTypes.func,
};

export default memo(Routing);
