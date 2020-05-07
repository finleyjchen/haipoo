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
    <a href="#" className="sm:hidden" onClick={ () => setOpen(!open)}><Menu /></a>
    <ul className={`${ open ? '' : 'hidden' } sm:flex text-right bg-white w-full h-64 sm:h-auto absolute top-0 left-0 sm:static mt-12 sm:mt-0 flex flex-col sm:flex-row text-gray-800 text-lg`}>
      <li>
        <Link
          to={'/poem/' + 'all'}
          className="px-2 py-1 hover:text-gray-600"
          >
          View all Haipoos
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
        to={ROUTES.PROFILE}
        className="px-2 py-1 hover:text-gray-600"
      >
        Profile
      </Link>
    </li>

    <li>
      <Link
        to={ROUTES.COMPOSE}
        className="px-2 py-1 hover:text-gray-600"
      >
        Compose
      </Link>
    </li>
    <li>
      <Link
        to={ROUTES.SETTINGS}
        className="px-2 py-1 hover:text-gray-600"
      >
        Settings
      </Link>
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
