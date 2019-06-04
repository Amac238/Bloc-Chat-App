import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state = {
        messages: this.props.messages
    };
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  renderMessage(message) {
    return (
      <ul key={JSON.stringify(message)}>
      <li> Username: {message.username} </li>
      <li> Message Content: {message.content} </li>
      <li> Sent at: {message.sentAt} </li>
      <li> Room ID: {message.roomId} </li>
      </ul>
    )
  }

  render() {
    if (!this.props.activeRoom) {return (<div></div>)}
    if (!this.props.messages){ return (<div>Loading</div>) } 
    console.log(this.state.messages, "messages", this.props.messages);
    return (
      <section className="messageField">
      <div className="activeRoom">
      {this.props.messages.map((mes) => {
        return this.renderMessage(mes);
      })}
      </div>
      </section>

    )
  }
}

export default MessageList;