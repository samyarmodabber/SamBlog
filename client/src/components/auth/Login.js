import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login( email, password );
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='row'>
        <h3>Login</h3>
        <form className='col s12' onSubmit={e => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={email}
                name='email'
                type='email'
                className='validate'
                onChange={e => onChange(e)}
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={password}
                name='password'
                type='password'
                className='validate'
                onChange={e => onChange(e)}
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <input type='submit' className='btn' value='Login' />
        </form>
      </div>
    </Fragment>
  );
};

Login.protoType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
