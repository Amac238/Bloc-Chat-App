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
    this.msgRef.push({
    username: "<USERNAME HERE>",
    content: this.state.message,
    sentAt: firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
    })
  }

  getFilteredMessages() {
    return this.state.messages.filter((message) => {
      return message.roomId === this.props.activeRoom.key;
    })
  }

  render() {
    return (
      <div>
        {
          this.getFilteredMessages().map((message, roomId) => (
              <li key={roomId}>{message.content}</li>
            )
          )
        }
        <form>
          <h3>Message</h3>
            <input type='text' value={this.state.message} onChange={this.handleChange} />
            <button type='submit' onClick={(e) => this.createMsg(e)}>
              Send
            </button>
        </form>
      </div>


    );
  }
}

export default MessageList;