import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul className="w-full flex flex-col ">
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
