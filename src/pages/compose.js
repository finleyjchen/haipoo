import React from 'react';
import { compose } from 'recompose';
import Router from "@reach/router"
import Layout from '../components/layout';
import ComposePoem from "../components/Messages/ComposePoem"
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';

const ComposePoemBase = () => (
  <div>
    
    <ComposePoem />
  </div>
);

const condition = authUser => !!authUser;

const ComposePoemPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(ComposePoemBase);

export default () => (
  <Layout title="Compose a Haipoo">
    <h1 className="text-center text-4xl mb-4">Compose</h1>
    <ComposePoemPage />
  </Layout>
);
