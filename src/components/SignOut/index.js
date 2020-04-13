import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a
  href="#"
    onClick={firebase ? firebase.doSignOut : () => {}}
    className=""
  >
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
