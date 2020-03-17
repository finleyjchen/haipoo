import React from 'react';
import { Link } from 'gatsby';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <nav className="sm:mt-10 container max-w-4xl mx-auto text-left  w-full">

  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
          )
        }
  </AuthUserContext.Consumer>
  </nav>
);

const NavigationAuth = ({ authUser }) => (
  <ul className="flex flex-wrap content-center flex-row justify-between items-center py-2">

    <li className="text-3xl font-bold w-full sm:w-auto">
      <Link to={ROUTES.HOME}>Haipoo
      <span className="block text-xs font-light">Haikus about poo</span></Link>
    </li>
    {/* <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li> */}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="flex flex-wrap content-center flex-row justify-between items-center">
    <li className="text-xl font-bold">
      <Link to={ROUTES.HOME}>Haipoo
      <span className="block text-xs font-light">Haikus about poo</span></Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
