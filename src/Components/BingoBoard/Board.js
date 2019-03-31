// Homemade
import { Row } from 'Components';

// Node modules
import { default as React, Component, PropTypes } from 'react';

export class Board extends Component {
    constructor() {
        super();
        this.state = {
            selected: {},
            words: [ // TODO: Get this from the API
                [{word: "{Enter buzzword here}", id: 0}, {word: "{Enter buzzword here}", id: 10}, {word: "{Enter buzzword here}", id: 100}, {word: "{Enter buzzword here}", id: 1000}],
                [{word: "{Enter buzzword here}", id: 1}, {word: "{Enter buzzword here}", id: 20}, {word: "{Enter buzzword here}", id: 200}, {word: "{Enter buzzword here}", id: 2000}],
                [{word: "{Enter buzzword here}", id: 2}, {word: "{Enter buzzword here}", id: 30}, {word: "{Enter buzzword here}", id: 300}, {word: "{Enter buzzword here}", id: 3000}],
                [{word: "{Enter buzzword here}", id: 3}, {word: "{Enter buzzword here}", id: 40}, {word: "{Enter buzzword here}", id: 400}, {word: "{Enter buzzword here}", id: 4000}],
            ],
        };
    }

    handleClick(index) {
        const newSelected = {...this.state.selected};
        newSelected[index] = !newSelected[index];

        // Update the state, then validate the board
        this.setState(state => ({
            selected: newSelected,
        }), () => {
            if(this.validateBoardState()) {
                this.sendVictory();
                // Clear Board
                // TODO: Only do this if sendVictory is success
                this.setState(state => ({
                    selected: {},
                }));
            }
        });
    }

    /**
     * Checks if the board is fully filled in by checking if all the tiles are selected in a row, column or diagonal
     * @returns {bool}
     */
    validateBoardState() {
        // TODO: Make this useable with multiple board sizes
        const { selected } = this.state;

                // Check rows
        return ( (selected[0] && selected[1] && selected[2] && selected[3]) ||
               (selected[4] && selected[5] && selected[6] && selected[7]) ||
               (selected[8] && selected[9] && selected[10] && selected[11]) ||
               (selected[12] && selected[13] && selected[14] && selected[15]) ||
               // Check Columns
               (selected[0] && selected[4] && selected[8] && selected[12]) ||
               (selected[1] && selected[5] && selected[9] && selected[13]) ||
               (selected[2] && selected[6] && selected[10] && selected[14]) ||
               (selected[3] && selected[7] && selected[11] && selected[15]) ||
               // Check diagonal
               (selected[3] && selected[6] && selected[9] && selected[12]) ||
               (selected[0] && selected[5] && selected[10] && selected[15]))
    }

    /**
     * Sends completed board to API for validation
     * @param {DOM} tiles The DOM nodes that need the on click functionality
     * @return {promise} JSON dat returned from the API
     */
    sendVictory(tiles) {
        console.log('Done!');
    }

    render(){
        const { selected, words } = this.state;

        return (
            <div id="bingo-board">
                {words.map((row, i) => <Row key={i} onClick={this.handleClick.bind(this)} rowNumber={i} selected={selected} words={row} />)}
            </div>
        );
    }
}
