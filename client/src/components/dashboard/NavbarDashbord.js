import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function NavbarDashbord() {
  return (
    <Fragment>
      <div className='row'>
        <div className='col s12 m4'>
          <Link to='/edit-profile' className='waves-effect waves-light btn'>
            Edit Profile
          </Link>
        </div>
        <div className='col s12 m4'>
          <Link to='/add-education' className='waves-effect waves-light btn'>
            Add Education
          </Link>
        </div>
        <div className='col s12 m4'>
          <Link to='/add-experience' className='waves-effect waves-light btn'>
            Add Experience
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
