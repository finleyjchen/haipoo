import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';
import { navigate } from 'gatsby';

class ComposePoem extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      newPostActive: false,
      loading: false,
      messages: [],
      limit: 20,
    };
  }


  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      title: this.state.title,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ 
      text: '',
      title: '', 
      newPostActive: false,
    });
    navigate("/poem/all")
    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };


  render() {
    const { title, text, messages, loading, newPostActive } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='max-w-xs mx-auto text-center'>

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
              className=""
            >
              <input 
                type="text"
                onChange={this.onChangeTitle}
                value={title}
                className="mb-2 py-2 px-1 w-full bg-gray-100  focus:bg-white text-center"
                placeholder="A title for this masterpiece.."
                required
                />
              <textarea
                value={text}
                onChange={this.onChangeText}
                className="whitespace-pre-line mb-2 py-2 px-1 w-full text-2xl md:text-4xl bg-gray-100  focus:bg-white text-center"
                placeholder="5, 7, 5..."
                required
                rows="3"
              />
              <button className="border py-1 px-2 mb-2 text-xl bg-gray-100 hover:bg-white" type="submit">Submit</button>
              <p className="">      Posting as: <span className="font-bold italic">{authUser.username}</span></p>
            </form>
          </div>

        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ComposePoem);
