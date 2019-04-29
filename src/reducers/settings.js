// Settings reducer
const settingsReducerDefaultState = {};
export const settingsReducer = (state = settingsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_SETTINGS':
            return action.settings;
        case 'UPDATE_SETTINGS':
            return action.settings;
        default:
            return state;
    }
};

export { settingsReducer as default };