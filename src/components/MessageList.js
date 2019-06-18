import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      rmMsgs: [],
      message: '',
    }

    this.msgRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.sessionRef = this.props.firebase.database().ref('sessions');
    this.activeRoom = this.props.activeRoom;
  }

  componentDidMount() {
    this.msgRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }

  createMsg(event) {
    event.preventDefault();
    this.msgRef.push({
      username: this.props.user.displayName,
      content: this.state.message,
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    })
    return this.setState({ message: '' });
  }

  getFilteredMessages() {
    return this.state.messages.filter((message) => {
      return message.roomId === this.props.activeRoom.key;
    })
  }

  render() {
    return (

      <div>
        <h1>Bloc Chats</h1>
        <h2>{this.props.activeRoom.name || 'Select Room'}</h2>
        <form>
          <h3>Messages</h3>
            {
              this.getFilteredMessages().map((message, i) => (
                <div key={i}>
                  <li>{message.username} says:</li>
                  <p>{message.content}</p>
                </div>

                )
              )
            }
            {this.props.user && this.props.activeRoom!='' ? (<><input type='text' value={this.state.message} onChange={this.handleChange} />
            <button type='submit' onClick={(e) => this.createMsg(e)}>
              Send
            </button></>) : ''}
        </form>
        <div>
      </div>
      </div>


    );
  }
}

export default MessageList;