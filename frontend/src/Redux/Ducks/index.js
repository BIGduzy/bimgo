// Node_modules
import { combineReducers } from 'redux';

// Homemade
import Bimgo from './Bimgo';

export default combineReducers({
    bimgo: Bimgo.reducer,
});

export const Actions = {
    bimgo: Bimgo.actions,
};
