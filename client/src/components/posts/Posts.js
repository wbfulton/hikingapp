import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  // Fetchs Posts each time page loads
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // Shows Spinner when loading
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      {/* Shows all posts */}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

// Defines props for componet
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// Sets post prop to current post state
const mapStateToProps = state => ({
  post: state.post
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
