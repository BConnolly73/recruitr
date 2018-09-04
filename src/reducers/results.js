const resultsReducerDefaultState = [];
export const resultsReducer = (state = resultsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_RESULTS':
            return [
                ...state,
                action.result
            ];
        case 'SET_RESULTS':
            return action.results;
        default:
            return state;
    }
};

export { resultsReducer as default };