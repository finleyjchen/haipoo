import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';
import SignInForm, {
  SignInGoogle
} from '../components/SignIn'

const SignUpPage = () => (
  <Fragment>
    <h1 className="text-2xl text-center text-bold py-4">Sign Up</h1>
    <div className="flex flex-col sm:flex-row mx-auto max-w-lg border border-gray-800 rounded-sm">
      <div className="sm:w-1/2 p-4 bg-gray-100">
      <SignUpForm />

      </div>
      <div className="sm:w-1/2 p-4">
        <SignInGoogle />
        {/* <SignInTwitter />  */}
        {/* <SignInFacebook /> */}
      </div>
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <SignUpPage />

  </Layout>
);
