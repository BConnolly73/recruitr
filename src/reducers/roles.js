const rolesReducerDefaultState = [];
export const roleReducer = (state = rolesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ROLES':
            return [
                ...state,
                action.role
            ];
        case 'SET_ROLES':
            return action.roles;
        case 'EDIT_ROLE':
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