const drillsReducerDefaultState = [];
export const drillsReducer = (state = drillsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_DRILL':
            return [
                ...state,
                action.drill
            ];
        case 'SET_DRILLS':
            console.log('Reducer', action.drills);
            return action.drills;
        case 'EDIT_DRILL':
            return state.map((drill) => {
                if (drill.id === action.id) {
                    return {
                        ...drill,
                        ...action.updates
                    }
                } else {
                    return drill;
                }
            });
        default:
            return state;
    }
};

export { drillsReducer as default };