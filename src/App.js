import React from 'react';
import './App.css';
import RoomList from './components/RoomList';
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

function App() {
  return (
    <div className="App">
      <header className="Header">
        <p>
          Bloc Chat
        </p>
      </header>
      <div className='List'>
      <RoomList
      firebase={firebase} />
      </div>
    </div>
  );
}

export default App;
