// Homemade
import reducer from 'Redux/Ducks';

// Node_modules
import { applyMiddleware, createStore, compose } from 'redux';
import thuk from 'redux-thunk';

const middleware = applyMiddleware(thuk);

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    compose(
        middleware,
        // TODO: This should only be done in development d;)
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);
/* eslint-enable */
export default store;
