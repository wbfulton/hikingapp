import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DriveItem = ({
  auth,
  drive: {
    user,
    name,
    avatar,
    leavingDate,
    leavingTime,
    resort,
    seats,
    description,
    group,
    comments,
    date
  }
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <i className="far fa-calendar-alt text-primary"></i>
        <span>
          {' '}
          Leaving <Moment format="MM/DD/YY">{leavingDate}</Moment>{' '}
        </span>
        <i className="far fa-clock text-primary"></i>
        <span>{' '}{leavingTime}{' '}</span>
        <i className="fas fa-mountain text-primary"></i>
        <span>{' '}{resort}{' '}</span>
        <i className="fas fa-chair text-primary"></i>
        <span>{' '}{seats - group.length}{' '}</span>
        {!auth.loading && user === auth.user._id && (
              <Fragment>
                <button
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              </Fragment>
            )}
        <p className="my-1">{description}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YY">{date}</Moment>
        </p>
        <button type="button" className="btn btn-primary">
          <i className="fas fa-user-plus"></i>
          <span>{' '}Join{' '}{group.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-user-minus"></i>
          <span> Leave</span>
        </button>
        <a href="drive.html" className="btn btn-light">
          <i className="fas fa-car-alt"></i>{' '}Car{' '}
          <span className="comment-count">{comments.length}</span>
        </a>
        <a href="drive-comments.html" className="btn btn-light">
          <i className="fas fa-comments"></i>{' '}Comments{' '}
          <span className="comment-count">3</span>
        </a>
      </div>
    </div>
  );
};

DriveItem.propTypes = {
  drive: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(DriveItem);
