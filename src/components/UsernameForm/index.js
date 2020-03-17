import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  needsUsername: true,
  error: null,
};

class SetUsername extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      username: this.props.authUser.username,
     };
     if(!this.props.authUser.needsUsername) {
      console.log("here")
      navigate(ROUTES.HOME, {replace: true});
    } 
  }


  onSubmit = event => {
    const { username } = this.state;
    this.props.firebase.user(this.props.authUser.uid).update({
      username: username,
      needsUsername: false
    })
      .then(() => {
        navigate(ROUTES.HOME);

        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, error } = this.state;

    const isInvalid =
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="p-2  mb-2 items-center mx-auto max-w-sm flex flex-wrap">
        <h1 className="w-full">Create a username</h1>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder={username}
          className="py-2 px-1 bg-gray-200 "
        />
        
        <button disabled={isInvalid} type="submit" className="px-2 flex-shrink-0">
          Next &rarr;
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const UsernameForm = (props) => (
  <AuthUserContext.Consumer>
    {authUser =>
        <SetUsername authUser={authUser} firebase ={props.firebase} />
        }
  </AuthUserContext.Consumer>
)
export default withFirebase(UsernameForm);
