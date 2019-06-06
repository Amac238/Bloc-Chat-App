import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    this.props.firebase.auth().signInWithPopup( this.provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        {this.props.user ?
          <div>
            {this.props.user.displayName}
            <button
              onClick={this.signOut}
            >
              Sign Out
            </button>
        </div>
          :
          <div>
            {'Sign in to Continue'}
            <button
              onClick={this.signIn}
            >
              Sign In
            </button>
          </div>
        }
      </div>
    );
  }
}

export default User;