import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { navigate } from 'gatsby';

import * as ROUTES from '../constants/routes';

import Layout from '../components/layout';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import PasswordForgetLink from '../components/PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';
import LoginManagement from '../components/LoginManagement';
import UsernameForm from '../components/UsernameForm';
import SignOutButton from '../components/SignOut'

const ProfilePageBase = () => (
  <div className="max-w-xs mx-auto text-center">
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          
          {authUser.needsUsername ? <UsernameForm /> : <h1>{authUser.email}</h1> }
          
          <PasswordForgetLink />
          {/* <PasswordChangeForm /> */}
          <LoginManagement authUser={authUser} />
          <SignOutButton />
        </div>
      )}
    </AuthUserContext.Consumer>
  </div>
);

const condition = authUser => !!authUser;

const ProfilePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(ProfilePageBase);

export default () => (
  <Layout>
    <ProfilePage />
  </Layout>
);
