// Homemade
import { Root, Bimgo } from 'Containers';
import Store from 'Redux/Store';

// Node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const dest = document.getElementById('root');
ReactDOM.render(
    <Provider store={Store}>
        <Root>
            <Bimgo />
        </Root>
    </Provider>,
    dest,
);

module.hot.accept();
