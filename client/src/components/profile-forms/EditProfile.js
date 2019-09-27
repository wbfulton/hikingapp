import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  // sets FormData and setFrom Data to these initial states
  const [formData, setFormData] = useState({
    grade: '',
    type: '',
    skills: '',
    resort: '',
    pass: '',
    bio: '',
    driver: '',
    facebook: '',
    twitter: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // Gets the current state of the profile every refresh
  // Preloads fields in formData with the state of the current profile
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      grade: loading || !profile.grade ? '' : profile.grade,
      type: loading || !profile.type ? '' : profile.type,
      skills: loading || !profile.skills ? '' : profile.skills.join(),
      resort: loading || !profile.resort ? '' : profile.resort,
      pass: loading || !profile.pass ? '' : profile.pass,
      bio: loading || !profile.bio ? '' : profile.bio,
      driver: loading || !profile.driver ? '' : profile.driver,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
    // eslint-disable-next-line
  }, [loading, getCurrentProfile]);

  const {
    grade,
    type,
    skills,
    resort,
    pass,
    bio,
    driver,
    facebook,
    twitter,
    instagram
  } = formData;

  // Sets formData changes when user inputs fields
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  // Submits data with createProfile() and prevents an empty submit
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      {/* Top Information */}
      <h1 className="large text-primary">Update Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      {/* Form */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        {/* Grade */}
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
        {/* Type */}
        <div className="form-group">
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">* Select Type</option>
            <option value="Skier">Skier</option>
            <option value="Snowboarder">Snowboarder</option>
            <option value="Skier and Snowboarder">Skier and Snowboarder</option>
          </select>
          <small className="form-text">
            * Let us know how you shred the mountain
          </small>
        </div>
        {/* Type */}
        <div className="form-group">
          <div className="form-group">
            <select name="driver" value={driver} onChange={e => onChange(e)}>
              <option value="0">* Do you have a car?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <small className="form-text">
              * Let us know if you can haul ski bums
            </small>
          </div>
          <input
            type="text"
            placeholder="Resort"
            name="resort"
            value={resort}
            onChange={e => onChange(e)}
          />
          <small className="form-text">What is your favorite resort?</small>
        </div>
        {/* Ski Pass */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Ski Pass"
            name="pass"
            value={pass}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            What ski pass do you have? (Type 'No Ski Pass' if you do not have
            one)
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
            * Please use comma separated values (eg. Trees, Cliff Jumping,
            Sendin' It )
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
        {/* Social Media Links */}
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
        {/* Links only display when toggled */}
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
        {/* Submit button and Back button */}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

// Defines prop types for component
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// Sets profile state with current profile state
const mapStateToProps = state => ({
  profile: state.profile
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
