import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

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

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      activeRoom: '',
      user: null
    };
  }

  handleClick = (room) => {
    this.setState({ activeRoom: room })
    console.log(room);
  }

  setUser = (user) => {
    this.setState({ user });
    console.log(user);
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={firebase}
          setUser={this.setUser}
          user={this.state.user}
        />
        <RoomList
          firebase={firebase}
          handleClick={this.handleClick}
        />
        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
