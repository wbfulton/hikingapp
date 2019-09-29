import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  // Calls getPost() once every page refresh
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  // Shows Spinner when loading
  return loading || post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {/* Post and Post Form */}
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {/* Shows All Comments */}
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

// Defines proptypes for components
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// Sets post prop to current prop state
const mapStateToProps = state => ({
  post: state.post
});

// Connect component to redux
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
