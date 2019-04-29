// Drill reducer
const drillsReducerDefaultState = {};
export const drillsReducer = (state = drillsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_DRILLS':
            return action.drills;
        case 'CREATE_DRILL':
            return [
                ...state,
                action.drill
            ];
        default:
            return state;
    }
};

export { drillsReducer as default };