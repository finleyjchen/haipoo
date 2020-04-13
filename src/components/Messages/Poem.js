import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import * as timeago from 'timeago.js';
import {Link} from "gatsby"
class Poem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      messageId: this.props.messageId,
      message: {},
      messages: [],
      editMode: false,
      editText: "",
      nextId: '',
      prevId: '',
    };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.getMessage();
      this.getUsername();
    }
  };

  componentDidMount() {
    console.log("mounting")
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }


  getMessage = () => {
    this.setState({ loading: true})
    const { messageId } = this.state;
    this.props.firebase
    .message(messageId).once('value', snapshot => {
      this.setState({
        message: snapshot.val(),
        loading:false
      }, () => {
        this.getNextMessages()
      })
      // request username from username id
      this.props.firebase
      .user(snapshot.val().userId)
      .once('value', snapshot => {
        const user = snapshot.val();
        if (user) {
          console.log(user.username);
          this.setState(state => ({
            username: user.username,
          }));
        }
      });
    })
  }

  getNextMessages = () => {
    const { messageId } = this.state;

    this.props.firebase
      .messages().on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));
          var currentIndex = messageList.map(message => message.uid).indexOf(messageId)
          console.log(currentIndex)
          if(currentIndex == 0 ) {
            var prevIndex = false
            var nextIndex = messageList[currentIndex + 1].uid

          } else if(currentIndex == messageList.length - 1) {
            var nextIndex = false
            var prevIndex = messageList[currentIndex - 1].uid

          } else {
            var prevIndex = messageList[currentIndex - 1].uid
            var nextIndex = messageList[currentIndex + 1].uid
          }
          this.setState({
            messages: messageList,
            loading: false,
            prevId: prevIndex,
            nextId: nextIndex
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  }

  getUsername = () => {

  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.state.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, onRemoveMessage } = this.props;
    const { editMode, editText, username, message, loading, nextId, prevId } = this.state;
    return (
      <article className="block p-2 mb-4 bg-white w-full text-center">
         {loading && <div>Loading ...</div>}
        {editMode ? (
          <React.Fragment>
            <textarea
              value={editText}
              onChange={this.onChangeEditText}
              className=" mb-2 py-2 px-1 w-full bg-gray-100 whitespace-pre-line"
              rows="3"
            />
            <span>
              <button
                className="border py-1 px-2 mr-1"
                onClick={this.onSaveEditText}
              >
                Save
              </button>
              <button
                className="border py-1 px-2 mr-1"
                onClick={this.onToggleEditMode}
              >
                Cancel
              </button>
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <h1 className="text-xl font-bold mb-2 ">
                {message.title}
                {authUser && authUser.uid === message.userId && (
                  <span className="text-xs float-right">
                    <button
                      className="border py-1 px-2 mr-1"
                      onClick={this.onToggleEditMode}
                    >
                      Edit
                    </button>
                    <button
                      className="border py-1 px-2 mr-1 bg-red-300"
                      type="button"
                      onClick={() => onRemoveMessage(message.uid)}
                    >
                      Delete
                    </button>
                  </span>
                )}
              </h1>

              <p className="whitespace-pre-line  mb-2 text-2xl">{message.text}</p>
            </div>
            <div className="flex justify-between mt-10 border-t border-black w-64 mx-auto pt-1">
              <p>
                <em>
                  By <strong>{username}</strong>
                </em>
              </p>
              <p className="">

                <strong>              {message.editedAt && (
                <small className="block text-xs tracking-tight italic">
                    Edited{' '}
                    {timeago.format(message.editedAt)}{' '}
                    
                  </small>
                )}
                {timeago.format(message.createdAt)}  </strong>

                </p>
            </div>
          </React.Fragment>
        )}
        <div className="flex justify-between">


        {prevId && <Link to={"/poem/" + prevId}> &larr; Previous</Link>}
        {nextId && <Link to={"/poem/" + nextId}>Next &rarr;</Link>}
        </div>
      </article>
    );
  }
}

export default withFirebase(Poem);
