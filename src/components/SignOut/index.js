import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    onClick={firebase ? firebase.doSignOut : () => {}}
    className="px-2 py-1 text-sm hover:bg-gray-200"
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
