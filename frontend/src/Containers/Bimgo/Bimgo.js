// Homemade
import { Board } from 'Components';
import { Actions } from 'Redux/Ducks';

// Node modules
import { PropTypes } from 'prop-types';
import { default as React, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { default as openSocket } from 'socket.io-client';

@connect(store => ({
    bimgo: store.bimgo,
}), dispatch => ({
    actions: {
        fetchBoard: bindActionCreators(Actions.bimgo.fetchBoard, dispatch),
    },
}))
export default class Bimgo extends Component {
    // TODO: Create a file for overlapping proptype definitions
    // TODO: Find out why arrayOf gives a warning
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        bimgo: PropTypes.shape({
            words: PropTypes.arrayOf(
                PropTypes.shape({
                    word: PropTypes.string.isRequired,
                    id: PropTypes.number.isRequired,
                }),
            ).isRequired,
        }).isRequired,
    }

    constructor() {
        super();

        // TODO: Move to props / group to socket connection object
        this.state = {
            connecting: true,
            connection: false,
            error: null,
            password: 'R2D2',
            userId: null,
        };

        // Create socket connection
        this.socket = openSocket('http://localhost:5000');

        // TODO: Move the state to props
        // Listen to player_connect event
        this.socket.on('player_connect', (msg) => {
            console.log(msg);
            if (msg.success) {
                this.setState(() => ({
                    connecting: false,
                    connection: true,
                    userId: msg.user_id,
                }));
            } else {
                this.setState(() => ({
                    connecting: false,
                    connection: false,
                    error: msg.error,
                }));
            }
        });

        // Listen to player_connect event
        // TODO: Find out why we get the message more than once
        this.socket.on('victory', (msg) => {
            const { userId } = this.state;
            console.log(msg, userId);
            // TODO: Better popup d;)
            if (msg.success) {
                window.alert(msg.user_id === userId ? 'You win!' : `Player ${msg.user_id} wins!`);
            } else {
                window.alert(msg.user_id === userId ? 'Je hebt valse bingo!' : `Player ${msg.user_id} moet een liedje zingen!`);
            }
        });
    }

    componentDidMount() {
        this.fetchBoard();

        this.joinRoom();
    }

    fetchBoard() {
        const { actions } = this.props;
        actions.fetchBoard();
    }

    joinRoom() {
        const { password, userId } = this.state;

        // TODO: Create an enter password field
        // Attemt to join the room
        this.socket.send({
            type: 'room',
            action: 'connect',
            room_id: 8, // TODO: Replace with room id
            password,
            user_id: userId,
        });
    }

    handleComplete() {
        console.log('done!');

        const { connection, password, userId } = this.state;

        if (connection) {
            this.socket.send({
                type: 'room',
                action: 'victory',
                room_id: 8, // TODO: Replace with room id
                password,
                user_id: userId,
            });
        }

        // Get some new words d;)
        this.fetchBoard();
    }

    render() {
        const { connecting, connection, error } = this.state;
        const { bimgo } = this.props;

        return (
            <div id="bimgo">
                <header>
                    <h1>Bimgo!</h1>
                    <h2>Rules:</h2>
                    <ol>
                        <li>Zonder valsspeel</li>
                    </ol>
                    <div className="error">
                        {error // Todo: Css for error div
                            ? <span>{error}</span>
                            : null
                        }
                        {connecting
                            ? <span>Creating socket connection</span>
                            : null
                        }
                        {!connecting && !connection
                            ? <span>Could not create socket connection (you are playing solo)</span>
                            : null
                        }
                    </div>
                </header>
                <content>
                    {bimgo.fetched && !bimgo.fetching
                        ? <Board onComplete={this.handleComplete.bind(this)} words={bimgo.words} />
                        : <span>Could not load bimgo board</span> // TODO: Create try again button
                    }
                    {!bimgo.fetched && bimgo.fetching
                        ? <span>Loading bimgo board....</span>
                        : null
                    }
                </content>
            </div>
        );
    }
}
