// Homemade
import { Tile } from 'Components';

// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Row extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        rowNumber: PropTypes.number.isRequired,
        selected: PropTypes.objectOf(PropTypes.number).isRequired,
        words: PropTypes.arrayOf(
            PropTypes.shape({
                word: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }

    render() {
        const { onClick, rowNumber, selected, words } = this.props;

        return (
            <div className="bingo-row">
                {words.map((word, key) => {
                    const index = key + rowNumber * words.length;
                    return (
                        <Tile
                            key={word.id}
                            id={word.id}
                            word={word.word}
                            selected={selected[index]}
                            onClick={onClick.bind(this, index)}
                        />
                    );
                })}
            </div>
        );
    }
}
