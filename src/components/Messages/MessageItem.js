import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import * as timeago from 'timeago.js';
import { Link } from "gatsby"
import { Heart } from "react-feather"
class MessageItem extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.message.userId);
    this.state = {
      username: '',
      loading: false,

      editMode: false,
      editText: this.props.message.text,
    };
  }

  componentDidMount() {
 
    this.props.firebase
      .user(this.props.message.userId)
      .once('value', snapshot => {
        const user = snapshot.val();
        if (user) {
          console.log(user.username);
          this.setState(state => ({
            username: user.username,
          }));
        }
      });
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
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
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText, username } = this.state;
    return (
      <li className="text-center p-2 mb-24 bg-white ">
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
              <p className="text-lg font-bold mb-2 ">
                <Link className="hover:underline" to={"/poem/" + message.uid}>{message.title}</Link>
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
              </p>

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
      </li>
    );
  }
}

export default withFirebase(MessageItem);
