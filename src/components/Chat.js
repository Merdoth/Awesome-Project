import React, { Component } from 'react';

import Backend from '../Backend';
import { GiftedChat } from 'react-native-gifted-chat';

 export default class Chat extends Component {
  state = {
    messages: []
  };
  componentWillMount() {

  }
    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={(message) => {
              Backend.sendMessage(message);
            }}
            user={{
              _id: Backend.getUid(),
              name: this.props.name,
            }}
            />
        );
    }
    componentDidMount() {
      Backend.loadMessages((message) => {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      });
    }
    componentWillUnmount() {
      Backend.closeChat();
    }
}

Chat.defaultProps = {
  name: 'John Smith',
};
