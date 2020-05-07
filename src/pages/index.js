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
      <h3 className="text-center text-4xl mb-4 ">Be where your bum is.</h3>
    <div className="flex justify-center wrap">
      <Link to="/poem/all" className="py-3 px-8 bg-gray-800 text-white font-semibold text-2xl mx-3 rounded shadow hover:shadow-lg">Read</Link>
      <Link to="/create" className="py-3 px-8 bg-transparent border border-gray-800 font-semibold text-2xl mx-3 rounded shadow hover:shadow-lg">Compose</Link>
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
