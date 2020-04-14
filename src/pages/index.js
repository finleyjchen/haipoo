import React from 'react';
import { compose } from 'recompose';
import Router from "@reach/router"
import Layout from '../components/layout';
import Poem from "../components/Messages/Poem"
import { Link } from "gatsby"
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';

const HomePageBase = () => (
  <div>
    <div className="flex flex-col w-64 mx-auto">
      <Link to="/create" className="py-4 px-6 bg-gray-800 text-white font-bold text-3xl mb-4">Create</Link>
      <Link to="/poem/all" className="py-4 px-6 bg-gray-800 text-white font-bold text-3xl">Read</Link>
    </div>
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout title="test">

    <HomePageBase />
  </Layout>
);
