const rolesReducerDefaultState = [];
export const roleReducer = (state = rolesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ROLLS':
            return [
                ...state,
                action.roll
            ];
        case 'SET_ROLLS':
            return action.rolls;
        case 'EDIT_ROLL':
            return state.map((role) => {
                if (role.id === action.id) {
                    return {
                        ...role,
                        ...action.updates
                    }
                } else {
                    return role;
                }
            });
        default:
            return state;
    }
};

export { roleReducer as default };