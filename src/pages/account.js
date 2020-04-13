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
import PasswordForgetForm from '../components/PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';
import LoginManagement from '../components/LoginManagement';
import UsernameForm from '../components/UsernameForm';

const AccountPageBase = () => (
  <Fragment>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.email}</h1>
          {authUser.needsUsername ? <UsernameForm /> : <Fragment></Fragment> }
          
          <PasswordForgetForm />
          {/* <PasswordChangeForm /> */}
          <LoginManagement authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  </Fragment>
);

const condition = authUser => !!authUser;

const AccountPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPageBase);

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);
