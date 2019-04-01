// Node modules
import { default as React, Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default class RoomList extends Component {
    static propTypes = {
        rooms: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                currentPlayers: PropTypes.number.isRequired,
                maxPlayers: PropTypes.number.isRequired,
                hasPassword: PropTypes.bool,
            }).isRequired,
        ).isRequired,
    }

    render() {
        const { rooms } = this.props;

        return (
            <div className="room-list">
                <h2>Select a Room</h2>
                <ul>
                    {rooms.map((room) => {
                        return (
                            <Link key={room.id} to={`/rooms/${room.id}`}>
                                <li>
                                    <span className="room-name">{room.name}</span>
                                    <span className="room-players">{`${room.currentPlayers}/${room.maxPlayers}`}</span>
                                    <span className="room-access">{room.hasPassword ? 'lock' : 'unlock'}</span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
