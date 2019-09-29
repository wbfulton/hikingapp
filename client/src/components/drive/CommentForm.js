import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/drive';

const CommentForm = ({ driveId, addComment }) => {
  const [text, setText] = useState(''); // creates var to keep track of user input

  return (
    <div className="comment-form">
      <div class="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(driveId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="15"
          rows="3"
          placeholder="Add a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Post" />
      </form>
    </div>
  );
};

// Defines props for component
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  driveId: PropTypes.object.isRequired
};

// Connects component to redux
export default connect(
  null,
  { addComment }
)(CommentForm);
