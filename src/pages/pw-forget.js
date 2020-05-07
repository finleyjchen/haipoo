import React, { Fragment } from 'react';

import Layout from '../components/layout';
import PasswordForgetForm from '../components/PasswordForget';

const PasswordForgetPage = () => (
  <div className="max-w-xs mx-auto text-center">
    <h1>Reset your Password</h1>
    <PasswordForgetForm />
  </div>
);

export default () => (
  <Layout>
    <PasswordForgetPage />
  </Layout>
);
