// Homemade
import { Root, Bimgo } from 'Containers';

// Node modules
import React from 'react';
import ReactDOM from 'react-dom';

const dest = document.getElementById('root');
ReactDOM.render(
    <Root>
        <Bimgo/>
    </Root>,
    dest
);

module.hot.accept();
