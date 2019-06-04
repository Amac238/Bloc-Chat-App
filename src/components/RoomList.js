import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
        rooms: [],
        newRoomName: ''
  };
}

  handleNewRoom(e) {
    this.setState({newRoomName: e.target.value});
  }

  newRoomSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({newRoomName: ''});
  };

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) })
       });
     }


 render() {
   return(
     <section className="roomlist">
       <form onSubmit={(e) => this.newRoomSubmit(e)}>
         <input type="text" value={this.state.newRoomName} onChange={(e) => this.handleNewRoom(e)} />
         <input type="submit" value="Create Chat Room" />
       </form>
     <div className="chatrooms">
     {
       this.state.rooms.map((room, index) =>
         <div key={index} onClick={()=>this.props.setActiveRoom(room.key)} className={(this.props.activeRoom === room.key) ? 'active' : ''}>
           {room.name}
         </div>
     )}
     </div>
     </section>
   );
  }
 }
 export default RoomList;