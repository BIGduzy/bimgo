// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Tile extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool,
        word: PropTypes.string.isRequired,
    }

    static defaultProps = {
        selected: false,
    }

    render() {
        const { id, onClick, selected, word } = this.props;

        return (
            <div onClick={onClick} className={`bingo-tile ${selected ? 'selected' : ''}`} buzzword-id={id}>
                <span>
                    {word}
                </span>
            </div>
        );
    }
}
