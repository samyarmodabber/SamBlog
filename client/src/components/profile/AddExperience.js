import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profileActions';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {title, company, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>Add An Experience</h1>
      <div className='row'>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <div className='row'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='row'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='row'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <p>From Date</p>
            <input
              type='date'
              name='from'
              value={from}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <label>
              <input
                type='checkbox'
                name='current'
                className='filled-in'
                checked={current ? 'checked' : ''}
                value={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />
              <span>Current Job</span>
            </label>
          </div>
          <div className='row'>
            <p>To Date</p>
            <input
              type='date'
              name='to'
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='row'>
            <textarea
              name='description'
              value={description}
              onChange={e => onChange(e)}
              className='materialize-textarea'
              placeholder='Job Description'
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
