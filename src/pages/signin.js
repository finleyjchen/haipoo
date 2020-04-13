import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';

import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';

const SignInPage = () => (
  <Fragment>
    <SignInForm />
    <SignInGoogle />
    {/* <SignInTwitter />  */}
    {/* <SignInFacebook />
    */}
    <PasswordForgetLink />
    <SignUpLink />
  </Fragment>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
