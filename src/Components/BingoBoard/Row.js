// Homemade
import { Tile } from 'Components';

// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export class Row extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        rowNumber: PropTypes.number.isRequired,
        selected: PropTypes.object.isRequired,
        words: PropTypes.array.isRequired,
    }

    render(){
        const { onClick, rowNumber, selected, words } = this.props;

        return (
            <div className="bingo-row">
                {words.map((word, key) => {
                    const index = key + rowNumber * words.length;
                    return (
                        <Tile key={index} id={word.id} word={word.word} selected={selected[index]} onClick={onClick.bind(this, index)} />
                    );
                })}
            </div>
        );
    }
}
