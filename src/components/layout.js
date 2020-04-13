import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet"
import Navigation from './Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import '../index.css';
class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      console.log(this.props.title)
      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <div className="">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Haipoo</title>
      <meta name="description" content="Be where your bum is. Haiku's about poop." />
      <link rel="stylesheet" href="https://use.typekit.net/aku5owx.css" />


    </Helmet>
    <Navigation />
    <main className="container max-w-4xl w-full mx-auto mt-10">
    {children}
    </main>
  </div>
));

export default Layout;
