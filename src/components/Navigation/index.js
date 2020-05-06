import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'react-feather';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);
  return (
  <nav className=" sm:p-0 sm:mt-16 container max-w-4xl mx-auto text-left flex justify-between w-full items-center ">
    <Link
      to={ROUTES.HOME}
      className="text-2xl"
    >
      Haipoo
    </Link>
    <div className={` `}>
    <a href="#" onClick={ () => setOpen(!open)}><Menu /></a>
    <ul className={`${ open ? '' : 'hidden' } text-center bg-white w-full  absolute top-0 left-0 mt-12 md:mt-32 flex flex-col text-gray-800 text-lg`}>
      <li>
        <Link
          to={'/poem/' + 'all'}
          className="px-2 py-1 hover:text-gray-600"
          >
          Home
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
            </div>
  </nav>
)};

const NavigationAuth = ({ authUser }) => (
  <React.Fragment>
    <li>
      <Link
        to={ROUTES.ACCOUNT}
        className="px-2 py-1 hover:text-gray-600"
      >
        Account
      </Link>
    </li>

    <li>
      <Link
        to={ROUTES.CREATE}
        className="px-2 py-1 hover:text-gray-600"
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
      <Link to={ROUTES.SIGN_IN} className="px-2 py-1 hover:text-gray-600">Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP} className="px-2 py-1 hover:text-gray-600">Sign Up</Link>
    </li>
  </React.Fragment>
);

export default Navigation;
