// Homemade
import {Root} from 'containers'; // TODO: Find out why the index.js is not working

// Node modules
import React from 'react';
import ReactDOM from 'react-dom';

const dest = document.getElementById('root');
ReactDOM.render(
    <Root>
        <h1>Hello, world! d;)</h1>
    </Root>,
    dest
);
