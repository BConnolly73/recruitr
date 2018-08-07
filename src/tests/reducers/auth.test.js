import authReducer from '../../reducers/auth';

test('a', () => {
    const action = {
        type: 'LOGIN',
        uid: 'asbbb'
    }

    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('b', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid:'anything'}, action);
    expect(state).toEqual({});
});