import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDrive } from '../../actions/drive';

const DriveForm = ({ addDrive }) => {
  // Initalizes variables for toggling form
  const [displayDriveForm, toggleDriveForm] = useState(false);

  // sets FormData and setFrom Data to these initial states
  const [formData, setFormData] = useState({
    leavingDate: '',
    leavingTime: '',
    hike: '',
    seats: '',
    description: ''
  });

  const { leavingDate, leavingTime, hike, seats, description } = formData;

  // Updates state of form data each time a field changes
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  // Calls addDrive() action. Prevents an empty submit. Hides form when posted
  const onSubmit = e => {
    e.preventDefault();
    addDrive(formData);
    toggleDriveForm(!displayDriveForm);
  };

  return (
    <div className="post-form">
      <div className="bg-primary">
        <button
          className="btn btn-primary btn-bg"
          type="button"
          onClick={() => toggleDriveForm(!displayDriveForm)}
        >
          <h3>Start a Trip...</h3>
        </button>
      </div>

      {/* Displays when user clicks on Start a Trip button */}
      {displayDriveForm && (
        <Fragment>
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
            {/* Location */}
            <div className="form-group">
              <input
                type="text"
                value={hike}
                onChange={e => onChange(e)}
                placeholder="Hike"
                name="hike"
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
                min="1"
                max="8"
                required
              />
              <small className="form-text">
                * How many seats do you have? (NOT including yourself)
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
                placeholder="* Where will you pick your riders up? Any specifications?"
                required
              ></textarea>
            </div>
            {/* Submit */}
            <input type="submit" className="btn btn-dark my-1" value="Post" />
          </form>
        </Fragment>
      )}
    </div>
  );
};

// Defines proptypes for DriveForm component
DriveForm.propTypes = {
  addDrive: PropTypes.func.isRequired
};

// Connects component to redux
export default connect(
  null,
  { addDrive }
)(DriveForm);
