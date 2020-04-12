import React from 'react';
import { compose } from 'recompose';
import Router from "@reach/router"
import Layout from '../components/layout';
import Poem from "../components/Messages/Poem"
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';

const HomePageBase = () => (
  <div>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>

    <HomePage />
  </Layout>
);
