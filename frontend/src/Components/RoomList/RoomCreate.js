// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class RoomCreate extends Component {
    render() {
        return (
            <div className="room-create">
                <h2> Create Room </h2>
                <div className="room-form">
                    <form>
                        <input />
                        <input />
                        <input />
                    </form>
                </div>
            </div>
        );
    }
}
