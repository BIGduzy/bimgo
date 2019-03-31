// Homemade
import { Board } from 'Components';

// Node modules
import { default as React, Component, PropTypes } from 'react';

export class Bimgo extends Component {
    // static propTypes = {
    //     children: PropTypes.object.isRequired,
    // }

    render() {
        return (
            <div>
                <header>
                    <h1>Bimgo!</h1>
                    <h2>Rules:</h2>
                    <ol>
                        <li>Zonder valsspeel</li>
                    </ol>
                </header>
                <content>
                    <Board />
                </content>
            </div>
        );
    }
}
