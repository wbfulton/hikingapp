import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  // sets FormData to these initial states, setFormData updates these fields
  const [formData, setFormData] = useState({
    grade: '',
    type: '',
    exp: '',
    skills: '',
    hike: '',
    passes: '',
    bio: '',
    driver: '',
    facebook: '',
    twitter: '',
    instagram: ''
  });

  // initalizes boolean variable to display social inputs on click
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    grade,
    type,
    exp,
    skills,
    hike,
    passes,
    bio,
    driver,
    facebook,
    twitter,
    instagram
  } = formData;

  // Updates fields when user inputs data
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  // Submits data with createProfile() and prevents an empty entry
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      {/* Top Info */}
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      {/* Form */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        {/* Grade Selector */}
        <div className="form-group">
          <select name="grade" value={grade} onChange={e => onChange(e)}>
            <option value="0">Select Grade</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at UW
          </small>
        </div>
        {/* Hiker Type Selector */}
        <div className="form-group">
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">* Select Type</option>
            <option value="Hiker">Hiker</option>
            <option value="Backpacker">Backpacker</option>
            <option value="Hiker and Backpacker">Hiker and Backpacker</option>
          </select>
          <small className="form-text">
            * Let us know how you enjoy the outdoors
          </small>
        </div>
        {/* Exp Selector */}
        <div className="form-group">
          <input
            type="number"
            placeholder="Years Experience"
            name="exp"
            value={exp}
            onChange={e => onChange(e)}
            min="0"
            required
          />
          <small className="form-text">
            * How many years of hiking experience do you have?
          </small>
        </div>
        {/* Driver Selector */}
        <div className="form-group">
          <div className="form-group">
            <select name="driver" value={driver} onChange={e => onChange(e)}>
              <option value="0">* Do you have a car?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <small className="form-text">
              * Let us know if you can haul members
            </small>
          </div>
        </div>
        {/* Hike Input */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Hike"
            name="hike"
            value={hike}
            onChange={e => onChange(e)}
          />
          <small className="form-text">What is your favorite hike?</small>
        </div>
        {/* Outdoor Pass Input */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Outdoor Passes"
            name="passes"
            value={passes}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            What outdoor passes do you have? Please enter comma seperated values
            (e.g. Discovery, Fishing ) Leave empty if you dont have any
          </small>
        </div>
        {/* Skills */}
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            * Please use comma separated values (eg. Bouldering, Camping,
            Wayfinding )
          </small>
        </div>
        {/* Bio */}
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        {/* Social Inputs */}
        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {/* Only displays social inputs when selected */}
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        {/* Submit and Back Button */}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

// Defines prop types for componenet
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// Connects component with redux
export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
