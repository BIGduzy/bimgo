// Homemade
import { RoomCreate, RoomList } from 'Components';

// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Rooms extends Component {
    static propTypes = {
        children: PropTypes.element,
    }

    static defaultProps = {
        children: null,
    }

    constructor() {
        super();

        // TOOD: Move to duck
        this.state = {
            rooms: [
                { id: 10, name: 'System Enjeering', currentPlayers: 10, maxPlayers: 32, hasPassword: true },
                { id: 5, name: 'ICOR', currentPlayers: 24, maxPlayers: 24, hasPassword: false },
                { id: 8, name: 'Ti lab', currentPlayers: 10, maxPlayers: 32, hasPassword: true },
                { id: 67, name: 'Capita selecta', currentPlayers: 56, maxPlayers: 64, hasPassword: true },
            ],
        };
    }

    render() {
        const { children } = this.props;
        const { rooms } = this.state;

        return !children ? (
            <div id="rooms">
                <RoomList rooms={rooms} />
                <RoomCreate />
            </div>
        ) : children;
    }
}
