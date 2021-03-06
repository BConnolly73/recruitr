import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

import { startSetParticipants } from './actions/participants';
import { startSetDrills } from './actions/drills';
import { startSetRoles } from './actions/roles';
import { startSetMeasurements } from './actions/measurements';
import { startSetResults } from './actions/results.js';
import { startSetAverage } from './actions/average.js';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetParticipants()).then(() => {
            store.dispatch(startSetDrills()).then(() => {
                store.dispatch(startSetRoles()).then(() => {
                    store.dispatch(startSetMeasurements()).then(() => {
                        store.dispatch(startSetResults()).then(() => {
                            store.dispatch(startSetAverage()).then(() => {
                                renderApp();
                                if (history.location.pathname === '/') {
                                    history.push('/dashboard');
                                }
                            })
                        })
                    })
                })
            })
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});