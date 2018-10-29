const measurementReducerDefaultState = [];
export const measurementReducer = (state = measurementReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MEASUREMENTS':
            return [
                ...state,
                action.measurement
            ];
        case 'SET_MEASUREMENTS':
            return action.measurements;
        case 'EDIT_MEASUREMENT':
            return state.map((measurement) => {
                if (measurement.id === action.id) {
                    return {
                        ...measurement,
                        ...action.updates
                    }
                } else {
                    return measurement;
                }
            });
        default:
            return state;
    }
};

export { measurementReducer as default };