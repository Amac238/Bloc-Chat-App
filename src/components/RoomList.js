import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

class RoomList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      name: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  createRoom(event) {
    this.roomsRef.push({
      name: this.state.name
    });
  }

  render() {
    return(
      <Menu>
        <div>
          {this.state.rooms.map((room, index) => (
            <li key={index} onClick={(e) => this.props.handleClick(room)}>{room.name}</li>
          ))}
        </div>
        <div>
          <form>
            <label>
              Create Room:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <button type="submit" onClick={(e) => this.createRoom()}>
              Create
            </button>
          </form>
        </div>
      </Menu>


    );
  }
}
export default RoomList;