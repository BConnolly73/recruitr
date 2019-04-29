import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import settingsReducer from '../reducers/settings';
import participantsReducer from '../reducers/particiants';
import drillsReducer from '../reducers/drills';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            settings: settingsReducer,
            participants: participantsReducer,
            drills: drillsReducer
        }),
        composeEnhancers(applyMiddleware(thunk)),
    );

    return store;
}
