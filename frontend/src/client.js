// Homemade
import Store from 'Redux/Store';
import Routes from 'Routs';

// Node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const dest = document.getElementById('root');
ReactDOM.render(
    <Provider store={Store}>
        <Router>
            {Routes}
        </Router>
    </Provider>,
    dest,
);

module.hot.accept();
