import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import rootReducer from "./reducers/configureStore";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


const initialState = {
    departmentlist: [],
    status: false,
    list: [],
    isRender: false
};


const history = createBrowserHistory({ basename: baseUrl });
// Get the application-wide store instance, prepopulating with state from the server where available.
const store = rootReducer(history);
//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>

        <ToastProvider autoDismiss>
      <Container maxWidth="lg">
      <ConnectedRouter history={history}>
            <App />
            </ConnectedRouter>
            </Container>
        </ToastProvider>
    
    </Provider>,
    rootElement);

registerServiceWorker();
