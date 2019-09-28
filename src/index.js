import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {ynab} from './store/reducers/ynab';
import {csv} from './store/reducers/csv';
import {loadBudgets, login} from "./store/actions/ynab";
import thunkMiddleware from 'redux-thunk';
import {ynabMiddleware} from "./store/middleware/ynab";
import {accessToken as ynabAccessToken} from "./store/selectors/ynab";
import YNABApp from "./containers/YNABApp";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(combineReducers({ynab, csv}), composeEnhancers(applyMiddleware(thunkMiddleware, ynabMiddleware)));

let accessTokenPattern = /#access_token=([a-z0-9-]+)/;
if (window.location.hash && accessTokenPattern.test(window.location.hash)) {
    sessionStorage.setItem("access_token", window.location.hash.match(accessTokenPattern)[1]);
}

let accessToken = sessionStorage.getItem("access_token");

store.dispatch(login(accessToken)).then(() => {
    if(ynabAccessToken(store.getState())) {
        store.dispatch(loadBudgets());
    }
});

ReactDOM.render(<Provider store={store}><YNABApp /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
