import Model from './Model';

class Bimgo extends Model {
    constructor() {
        super('Bimgo', {
            fetched: false,
            fetching: false,
            words: [],
        });

        this.init();
    }

    init() {
        this.setAction('fetchBoard', {
            fetchBoard: () => ({
                fetching: true,
            }),
            fetchBoard_success: (state, action) => ({
                words: action.result.bimgo,
                fetched: true,
                fetching: false,
            }),
            fetchBoard_failed: () => ({
                fetched: false,
                fetching: false,
            }),
        });
    }

    static fetchBoard(type) {
        return function fetchBoard() {
            return {
                types: [type.fetchBoard, type.fetchBoard_success, type.fetchBoard_failed],
                promise: api => api.get('newBingo'), // TODO: Better api design
            };
        };
    }
}

export default new Bimgo();
