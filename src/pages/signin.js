import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';

import { SignUpLink } from '../components/SignUp';

const SignInPage = () => (
  <Fragment>
    <h1 className="text-2xl text-center text-bold py-4">Sign In</h1>
    <div className="flex flex-col sm:flex-row mx-auto max-w-lg border border-gray-800 rounded-sm">
      <div className="sm:w-1/2 p-4 bg-gray-100">
        <SignInForm />
      </div>
      <div className="sm:w-1/2 p-4">
        <SignInGoogle />
        {/* <SignInTwitter />  */}
        {/* <SignInFacebook /> */}
      </div>
    </div>
    <div className="max-w-lg mx-auto p-4">
      <SignUpLink />
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
