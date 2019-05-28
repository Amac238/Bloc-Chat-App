import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props){
        super (props);
        this.state = {
            rooms: [],
            newRoomSubmission: ''
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    handleChange = (event) => {
        this.setState({ newRoomSubmission: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.newRoomSubmission) {return} else {
            this.roomsRef.push({
                name: this.state.newRoomSubmission
            });
        }
        this.setState({ newRoomSubmission: ''});
    }

    render() {
        return (
            <div className="RoomList">
                <ul>
                    {this.state.rooms.map( (room, index) => {
                        return (
                            <li key={room.key}>{room.name}</li>
                        )
                    })}
                </ul>
                <form onSubmit={ (event) => this.handleSubmit(event) }>
                    <input className="Input" type="text" onChange={ ( event ) => this.handleChange( event ) } value= {this.state.newRoomSubmission} />
                    <button className="AddButton" type="submit">Create New Room</button>
                </form>
            </div>
        );
    }
}
export default RoomList;