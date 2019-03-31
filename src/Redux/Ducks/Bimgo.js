const initialState = {
    words: [],
};

const bimgo = (state = initialState, action) => {
    switch (action.type) {
        case 'BIMGO/GET_WORDS':
            return {
                ...state,
                words: [ // TODO: Get this from the API
                    [{ word: '{Enter buzzword here}', id: 0 }, { word: '{Enter buzzword here}', id: 10 }, { word: '{Enter buzzword here}', id: 100 }, { word: '{Enter buzzword here}', id: 1000 }],
                    [{ word: '{Enter buzzword here}', id: 1 }, { word: '{Enter buzzword here}', id: 20 }, { word: '{Enter buzzword here}', id: 200 }, { word: '{Enter buzzword here}', id: 2000 }],
                    [{ word: '{Enter buzzword here}', id: 2 }, { word: '{Enter buzzword here}', id: 30 }, { word: '{Enter buzzword here}', id: 300 }, { word: '{Enter buzzword here}', id: 3000 }],
                    [{ word: '{Enter buzzword here}', id: 3 }, { word: '{Enter buzzword here}', id: 40 }, { word: '{Enter buzzword here}', id: 400 }, { word: '{Enter buzzword here}', id: 4000 }],
                ],
            };
        default:
            return { ...state };
    }
};

export default bimgo;
