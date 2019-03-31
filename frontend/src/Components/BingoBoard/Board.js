// Homemade
import { Row } from 'Components';

// Node modules
import { default as React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Board extends Component {
    static propTypes = {
        onComplete: PropTypes.func.isRequired,
        words: PropTypes.arrayOf(
            PropTypes.shape({
                word: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }

    constructor() {
        super();
        this.state = {
            selected: {},
        };
    }

    handleClick(index) {
        const { selected } = this.state;
        const newSelected = { ...selected };
        newSelected[index] = !newSelected[index];

        // Update the state, then validate the board
        this.setState(() => ({
            selected: newSelected,
        }), () => {
            if (this.validateBoardState()) {
                const { onComplete } = this.props;
                onComplete();
                // Clear Board
                // TODO: Only do this if sendVictory is success
                this.setState(() => ({
                    selected: {},
                }));
            }
        });
    }

    /**
     * Checks if the board is fully filled in by checking if all the tiles are
     * selected in a row, column or diagonal
     * @returns {bool}
     */
    validateBoardState() {
        // TODO: Make this useable with multiple board sizes
        const { selected } = this.state;

        // Check rows
        return (selected[0] && selected[1] && selected[2] && selected[3])
            || (selected[4] && selected[5] && selected[6] && selected[7])
            || (selected[8] && selected[9] && selected[10] && selected[11])
            || (selected[12] && selected[13] && selected[14] && selected[15])
            // Check Columns
            || (selected[0] && selected[4] && selected[8] && selected[12])
            || (selected[1] && selected[5] && selected[9] && selected[13])
            || (selected[2] && selected[6] && selected[10] && selected[14])
            || (selected[3] && selected[7] && selected[11] && selected[15])
            // Check diagonal
            || (selected[3] && selected[6] && selected[9] && selected[12])
            || (selected[0] && selected[5] && selected[10] && selected[15]);
    }

    render() {
        const { selected } = this.state;
        const { words } = this.props;

        return (
            <div id="bingo-board">
                {words.map((row, i) => (
                    <Row
                        key={i}
                        onClick={this.handleClick.bind(this)}
                        rowNumber={i}
                        selected={selected}
                        words={row}
                    />
                ))}
            </div>
        );
    }
}
