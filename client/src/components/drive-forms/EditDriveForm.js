import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editDrive } from '../../actions/drive';

const EditDriveForm = ({
  editDrive,
  drive,
  history,
}) => {
  // Sets FormData and setForm Data to these initial states
  const [formData, setFormData] = useState({
    leavingDate: '',
    leavingTime: '',
    resort: '',
    seats: '',
    description: ''
  });

  // Formats date from String Date
  function formatDate(date) {
    // Removes Time Value
    date = date.substring(0, 10);

    // Replaces All Dashes with Forward Slashes
    date = date.replace(/-/g, '/');

    // Moves year from front to back
    date = date.substring(5) + '/' + date.substring(0, 4);

    return date;
  }
  // Runs every time component refreshes, Fills in form with current fields
  useEffect(() => {
      setFormData({
        leavingDate: !drive.leavingDate ? '' : formatDate(drive.leavingDate),
        leavingTime: !drive.leavingTime ? '' : drive.leavingTime,
        resort:  !drive.resort ? '' : drive.resort,
        seats: !drive.seats ? '' : drive.seats,
        description: !drive.description ? '' : drive.description
      });
  }, [drive]);

  const { leavingDate, leavingTime, resort, seats, description } = formData;

  // Updates state of form data each time a field changes
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  // Calls editDrive() action. Prevents an empty submit. Hides form when posted
  const onSubmit = e => {
    e.preventDefault();
    editDrive(drive._id, formData, history);
  };

  return (
    <div className="post-form">
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        {/* Leaving Date */}
        <div className="form-group">
          <input
            type="text"
            name="leavingDate"
            value={leavingDate}
            onChange={e => onChange(e)}
            placeholder="mm/dd/yyyy"
            required
          />
          <small className="form-text">
            * What day are you leaving? (include zeroes e.g. 04/02/2019){' '}
          </small>
        </div>
        {/* Leaving Time */}
        <div className="form-group">
          <input
            type="text"
            name="leavingTime"
            value={leavingTime}
            onChange={e => onChange(e)}
            placeholder="hh:mm AM"
            required
          />
          <small className="form-text">
            * What time are you leaving? (e.g. 09:00 AM){' '}
          </small>
        </div>
        {/* Resort */}
        <div className="form-group">
          <input
            type="text"
            value={resort}
            onChange={e => onChange(e)}
            placeholder="Resort"
            name="resort"
            required
          />
          <small className="form-text">* Where are you going?</small>
        </div>
        {/* Seats */}
        <div className="form-group">
          <input
            type="number"
            placeholder="Seats"
            name="seats"
            value={seats}
            onChange={e => onChange(e)}
            min="0"
            max="8"
            required
          />
          <small className="form-text">
            * How many seats do you have? (NOT including yourself and NOT including those signed up). Enter zero if you have no seats avaliable.
          </small>
        </div>
        {/* Description */}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={e => onChange(e)}
            placeholder="* What time are you leaving? Where will you pick your riders up? Any specifications?"
            required
          ></textarea>
        </div>
        {/* Submit and Back Button*/}
        <input type="submit" className="btn btn-dark my-1" value="Post" />
        <Link to="/dashboard">
          <button className="btn btn-light m">Back to Dashboard</button>
        </Link>
      </form>
    </div>
  );
};

// Defines proptypes for EditDriveForm component
EditDriveForm.propTypes = {
  editDrive: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

// Connects component to redux
export default connect(
  null,
  { editDrive }
)(withRouter(EditDriveForm));
