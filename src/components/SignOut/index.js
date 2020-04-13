import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a
  href="#"
    onClick={firebase ? firebase.doSignOut : () => {}}
    className="px-2 py-1 text-sm hover:bg-gray-200"
  >
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
