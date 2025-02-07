import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

// Checks if User has liked or commented
const inArray = (auth, array) => {
  if (!auth.loading) {
    return (
      array.filter(object => object.user.toString() === auth.user._id).length >
      0
    );
  }
};

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      {/* User Image */}
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        {/* Only shows likes, comments, delete button when true */}
        {showActions && (
          <Fragment>
            {/* Likes*/}
            <button
              onClick={e =>
                inArray(auth, likes) ? removeLike(_id) : addLike(_id)
              }
              type="button"
              className={
                inArray(auth, likes) ? 'btn btn-primary' : 'btn btn-light'
              }
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>
            {/* Comments */}
            <Link
              to={`/posts/${_id}`}
              className={
                inArray(auth, comments) ? 'btn btn-primary' : 'btn btn-light'
              }
            >
              <i className="fas fa-comments"></i> Comments{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {/* Delete Button */}
            {!auth.loading && user === auth.user._id && (
              <Fragment>
                <button
                  onClick={e => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

// Sets showActions default to true
PostItem.defaultProps = {
  showActions: true
};

// Defines props for component
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

// Sets auth prop to current auth state
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
