import React, { Component } from 'react';
import './App.css';
import RoomsList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
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

  constructor(props){
    super(props)
    this.state = {
      activeRoom: null,
      user: null
    };
  }

  setActiveRoom(room) {
   this.setState({activeRoom: room});
 }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <RoomsList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} />
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </header>
        <main>
        </main>
      </div>
    );
  }
}

export default App;