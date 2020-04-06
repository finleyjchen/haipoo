import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
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

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.onListenForMessages();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });
    var { orderBy } = this.state;
    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList.reverse(),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

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

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  onChangeOrder = () => {
    var { messages } = this.state
      this.setState(
        state => ({
          messages: messages.reverse()
        })
      )
  }

  render() {
    const { title, text, messages, loading, newPostActive } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <p className="mb-2">      Welcome back, <span className="font-bold italic">{authUser.username}</span></p>

            <div className=" clearfix ">

                        <button  
              className="border py-1 px-2 mr-1 bg-gray-300 mb-4 float-left"
              onClick={ () => this.setState({newPostActive: !newPostActive}) }
              >
              {(newPostActive ? 'Close' : 'Submit a Haipoo')}
            </button>
            <button className="border py-1 px-2 float-right" onClick={ () => this.setState({messages: messages.reverse()})}>
              Sort by date
            </button>
              </div>
            <div className={(newPostActive ? 'block' : 'hidden') + " w-full bg-gray-100 p-4 mb-4"}>
            <h3 className="text-lg font-bold mb-2">Submit a Haipoo</h3>
            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input 
                type="text"
                onChange={this.onChangeTitle}
                value={title}
                className="mb-2 py-2 px-1 w-full bg-gray-200"
                placeholder="A title for this masterpiece.."
                required
                />
              <textarea
                value={text}
                onChange={this.onChangeText}
                className="whitespace-pre-line mb-2 py-2 px-1 w-full bg-gray-200"
                placeholder="Your shitty inspiration knows no bounds!"
                required
                rows="3"
              />
              <button className="border py-1 px-2 mr-1 bg-gray-300" type="submit">Submit</button>
            </form>
          </div>

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
              authUser={authUser}
              messages={messages}
              onEditMessage={this.onEditMessage}
              onRemoveMessage={this.onRemoveMessage}
              />
              )}

            {!messages && <div>There are no messages ...</div>}

            {/* {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )} */}
       

        </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
