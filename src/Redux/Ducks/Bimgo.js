import Model from './model';

class Bimgo extends Model {
    constructor() {
        super('Bimgo', {
            words: [],
        });

        this.init();
    }

    init() {
        this.setAction('fetchBoard', {
            fetchBoard: (state, action) => ({
                words: action.words,
            }),
        });
    }

    static fetchBoard(type) {
        return function fetchBoard() {
            return {
                type: type.fetchBoard,
                words: [ // TODO: Get this from the API
                    [{ word: '{Enter buzzword here}', id: 0 }, { word: '{Enter buzzword here}', id: 10 }, { word: '{Enter buzzword here}', id: 100 }, { word: '{Enter buzzword here}', id: 1000 }],
                    [{ word: '{Enter buzzword here}', id: 1 }, { word: '{Enter buzzword here}', id: 20 }, { word: '{Enter buzzword here}', id: 200 }, { word: '{Enter buzzword here}', id: 2000 }],
                    [{ word: '{Enter buzzword here}', id: 2 }, { word: '{Enter buzzword here}', id: 30 }, { word: '{Enter buzzword here}', id: 300 }, { word: '{Enter buzzword here}', id: 3000 }],
                    [{ word: '{Enter buzzword here}', id: 3 }, { word: '{Enter buzzword here}', id: 40 }, { word: '{Enter buzzword here}', id: 400 }, { word: '{Enter buzzword here}', id: 4000 }],
                ],
            };
        };
    }
}

export default new Bimgo();
