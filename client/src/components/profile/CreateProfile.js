import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../redux/actions/profileActions';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const {
    company,
    website,
    location,
    status,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1>
        <i className='fas fa-user' />
        Create Your Profile
      </h1>

      <small>* = required field</small>
      <div className='row'>
        <form className='' onSubmit={e => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Status'
                name='status'
                value={status}
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Company'
                name='company'
                value={company}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Website'
                name='website'
                value={website}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Github Username'
                name='githubusername'
                value={githubusername}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='row'>
            <i className='fab fa-twitter fa-2x' />
            <div className='input-field col s12'>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='row'>
            <i className='fab fa-facebook fa-2x' />
            <input
              type='text'
              placeholder='Facebook URL'
              name='facebook'
              value={facebook}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <i className='fab fa-youtube fa-2x' />
            <input
              type='text'
              placeholder='YouTube URL'
              name='youtube'
              value={youtube}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <i className='fab fa-linkedin fa-2x' />
            <input
              type='text'
              placeholder='Linkedin URL'
              name='linkedin'
              value={linkedin}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <i className='fab fa-instagram fa-2x' />
            <input
              type='text'
              placeholder='Instagram URL'
              name='instagram'
              value={instagram}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <textarea
              className='materialize-textarea'
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='row'>
            <input type='submit' className='btn col m3 s4 left' />
            <Link className='btn col m3 s4 right' to='/dashboard'>
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
