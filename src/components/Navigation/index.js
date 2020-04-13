import React from 'react';
import { Link } from 'gatsby';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <nav className="p-4 sm:p-0 sm:mt-16 container max-w-4xl mx-auto text-left flex justify-between w-full items-center">
    <Link
      to={ROUTES.HOME}
      className="text-xl font-bold uppercase tracking-wider"
    >
      Haipoo
    </Link>
    <ul className="flex flex-wrap content-center flex-row justify-between items-center py-2">
      <li>
        <Link
          to={'/poem/' + 'all'}
          className="px-2 py-1 text-sm hover:bg-gray-200"
        >
          All
        </Link>
      </li>

      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
    </ul>
  </nav>
);

const NavigationAuth = ({ authUser }) => (
  <React.Fragment>
    <li>
      <Link
        to={ROUTES.ACCOUNT}
        className="px-2 py-1 text-sm hover:bg-gray-200"
      >
        Account
      </Link>
    </li>
    
    <li>
      <Link
        to={ROUTES.CREATE}
        className="px-2 py-1 text-sm hover:bg-gray-200"
      >
        Create
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <React.Fragment>
    <li>
      <Link to={ROUTES.SIGN_IN} className="px-2 py-1 text-sm hover:bg-gray-200">Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP} className="px-2 py-1 text-sm hover:bg-gray-200">Sign Up</Link>
    </li>
  </React.Fragment>
);

export default Navigation;
