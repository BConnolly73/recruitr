const authReducerDefaultState = {};
export const authReducer = (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export { authReducer as default };