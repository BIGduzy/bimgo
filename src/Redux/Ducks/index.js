// Node_modules
import { combineReducers } from 'redux';

// Homemade
import bimgo from './Bimgo';

export default combineReducers({
    bimgo,
});

export const actions = {
    bimgo: {
        fetchAll: () => ({
            type: 'BIMGO/GET_WORDS',
        }),
    },
};
