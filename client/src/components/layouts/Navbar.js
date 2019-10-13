import React, {  Fragment } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {  
  const authLinks = (
    <ul className='right'>
      <li>
        <a onClick={logout} href='#!'>Logout</a>
      </li>
      <li>
        <Link to='/Dashboard'>Dashboard</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='right'>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/Register'>Register</Link>
      </li>
    </ul>
  );
  
  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>
            SamBlog
          </Link>
          {!loading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
