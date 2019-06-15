import React ,{useEffect,Fragment}  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom';
import NavbarDashbord from './NavbarDashbord';

const Dashboard = ({getCurrentProfile, auth:{user}, profile:{profile,loading}}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [])
  return loading && profile!==null ? <Spinner/> : <Fragment>
  <h1>Dashboard</h1>
  <h4>Welcome {user && user.name}</h4>
  {profile!==null ? <Fragment>
    <NavbarDashbord/>
    </Fragment> :<Fragment>
    <Link to='/create-profile' className='btn'> Create Profile</Link>
  </Fragment>}
  </Fragment>
};

Dashboard.protoType = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
