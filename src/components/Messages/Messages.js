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
        <div>
            <div className=" clearfix ">
            <button className="border py-1 px-2 float-right" onClick={ () => this.setState({messages: messages.reverse()})}>
              Sort by date
            </button>
              </div>
           

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
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
    );
  }
}

export default withFirebase(Messages);
