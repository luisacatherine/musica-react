import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from './store'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

const rootEl = document.getElementById('root');
const render = Component => 
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Component/>
            </BrowserRouter>
        </Provider>,
        rootEl
    );

render(AppRouter);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();