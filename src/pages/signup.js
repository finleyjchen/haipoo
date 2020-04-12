import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';
import SignInForm, {
  SignInGoogle
} from '../components/SignIn'

const SignUpPage = () => (
  <Fragment>
    <h1>SignUp</h1>
    <SignUpForm />
    <SignInGoogle />
  </Fragment>
);

export default () => (
  <Layout>
    <SignUpPage />

  </Layout>
);
