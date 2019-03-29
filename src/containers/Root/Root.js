// Node modules
import { default as React, Component, PropTypes } from 'react';

export class Root extends Component {
    // static propTypes = {
    //     children: PropTypes.object.isRequired,
    // }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
