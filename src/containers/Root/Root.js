// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Root extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }

    render() {
        const { children } = this.props;
        return (
            <div id="container">
                { children }
            </div>
        );
    }
}
