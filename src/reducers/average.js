const averageReducerDefaultState = {};
export const averageReducer = (state = averageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_AVERAGE':
            return action.average;
        default:
            return state;
    }
};

export { averageReducer as default };