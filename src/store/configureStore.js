import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import participantsReducer from '../reducers/participants';
import drillsReducer from '../reducers/drills';
import resultsReducer from '../reducers/results';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            participants: participantsReducer,
            drills: drillsReducer,
            results: resultsReducer
        }),
        composeEnhancers(applyMiddleware(thunk)),
    );

    return store;
}
