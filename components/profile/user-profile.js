import { getSession } from "next-auth/react";
import { useState, useEffect } from 'react';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
