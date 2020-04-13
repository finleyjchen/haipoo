import React from 'react';
import { compose } from 'recompose';
import Router from "@reach/router"
import Layout from '../components/layout';
import CreatePoem from "../components/Messages/CreatePoem"
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';

const CreatePoemBase = () => (
  <div>

    <CreatePoem />
  </div>
);

const condition = authUser => !!authUser;

const CreatePoemPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(CreatePoemBase);

export default () => (
  <Layout title="test">

    <CreatePoemPage />
  </Layout>
);
