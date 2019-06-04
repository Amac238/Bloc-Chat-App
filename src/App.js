import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB5Q__3ZAuObw1O3BMmfuJKXOsoRLzPzDE",
  authDomain: "bloc-chat-7f3a4.firebaseapp.com",
  databaseURL: "https://bloc-chat-7f3a4.firebaseio.com",
  projectId: "bloc-chat-7f3a4",
  storageBucket: "bloc-chat-7f3a4.appspot.com",
  messagingSenderId: "714869166909",
  appId: "1:714869166909:web:976108b850c77ca9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: null,
      messages: {},
      roomMessages: [],
      rooms: [],
    }
    firebase.database().ref().once("value").then((snapshot) => {
      this.state.messages = snapshot.val().Messages;
      this.state.rooms = snapshot.val().rooms;
    });
    this.setActiveRoom = this.setActiveRoom.bind(this); 
  }

  setActiveRoom(roomId){
    var roomMessages = [];
    for (var message in this.state.messages){
      if (this.state.messages[message].roomId === roomId) { 
        roomMessages.push(this.state.messages[message]);
      }
    }
    this.setState({activeRoom: roomId});
    this.setState({roomMessages: roomMessages});
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header>
        <h1>Bloc Chat!</h1>
        </header>
        <div>
        <RoomList activeRoom={this.state.activeRoom} setActiveRoom={(room)=>this.setActiveRoom(room)} firebase={firebase} />
        </div>
        <div>
        <MessageList messages={this.state.roomMessages} activeRoom={this.state.activeRoom} firebase={firebase} />
        </div>
        </div>
    );
  }
}

export default App;