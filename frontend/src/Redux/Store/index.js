// Homemade
import reducer from 'Redux/Ducks';
import clientMiddleware from 'Redux/Middleware/ClientMiddleware';
import ApiClient from 'Utils/ApiClient';

// Node_modules
import { applyMiddleware, createStore, compose } from 'redux';
import thuk from 'redux-thunk';

const middleware = applyMiddleware(clientMiddleware(new ApiClient()), thuk);

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
